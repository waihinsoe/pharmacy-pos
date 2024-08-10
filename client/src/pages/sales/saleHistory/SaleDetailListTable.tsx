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
  useDeleteCategory,
  useDeleteManyCategory,
} from "../../../hooks/categories/useCategories";
import { useAuth } from "../../../context/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSaleDetail, useSales } from "../../../hooks/sales/useSales";
import { DatePicker } from "antd";
import type { DatePickerProps, GetProps } from "antd";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

type InputRef = GetRef<typeof Input>;
// id         Int      @id @default(autoincrement())
// sale_id    Int
// product_id Int
// quantity   Int
// price      Int

interface DataType {
  id: number;
  sale_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

type DataIndex = keyof DataType;

export const SaleDetailListTable = () => {
  const { saleId } = useParams();
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
  const { data: saleDetail } = useSaleDetail(Number(saleId), token || "");
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
        //@ts-ignore
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
      title: "Sale_id",
      dataIndex: "sale_id",
      key: "sale_id",
      // sorter: (a, b) => a.user_id - b.user_id,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Product_Name",
      dataIndex: "product_name",
      key: "product_name",
      // sorter: (a, b) => a.customer_id - b.customer_id,
      // sortDirections: ["descend", "ascend"],
    },

    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total_Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
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
        dataSource={saleDetail}
        rowKey={"id"}
        scroll={{ y: 450 }}
        pagination={{ pageSize: 40 }}
        // pagination={{ current: page, pageSize: limit, total: data.total }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
