import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import {
  useCreateJobMutation,
  useGetCompaniesQuery,
  useUpdateJobMutation,
} from "../../redux/services/job/jobApi";
import type { IJob } from "../../interface/job.interface";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: IJob | null;
}

export default function PostJobModal({
  isOpen,
  onClose,
  job,
}: PostJobModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    category: "Technology",
    description: "",
    sections: [{ title: "", values: [""] }],
  });

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const isLoading = isCreating || isUpdating;

  const { data: companies } = useGetCompaniesQuery();

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        type: job.type || "Full Time",
        category: job.category || "Technology",
        description: job.description || "",
        sections:
          job.sections && job.sections.length > 0
            ? job.sections.map((s) => ({
                title: s.title,
                values: [...s.values],
              }))
            : [{ title: "", values: [""] }],
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "Full Time",
        category: "Technology",
        description: "",
        sections: [{ title: "", values: [""] }],
      });
    }
  }, [job, isOpen]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    sIndex: number,
    vIndex: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSections = [...formData.sections];
      newSections[sIndex].values.splice(vIndex + 1, 0, "");
      setFormData({ ...formData, sections: newSections });

      // Focus the new input in the next tick
      setTimeout(() => {
        const inputs = document.querySelectorAll(
          `[data-section="${sIndex}"]`,
        ) as NodeListOf<HTMLInputElement>;
        if (inputs[vIndex + 1]) {
          inputs[vIndex + 1].focus();
        }
      }, 0);
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (job) {
        await updateJob({
          jobId: job.jobId,
          data: {
            ...formData,
            tags: [formData.category],
          },
        }).unwrap();
        toast.success("Job Updated Successfully!");
      } else {
        await createJob({
          ...formData,
          jobId: `JOB-${Date.now()}`,
          tags: [formData.category],
        }).unwrap();
        toast.success("Job Posted Successfully!");
      }

      onClose();
      if (!job) {
        // Reset form only on creation
        setFormData({
          title: "",
          company: "",
          location: "",
          type: "Full Time",
          category: "Technology",
          description: "",
          sections: [{ title: "", values: [""] }],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(
        `Failed to ${job ? "update" : "post"} the job. Please try again.`,
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-none w-full max-w-2xl shadow-none relative z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-slate-800">
            {job ? "Edit Job" : "Post a New Job"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-none transition-colors"
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        {/* Body (Scrollable form) */}
        <div className="p-6 overflow-y-auto">
          <form
            id="post-job-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <select
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors bg-white font-medium text-slate-700"
                  >
                    <option value="" disabled>
                      Select Company
                    </option>
                    {companies?.map((company) => (
                      <option key={company.name} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors bg-white font-medium text-slate-700"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Job Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors bg-white font-medium text-slate-700"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Job Description *
              </label>
              <textarea
                required
                rows={6}
                placeholder="Describe the responsibilities, requirements, and benefits..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            {/* Dynamic Sections */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-lg font-bold text-slate-800">
                  Job Sections
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      sections: [
                        ...formData.sections,
                        { title: "", values: [""] },
                      ],
                    })
                  }
                  className="text-primary hover:text-primary/80 font-bold text-sm"
                >
                  + Add New Section
                </button>
              </div>

              {formData.sections.map((section, sIndex) => (
                <div
                  key={sIndex}
                  className="p-4 bg-slate-50 border border-slate-100 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-full mr-4">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Responsibilities"
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...formData.sections];
                          newSections[sIndex].title = e.target.value;
                          setFormData({ ...formData, sections: newSections });
                        }}
                        className="w-full px-3 py-2 rounded-none border border-gray-200 focus:border-primary focus:outline-none bg-white font-bold"
                      />
                    </div>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newSections = formData.sections.filter(
                            (_, i) => i !== sIndex,
                          );
                          setFormData({ ...formData, sections: newSections });
                        }}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <LuX className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase">
                      Bullet Points
                    </label>
                    {section.values.map((value, vIndex) => (
                      <div key={vIndex} className="flex gap-2">
                        <input
                          type="text"
                          required
                          data-section={sIndex}
                          placeholder="Add a point..."
                          value={value}
                          onKeyDown={(e) => handleKeyDown(e, sIndex, vIndex)}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[sIndex].values[vIndex] = e.target.value;
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="flex-1 px-3 py-2 rounded-none border border-gray-200 focus:border-primary focus:outline-none bg-white text-sm"
                        />
                        {section.values.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSections = [...formData.sections];
                              newSections[sIndex].values = newSections[
                                sIndex
                              ].values.filter((_, i) => i !== vIndex);
                              setFormData({
                                ...formData,
                                sections: newSections,
                              });
                            }}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <LuX className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newSections = [...formData.sections];
                        newSections[sIndex].values.push("");
                        setFormData({ ...formData, sections: newSections });
                      }}
                      className="text-primary hover:text-primary/80 font-bold text-xs self-start"
                    >
                      + Add Bullet Point
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-slate-50 rounded-none">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-none transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="post-job-form"
            disabled={isLoading}
            className="px-8 py-3 bg-primary text-white font-bold rounded-none hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : job ? (
              "Update Job"
            ) : (
              "Post Job"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
