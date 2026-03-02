import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuChevronLeft,
  LuSearch,
  LuMail,
  LuFileText,
  LuX,
} from "react-icons/lu";
import { useGetJobByIdQuery } from "../../redux/api/jobApi";
import { useGetAllApplicationsQuery } from "../../redux/api/applicationApi";
import { useDebounce } from "../../hooks/useDebounce";

export default function JobApplications() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: job, isLoading: isJobLoading } = useGetJobByIdQuery(
    id as string,
    { skip: !id },
  );
  const {
    data: appResponse,
    isLoading: isAppsLoading,
    isError,
  } = useGetAllApplicationsQuery({ jobId: id }, { skip: !id });

  const applications = appResponse?.data || [];
  const isLoading = isJobLoading || isAppsLoading;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        app.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [applications, debouncedSearchQuery, statusFilter]);

  if (isLoading && !job) {
    return (
      <div className="p-10 text-center font-bold text-xl text-slate-400 animate-pulse">
        Loading Job Details...
      </div>
    );
  }

  if (!isLoading && !job) {
    return (
      <div className="p-10 text-center font-bold text-xl text-slate-700">
        Job Not Found
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case "new":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "reviewed":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "interviewing":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "rejected":
        return "bg-red-50 text-red-600 border-red-200";
      case "hired":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div>
      <Link
        to="/admin/jobs"
        className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-6 transition-colors"
      >
        <LuChevronLeft className="w-5 h-5 mr-1" /> Back to Jobs
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Applications for {job?.title}
        </h1>
        <p className="text-slate-500">
          {job?.company} • {applications.length} Total Applicants
        </p>
      </div>

      <div className="bg-white p-4 rounded-none border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search candidates by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-56 py-3 px-4 rounded-none border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium text-slate-700"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      <div className="bg-white rounded-none border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-sm">
                <th className="py-4 px-6 font-medium">Candidate</th>
                <th className="py-4 px-6 font-medium">Applied At</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Resume/Cover</th>
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
                        <div className="h-7 bg-slate-200 rounded-none w-24"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="h-8 w-10 bg-slate-200 rounded-lg inline-block"></div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {isError && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-red-500 font-medium"
                  >
                    Failed to load applications.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr
                    key={app.applicationId || app._id}
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{app.name}</div>
                      <div className="text-sm text-slate-500 font-medium">
                        {app.email}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                      Recent {/* Add backend timestamp when available */}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        defaultValue={app.status}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-none border focus:ring-0 cursor-pointer appearance-none ${getStatusColor(app.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <a
                          href={app.resumeLink || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                          <LuFileText className="w-4 h-4" /> Resume
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        className="text-slate-500 hover:text-primary transition-colors p-2 rounded-none hover:bg-slate-100 inline-flex"
                        title="Email Candidate"
                      >
                        <LuMail className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : !isLoading && !isError ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
