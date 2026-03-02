import { type Job } from "../../data/jobs";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

interface JobCardProps {
  job: Job;
}

import { getTagStyles } from "../../utils/jobUtils";

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block p-6 border border-gray-200 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer group rounded-xl"
    >
      {/* Title */}
      <div className="mb-1">
        <h3 className="font-semibold text-lg text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
          {job.title}
        </h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        {job.company} <span className="mx-1">•</span> {job.location}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag, index) => (
          <span
            key={tag}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${getTagStyles(
              index,
              tag,
            )}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer: Job Type and Arrow */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <span className="px-3 py-1 font-medium text-xs text-primary bg-primary/5 border border-primary/20 rounded">
          {job.type}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
          <LuArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
