import { baseApi } from "../../api/baseApi";
import type { IResponse } from "../../../interface/common.interface";
import type { IJob } from "../../../interface/job.interface";

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<IResponse<IJob>, Record<string, any>>({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Job"],
    }),
    getJobById: builder.query<IJob, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
      transformResponse: (res: any) => res.data || res,
    }),
    getCompanies: builder.query<{ name: string; count: number }[], void>({
      query: () => "/jobs/companies",
      providesTags: ["Job"],
      transformResponse: (res: any) => res.data,
    }),
    getAdminJobs: builder.query<IResponse<IJob>, Record<string, any>>({
      query: (params) => ({
        url: "/jobs/admin",
        params,
      }),
      providesTags: ["Job"],
    }),
    createJob: builder.mutation<IJob, Partial<IJob>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Job"],
    }),
    updateJobStatus: builder.mutation<
      IJob,
      { jobId: string; status: "open" | "closed" }
    >({
      query: ({ jobId, status }) => ({
        url: `/jobs/${jobId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation<IJob, { jobId: string; data: Partial<IJob> }>({
      query: ({ jobId, data }) => ({
        url: `/jobs/${jobId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation<void, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetCompaniesQuery,
  useCreateJobMutation,
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
