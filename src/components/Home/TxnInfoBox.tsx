import tableData from '../../utils/tableDummy';
const TxnInfoBox = () => {
  const completedTxns = tableData.filter((data) => {
    return data.transactionStatus === 'completed';
  });

  const pendingTxns = tableData.filter((data) => {
    return data.transactionStatus === 'pending';
  });

  return (
    <aside className="w-[50%] rounded-lg py-6 px-4 flex flex-col gap-2 text-white bg-black font-bold lg:w-[45%]">
      <h2 className="text-[12px] font-semibold lg:text-base">
        {' '}
        No. of Transations: {tableData.length}
      </h2>
      <p className="lg:text-xl"> Completed: {completedTxns.length} </p>
      <p className="lg:text-xl"> Pending: {pendingTxns.length} </p>
    </aside>
  );
};

export default TxnInfoBox;
