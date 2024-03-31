import { DatePicker, Flex, Segmented, Select } from "antd";
import { useState } from "react";
import { FaChartArea, FaChartBar, FaChartPie } from "react-icons/fa";
import moment from "moment";
import { CategoriesReport } from "./CategoriesReport";
import { ProductsReport } from "./ProductsReport";

const { RangePicker } = DatePicker;

export const InventoryReport = () => {
  const [option, setOption] = useState("categories");
  const [chart, setChart] = useState("Area");
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });

  const disabledDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };
  return (
    <Flex vertical gap={20}>
      <Flex gap={20}>
        <Select
          defaultValue={option}
          style={{ width: 120 }}
          onChange={(value) => setOption(value)}
          options={[
            { value: "categories", label: "Categories" },
            { value: "products", label: "Products" },
          ]}
        />
        <Segmented
          onChange={(value) => setChart(value)}
          defaultValue={chart}
          options={[
            { value: "Area", icon: <FaChartArea /> },
            { value: "Column", icon: <FaChartBar /> },
            { value: "Rose", icon: <FaChartPie /> },
          ]}
        />
        <Flex flex={1} justify="end">
          <RangePicker disabledDate={disabledDate} picker="year" />
        </Flex>
      </Flex>
      {option === "categories" && (
        <CategoriesReport chart={chart} query={query} />
      )}
      {option === "products" && <ProductsReport />}
    </Flex>
  );
};
