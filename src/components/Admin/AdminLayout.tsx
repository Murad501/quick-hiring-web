import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuBriefcase,
  LuFileText,
  LuLogOut,
} from "react-icons/lu";

export default function AdminLayout() {
  const location = useLocation();

  const navLinks = [
    { name: "Overview", path: "/admin", icon: LuLayoutDashboard },
    { name: "Jobs", path: "/admin/jobs", icon: LuBriefcase },
    { name: "Applications", path: "/admin/applications", icon: LuFileText },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6">
          <Link to="/admin" className=" flex items-center justify-center">
            <img src="/Logo 1.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 px-4 pb-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              location.pathname === link.path ||
              (link.path !== "/admin" &&
                location.pathname.startsWith(link.path));

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-none font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-none font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <LuLogOut className="w-5 h-5 text-slate-400" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex items-center justify-between">
          <Link to="/admin" className="flex items-center">
            <img src="/Logo 1.png" alt="Logo" className="h-8 w-auto" />
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-2 uppercase">
              Admin
            </span>
          </Link>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
