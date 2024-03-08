import { Button, Flex, Input, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useCustomers } from "../../../hooks/customers/useCustomers";
import { useAuth } from "../../../context/AuthContext";
import { Customer } from "../../../types";
import { GrUserManager } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AddCustomer } from "./AddCustomer";

interface DataType {
  id: number;
  name: string;
  contact_number: string;
  email: string;
  loyalty_points: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.length - b.email.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Loyalty-points",
    dataIndex: "loyalty_points",
    key: "loyalty_points",
    sorter: (a, b) => a.loyalty_points - b.loyalty_points,
    sortDirections: ["descend", "ascend"],
  },
];

interface Props {
  selectedCustomer: Customer | undefined;
  setSelectedCustomer: (value: any) => void;
}

export const CustomerSelect = ({
  selectedCustomer,
  setSelectedCustomer,
}: Props) => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: customers } = useCustomers(token || "");

  const searchedCustomers =
    customers?.filter((customer: Customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || customers;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setSelectedCustomer(undefined);
    setIsModalOpen(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
      const customer = customers.find(
        (item: Customer) => item.id === selectedRowKeys[0]
      );
      if (customer) {
        setSelectedCustomer(customer);
      }
    },
  };
  return (
    <>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
        }}
        type="primary"
        icon={<GrUserManager />}
        onClick={showModal}
      >
        {selectedCustomer ? selectedCustomer.name : "Customer"}
      </Button>
      <Modal
        width={"100%"}
        style={{ maxWidth: 800 }}
        closable={false}
        centered
        title={
          <Flex justify="space-between" align="center">
            <AddCustomer
              setSelectedCustomer={setSelectedCustomer}
              setSelectedRowKeys={setSelectedRowKeys}
            />
            <Input
              allowClear
              prefix={<FiSearch />}
              style={{ flex: 1, maxWidth: 200 }}
              placeholder="Search customers..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Flex>
        }
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            unselect
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Flex vertical style={{ minHeight: "60vh" }}>
          <Table
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={searchedCustomers}
            rowKey={"id"}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </Flex>
      </Modal>
    </>
  );
};
