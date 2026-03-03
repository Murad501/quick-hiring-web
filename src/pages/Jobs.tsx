import React, { useState } from "react";
import JobCard from "../components/Shared/JobCard";
import JobTypeDropdown from "../components/Shared/JobTypeDropdown";
import { LuSearch, LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { useGetAllJobsQuery } from "../redux/services/job/jobApi";
import { JOB_CATEGORIES, JOB_COMPANIES, JOB_TYPES } from "../data/constants";
import { useDebounce } from "../hooks/useDebounce";

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialType = searchParams.get("type") || "All";
  const initialCategory = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [categoryFilters, setCategoryFilters] = useState<string[]>(
    initialCategory ? initialCategory.split(",") : [],
  );
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (debouncedSearchQuery) queryParams.search = debouncedSearchQuery;
  if (typeFilter !== "All") queryParams.type = typeFilter;
  if (categoryFilters.length > 0)
    queryParams.category = categoryFilters.join(",");
  if (companyFilters.length > 0) queryParams.company = companyFilters.join(",");

  const {
    data: jobResponse,
    isFetching: isLoading,
    isError,
  } = useGetAllJobsQuery(queryParams);

  const JOBS = jobResponse?.data || [];
  const TOTAL_JOBS = jobResponse?.meta?.total || 0;
  const totalPages = Math.ceil(TOTAL_JOBS / itemsPerPage) || 1;

  const categories = JOB_CATEGORIES;
  const companies = JOB_COMPANIES;
  const types = ["All", ...JOB_TYPES];

  const toggleFilter = (
    currentFilters: string[],
    setFilters: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((item) => item !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilters, companyFilters, typeFilter]);

  return (
    <div className="bg-slate-50 min-h-screen py-16 ">
      <div className="common_container">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-slate-800 mb-4">
            Find Your <span className="text-accent">Dream Job</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Browse through our current openings and find the perfect role that
            matches your skills and career aspirations.
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white p-6  border border-gray-200 mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <LuSearch className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by job title, description, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3  border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Job Type Filter */}
            <div className="min-w-[200px]">
              <JobTypeDropdown
                value={typeFilter}
                onChange={setTypeFilter}
                options={types}
                triggerClassName="w-full flex items-center justify-between py-3 px-4  border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {/* Categories Multi-Select Checkboxes */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      toggleFilter(categoryFilters, setCategoryFilters, cat)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      categoryFilters.includes(cat)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-slate-600 border-gray-200 hover:border-primary/50 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Companies Multi-Select Checkboxes */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">
                Companies
              </h3>
              <div className="flex flex-wrap gap-2">
                {companies.map((company) => (
                  <button
                    key={company}
                    onClick={() =>
                      toggleFilter(companyFilters, setCompanyFilters, company)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      companyFilters.includes(company)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-slate-600 border-gray-200 hover:border-primary/50 hover:bg-slate-50"
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex justify-between items-center text-slate-600 font-medium">
          <p>
            Showing {TOTAL_JOBS} {TOTAL_JOBS === 1 ? "result" : "results"}
          </p>

          {/* Active Filters Summary */}
          {(categoryFilters.length > 0 || companyFilters.length > 0) && (
            <button
              onClick={() => {
                setCategoryFilters([]);
                setCompanyFilters([]);
              }}
              className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
            >
              <LuX className="w-4 h-4" /> Clear tags
            </button>
          )}
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="block p-6 border border-gray-200 bg-white  h-full flex-col animate-pulse"
              >
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>

                <div className="space-y-2 mb-6 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                  <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="h-6 w-20 bg-slate-200 rounded"></div>
                  <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load jobs. Please try again later.
          </div>
        )}

        {/* Job Grid */}
        {!isLoading && !isError && JOBS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {JOBS.map((job) => (
              <JobCard key={job.jobId} job={job} />
            ))}
          </div>
        ) : !isLoading && !isError ? (
          <div className="bg-white py-16 text-center  border border-gray-100  mb-12">
            <p className="text-xl text-slate-500 font-medium mb-2">
              No jobs found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilters([]);
                setCompanyFilters([]);
                setTypeFilter("All");
              }}
              className="text-primary font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : null}

        {/* Pagination Controls */}
        {totalPages > 1 && !isLoading && !isError && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <LuChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-slate-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <LuChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
