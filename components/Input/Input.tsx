type InputProps = {};

const Input: React.FC<InputProps> = ({ className, label, id, ...props }) => {
  return (
    <div className={`input-box w-full px-3 mb-6 md:mb-0 ${className}`}>
      <label className="block tracking-wide  text-xs ">{label}</label>
      <input
        className="appearance-none block w-full mb-3  focus:outline-none"
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
