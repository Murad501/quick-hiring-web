import { LuTriangle, LuX } from "react-icons/lu";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "red";
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-none w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-none ${confirmColor === "red" ? "bg-red-50 text-red-600" : "bg-primary/10 text-primary"}`}
            >
              <LuTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-200 rounded-none transition-colors disabled:opacity-50 text-sm"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 text-white font-bold rounded-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] text-sm ${
              confirmColor === "red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
