import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuPlus,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { JOBS } from "../../data/jobs";
import JobTypeDropdown from "../../components/Shared/JobTypeDropdown";
import PostJobModal from "../../components/Admin/PostJobModal";

const ITEMS_PER_PAGE = 8;

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique types for the filter dropdown
  const types = useMemo(() => {
    const allTypes = Array.from(new Set(JOBS.map((job) => job.type)));
    return ["All", ...allTypes];
  }, []);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Manage Jobs
          </h1>
          <p className="text-slate-500">
            View, edit, and manage all job postings.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white font-bold py-3 px-6 rounded-none hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <LuPlus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-none border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <LuX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Type Filter */}
        <div className="w-full md:w-56 z-10">
          <JobTypeDropdown
            value={typeFilter}
            onChange={(val) => {
              setTypeFilter(val);
              setCurrentPage(1);
            }}
            options={types}
            triggerClassName="w-full flex items-center justify-between py-3 px-4 rounded-none border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* Jobs List / Table */}
      <div className="bg-white rounded-none border border-gray-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-sm">
                <th className="py-4 px-6 font-medium">Job Title & Company</th>
                <th className="py-4 px-6 font-medium">Location</th>
                <th className="py-4 px-6 font-medium">Job Type</th>
                <th className="py-4 px-6 font-medium">Applications</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0 bg-white border border-gray-100 rounded-none flex items-center justify-center p-1">
                          {job.logo}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">
                            {job.title}
                          </div>
                          <div className="text-sm text-slate-500">
                            {job.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {job.location}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-none">
                        {job.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">
                          {job.id * 3 + 12}
                        </span>{" "}
                        {/* Mock logic for application count */}
                        <span className="text-xs text-slate-500">
                          applicants
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/admin/jobs/${job.id}/applications`}
                        className="inline-flex font-medium text-sm text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-none transition-colors"
                      >
                        View Applications
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-none bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-none bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
