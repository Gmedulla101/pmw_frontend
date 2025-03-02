import tableData from '../../utils/tableDummy';
const TxnTable = () => {
  return (
    <table className="w-full">
      <thead className="block w-full bg-black py-3 px-3 rounded-t-lg text-white font-bold">
        <tr className="text-[14px] flex flex-row justify-between w-full ">
          <td className="w-full text-center"> Partner Name </td>
          <td className="w-full text-center"> Users Status </td>
          <td className="w-full text-center"> Transaction Status </td>
          <td className="w-full text-center"> Item </td>
          <td className="w-full text-center"> Transation Value </td>
        </tr>
      </thead>
      <tbody className="w-full bg-gray-200 py-3 px-3 rounded-b-lg">
        {tableData.map((data, i) => {
          return (
            <tr
              key={i}
              className="text-[14px] flex flex-row justify-between w-full py-3 px-3"
            >
              <td className="w-full text-center"> {data.partnerName} </td>
              <td className="w-full text-center"> {data.userStatus} </td>
              <td className="w-full text-center"> {data.transactionStatus} </td>
              <td className="w-full text-center"> {data.itemName} </td>
              <td className="w-full text-center"> {data.transactionValue} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TxnTable;
