import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

type JobTag = "Marketing" | "Design" | "Business" | "Technology";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  tags: JobTag[];
  logo: React.ReactNode;
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-2xl font-black italic text-slate-800">
        R
      </div>
    ),
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t...",
    type: "Full Time",
    tags: ["Design", "Business"],
    logo: (
      <div className="w-12 h-12 bg-white flex items-center justify-center text-[#0061FE]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M12 2.112l-6 4.095 6 4.094 6-4.094-6-4.095zm-6.914 4.718L0 10.303l5.086 3.472 6-4.095-6-2.85zm13.828 0l-6 2.85 6 4.095 5.086-3.472-5.086-3.473zM5.086 14.47l-5.086 3.474L6 22.04l6-4.095-6.914-3.475zm13.828 0l-6.914 3.475 6 4.094 6-4.094-5.086-3.475zM12 18.67l-5.32 3.633h10.64L12 18.67z" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description: "Pitch is looking for Customer Manager to join marketing t...",
    type: "Full Time",
    tags: ["Marketing"],
    logo: (
      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
        Pitch
      </div>
    ),
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    description: "Blinkist is looking for Visual Designer to help team desi...",
    type: "Full Time",
    tags: ["Design"],
    logo: (
      <div className="w-12 h-12 flex items-center justify-center text-[#2CE080]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M12 21.365C17.172 21.365 21.365 17.172 21.365 12 21.365 6.828 17.172 2.635 12 2.635 6.828 2.635 2.635 6.828 2.635 12 2.635 17.172 6.828 21.365 12 21.365ZM12 4.14C16.34 4.14 19.86 7.66 19.86 12C19.86 16.34 16.34 19.86 12 19.86C7.66 19.86 4.14 16.34 4.14 12C4.14 7.66 7.66 4.14 12 4.14Z" />
          <path d="M12 12m-4.5 0a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0" />
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-12 h-12 rounded-full bg-[#0055FF] flex items-center justify-center text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-6 h-6"
        >
          <path d="M8 12h8m-8-4h8m-8 8h8" />
        </svg>
      </div>
    ),
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n...",
    type: "Full Time",
    tags: ["Design", "Business"],
    logo: (
      <div className="w-12 h-12 rounded-full bg-[#00C4CC] flex items-center justify-center text-white italic font-bold font-serif text-[12px]">
        Canva
      </div>
    ),
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    type: "Full Time",
    tags: ["Marketing"],
    logo: (
      <div className="w-12 h-12 flex items-center justify-center text-black">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M11 20.304a9.243 9.243 0 01-6.425-2.58A8.8 8.8 0 012 11.53c0-2.455.986-4.757 2.756-6.483C6.55 3.307 8.956 2.304 11.5 2.304c2.531 0 4.931 1.003 6.721 2.742a8.88 8.88 0 012.75 6.484 8.794 8.794 0 01-2.57 6.3 9.27 9.27 0 01-6.402 2.474zm.5-16.5c-4.136 0-7.5 3.28-7.5 7.31 0 4.032 3.364 7.311 7.5 7.311 4.136 0 7.5-3.279 7.5-7.31 0-4.032-3.364-7.312-7.5-7.312zm-4.707 5.793a1 1 0 011.414-1.414l3.5 3.5a1 1 0 010 1.414l-3.5 3.5a1 1 0 01-1.414-1.414L9.086 12 6.793 9.707z" />
        </svg>
      </div>
    ),
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi...",
    type: "Full Time",
    tags: ["Technology"],
    logo: (
      <div className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </div>
    ),
  },
];

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
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="p-6 border border-gray-200 hover:border-primary hover:shadow-sm transition-all duration-300 bg-white"
            >
              {/* Top Row: Logo and Pill */}
              <div className="flex justify-between items-start mb-4">
                {job.logo}
                <span className="px-3 py-1 font-medium text-xs text-primary border border-primary/30 min-w-max">
                  {job.type}
                </span>
              </div>

              {/* Title & Company */}
              <h3 className="font-semibold text-lg text-slate-800 mb-1">
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
            </div>
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
