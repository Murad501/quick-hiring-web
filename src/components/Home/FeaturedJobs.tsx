import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import JobCard from "../Shared/JobCard";
import { JOBS } from "../../data/jobs";

export default function FeaturedJobs() {
  return (
    <section className="py-16">
      <div className="common_container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-12 gap-4">
          <h2 className="font-clash font-bold text-3xl md:text-5xl text-slate-800">
            Featured <span className="text-accent">jobs</span>
          </h2>
          <Link
            to="/jobs"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Show all jobs <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOBS.slice(0, 8).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Mobile Link */}
        <Link
          to="/jobs"
          className="md:hidden flex items-center gap-2 mt-8 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          Show all jobs <LuArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
