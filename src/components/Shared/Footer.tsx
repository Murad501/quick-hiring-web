import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const ABOUT_LINKS = [
  { name: "Companies", path: "/companies" },
  { name: "Pricing", path: "/pricing" },
  { name: "Terms", path: "/terms" },
  { name: "Advice", path: "/advice" },
  { name: "Privacy Policy", path: "/privacy" },
];

const RESOURCES_LINKS = [
  { name: "Help Docs", path: "/help" },
  { name: "Guide", path: "/guide" },
  { name: "Updates", path: "/updates" },
  { name: "Contact Us", path: "/contact" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", icon: FaFacebookF, url: "#" },
  { name: "Instagram", icon: FaInstagram, url: "#" },
  { name: "Dribbble", icon: FaDribbble, url: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "#" },
  { name: "Twitter", icon: FaTwitter, url: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#202430] py-16 mt-auto">
      <div className="common_container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Logo & Text */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 font-bold text-xl text-white"
            >
              <img src="/Logo 2.png" alt="Quick Hire Logo" className="h-8" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* Column 2: About */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">About</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-400">
              {ABOUT_LINKS.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-400">
              {RESOURCES_LINKS.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold mb-6">
              Get job notifications
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                required
                className="flex-1 bg-white text-slate-900 px-4 py-3 focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-[#4a47e6] hover:bg-[#3f3ccc] text-white px-6 py-3 font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700/50 w-full mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-sm">
            {new Date().getFullYear()} © QuickHire. All rights reserved.
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <span className="sr-only">{social.name}</span>
                <social.icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
