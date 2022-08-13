type InputProps = {
  id: string;
  label: string;
  className?: string;
  [x: string]: any;
};

const Input: React.FC<InputProps> = ({ className, label, id, ...props }) => {
  return (
    <div className={`input-box w-full  mb-6 md:mb-0 ${className}`}>
      <label className="block tracking-wide text-xs ">{label}</label>
      <input
        className="appearance-none block w-full mb-3 focus:outline-none rtl:text-right ltr:text-left"
        id={id}
        {...props}
      />
      {/* <p className="text-red-500 text-xs italic">
    Please fill out this field.
  </p> */}
    </div>
  );
};

export default Input;
