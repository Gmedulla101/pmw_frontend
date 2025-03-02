const MoneyFlowBox = () => {
  return (
    <aside className="w-[50%] rounded-lg py-6 px-4 flex flex-col gap-2 text-white bg-black font-bold lg:w-[40%]">
      <h2 className="text-[12px] font-semibold lg:text-base">
        {' '}
        Cost of Transactions:{' '}
      </h2>
      <p className="lg:text-xl"> Sold: #2,000,000 </p>
      <p className="lg:text-xl"> Bought: #12,500 </p>
    </aside>
  );
};

export default MoneyFlowBox;
