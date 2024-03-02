import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type {
  FilterDropdownProps,
  TableRowSelection,
} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import { useAuth } from "../../context/AuthContext";
import { PaginationAndSearchQuery } from "../../types";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import {
  useDeleteManyProduct,
  useDeleteProduct,
  useProducts,
} from "../../hooks/products/useProducts";

type InputRef = GetRef<typeof Input>;

interface DataType {
  id: number;
  name: string;
  category_id: number;
  supplier_id: number;
  description: string;
  price: number;
  quantity: number;
  expriy_date: Dayjs;
}

type DataIndex = keyof DataType;

export const ProductListTable = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const searchInput = useRef<InputRef>(null);

  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: deleteManyProduct } = useDeleteManyProduct();

  const query: PaginationAndSearchQuery = {
    page,
    limit,
    searchTerm: searchText,
  };
  const { data, isLoading } = useProducts(token || "", query);
  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const handleDelete = (key: React.Key) => {
    if (key) {
      deleteProduct({ id: Number(key), accessToken: token || "" });
    }
  };

  const handleDeleteMany = () => {
    if (selectedRowKeys) {
      const ids = selectedRowKeys as number[];
      deleteManyProduct({ ids, accessToken: token || "" });
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Category_Id",
      dataIndex: "category_id",
      key: "category_id",
      ...getColumnSearchProps("category_id"),
      sorter: (a, b) => a.category_id - b.category_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Supplier_Id",
      dataIndex: "supplier_id",
      key: "supplier_id",
      ...getColumnSearchProps("supplier_id"),
      sorter: (a, b) => a.supplier_id - b.supplier_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Expriy_Date",
      dataIndex: "expriy_date",
      key: "expriy_date",
      ...getColumnSearchProps("expriy_date"),
      sorter: (a, b) =>
        dayjs(a.expriy_date).unix() - dayjs(b.expriy_date).unix(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record: { id: React.Key }) =>
        data.data.length >= 1 ? (
          <Flex gap={16}>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
            <Link to={`edit/${record.id}`}>Edit</Link>
          </Flex>
        ) : null,
    },
  ];

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
        <Button
          onClick={() => {
            navigate("create");
          }}
          type="primary"
          icon={<FaPlus />}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          create product
        </Button>
      </Flex>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={data.data}
        rowKey={"id"}
        pagination={{ current: page, pageSize: limit, total: data.total }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
