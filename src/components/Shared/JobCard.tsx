import { type Job, type JobTag } from "../../data/jobs";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

const getTagStyles = (tag: JobTag) => {
  switch (tag) {
    case "Marketing":
      return "bg-[#FDF3EB] text-[#F3A052] border border-[#F3A052]/20";
    case "Design":
      return "bg-[#EEFDF3] text-[#52D396] border border-[#52D396]/20";
    case "Business":
      return "bg-[#F4F4FF] text-[#6961F1] border border-[#6961F1]/20";
    case "Technology":
      return "bg-[#FEF4F4] text-[#F97070] border border-[#F97070]/20";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block p-6 border border-gray-200 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer group rounded-xl"
    >
      {/* Top Row: Logo and Pill */}
      <div className="flex justify-between items-start mb-4">
        {job.logo}
        <span className="px-3 py-1 font-medium text-xs text-primary border border-primary/30 min-w-max rounded">
          {job.type}
        </span>
      </div>

      {/* Title & Company */}
      <h3 className="font-semibold text-lg text-slate-800 mb-1 group-hover:text-primary transition-colors">
        {job.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        {job.company} <span className="mx-1">•</span> {job.location}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${getTagStyles(
              tag as JobTag,
            )}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
