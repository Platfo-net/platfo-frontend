/* eslint-disable react/display-name */
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";

type SelectBoxProps = {};

const SelectBox: React.FC<SelectBoxProps> = forwardRef<HTMLButtonElement>(
  (
    {
      defaultValue = "select",
      className,
      label,
      options,
      id,
      labelKey = "name",
      valueKey = "id",
      ...rest
    },
    ref
  ) => {
    let { t } = useTranslation("common");

    const onChange = (e) => {
      console.log(e);
    };
    return (
      <div className={`select-box w-full  ${className}`}>
        <label className="block  tracking-wide text-xs rtl:text-right ltr:text-left ">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            defaultValue={{ value: "undefined" }}
            className="block appearance-none w-full"
            id={id}
            {...rest}
          >
            <option value={"undefined"}>{t("select-something")}</option>
            {options.map((item) => {
              return (
                <option key={item[valueKey]} value={item[valueKey]}>
                  {t(item[labelKey])}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

export default SelectBox;
