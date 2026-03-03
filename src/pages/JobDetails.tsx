import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTagStyles } from "../utils/jobUtils";
import { useGetJobByIdQuery } from "../redux/api/jobApi";
import { useCreateApplicationMutation } from "../redux/api/applicationApi";
import { LuChevronLeft, LuMapPin, LuBriefcase, LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    coverNote: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch from RTK query
  const {
    data: job,
    isLoading,
    isError,
  } = useGetJobByIdQuery(id as string, {
    skip: !id,
  });

  const [createApplication, { isLoading: isSubmitting }] =
    useCreateApplicationMutation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !job) {
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
          className="bg-primary text-white px-6 py-3  font-medium hover:bg-primary/90 transition-colors"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await createApplication({
        jobId: id,
        name: formData.name,
        email: formData.email,
        resumeLink: formData.resumeUrl,
        coverNote: formData.coverNote,
      }).unwrap();

      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit application");
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
                {job.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getTagStyles(index, tag)}`}
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

                {job.sections &&
                  job.sections.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">
                        {section.title}
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 mb-8">
                        {section.values.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Bottom / Form Area */}
          <div className="w-full">
            <div className="bg-white p-8 border border-gray-200  shadow-indigo-100/30">
              <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
                Apply for this role
              </h3>
              {isSubmitted ? (
                <div className="bg-green-50 text-green-700 p-6  border border-green-200 text-center">
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
                      className="w-full px-4 py-3  border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3  border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3  border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3  border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto md:min-w-[200px] md:mx-auto flex justify-center items-center gap-2 bg-primary text-white font-bold py-4 px-8  hover:bg-primary/90 transition-all hover: hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <LuLoader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
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
