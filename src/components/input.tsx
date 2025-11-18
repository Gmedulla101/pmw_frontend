import { ChangeEventHandler } from 'react';

const Input = ({
  type,
  value,
  onChange,
  name,
  placeHolder,
}: {
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  placeHolder: string;
}) => {
  return (
    <input
      type={type}
      className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
