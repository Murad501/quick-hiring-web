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
  sections: {
    title: string;
    values: string[];
  }[];
  jobId: string;
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
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const { useGetAllJobsQuery, useGetJobByIdQuery, useCreateJobMutation } =
  jobApi;
