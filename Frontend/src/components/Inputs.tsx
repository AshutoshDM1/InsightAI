import css from "../style/deshboard.module.css";
interface inputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  placeholder: string;
  value: string;
}

const Input: React.FC<inputProps> = ({
  onChange,
  type,
  name,
  value,
  placeholder,
  onKeyDown,
}: inputProps) => {
  return (
    <input
      onChange={onChange}
      name={name}
      className={`${css.mainInput} w-full xl:w-60w py-4 pl-8 rounded-full border-none text-white focus:border focus:outline-none text-lg   font-medium  `}
      type={type}
      placeholder={placeholder}
      value={value}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
