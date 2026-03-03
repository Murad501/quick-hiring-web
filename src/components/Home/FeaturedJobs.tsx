import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import JobCard from "../Shared/JobCard";
import { useGetAllJobsQuery } from "../../redux/services/job/jobApi";
import type { IJob } from "../../interface/job.interface";

export default function FeaturedJobs() {
  const {
    data: jobResponse,
    isLoading,
    isError,
  } = useGetAllJobsQuery({ limit: 6 });

  return (
    <section className="py-16">
      <div className="common_container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-12 gap-4">
          <h2 className="font-clash font-bold text-3xl md:text-5xl text-slate-800">
            Featured <span className="text-accent">jobs</span>
          </h2>
          <Link
            to="/jobs"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Show all jobs <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        )}

        {isError && (
          <div className="text-center py-10 text-red-500 font-medium">
            Failed to load jobs.
          </div>
        )}

        {/* Grid */}
        {jobResponse?.data && !isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobResponse.data.slice(0, 6).map((job: IJob) => (
              <JobCard key={job._id || job.jobId} job={job} />
            ))}
          </div>
        )}

        {/* Mobile Link */}
        <Link
          to="/jobs"
          className="md:hidden flex items-center gap-2 mt-8 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          Show all jobs <LuArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
