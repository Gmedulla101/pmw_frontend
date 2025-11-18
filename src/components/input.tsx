import { ChangeEventHandler, useState } from 'react';

//IMPORTING HOOKS
import useUIUtil from '../hooks/useUIUtil';

//IMPORTING COMPONENT IMAGE ASSETS
import visibleDark from '../assets/view-dark.png';
import visibleLight from '../assets/view-light.png';
import hiddenDark from '../assets/hide-dark.png';
import hiddenLight from '../assets/hide-light.png';

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
  const [inputType, setInputType] = useState(type);
  const { isDarkMode } = useUIUtil();

  return (
    <div className="relative flex items-center justify-end">
      <input
        type={inputType}
        className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700 w-full"
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />

      {type === 'password' ? (
        <span
          className="absolute right-[15px]"
          onClick={() => {
            if (inputType === 'text') {
              setInputType('password');
            } else {
              setInputType('text');
            }
          }}
        >
          {' '}
          {isDarkMode ? (
            <img
              src={inputType === 'password' ? hiddenDark : visibleDark}
              alt=""
              className="w-6"
            />
          ) : (
            <img
              src={inputType === 'password' ? hiddenLight : visibleLight}
              alt=""
              className="w-6"
            />
          )}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default Input;
