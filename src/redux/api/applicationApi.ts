import { baseApi } from "./baseApi";

export interface Application {
  _id: string;
  applicationId: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: "pending" | "reviewed";
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
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
