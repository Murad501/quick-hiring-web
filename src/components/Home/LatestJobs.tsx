import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { getTagStyles } from "../../utils/jobUtils";
import { useGetAllJobsQuery } from "../../redux/api/jobApi";
import type { Job } from "../../redux/api/jobApi";

export default function LatestJobs() {
  const {
    data: jobResponse,
    isLoading,
    isError,
  } = useGetAllJobsQuery({ limit: 6 });

  return (
    <section className="py-20 relative overflow-hidden bg-[#FAFBFF]">
      <div className="common_container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <h2 className="font-clash font-bold text-3xl md:text-5xl text-slate-800">
            Latest <span className="text-accent">jobs open</span>
          </h2>
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors self-start md:self-auto"
          >
            Show all jobs <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load latest jobs. Please try again later.
          </div>
        )}

        {/* Grid */}
        {jobResponse?.data && !isLoading && !isError && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobResponse.data.slice(0, 6).map((job: Job) => (
              <div
                key={job.jobId}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                {/* Job Information */}
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-lg md:text-xl text-slate-800 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {job.company} <span className="mx-1">•</span> {job.location}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(
                        1,
                        job.type,
                      )}`}
                    >
                      {job.type}
                    </span>
                    <span className="text-gray-300 mx-1">|</span>
                    {job.tags &&
                      job.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span
                          key={tag}
                          className={`px-4 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(
                            index,
                            tag,
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    {job.tags && job.tags.length > 3 && (
                      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        +{job.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
