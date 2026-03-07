export interface IJob {
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
  isFeatured?: boolean;
}
