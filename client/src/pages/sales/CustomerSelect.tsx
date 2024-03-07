import { Button, Flex, Input, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { useCustomers } from "../../hooks/customers/useCustomers";
import { useAuth } from "../../context/AuthContext";

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

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export const CustomerSelect = () => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: customers, isLoading } = useCustomers(token || "");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
        }}
        type="primary"
        icon={<GoPeople />}
        onClick={showModal}
      >
        Customer
      </Button>
      <Modal
        width={"100%"}
        style={{ maxWidth: 800 }}
        closable={false}
        centered
        title={
          <Flex justify="space-between" align="center">
            <Button
              style={{
                display: "flex",

                alignItems: "center",
              }}
              type="primary"
              onClick={showModal}
            >
              Create
            </Button>
            <Input
              allowClear
              prefix={<FiSearch />}
              style={{ flex: 1, maxWidth: 200 }}
              placeholder="Search customers..."
            />
          </Flex>
        }
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      >
        <Flex vertical style={{ height: "60vh" }}>
          <Table
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={customers}
            rowKey={"id"}
            pagination={false}
            scroll={{ y: 800 }}
          />
        </Flex>
      </Modal>
    </>
  );
};
