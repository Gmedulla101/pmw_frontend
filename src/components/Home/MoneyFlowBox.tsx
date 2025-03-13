import tableData from '../../utils/tableDummy';

const MoneyFlowBox = () => {
  const completedTxns = tableData.filter((data) => {
    return data.transactionStatus === 'completed';
  });

  const completedAsBuyer = completedTxns.filter((data) => {
    return data.userStatus === 'buyer';
  });

  const completedAsSeller = completedTxns.filter((data) => {
    return data.userStatus === 'seller';
  });

  let totalTxns = 0;
  let totalSellerTxns = 0;
  let totalBuyerTxns = 0;

  for (let i = 0; i < completedTxns.length; i++) {
    totalTxns = totalTxns + completedTxns[i]?.transactionValue;
  }
  for (let i = 0; i < completedAsBuyer.length; i++) {
    totalBuyerTxns = totalBuyerTxns + completedAsBuyer[i]?.transactionValue;
  }
  for (let i = 0; i < completedAsSeller.length; i++) {
    totalSellerTxns = totalSellerTxns + completedAsSeller[i]?.transactionValue;
  }

  return (
    <aside className="w-[50%] rounded-lg py-6 px-4 flex flex-col gap-2 text-white bg-black font-bold lg:w-[45%]">
      <h2 className="text-[12px] font-semibold lg:text-base">
        {' '}
        Total: ${totalTxns}
      </h2>
      <p className="lg:text-xl"> Sold: ${totalSellerTxns} </p>
      <p className="lg:text-xl"> Bought: ${totalBuyerTxns} </p>
    </aside>
  );
};

export default MoneyFlowBox;
