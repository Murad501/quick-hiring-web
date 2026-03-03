import { LuBriefcase } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useGetCompaniesQuery } from "../redux/services/job/jobApi";

export default function Companies() {
  const { data: companies, isLoading, isError } = useGetCompaniesQuery();

  return (
    <div className="bg-slate-50  pt-12 pb-20">
      {/* Header */}
      <div className="common_container mb-12">
        <h1 className="text-4xl md:text-5xl font-clash font-bold text-slate-800 mb-4 text-center">
          Top Companies Hiring Now
        </h1>
        <p className="text-lg text-slate-500 text-center max-w-2xl mx-auto">
          Discover companies that are currently expanding their teams and find
          your next great career opportunity.
        </p>
      </div>

      {/* Content */}
      <div className="common_container">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6  border border-gray-100 animate-pulse"
              >
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load companies. Please try again later.
          </div>
        )}

        {!isLoading && !isError && companies && companies.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium">
            No companies found with open jobs.
          </div>
        )}

        {!isLoading && !isError && companies && companies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map((company, index) => (
              <Link
                to={`/companies/${encodeURIComponent(company.name)}`}
                key={index}
                className="group bg-white p-6 border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all flex flex-col items-center text-center"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-4 mt-2 group-hover:text-primary transition-colors">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 mt-auto">
                  <LuBriefcase className="w-4 h-4 text-primary" />
                  {company.count} Open Job{company.count !== 1 ? "s" : ""}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
