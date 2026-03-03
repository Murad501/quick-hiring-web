import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import JobTypeDropdown from "../Shared/JobTypeDropdown";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/jobs?query=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`,
    );
  };
  return (
    <section className="relative bg-[#FAFBFF] overflow-hidden">
      {/* Background Graphic Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0 bg-no-repeat bg-cover md:bg-contain bg-right"
        style={{ backgroundImage: "url('/hero-pattern.png')" }}
      ></div>

      <div className="common_container relative z-10 pt-20 pb-20 md:pt-32 md:pb-32 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-7/12 xl:w-6/12 flex flex-col z-20">
          <h1 className="font-clash font-bold text-5xl md:text-7xl text-slate-800 leading-[1.1] mb-6 relative">
            Discover <br />
            more than <br />
            <span className="text-accent relative inline-block">
              5000+ Jobs
              {/* Blue Brush Stroke Underline */}
              <svg
                className="absolute -bottom-4 left-0 w-full h-auto text-accent"
                viewBox="0 0 300 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15C55 12 105 10 155 8C205 6 255 5 295 8C275 12 255 16 235 20C215 24 195 24 175 22C125 18 75 16 25 18C15 18 10 16 15 12C20 8 35 6 60 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-lg mt-4">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 md:p-3   shadow-indigo-100/50 flex flex-col md:flex-row items-center gap-4 mb-6 relative z-30 lg:w-[130%] xl:w-[135%]">
            {/* Keyword Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <LuSearch className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border-none focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 bg-transparent font-medium"
              />
            </div>

            {/* Job Type Input */}
            <div className="flex-1 w-full border-b md:border-b-0 border-gray-100 relative items-center flex">
              <JobTypeDropdown
                value={type}
                onChange={setType}
                triggerClassName="w-full flex items-center justify-between px-4 py-3 md:py-2 focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-fit bg-primary text-white font-bold py-4 px-10  hover:bg-primary/90 transition-colors shrink-0"
            >
              Search my job
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Popular :</span>
            <span className="font-medium text-slate-700">UI Designer,</span>
            <span className="font-medium text-slate-700">UX Researcher,</span>
            <span className="font-medium text-slate-700">Android,</span>
            <span className="font-medium text-slate-700">Admin</span>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-[45%] h-[95%] pointer-events-none z-10">
          <img
            src="/hero-person.png"
            alt="Hero Person Placeholder"
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
