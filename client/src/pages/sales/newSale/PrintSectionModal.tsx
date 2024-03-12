import { Button, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { ReceiptDataType } from "../../../types/saleTypes";
import Receipt from "../../../components/printer/Receipt";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

interface Props {
  receiptData: ReceiptDataType;
  isPrintSectionModalOpen: boolean;
  setIsPrintSectionModalOpen: (value: boolean) => void;
  setSelectedProducts: (value: any) => void;
}

export const PrintSectionModal = ({
  isPrintSectionModalOpen,
  setIsPrintSectionModalOpen,
  receiptData,
  setSelectedProducts,
}: Props) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const handlePrintSectionCancel = () => {
    setIsPrintSectionModalOpen(false);
  };

  return (
    <Modal
      closable={false}
      title={<Title level={4}>Invoice Summary</Title>}
      open={isPrintSectionModalOpen}
      footer={[
        <Button key="back" onClick={handlePrintSectionCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Receipt ref={receiptRef} receiptData={receiptData} />
      <ReactToPrint
        trigger={() => <Button>Print Receipt</Button>}
        content={() => receiptRef.current}
        onAfterPrint={() => {
          setSelectedProducts([]);
          setIsPrintSectionModalOpen(false);
        }}
      />
    </Modal>
  );
};
