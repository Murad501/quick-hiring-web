import React from "react";
import type { IApplication } from "../../interface/application.interface";
import { useUpdateApplicationStatusMutation } from "../../redux/services/application/applicationApi";
import { LuX, LuFileText, LuMail } from "react-icons/lu";
import toast from "react-hot-toast";

interface ApplicationModalProps {
  application: IApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationModal({
  application,
  isOpen,
  onClose,
}: ApplicationModalProps) {
  const [updateStatus, { isLoading }] = useUpdateApplicationStatusMutation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Close dropdown if clicking outside (simple implementation by just handling it on blur or simple toggle)
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen || !application) return null;

  const handleStatusChange = async (newStatus: string) => {
    setIsDropdownOpen(false);
    try {
      await updateStatus({
        applicationId: application.applicationId || application._id,
        status: newStatus,
      }).unwrap();
      toast.success(`Application status updated to ${newStatus}`);
      onClose(); // Close modal on success
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "reviewed":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "interviewing":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "rejected":
        return "bg-red-50 text-red-600 border-red-200";
      case "hired":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const statuses = [
    { value: "new", label: "New" },
    { value: "reviewed", label: "Reviewed" },
    { value: "interviewing", label: "Interviewing" },
    { value: "rejected", label: "Rejected" },
    { value: "hired", label: "Hired" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white   w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Application Details
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              For candidate:{" "}
              <span className="font-semibold text-slate-700">
                {application.name}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">Email</p>
              <div className="flex items-center gap-2">
                <LuMail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 font-medium">
                  {application.email}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">
                Applied Date
              </p>
              <span className="text-slate-700 font-medium">
                {application.createdAt
                  ? new Date(application.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "Recent"}
              </span>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-bold text-slate-500 mb-1">Resume</p>
              <a
                href={application.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                <LuFileText className="w-4 h-4" /> View Resume inside new tab
              </a>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-sm font-bold text-slate-500 mb-2">Cover Note</p>
            <div className="bg-slate-50 p-4  border border-gray-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {application.coverNote ||
                "No cover note provided by the candidate."}
            </div>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="px-6 pb-6   flex items-center justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              disabled={isLoading}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2  border text-sm font-bold transition-colors ${getStatusColor(application.status)} ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-80"}`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <span className="capitalize">{application.status}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </>
              )}
            </button>

            {isDropdownOpen && !isLoading && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white   border border-gray-100 overflow-hidden transform origin-bottom-right">
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors ${application.status === status.value ? "bg-slate-50 text-primary" : "text-slate-700"}`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
