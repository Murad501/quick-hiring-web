import { baseApi } from "./baseApi";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
  status: "open" | "closed";
  sections: {
    title: string;
    values: string[];
  }[];
  jobId: string;
  applicationCount?: number;
}

export interface JobResponse {
  data: Job[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  message: string;
  success: boolean;
  statusCode: number;
}

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobResponse, Record<string, any>>({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Job"],
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
      transformResponse: (res: any) => res.data || res,
    }),
    getCompanies: builder.query<{ name: string; count: number }[], void>({
      query: () => "/jobs/companies",
      providesTags: ["Job"],
      transformResponse: (res: any) => res.data,
    }),
    getAdminJobs: builder.query<JobResponse, Record<string, any>>({
      query: (params) => ({
        url: "/jobs/admin",
        params,
      }),
      providesTags: ["Job"],
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Job"],
    }),
    updateJobStatus: builder.mutation<
      Job,
      { jobId: string; status: "open" | "closed" }
    >({
      query: ({ jobId, status }) => ({
        url: `/jobs/${jobId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation<Job, { jobId: string; data: Partial<Job> }>({
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
