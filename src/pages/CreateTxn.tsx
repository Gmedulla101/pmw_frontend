import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalUserContext } from '../context/UserContext';
import { API } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const CreateTxn = () => {
  const { userToken } = useGlobalUserContext();
  const navigate = useNavigate();

  const [txnDetails, setTxnDetails] = useState({
    userRole: '',
    txnItem: '',
    txnItemCategory: '',
    txnItemValue: '',
    txnItemDescription: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setTxnDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API}/txn/create-transaction`,
        txnDetails,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success('Transaction created!');
      setTimeout(() => {
        navigate(`/transactions/${response.data.transaction.id}`);
      }, 3000);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main className="p-5 md:p-10">
      <ToastContainer />
      <h1 className="text-center text-2xl font-bold mt-5">
        Create a new Transaction
      </h1>

      <section
        onChange={handleChange}
        className="mt-5 mx-auto flex flex-col gap-5 lg:w-[70%]"
      >
        <div className="flex flex-col">
          <label htmlFor="userRole">
            What role are you playing in this transaction?
          </label>
          <select
            name="userRole"
            id="userRole"
            className="shadow border border-gray-200 px-2 py-4 rounded-lg"
          >
            <option value="default"> Select user role </option>
            <option value="buyer"> The buyer</option>
            <option value="seller"> The seller</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="txnItem"> Transaction item: </label>
          <input
            className="border border-gray-200 px-2 py-4 rounded-lg"
            type="text"
            id="txnItem"
            name="txnItem"
            placeholder="e.g. Hp Elitebook 840 g5"
            value={txnDetails.txnItem}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="txnItemCategory"> Item category </label>
          <select
            onChange={handleChange}
            name="txnItemCategory"
            id="txnItemCategory"
            className="shadow border border-gray-200 px-2 py-4 rounded-lg"
          >
            <option value="default"> Select item category </option>
            <option value="personal computer"> Personal computer </option>
            <option value="mobile phone"> Mobile phone </option>
            <option value="men's wear"> Men's wear </option>
            <option value="women's wear"> Women's wear </option>
            <option value="kid's wear"> Kid's wear</option>
            <option value="jewelry"> Jewelry </option>
            <option value="automobile"> Automobile </option>
            <option value="handy tools"> Handy tools </option>
            <option value="electronics"> Electronics </option>
            <option value="computer accessories"> Computer accessories </option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="txnItemValue"> Item value: </label>
          <input
            className="border border-gray-200 px-2 py-4 rounded-lg"
            type="number"
            id="txnItemValue"
            name="txnItemValue"
            placeholder="e.g 300,000"
            value={txnDetails.txnItemValue}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="txnItem"> Item description: </label>
          <textarea
            className="border border-gray-200 px-2 py-4 rounded-lg resize-none h-36"
            id="txnItemDescription"
            name="txnItemDescription"
            placeholder="e.g. Hp Elitebook 840 g5"
            value={txnDetails.txnItemDescription}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Create transaction
          </button>
        </div>
      </section>
    </main>
  );
};

export default CreateTxn;
