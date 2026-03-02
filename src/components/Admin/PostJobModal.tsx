import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import { useCreateJobMutation } from "../../redux/api/jobApi";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    category: "Technology",
    description: "",
  });

  const [createJob, { isLoading }] = useCreateJobMutation();

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
      await createJob({
        ...formData,
        jobId: `JOB-${Date.now()}`,
        tags: [formData.category],
        sections: [
          {
            title: "Key Responsibilities",
            values: [
              "Lead the development of scalable applications.",
              "Collaborate closely with product and design teams.",
            ],
          },
          {
            title: "Requirements",
            values: [
              "Proven experience in the relevant tech stack.",
              "Strong communication and problem-solving skills.",
            ],
          },
        ],
      }).unwrap();

      alert("Job Posted Successfully!");
      onClose();
      // Reset form
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "Full Time",
        category: "Technology",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to post the job. Please try again.");
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
          <h2 className="text-2xl font-bold text-slate-800">Post a New Job</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
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

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Category & Type *
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-1/2 px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors bg-white font-medium text-slate-700"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-1/2 px-4 py-3 rounded-none border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors bg-white font-medium text-slate-700"
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
            ) : (
              "Post Job"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
