import { useParams } from "react-router-dom";
import { SaleDetailListTable } from "./SaleDetailListTable";

export const SaleDetailList = () => {
  const { saleId } = useParams();
  console.log(saleId);
  return (
    <div>
      <SaleDetailListTable />
    </div>
  );
};
