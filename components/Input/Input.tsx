import { forwardRef, ForwardedRef, InputHTMLAttributes, FC } from "react";

type InputProps = {
  label: string;
  className?: string;
};

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> =
  forwardRef(({ className, label, ...rest }, ref) => {
    return (
      <div className={`input-box w-full  mb-6 md:mb-0 ${className}`}>
        <label className="block tracking-wide  text-xs rtl:text-right ltr:text-left">
          {label}
        </label>
        <input
          className="appearance-none block w-full mb-3  focus:outline-none"
          {...rest}
          ref={ref as ForwardedRef<HTMLInputElement>}
        />
        {/* <p className="text-red-500 text-xs italic">
    Please fill out this field.
  </p> */}
      </div>
    );
  });

Input.displayName = "Input";

export default Input;
