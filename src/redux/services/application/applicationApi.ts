import { baseApi } from "../../api/baseApi";
import type { IApplication } from "../../../interface/application.interface";
import type { IResponse } from "../../../interface/common.interface";




export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<
      IResponse<IApplication>,
      Record<string, any> | void
    >({
      query: (params) => ({
        url: "/applications",
        params: params || {},
      }),
      providesTags: ["Application"],
    }),
    createApplication: builder.mutation<any, Partial<IApplication>>({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Application"],
    }),
    updateApplicationStatus: builder.mutation<
      any,
      { applicationId: string; status: string }
    >({
      query: ({ applicationId, status }) => ({
        url: `/applications/${applicationId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useCreateApplicationMutation,
  useUpdateApplicationStatusMutation,
} = applicationApi;
