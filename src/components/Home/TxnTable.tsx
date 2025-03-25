//IMPORTING HOOKS
import { useGlobalUserContext } from '../../context/UserContext';
import useFetchHomeData from '../../hooks/useFetchHomeData';
import { TableData } from '../../hooks/useFetchHomeData';

//IMPORTING HELPER COMPONENTS
import LoaderComponent from '../LoaderComponent';

const TxnTable = ({ tableData }: { tableData: TableData[] }) => {
  const { isLoading } = useFetchHomeData();
  const { userData } = useGlobalUserContext();

  return (
    <>
      {tableData.length < 1 ? (
        <h1 className="text-center font-semibold text-xl md:text-2xl">
          You haven't created any transactions{' '}
        </h1>
      ) : (
        <section className="overflow-x-scroll rounded-t-2xl">
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <table className="w-[700px]">
                <thead className="block w-full bg-black py-3 px-3 text-white font-bold">
                  <tr className="text-[14px] flex flex-row justify-between w-full ">
                    <td className="w-full text-center"> Seller </td>
                    <td className="w-full text-center"> Buyer </td>
                    <td className="w-full text-center"> Transaction Status </td>
                    <td className="w-full text-center"> Item </td>
                    <td className="w-full text-center"> Transation Value </td>
                  </tr>
                </thead>
                <tbody className="w-full bg-gray-200 py-3 px-3 rounded-b-lg">
                  {tableData?.map((data: any, i) => {
                    return (
                      <tr
                        key={i}
                        className="text-[14px] flex flex-row justify-between w-full py-3 px-3"
                      >
                        <td className="w-full text-center">
                          {data?.seller?.firstName
                            ? data.seller.firstName
                            : 'TBI'}
                          <span className="font-bold">
                            {data?.seller?.firstName === userData.firstName
                              ? ' (You)'
                              : ''}
                          </span>
                        </td>
                        <td className="w-full text-center">
                          {data?.buyer?.firstName
                            ? data.buyer.firstName
                            : 'TBI'}
                          <span className="font-bold">
                            {data?.buyer?.firstName === userData.firstName
                              ? ' (You)'
                              : ''}
                          </span>
                        </td>
                        <td className="w-full text-center"> {data.status} </td>
                        <td className="w-full text-center"> {data.txnItem} </td>
                        <td className="w-full text-center">
                          {' '}
                          {data.txnItemValue.toLocaleString()}{' '}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default TxnTable;
