import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuX, LuExternalLink } from "react-icons/lu";
import { useGetAllApplicationsQuery } from "../../redux/services/application/applicationApi";
import type { IApplication } from "../../interface/application.interface";
import { useDebounce } from "../../hooks/useDebounce";
import ApplicationModal from "../../components/Admin/ApplicationModal";

export default function AllApplications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<IApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: appResponse,
    isLoading: isAppsLoading,
    isError,
  } = useGetAllApplicationsQuery();

  const applications = appResponse?.data || [];

  const isLoading = isAppsLoading;

  const enrichedApplications = useMemo(() => {
    return applications.map((app) => {
      return {
        ...app,
        id: app.applicationId,
        jobTitle: app.jobTitle || "Unknown Job",
        company: app.jobCompany || "Unknown",
        appliedAt: app.createdAt,
        resume: app.resumeLink || "#",
      };
    });
  }, [applications]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredApplications = useMemo(() => {
    return enrichedApplications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        app.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [enrichedApplications, debouncedSearchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          All Applications
        </h1>
        <p className="text-slate-500">
          Review and manage candidates across all active job postings.
        </p>
      </div>

      <div className="bg-white p-4 rounded-none border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search candidates by name, email, or job title..."
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
                <th className="py-4 px-6 font-medium">Applied For</th>
                <th className="py-4 px-6 font-medium">Status & Date</th>
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
                        <div className="h-5 bg-slate-200 rounded w-40 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-7 bg-slate-200 rounded-none w-24 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="h-8 w-20 bg-slate-200 rounded-none inline-block"></div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {isError && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-red-500 font-medium"
                  >
                    Failed to load applications.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{app.name}</div>
                      <div className="text-sm text-slate-500 font-medium">
                        {app.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/admin/jobs/${app.jobId}/applications`}
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        {app.jobTitle} <LuExternalLink className="w-3 h-3" />
                      </Link>
                      <div className="text-sm text-slate-500">
                        {app.company}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-start gap-1.5">
                        <select
                          disabled={true} // Now managed via modal
                          value={app.status.toLowerCase()}
                          className={`text-xs font-semibold px-2 py-1 rounded-none border focus:ring-0 cursor-not-allowed appearance-none ${getStatusColor(app.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                        <span className="text-xs text-slate-400 font-medium">
                          {app.appliedAt}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsModalOpen(true);
                          }}
                          className="bg-primary text-white hover:bg-primary/90 transition-colors px-3 py-1.5  text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : !isLoading && !isError ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
