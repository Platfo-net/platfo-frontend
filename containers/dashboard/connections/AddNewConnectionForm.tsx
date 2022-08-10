import Input from "components/Input/Input";
import SelectBox from "components/SelectBox/SelectBox";
import useTranslation from "next-translate/useTranslation";

type AddNewConnectionProps = {};

const AddNewConnectionForm: React.FC<AddNewConnectionProps> = ({
  triggerOptions,
  chatflowsOptions,
}) => {
  let { t } = useTranslation("common");

  return (
    <form className="w-full  flex flex-wrap">
      <div className="m-5 w-full rtl:text-right ltr:text-left">
        <strong>{t("application-name")} : Bot Builder </strong>
      </div>
      <div className="basis-1/3 sm:w-full px-2">
        <Input label={t("connection-name")} id="name" />
      </div>
      <div className="basis-2/3 sm:w-full  px-2">
        <Input label={t("details")} id="description" />
      </div>
      <div className="basis-1/2 sm:w-full  px-2">
        <SelectBox
          options={triggerOptions}
          label={t("trigger")}
          id="trigger_id"
        />
      </div>
      <div className="basis-1/2 sm:w-full  px-2">
        <SelectBox
          options={triggerOptions}
          label={t("chatflows")}
          id="chatflow_id"
        />
      </div>
    </form>
  );
};

export default AddNewConnectionForm;
