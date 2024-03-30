import { Flex } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useMonthlySalesReport } from "../../../hooks/salesReport/useSaleReport";
import { ReportDateQuery } from "../../../types";
import { Area, Column, Rose } from "@ant-design/plots";
interface Props {
  chart: string;
  query: ReportDateQuery;
}

export const MonthlyReport = ({ query, chart }: Props) => {
  const { token } = useAuth();

  const { data, isLoading } = useMonthlySalesReport(token || "", query);

  if (isLoading) return <div>loading ...</div>;
  const areaConfig = {
    data,
    xField: "month",
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
    xField: "month",
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
    xField: "month",
    yField: "total_amount",
    colorField: "month",
    // transform: [{ type: "groupX", y: "sum" }],
    scale: { y: { type: "sqrt" }, x: { padding: 0 } },
    axis: false,
    legend: { color: { length: 400, layout: { justifyContent: "center" } } },
    labels: [
      {
        text: "total_amount",
        position: "outside",
        formatter: "~s",
        transform: [{ type: "overlapDodgeY" }],
      },
    ],
    tooltip: { items: [{ channel: "y", valueFormatter: "~s" }] },
  };
  return (
    <div>
      {chart === "Area" && <Area {...areaConfig} />}

      {chart == "Column" && <Column {...columnConfig} />}

      <Flex justify="center">
        {chart == "Rose" && <Rose {...roseConfig} />}
      </Flex>
    </div>
  );
};
