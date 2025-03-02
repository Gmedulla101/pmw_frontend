const TxnInfoBox = () => {
  return (
    <aside className="w-[50%] rounded-lg py-6 px-4 flex flex-col gap-2 text-white bg-black font-bold lg:w-[40%]">
      <h2 className="text-[12px] font-semibold lg:text-base">
        {' '}
        No. of Transations:{' '}
      </h2>
      <p className="lg:text-xl"> Completed: 2 </p>
      <p className="lg:text-xl"> Pending: 20 </p>
    </aside>
  );
};

export default TxnInfoBox;
