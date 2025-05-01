import { useState, useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { handlePaymentForm } from '../../redux/features/requestPaymentSlice';

const BankOptions = ({ bankData }: { bankData: any }) => {
  const [matchingBanks, setMatchingBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const filterBanks = (filter: string) => {
      let filteredBanks;
      if (!filter) {
        setMatchingBanks([]);
        return;
      }
      filteredBanks = bankData.filter((data: any) => {
        return data?.name?.toLowerCase().startsWith(filter.toLowerCase());
      });
      setMatchingBanks(filteredBanks);
    };

    filterBanks(filter);
  }, [filter]);

  const selectBank = (value: string) => {
    setSelectedBank(value);

    const selectedBankArray = bankData.filter((data: any) => {
      return data.name === value;
    });

    setMatchingBanks([]);
    dispatch(
      handlePaymentForm({
        name: 'bank_code',
        value: selectedBankArray[0]?.code,
      })
    );
    dispatch(handlePaymentForm({ name: 'bank', value }));
    setFilter('');
  };

  return (
    <>
      <input
        onChange={(e: any) => {
          setFilter(e.target.value);
        }}
        type="text"
        value={filter}
        placeholder="Search bank"
        className="border-b-2 border-gray-400 text-center text-lg w-full py-2 outline-none"
      />

      {/* OPTIONS */}
      {matchingBanks.length < 1 ? (
        ''
      ) : (
        <ul className="flex flex-col gap-1 border-2 border-gray-400 text-center text-lg w-full p-2 rounded-lg">
          {matchingBanks.length < 1
            ? ''
            : matchingBanks.map((data: any, i: number) => {
                return (
                  <li
                    key={i}
                    onClick={(e: any) => {
                      selectBank(e.target.innerText);
                    }}
                    value={`${data.name}`}
                    className="hover:bg-gray-500 py-1 cursor-pointer"
                  >
                    {' '}
                    {data.name}{' '}
                  </li>
                );
              })}
        </ul>
      )}

      {!selectedBank ? (
        ''
      ) : (
        <input
          type="text"
          readOnly
          value={selectedBank}
          className="flex flex-col gap-1 border-2 border-gray-400 text-center text-lg w-full p-2 rounded-lg"
        />
      )}
    </>
  );
};

export default BankOptions;
