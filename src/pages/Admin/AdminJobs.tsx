import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuPlus,
  LuChevronLeft,
  LuChevronRight,
  LuX,
  LuPencil,
  LuTrash2,
  LuEye,
} from "react-icons/lu";
import JobTypeDropdown from "../../components/Shared/JobTypeDropdown";
import PostJobModal from "../../components/Admin/PostJobModal";
import ConfirmationModal from "../../components/Shared/ConfirmationModal";
import {
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
  useUpdateJobFeaturedStatusMutation,
  useDeleteJobMutation,
} from "../../redux/services/job/jobApi";
import { JOB_TYPES } from "../../data/constants";
import { useDebounce } from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import type { IJob } from "../../interface/job.interface";

const ITEMS_PER_PAGE = 8;

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  if (debouncedSearchQuery) queryParams.search = debouncedSearchQuery;
  if (typeFilter !== "All") queryParams.type = typeFilter;

  const {
    data: jobResponse,
    isLoading,
    isError,
  } = useGetAdminJobsQuery(queryParams);
  const [updateJobStatus] = useUpdateJobStatusMutation();
  const [updateJobFeaturedStatus] = useUpdateJobFeaturedStatusMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const handleDelete = async () => {
    if (jobToDelete) {
      try {
        await deleteJob(jobToDelete).unwrap();
        toast.success("Job deleted successfully");
        setIsConfirmModalOpen(false);
        setJobToDelete(null);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete job");
      }
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      await updateJobStatus({
        jobId,
        status: newStatus as "open" | "closed",
      }).unwrap();
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update job status");
    }
  };

  const handleFeaturedToggle = async (
    jobId: string,
    currentFeatured: boolean,
  ) => {
    try {
      await updateJobFeaturedStatus({
        jobId,
        isFeatured: !currentFeatured,
      }).unwrap();
      toast.success(
        `Job is ${!currentFeatured ? "now featured" : "no longer featured"}`,
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update featured status");
    }
  };

  const JOBS = jobResponse?.data || [];
  const TOTAL_JOBS = jobResponse?.meta?.total || 0;

  // Extract unique types for the filter dropdown
  const types = ["All", ...JOB_TYPES];

  // Pagination Logic
  const totalPages = Math.ceil(TOTAL_JOBS / ITEMS_PER_PAGE) || 1;

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
          onClick={() => {
            setSelectedJob(null);
            setIsModalOpen(true);
          }}
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
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Featured</th>
                <th className="py-4 px-6 font-medium">Applications</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 animate-pulse bg-white"
                    >
                      <td className="py-4 px-6">
                        <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-32"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-6 bg-slate-200 rounded-none w-20"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-28"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-6 w-12 bg-slate-200 rounded-full inline-block"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-28"></div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="h-9 w-32 bg-slate-200 rounded-none inline-block"></div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {isError && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-red-500 font-medium"
                  >
                    Failed to load jobs.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && JOBS.length > 0 ? (
                JOBS.map((job) => (
                  <tr
                    key={job.jobId}
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
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
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold border rounded-none ${
                          job.type === "Full Time"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-amber-50 text-amber-600 border-amber-200"
                        }`}
                      >
                        {job.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={job.status || "open"}
                        onChange={(e) =>
                          handleStatusChange(job.jobId, e.target.value)
                        }
                        className={`text-xs font-semibold px-2 py-1 border  focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                          job.status === "closed"
                            ? "bg-red-50 border-red-200 text-red-600"
                            : "bg-green-50 border-green-200 text-green-600"
                        }`}
                      >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() =>
                          handleFeaturedToggle(job.jobId, !!job.isFeatured)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          job.isFeatured ? "bg-primary" : "bg-slate-200"
                        }`}
                        title={
                          job.isFeatured
                            ? "Remove from featured"
                            : "Set as featured"
                        }
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            job.isFeatured ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">
                          {job.applicationCount || 0}
                        </span>
                        <span className="text-xs text-slate-500">
                          {job.applicationCount === 1
                            ? "applicant"
                            : "applicants"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setIsModalOpen(true);
                          }}
                          className="inline-flex items-center justify-center w-10 h-10 font-bold text-slate-600 hover:text-white border border-slate-200 hover:bg-slate-800 rounded-none transition-all"
                          title="Edit Job"
                        >
                          <LuPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setJobToDelete(job.jobId);
                            setIsConfirmModalOpen(true);
                          }}
                          disabled={isDeleting}
                          className="inline-flex items-center justify-center w-10 h-10 font-bold text-red-500 hover:text-white border border-red-100 hover:bg-red-500 rounded-none transition-all disabled:opacity-50"
                          title="Delete Job"
                        >
                          <LuTrash2 className="w-5 h-5" />
                        </button>
                        <Link
                          to={`/admin/jobs/${job.jobId}/applications`}
                          className="inline-flex items-center justify-center w-10 h-10 font-bold text-primary hover:text-white border border-primary/20 hover:bg-primary rounded-none transition-all"
                          title="View Applications"
                        >
                          <LuEye className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : !isLoading && !isError ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && !isLoading && !isError && (
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

      {/* Post/Edit Job Modal */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Job Listing"
        message="Are you sure you want to delete this job? This action cannot be undone and all associated applications will be permanently removed."
        confirmText="Delete Job"
        confirmColor="red"
        isLoading={isDeleting}
      />
    </div>
  );
}
