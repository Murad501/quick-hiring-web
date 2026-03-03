import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuChevronLeft,
  LuBuilding2,
  LuBriefcase,
  LuSearch,
  LuX,
  LuChevronRight,
} from "react-icons/lu";
import { useGetAllJobsQuery } from "../redux/api/jobApi";
import JobCard from "../components/Shared/JobCard";
import JobTypeDropdown from "../components/Shared/JobTypeDropdown";
import { JOB_CATEGORIES, JOB_TYPES } from "../data/constants";
import { useDebounce } from "../hooks/useDebounce";
import type { Job } from "../redux/api/jobApi";

export default function CompanyDetails() {
  const { companyName } = useParams<{ companyName: string }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: itemsPerPage,
    company: companyName, // Locked to this company
  };

  if (debouncedSearchQuery) queryParams.search = debouncedSearchQuery;
  if (typeFilter !== "All") queryParams.type = typeFilter;
  if (categoryFilters.length > 0)
    queryParams.category = categoryFilters.join(",");

  const {
    data: jobResponse,
    isFetching: isLoading,
    isError,
  } = useGetAllJobsQuery(queryParams);

  const jobs: Job[] = jobResponse?.data || [];
  const TOTAL_JOBS = jobResponse?.meta?.total || 0;
  const totalPages = Math.ceil(TOTAL_JOBS / itemsPerPage) || 1;

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
  }, [searchQuery, categoryFilters, typeFilter]);

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      {/* Header */}
      <div className="common_container mb-12">
        <Link
          to="/companies"
          className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-6 transition-colors"
        >
          <LuChevronLeft className="w-5 h-5 mr-1" /> Back to Companies
        </Link>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              {companyName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <LuBuilding2 className="w-5 h-5 text-slate-400" />
                <span>Company Profile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LuBriefcase className="w-5 h-5 text-slate-400" />
                <span>
                  {TOTAL_JOBS} Open Job{TOTAL_JOBS !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="common_container">
        {/* Search and Filters Section */}
        <div className="bg-white p-6 border border-gray-200 mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <LuSearch className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={`Search jobs at ${companyName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <LuX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Job Type Filter */}
            <div className="min-w-[200px]">
              <JobTypeDropdown
                value={typeFilter}
                onChange={setTypeFilter}
                options={["All", ...JOB_TYPES]}
                triggerClassName="w-full flex items-center justify-between py-3 px-4 border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {JOB_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    toggleFilter(categoryFilters, setCategoryFilters, cat)
                  }
                  className={`px-3 py-1.5 text-sm font-medium border transition-colors ${
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
        </div>

        <div className="mb-8 flex justify-between items-center text-slate-600 font-medium">
          <p>
            Showing {TOTAL_JOBS} {TOTAL_JOBS === 1 ? "role" : "roles"}
          </p>

          {/* Active Filters Summary */}
          {(categoryFilters.length > 0 ||
            typeFilter !== "All" ||
            searchQuery) && (
            <button
              onClick={() => {
                setCategoryFilters([]);
                setTypeFilter("All");
                setSearchQuery("");
              }}
              className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
            >
              <LuX className="w-4 h-4" /> Clear filters
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-gray-100 h-64 flex flex-col animate-pulse"
              >
                <div className="h-6 bg-slate-200 w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 w-1/2 mb-6"></div>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="h-4 bg-slate-200 w-full"></div>
                  <div className="h-4 bg-slate-200 w-5/6"></div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <div className="h-6 w-16 bg-slate-200"></div>
                  <div className="h-6 w-16 bg-slate-200"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20 bg-white border border-red-100 text-red-500 font-medium">
            Failed to load jobs for this company. Please try again later.
          </div>
        )}

        {!isLoading && !isError && jobs.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-100 text-slate-500 font-medium">
            No open jobs available matching your criteria at {companyName}.
          </div>
        )}

        {!isLoading && !isError && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.jobId} job={job} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && !isLoading && !isError && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
              className="p-2 border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <LuChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
