import { baseApi } from "../../api/baseApi";
import type { IResponse } from "../../../interface/common.interface";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverviewStats: builder.query<
      {
        totalJobs: number;
        totalApplications: number;
        newCandidates: number;
      },
      void
    >({
      query: () => "/admin/overview",
      providesTags: ["Job", "Application"],
      transformResponse: (
        res: IResponse<{
          totalJobs: number;
          totalApplications: number;
          newCandidates: number;
        }>,
      ) => res.data, 
    }),
  }),
});

export const { useGetAdminOverviewStatsQuery } = adminApi;
