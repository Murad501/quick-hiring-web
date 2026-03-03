import { useState, useRef, useEffect } from "react";
import { LuBriefcase, LuChevronDown } from "react-icons/lu";

interface JobTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  triggerClassName?: string;
}

export default function JobTypeDropdown({
  value,
  onChange,
  options = ["All", "Full Time", "Part Time"],
  triggerClassName = "w-full flex items-center justify-between px-4 py-3 md:py-2 focus:outline-none",
}: JobTypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClassName}
      >
        <div className="flex items-center gap-3">
          <LuBriefcase className="w-5 h-5 text-slate-400 shrink-0" />
          <span
            className={`font-medium ${
              value === "All" ? "text-slate-400" : "text-slate-700"
            }`}
          >
            {value === "All" ? "All Job Types" : value}
          </span>
        </div>
        <LuChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 z-50">
          {options.map((option) => {
            const displayLabel = option === "All" ? "All Job Types" : option;
            return (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                  value === option
                    ? "text-primary font-bold bg-primary/5 border-l-2 border-primary"
                    : "text-slate-600 font-medium hover:bg-slate-50 border-l-2 border-transparent"
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
