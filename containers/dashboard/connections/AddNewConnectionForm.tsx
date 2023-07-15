import Input from "components/Input/Input";
import SelectBox from "components/SelectBox/SelectBox";
import { useSetState } from "hooks/useSetState";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ConnectionService from "services/endpoints/ConnectionService";
import PlusIcon from "../../../assets/svg/icons/plus.svg";
import CrossIcon from "../../../assets/svg/icons/cross.svg";

type AddNewConnectionProps = {};
type FormData = {
  name: "string";
  description: "string";
  application_name: "string";
  account_id: "string";
  connection_chatflows: [
    {
      chatflow_id: "string";
      trigger_id: "string";
    }
  ];
};

const AddNewConnectionForm: React.FC<AddNewConnectionProps> = ({
  triggerOptions,
  chatflowOptions,
  submitRef,
  account_id,
  record,
  status,
  onSuccess,
}) => {
  const { register, handleSubmit, control, reset } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "connection_chatflows",
  });
  let { t } = useTranslation("common");
  const [controls, setControls] = useSetState({
    trigger_id: {
      options: [],
      value: "",
    },
    chatflow_id: {
      options: [],
      value: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
        account_id,
        application_name: "BOT_BUILDER",
      };
      if (!record) {
        await ConnectionService.postCreateConnection(data);
        onSuccess();
      } else {
        await ConnectionService.putUpdateConnection(data, record.id);
        onSuccess();
      }
    } catch (e) {}
  };

  const onClear = () => {
    reset({
      name: "",
      description: "",
      connection_chatflows: [],
    });
    setControls({ trigger_id: { options: [], value: "" } });
    setControls({ chatflow_id: { options: [], value: "" } });
  };

  const onAddToList = () => {
    const isDuplicate = fields.findIndex(
      (item) =>
        item.trigger_id + item.chatflow_id ===
        controls.trigger_id.value + controls.chatflow_id.value
    );
    if (
      controls.trigger_id.value !== "undefined" &&
      controls.trigger_id.value !== "" &&
      controls.chatflow_id.value !== "undefined" &&
      controls.chatflow_id.value !== "" &&
      isDuplicate === -1
    ) {
      append({
        trigger_id: controls.trigger_id.value,
        chatflow_id: controls.chatflow_id.value,
      });
    }
  };

  const onChangeSelect = (e) => {
    setControls({ [e.target.id]: { value: e.target.value } });
  };

  useEffect(() => {
    setControls({ chatflow_id: { options: chatflowOptions } });
  }, [chatflowOptions]);

  useEffect(() => {
    if (!status) {
      onClear();
    }
  }, [status]);

  useEffect(() => {
    // console.log(record);
    (async () => {
      if (record) {
        try {
          const response = await ConnectionService.getConnectionDetails(
            record.id
          );
          const data = response.data;
          const connection_chatflows = response.data.connection_chatflows.map(
            (item) => ({
              chatflow_id: item.chatflow_id,
              trigger_id: item.trigger_id,
            })
          );
          reset({
            name: data.name,
            description: data.description,
            connection_chatflows: connection_chatflows,
          });
        } catch (e) {}
      }
    })();
  }, [record]);

  useEffect(() => {
    setControls({ trigger_id: { options: triggerOptions } });
  }, [triggerOptions]);

  return (
    <form
      className="w-full  flex flex-wrap my-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-ful sm:w-full px-2">
        <Input label={t("connection-name")} {...register("name")} />
      </div>
      <div className="w-full  px-2">
        <Input label={t("details")} {...register("description")} />
      </div>
      <div className="basis-5/12 sm:w-full  px-2">
        <SelectBox
          options={controls.trigger_id.options}
          label={t("trigger")}
          onChange={onChangeSelect}
          id="trigger_id"
        />
      </div>
      <div className="basis-5/12 sm:w-full  px-2">
        <SelectBox
          options={controls.chatflow_id.options}
          label={t("chatflows")}
          id="chatflow_id"
          onChange={onChangeSelect}
        />
      </div>
      <div className="basis-2/12 sm:w-full  px-2 flex">
        <button
          type="button"
          onClick={onAddToList}
          className="secondary icon-only mt-auto rtl:mr-auto ltr:ml-auto"
        >
          <PlusIcon />
        </button>
      </div>
      {fields.map((item, index) => {
        return (
          <div className="border-box flex flex-wrap w-full mt-5" key={item.id}>
            <div className="basis-5/12 sm:w-full  px-3 rtl:text-right flex">
              <span className="my-auto">
                {
                  controls.trigger_id.options.find(
                    (x) => x.id === item.trigger_id
                  )?.persian_name
                }
              </span>
              <input
                className="hidden"
                {...register(`connection_chatflows.${index}.trigger_id`)}
                disabled
              />
            </div>
            <div className="basis-5/12 sm:w-full  px-3 rtl:text-right flex">
              <span className="my-auto">
                {
                  controls.chatflow_id.options.find(
                    (x) => x.id === item.chatflow_id
                  )?.name
                }
              </span>
              <input
                className="hidden"
                {...register(`connection_chatflows.${index}.chatflow_id`)}
                disabled
              />
            </div>
            <div className="basis-2/12 sm:w-full  px-2 flex">
              <button
                type="button"
                onClick={() => remove(index)}
                className=" px-4 mt-auto rtl:mr-auto ltr:ml-auto icon-only"
              >
                <CrossIcon />
              </button>
            </div>
          </div>
        );
      })}
      <button ref={submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default AddNewConnectionForm;