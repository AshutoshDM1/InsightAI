import css from "../style/deshboard.module.css";
interface inputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const Input: React.FC<inputProps> = ({
  onChange,
  type,
  name,
  value,
  placeholder,
  onKeyDown,
  onSubmit,
}: inputProps) => {
  return (
    <div className="w-full  flex items-center justify-center">
      <div className="w-full rounded-full pr-2 md:w-[60%] flex items-center justify-center gap-2 bg-[#1D1D1D]">
        <input
          onChange={onChange}
          name={name}
          className={`${css.mainInput} w-full py-4 pl-8 pr-4 rounded-full border-none text-white focus:border focus:outline-none text-lg   font-medium  `}
          type={type}
          placeholder={placeholder}
          value={value}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={onSubmit}
          type="submit"
          className="px-8 p-2 rounded-full bg-white text-base font-bold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
