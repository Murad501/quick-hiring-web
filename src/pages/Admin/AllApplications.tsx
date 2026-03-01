import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuMail,
  LuFileText,
  LuX,
  LuExternalLink,
} from "react-icons/lu";
import { JOBS } from "../../data/jobs";

// Mock Applications Data
const MOCK_APPLICATIONS = [
  {
    id: 1,
    jobId: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "New",
    appliedAt: "2024-03-10",
    resume: "#",
  },
  {
    id: 2,
    jobId: 1,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Reviewed",
    appliedAt: "2024-03-09",
    resume: "#",
  },
  {
    id: 3,
    jobId: 2,
    name: "Charlie Davis",
    email: "charlie@example.com",
    status: "Interviewing",
    appliedAt: "2024-03-08",
    resume: "#",
  },
  {
    id: 4,
    jobId: 3,
    name: "Diana Prince",
    email: "diana@example.com",
    status: "Rejected",
    appliedAt: "2024-03-07",
    resume: "#",
  },
  {
    id: 5,
    jobId: 1,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    status: "New",
    appliedAt: "2024-03-06",
    resume: "#",
  },
  {
    id: 6,
    jobId: 3,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    status: "Reviewed",
    appliedAt: "2024-03-05",
    resume: "#",
  },
  {
    id: 7,
    jobId: 4,
    name: "George King",
    email: "george@example.com",
    status: "Interviewing",
    appliedAt: "2024-03-04",
    resume: "#",
  },
  {
    id: 8,
    jobId: 5,
    name: "Hannah Lee",
    email: "hannah@example.com",
    status: "Hired",
    appliedAt: "2024-03-03",
    resume: "#",
  },
];

export default function AllApplications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const enrichedApplications = useMemo(() => {
    return MOCK_APPLICATIONS.map((app) => {
      const job = JOBS.find((j) => j.id === app.jobId);
      return {
        ...app,
        jobTitle: job ? job.title : "Unknown Job",
        company: job ? job.company : "Unknown",
      };
    });
  }, []);

  const filteredApplications = useMemo(() => {
    return enrichedApplications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enrichedApplications, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Reviewed":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "Interviewing":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-200";
      case "Hired":
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
              {filteredApplications.length > 0 ? (
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
                          defaultValue={app.status}
                          className={`text-xs font-semibold px-2 py-1 rounded-none border focus:ring-0 cursor-pointer appearance-none ${getStatusColor(app.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Hired">Hired</option>
                        </select>
                        <span className="text-xs text-slate-400 font-medium">
                          {app.appliedAt}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={app.resume}
                          className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-slate-100 inline-flex"
                          title="View Resume"
                        >
                          <LuFileText className="w-5 h-5" />
                        </a>
                        <button
                          className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-slate-100 inline-flex"
                          title="Email Candidate"
                        >
                          <LuMail className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
