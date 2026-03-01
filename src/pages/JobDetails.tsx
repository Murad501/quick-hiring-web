import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { JOBS, type JobTag } from "../data/jobs";
import { LuChevronLeft, LuMapPin, LuBriefcase } from "react-icons/lu";
const KEY_RESPONSIBILITIES = [
  "Spearhead the design and execution of core product features.",
  "Collaborate with engineers and product managers to define project requirements.",
  "Maintain a high bar for quality and establish best practices within the team.",
  "Conduct thorough market and user research to guide technical decisions.",
];

const REQUIREMENTS = [
  "3+ years of relevant industry experience in a similar role.",
  "Strong foundational knowledge in modern frameworks and tooling.",
  "Excellent communication skills and ability to articulate complex concepts.",
  "A proactive attitude with the ability to take ownership of end-to-end delivery.",
];

const BENEFITS = [
  "Competitive base salary and generous stock options.",
  "Comprehensive health, dental, and vision insurance.",
  "Flexible working hours with remote-first options.",
  "Annual learning, development, and wellness stipends.",
];

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    coverNote: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find job based on ID
  const job = JOBS.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Job Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/jobs"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="common_container">
        {/* Back Link */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-8 transition-colors"
        >
          <LuChevronLeft className="w-5 h-5 mr-1" />
          Back to Jobs
        </Link>

        {/* Layout Grid */}
        <div className="flex flex-col gap-4 mx-auto">
          {/* Main Content Area */}
          <div className="flex flex-col gap-4">
            {/* Header / Title Area */}
            <div className="bg-white p-8 border border-gray-200">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 shrink-0">{job.logo}</div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg text-slate-600 font-medium mb-4">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1.5">
                      <LuMapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuBriefcase className="w-4 h-4" /> {job.type}
                    </span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded font-medium ml-2">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(tag as JobTag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description Area */}
            <div className="bg-white p-8 border border-gray-200 ">
              <h2 className="text-xl font-semibold text-slate-800 ">
                About the Role
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p className="mb-6">
                  {job.description.replace("...", "")} This is an incredibly
                  exciting opportunity to join a fast-paced environment and
                  build products used by millions worldwide. In this role, you
                  will collaborate heavily with cross-functional teams to
                  deliver outstanding, user-centric experiences.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">
                  Key Responsibilities
                </h3>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  {KEY_RESPONSIBILITIES.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">
                  Requirements & Qualifications
                </h3>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  {REQUIREMENTS.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">
                  Benefits
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {BENEFITS.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom / Form Area */}
          <div className="w-full">
            <div className="bg-white p-8 border border-gray-200 shadow-xl shadow-indigo-100/30">
              <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
                Apply for this role
              </h3>
              {isSubmitted ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">
                    Application Submitted!
                  </h4>
                  <p className="text-sm font-medium">
                    Thank you for applying to {job.company}. Our team will
                    review your application and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-slate-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-slate-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Resume URL field */}
                  <div>
                    <label
                      htmlFor="resumeUrl"
                      className="block text-sm font-bold text-slate-700 mb-1"
                    >
                      Resume Link (URL) *
                    </label>
                    <input
                      id="resumeUrl"
                      type="url"
                      required
                      placeholder="https://linkedin.com/in/..."
                      value={formData.resumeUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, resumeUrl: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Cover Note field */}
                  <div>
                    <label
                      htmlFor="coverNote"
                      className="block text-sm font-bold text-slate-700 mb-1"
                    >
                      Cover Note
                    </label>
                    <textarea
                      id="coverNote"
                      rows={4}
                      placeholder="Tell us why you're a great fit..."
                      value={formData.coverNote}
                      onChange={(e) =>
                        setFormData({ ...formData, coverNote: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full md:w-auto md:min-w-[200px] md:mx-auto block bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Submit Application
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-4">
                      By applying, you agree to our Terms & Privacy Policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
