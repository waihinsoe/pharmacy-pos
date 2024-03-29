import { Area, Column, Rose } from "@ant-design/plots";
import { useSaleDailyReports } from "../../hooks/salesReports/useSaleReports";
import { useAuth } from "../../context/AuthContext";
import { Flex, Segmented, Select } from "antd";
import { FaChartArea } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { useState } from "react";
import { FaChartPie } from "react-icons/fa6";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
export const SalesReport = () => {
  const [chart, setChart] = useState("Area");
  const [timePeriod, setTimePeriod] = useState("Daily");
  const { token } = useAuth();
  const { data, isLoading } = useSaleDailyReports(token || "");

  const handleChange = (value: string) => {
    setTimePeriod(value);
  };

  if (isLoading) return <div>loading...</div>;
  const areaConfig = {
    data,
    xField: "sale_date",
    yField: "total_amount",
    smooth: true,
    point: {
      size: 5,
      shape: "diamond",
    },
    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };

  const columnConfig = {
    data,
    xField: "sale_date",
    yField: "total_amount",
    style: {
      fill: "darkgreen",
    },

    legend: false,
  };

  const roseConfig = {
    width: 720,
    height: 720,
    autoFit: false,
    radius: 0.85,
    data,
    xField: "sale_date",
    yField: "total_amount",
    colorField: "sale_date",
    // transform: [{ type: "groupX", y: "sum" }],
    scale: { y: { type: "sqrt" }, x: { padding: 0 } },
    axis: false,
    legend: { color: { length: 400, layout: { justifyContent: "center" } } },
    labels: [
      {
        text: "people",
        position: "outside",
        formatter: "~s",
        transform: [{ type: "overlapDodgeY" }],
      },
    ],
    tooltip: { items: [{ channel: "y", valueFormatter: "~s" }] },
  };

  const disabledDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };
  return (
    <Flex vertical gap={20}>
      <Flex gap={20}>
        <Select
          defaultValue={timePeriod}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "Daily", label: "Daily" },
            { value: "Monthly", label: "Monthly" },
            { value: "Yearly", label: "Yearly" },
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
          <RangePicker disabledDate={disabledDate} picker="month" />
        </Flex>
      </Flex>

      {chart === "Area" && <Area {...areaConfig} />}

      {chart == "Column" && <Column {...columnConfig} />}
      <Flex justify="center">
        {chart == "Rose" && <Rose {...roseConfig} />}
      </Flex>
    </Flex>
  );
};
