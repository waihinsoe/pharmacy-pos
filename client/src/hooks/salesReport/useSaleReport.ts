import { useQuery } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { saleReportService } from "../../services/api/saleReprotService";
import { ReportDateQuery } from "../../types";

export const useDailySalesReport = (
  accessToken: string,
  query: ReportDateQuery
) => {
  return useQuery(queryKeys.dailySalesReport(query), () =>
    saleReportService.getDailyReport(accessToken, query)
  );
};

export const useMonthlySalesReport = (
  accessToken: string,
  query: ReportDateQuery
) => {
  return useQuery(queryKeys.monthlySalesReport(query), () =>
    saleReportService.getMonthlyReport(accessToken, query)
  );
};

export const useYearlySalesReport = (
  accessToken: string,
  query: ReportDateQuery
) => {
  return useQuery(queryKeys.yearlySalesReport(query), () =>
    saleReportService.getYearlyReport(accessToken, query)
  );
};
