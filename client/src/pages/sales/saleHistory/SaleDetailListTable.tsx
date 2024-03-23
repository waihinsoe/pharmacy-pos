import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type {
  FilterDropdownProps,
  TableRowSelection,
} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {
  useCategories,
  useDeleteCategory,
  useDeleteManyCategory,
} from "../../../hooks/categories/useCategories";
import { useAuth } from "../../../context/AuthContext";
import { PaginationAndSearchQuery } from "../../../types";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSales } from "../../../hooks/sales/useSales";
import { DatePicker } from "antd";
import type { DatePickerProps, GetProps } from "antd";
import { useCustomer } from "../../../hooks/customers/useCustomers";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;
// id             Int            @id @default(autoincrement())
// customer_id    Int?
// user_id        Int
// sale_date      DateTime       @default(now())
// total_amount   Int
// payment_method Payment        @default(CASH)
type InputRef = GetRef<typeof Input>;

interface DataType {
  id: number;
  customer_name: number;
  seller_name: number;
  total_amount: number;
  payment_method: string;
  sale_date: Date;
}

type DataIndex = keyof DataType;

export const SaleDetailListTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const searchInput = useRef<InputRef>(null);
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: deleteManyCategory } = useDeleteManyCategory();
  const { token } = useAuth();

  // const query: PaginationAndSearchQuery = {
  //   page,
  //   limit,
  //   searchTerm: searchText,
  // };
  const { data, isLoading } = useSales(token || "");
  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const handleDelete = (key: React.Key) => {
    if (key) {
      deleteCategory({ id: Number(key), accessToken: token || "" });
    }
  };

  const handleDeleteMany = () => {
    if (selectedRowKeys) {
      const ids = selectedRowKeys as number[];
      deleteManyCategory({ ids, accessToken: token || "" });
      setSelectedRowKeys([]);
    }
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Seller_name",
      dataIndex: "seller_name",
      key: "seller_name",
      // sorter: (a, b) => a.user_id - b.user_id,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Customer_name",
      dataIndex: "customer_name",
      key: "customer_name",
      // sorter: (a, b) => a.customer_id - b.customer_id,
      // sortDirections: ["descend", "ascend"],
    },

    {
      title: "Total_Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Payment_Method",
      dataIndex: "payment_method",
      key: "payment_method",
      sorter: (a, b) => a.payment_method.length - b.payment_method.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sale_Date",
      dataIndex: "sale_date",
      key: "sale_date",
      render: (sale_date) => {
        return (
          <div>
            {dayjs(sale_date).format("HH:mm:ss / DD-MM-YYYY").toString()}
          </div>
        );
      },
      sorter: (a, b) => dayjs(a.sale_date).unix() - dayjs(b.sale_date).unix(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record: { id: React.Key }) =>
        data.length >= 1 ? (
          <Flex gap={16}>
            <Link to={`details/${record.id}`}>details</Link>
          </Flex>
        ) : null,
    },
  ];

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };

  if (isLoading) return <div>...loading</div>;
  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        {selectedRowKeys.length ? (
          <Flex gap={16}>
            <Popconfirm title="Sure to delete?" onConfirm={handleDeleteMany}>
              <Button
                type="default"
                danger
                icon={<FaRegTrashAlt />}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                delete
              </Button>
            </Popconfirm>
            <Button
              onClick={handleCancel}
              type="default"
              icon={<MdCancelPresentation />}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              cancel
            </Button>
          </Flex>
        ) : (
          <div></div>
        )}
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          onOk={onOk}
        />
      </Flex>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        scroll={{ y: 450 }}
        pagination={{ pageSize: 40 }}
        // pagination={{ current: page, pageSize: limit, total: data.total }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
