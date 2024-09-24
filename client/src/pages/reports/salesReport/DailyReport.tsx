import { Flex } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useDailySalesReport } from "../../../hooks/salesReport/useSaleReport";
import { ReportDateQuery } from "../../../types";
import { Area, Column, Rose } from "@ant-design/plots";
import { BsAlignCenter } from "react-icons/bs";
interface Props {
    chart: string;
    query: ReportDateQuery;
}

export const DailyReport = ({ query, chart }: Props) => {
    const { token } = useAuth();

    const { data, isLoading } = useDailySalesReport(token || "", query);

    if (isLoading) return <div>loading ...</div>;
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
        scale: { y: { type: "sqrt" }, x: { padding: 0 } },
        axis: false,
        legend: {
            color: { length: 400, layout: { justifyContent: "center" } },
        },
        tooltip: { items: [{ channel: "y", valueFormatter: "~s" }] },
    };

    return (
        <div>
            {chart === "Area" && <Area {...areaConfig} />}

            {chart == "Column" && <Column {...columnConfig} />}
            <div style={{ display: "grid", placeItems: "center" }}>
                {chart == "Rose" && <Rose {...roseConfig} />}
            </div>
        </div>
    );
};
