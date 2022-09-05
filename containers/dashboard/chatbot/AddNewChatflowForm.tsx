import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ChatflowService from "../../../services/endpoints/ChatflowService";

type AddNewConnectionProps = {};
type FormData = {
  name: "string";
};

const AddNewChatflowForm: React.FC<AddNewConnectionProps> = ({
  submitRef,
  onSuccess,
  status,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  let { t } = useTranslation("common");

  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
        is_active: true,
      };
      const response = await ChatflowService.postCreateChatflow(data);
      onSuccess(response.data.id);
    } catch (e) {}
  };

  const onClear = () => {
    reset({
      name: "",
    });
  };

  useEffect(() => {
    if (!status) {
      onClear();
    }
  }, [status]);

  return (
    <form
      className="w-full  flex flex-wrap my-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full px-2">
        <Input label={t("chatflow-name")} {...register("name")} />
      </div>
      <button ref={submitRef} type="submit" style={{ display: "none !important" }} />
    </form>
  );
};

export default AddNewChatflowForm;
