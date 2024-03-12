// Receipt.tsx
import { Divider, Flex, Typography } from "antd";
import { forwardRef } from "react";
import { ReceiptDataType } from "../../types/saleTypes";
import { useAuth } from "../../context/AuthContext";
import { calculateTotalAmount } from "../../utils";
import dayjs from "dayjs";
interface ReceiptProps {
  receiptData: ReceiptDataType;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ receiptData }, ref) => {
    const { user } = useAuth();
    return (
      <Flex
        ref={ref}
        vertical
        style={{ padding: "20px 40px", fontWeight: 600 }}
      >
        <Flex vertical align="center">
          <Typography>{user?.email}</Typography>
          <Divider
            dashed
            style={{
              margin: "5px 0",
              borderTop: "1px dashed #9f9f9f",
            }}
          />
          <Typography>Served by {user?.name}</Typography>
        </Flex>
        <Flex vertical style={{ marginTop: "16px" }} gap={8}>
          {receiptData.selectedProducts.map((product) => {
            return (
              <Flex justify="space-between" align="end">
                <Flex vertical>
                  <Typography>{product.name}</Typography>
                  <Typography>
                    {product.count} * {product.price} K
                  </Typography>
                </Flex>
                <Typography>{product.count * product.price} K</Typography>
              </Flex>
            );
          })}
          <Divider
            dashed
            style={{ margin: "5px 0", borderTop: "1px dashed " }}
          />
          <Flex justify="space-between">
            <Typography style={{ flex: 1, textAlign: "center" }}>
              TOTAL
            </Typography>
            <Typography>
              {calculateTotalAmount(receiptData.selectedProducts)} K
            </Typography>
          </Flex>

          <Flex vertical align="center" style={{ marginTop: 30 }}>
            <Typography>Pharmacy POS</Typography>
            <Typography>Order No. {receiptData.sale_id}</Typography>
            <Typography>{dayjs().toString()}</Typography>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

export default Receipt;
