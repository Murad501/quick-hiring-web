import { baseApi } from "./baseApi";

export interface Application {
  _id: string;
  applicationId: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: "new" | "reviewed" | "interviewing" | "rejected" | "hired";
  createdAt: string;
  jobTitle?: string;
  jobCompany?: string;
}

export interface ApplicationResponse {
  data: Application[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  message: string;
  success: boolean;
  statusCode: number;
}

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<
      ApplicationResponse,
      Record<string, any> | void
    >({
      query: (params) => ({
        url: "/applications",
        params: params || {},
      }),
      providesTags: ["Application"],
    }),
    createApplication: builder.mutation<any, Partial<Application>>({
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
