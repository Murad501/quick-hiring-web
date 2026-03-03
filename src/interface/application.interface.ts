export interface IApplication {
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