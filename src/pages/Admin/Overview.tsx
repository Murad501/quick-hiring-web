import { Link } from "react-router-dom";
import { LuBriefcase, LuUsers, LuTrendingUp } from "react-icons/lu";
import { JOBS } from "../../data/jobs";

export default function Overview() {
  const stats = [
    {
      title: "Total Jobs",
      value: JOBS.length.toString(),
      icon: LuBriefcase,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Applications",
      value: "2,451", // Mock data
      icon: LuUsers,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "New Candidates",
      value: "+124", // Mock data
      icon: LuTrendingUp,
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-500">
          Welcome back, Admin! Here is what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-none border border-gray-100 flex items-center gap-4 transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-none flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  {stat.title}
                </p>
                <div className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-none border border-gray-100 p-6 line-clamp-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Recently Posted Jobs
            </h2>
            <Link
              to="/admin/jobs"
              className="text-primary font-medium hover:underline text-sm"
            >
              View all jobs
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {JOBS.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 rounded-none border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0">{job.logo}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {job.company} • {job.type}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/admin/jobs/${job.id}/applications`}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-none transition-colors border border-gray-200"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-none border border-gray-100 p-6 self-start">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/admin/jobs"
              className="w-full text-center px-4 py-3 bg-primary text-white font-medium rounded-none hover:bg-primary/90 transition-colors"
            >
              Post a New Job
            </Link>
            <Link
              to="/admin/applications"
              className="w-full text-center px-4 py-3 bg-white text-slate-700 font-medium rounded-none border border-gray-200 hover:bg-slate-50 transition-colors"
            >
              Review Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
