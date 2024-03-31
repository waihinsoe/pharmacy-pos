import { DatePickerProps, Flex, Segmented, Select } from "antd";
import { FaChartArea } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { useState } from "react";
import { FaChartPie } from "react-icons/fa6";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { RangePickerProps } from "antd/es/date-picker";
import { DailyReport } from "./DailyReport";
import { MonthlyReport } from "./MonthlyReport";
import { YearlyReport } from "./YearlyReport";

dayjs.extend(customParseFormat);

const dailyStartDate = dayjs().subtract(6, "days");
const dailyEndDate = dayjs(); // Today

const monthlyStartDate = dayjs().subtract(6, "months");
const monthlyEndDate = dayjs(); // Today

const yearlyStartDate = dayjs().subtract(3, "years");
const yearlyEndDate = dayjs(); // Today

// Format dates to 'YYYY-MM-DD' for compatibility with your function
const formatISODate = (date: any) => date.toISOString().split("T")[0];

const { RangePicker } = DatePicker;

export const SalesReport = () => {
  const [chart, setChart] = useState("Area");
  const [timePeriod, setTimePeriod] = useState("Daily");
  const [dailyQuery, setDailyQuery] = useState({
    startDate: formatISODate(dailyStartDate),
    endDate: formatISODate(dailyEndDate),
  });

  const [monthlyQuery, setMonthlyQuery] = useState({
    startDate: formatISODate(monthlyStartDate),
    endDate: formatISODate(monthlyEndDate),
  });

  const [yearlyQuery, setYearlyQuery] = useState({
    startDate: formatISODate(yearlyStartDate),
    endDate: formatISODate(yearlyEndDate),
  });

  const handleChange = (value: string) => {
    setTimePeriod(value);
  };

  const onDailyPickerChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setDailyQuery({ startDate: dateString[0], endDate: dateString[1] });
  };

  const onMonthlyPickerChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setMonthlyQuery({ startDate: dateString[0], endDate: dateString[1] });
  };

  const onYearlyPickerChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setYearlyQuery({ startDate: dateString[0], endDate: dateString[1] });
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
          {timePeriod === "Daily" && (
            <RangePicker
              defaultValue={[
                dayjs(dailyQuery.startDate),
                dayjs(dailyQuery.endDate),
              ]}
              onChange={onDailyPickerChange}
              disabledDate={disabledDate}
            />
          )}

          {timePeriod === "Monthly" && (
            <RangePicker
              defaultValue={[
                dayjs(monthlyQuery.startDate),
                dayjs(monthlyQuery.endDate),
              ]}
              onChange={onMonthlyPickerChange}
              disabledDate={disabledDate}
              picker="month"
            />
          )}

          {timePeriod === "Yearly" && (
            <RangePicker
              defaultValue={[
                dayjs(yearlyQuery.startDate),
                dayjs(yearlyQuery.endDate),
              ]}
              onChange={onYearlyPickerChange}
              disabledDate={disabledDate}
              picker="year"
            />
          )}
        </Flex>
      </Flex>

      {timePeriod === "Daily" && (
        <DailyReport chart={chart} query={dailyQuery} />
      )}

      {timePeriod === "Monthly" && (
        <MonthlyReport chart={chart} query={monthlyQuery} />
      )}

      {timePeriod === "Yearly" && (
        <YearlyReport chart={chart} query={yearlyQuery} />
      )}
    </Flex>
  );
};
