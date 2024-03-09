// Receipt.tsx
import { Divider, Flex, Typography } from "antd";
import { forwardRef } from "react";
import { ReceiptDataType } from "../../types/saleTypes";
import { useAuth } from "../../context/AuthContext";
import { calculateTotalAmount } from "../../utils";
interface ReceiptProps {
  receiptData: ReceiptDataType;
}
const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ receiptData }, ref) => {
    const { user } = useAuth();
    return (
      <Flex ref={ref} vertical style={{ padding: 20 }}>
        <Flex vertical align="center">
          <Typography>{user?.email}</Typography>
          <Divider dashed style={{ margin: "5px 0" }} />
          <Typography>Served by {user?.name}</Typography>
          <Typography style={{ fontSize: 20 }}>
            {receiptData.sale_id}
          </Typography>
        </Flex>
        <Flex vertical style={{ marginTop: "16px" }} gap={8}>
          {receiptData.selectedProducts.map((product) => {
            return (
              <Flex justify="space-between" align="end">
                <Flex vertical>
                  <Typography>{product.name}</Typography>
                  <Typography>
                    {product.count} * {product.price}
                  </Typography>
                </Flex>
                <Typography>{product.count * product.price}</Typography>
              </Flex>
            );
          })}
          <Typography style={{ alignSelf: "end" }}>-------</Typography>
          <Flex justify="space-between">
            <Typography style={{ flex: 1, textAlign: "center" }}>
              TOTAL
            </Typography>
            <Typography>
              {calculateTotalAmount(receiptData.selectedProducts)}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

export default Receipt;
