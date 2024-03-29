import { useQuery } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { saleReportService } from "../../services/api/saleReprotService";

export const useSaleDailyReports = (accessToken: string) => {
  return useQuery(queryKeys.dailySalesReport("2024-03-15"), () =>
    saleReportService.getDailyReport(accessToken)
  );
};
