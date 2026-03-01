import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

type JobTag = "Marketing" | "Design" | "Management" | "Developer" | "Full-Time";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  timeType: string;
  tags: JobTag[];
  logo: React.ReactNode;
}

const LATEST_JOBS: Job[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 bg-white flex items-center justify-center">
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path
            d="M26.6667 13.3333L19.9999 9.5L13.3333 13.3333V21L19.9999 24.8333L26.6667 21V13.3333Z"
            fill="#20C489"
          />
          <path
            d="M19.9999 24.8333L13.3333 21V28.6667L19.9999 32.5L26.6667 28.6667V21L19.9999 24.8333Z"
            fill="#5CECAE"
          />
          <path
            d="M26.6667 13.3333L19.9999 9.5V17.1667L26.6667 21V13.3333Z"
            fill="#13A970"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 bg-white flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-12 h-12 text-[#2DB3BE]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.8252 5.09341C19.5539 4.6726 20.4468 4.6726 21.1755 5.09341L32.1643 11.4392C32.8929 11.8601 33.3394 12.6332 33.3394 13.475V26.525C33.3394 27.3668 32.8929 28.1399 32.1643 28.5608L21.1755 34.9066C20.4468 35.3274 19.5539 35.3274 18.8252 34.9066L7.8364 28.5608C7.10771 28.1399 6.66125 27.3668 6.66125 26.525V13.475C6.66125 12.6332 7.10771 11.8601 7.8364 11.4392L18.8252 5.09341ZM19.2941 6.55182C19.7214 6.30501 20.2443 6.30501 20.6716 6.55182L30.9575 12.4939C31.3848 12.7407 31.6468 13.1944 31.6468 13.688V26.3121C31.6468 26.8056 31.3848 27.2593 30.9575 27.5061L20.6716 33.4482C20.2443 33.695 19.7214 33.695 19.2941 33.4482L9.00832 27.5061C8.58097 27.2593 8.319 26.8056 8.319 26.3121V13.688C8.319 13.1944 8.58097 12.7407 9.00832 12.4939L19.2941 6.55182ZM20 23.3333L13.3333 19.4839V11.7852L26.6667 19.4839V27.1825L20 23.3333ZM20 8.89882L14.2882 12.1983L25.7118 18.7954L20 22.0949L14.2882 18.7954L20 15.4959L25.7118 12.1964L20 8.89882Z"
            fill="currentColor"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    timeType: "Full-Time",
    tags: ["Design"],
    logo: (
      <div className="w-14 h-14 bg-white flex items-center justify-center text-[#0061FE]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M12 2.112l-6 4.095 6 4.094 6-4.094-6-4.095zm-6.914 4.718L0 10.303l5.086 3.472 6-4.095-6-2.85zm13.828 0l-6 2.85 6 4.095 5.086-3.472-5.086-3.473zM5.086 14.47l-5.086 3.474L6 22.04l6-4.095-6.914-3.475zm13.828 0l-6.914 3.475 6 4.094 6-4.094-5.086-3.475zM12 18.67l-5.32 3.633h10.64L12 18.67z" />
        </svg>
      </div>
    ),
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, US",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 rounded-full bg-[#0055FF] flex items-center justify-center text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-7 h-7"
        >
          <path d="M8 12h8m-8-4h8m-8 8h8" />
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 bg-white flex items-center justify-center text-[#00C4CC]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M10.153 14.07v-4.11L6.685 7.91v4.11l3.468 2.05zm4.076-2.056V7.904l3.468 2.056v4.11L14.23 12.01zm-4.077 4.542v-4.11l-3.468-2.055v4.11l3.468 2.055zM14.23 8.358V4.248L10.762 2.19v4.11L14.23 8.36zm4.076 2.055V6.303l-3.468-2.055v4.11l3.468 2.055zm0 4.542v-4.11L14.838 8.79v4.11l3.468 2.055z" />
        </svg>
      </div>
    ),
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 rounded-full bg-[#00BDE6] flex items-center justify-center text-white text-2xl font-bold font-serif">
        U
      </div>
    ),
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 bg-white flex items-center justify-center text-[#FF6C51]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M12.981 12.05v-5.2h-3.923v9.065h3.923v-3.865zm4.846-5.2h-3.923v10.364h3.923v-10.364zm-9.692 2.6v7.764H4.212v-7.764h3.923z" />
        </svg>
      </div>
    ),
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    timeType: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: (
      <div className="w-14 h-14 bg-[#4353FF] rounded flex items-center justify-center text-white text-3xl font-bold font-serif italic">
        W
      </div>
    ),
  },
];

const getTagStyles = (tag: string) => {
  switch (tag) {
    case "Full-Time":
      return "text-[#52D396] bg-[#EEFDF3] border border-[#52D396]/20";
    case "Marketing":
      return "text-[#F3A052] bg-transparent border border-[#F3A052]";
    case "Design":
      return "text-[#6961F1] bg-transparent border border-[#6961F1]";
    case "Management":
      return "text-[#6961F1] bg-transparent border border-[#6961F1]";
    case "Developer":
      return "text-[#6961F1] bg-transparent border border-[#6961F1]";
    default:
      return "text-gray-500 bg-gray-100 border border-gray-200";
  }
};

export default function LatestJobs() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#FAFBFF]">


      <div className="common_container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <h2 className="font-clash font-bold text-3xl md:text-5xl text-slate-800">
            Latest <span className="text-accent">jobs open</span>
          </h2>
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors self-start md:self-auto"
          >
            Show all jobs <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {LATEST_JOBS.map((job) => (
            <div
              key={job.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Logo */}
              <div className="shrink-0">{job.logo}</div>
              {/* Job Information */}
              <div className="flex-1 w-full">
                <h3 className="font-semibold text-lg md:text-xl text-slate-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {job.company} <span className="mx-1">•</span> {job.location}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(
                      job.timeType,
                    )}`}
                  >
                    {job.timeType}
                  </span>
                  <span className="text-gray-300 mx-1">|</span>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(
                        tag,
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
