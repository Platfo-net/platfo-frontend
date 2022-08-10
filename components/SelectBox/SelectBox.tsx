import useTranslation from "next-translate/useTranslation";

type SelectBoxProps = {};

const SelectBox: React.FC<SelectBoxProps> = ({
  className,
  label,
  options,
  id,
  ...props
}) => {
  let { t } = useTranslation("common");

  return (
    <div className={`select-box w-full  ${className}`}>
      <label className="block  tracking-wide text-xs rtl:text-right ltr:text-left ">
        {label}
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full"
          id="grid-state"
          placeholder={t("select-trigger")}
          {...props}
        >
          {options.map((item) => {
            return <option key={item.id}>{item.label}</option>;
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
