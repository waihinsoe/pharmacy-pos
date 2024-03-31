import { useQuery } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { inventoryReportService } from "../../services/api/inventoryReportService";
import { ReportDateQuery } from "../../types";

export const useCategoriesReport = (
  accessToken: string,
  query: ReportDateQuery
) => {
  return useQuery(queryKeys.categoriesReport(query), () =>
    inventoryReportService.getCategoriesReport(accessToken, query)
  );
};
