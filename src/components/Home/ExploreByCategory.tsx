import { Link } from "react-router-dom";
import {
  LuPenTool,
  LuTrendingUp,
  LuMegaphone,
  LuWallet,
  LuMonitor,
  LuCode,
  LuBriefcase,
  LuUsers,
  LuArrowRight,
} from "react-icons/lu";

const CATEGORIES = [
  { name: "Design", jobs: 235, icon: LuPenTool, path: "/jobs?category=design" },
  {
    name: "Sales",
    jobs: 756,
    icon: LuTrendingUp,
    path: "/jobs?category=sales",
  },
  {
    name: "Marketing",
    jobs: 140,
    icon: LuMegaphone,
    path: "/jobs?category=marketing",
  },
  {
    name: "Finance",
    jobs: 325,
    icon: LuWallet,
    path: "/jobs?category=finance",
  },
  {
    name: "Technology",
    jobs: 436,
    icon: LuMonitor,
    path: "/jobs?category=technology",
  },
  {
    name: "Engineering",
    jobs: 542,
    icon: LuCode,
    path: "/jobs?category=engineering",
  },
  {
    name: "Business",
    jobs: 211,
    icon: LuBriefcase,
    path: "/jobs?category=business",
  },
  {
    name: "Human Resource",
    jobs: 346,
    icon: LuUsers,
    path: "/jobs?category=hr",
  },
];

export default function ExploreByCategory() {
  return (
    <section className="py-16">
      <div className="common_container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-12 gap-4">
          <h2 className="font-clash font-bold text-3xl md:text-5xl text-slate-800">
            Explore by <span className="text-accent">category</span>
          </h2>
          <Link
            to="/jobs"
            className="hidden items-center gap-2  md:flex text-primary font-medium hover:text-primary/80 transition-colors self-start md:self-auto"
          >
            Show all jobs <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group flex md:flex-col items-center md:items-start p-4 md:p-8 border border-gray-100 hover:bg-primary hover:border-primary transition-all duration-300 bg-white"
            >
              {/* Icon */}
              <div className="text-primary group-hover:text-white mb-0 md:mb-8 mr-4 md:mr-0 transition-colors">
                <category.icon
                  className="w-8 h-8 md:w-10 md:h-10"
                  strokeWidth={1.5}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full">
                <h3 className="font-semibold text-slate-800 group-hover:text-white text-lg mb-1 md:mb-2 transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between w-full text-slate-500 group-hover:text-white/90 text-sm md:text-base transition-colors">
                  <span>{category.jobs} jobs available</span>
                  <span className="hidden md:inline-block">
                    <LuArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Mobile Arrow */}
              <div className="md:hidden text-slate-800 group-hover:text-white ml-4 transition-colors">
                <LuArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/jobs"
          className="md:hidden flex items-center gap-2 mt-4 text-primary font-medium hover:text-primary/80 transition-colors self-start md:self-auto"
        >
          Show all jobs <LuArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
