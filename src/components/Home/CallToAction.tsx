import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="common_container px-6 md:px-20 bg-white relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 min-h-[400px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat py-20 overflow-hidden"
          style={{ backgroundImage: "url('/Rectangle-bg.png')" }}
        ></div>

        {/* Text Content */}
        <div className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left text-white mt-8 md:mt-0">
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.15] mb-6">
            Start posting
            <br className="hidden md:block" /> jobs today
          </h2>
          <p className="text-lg text-white/90 mb-8 font-medium">
            Start posting jobs for only $10.
          </p>
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-block bg-white text-primary font-bold px-8 py-4 hover:bg-gray-50 transition-colors text-center"
          >
            Sign Up For Free
          </Link>
        </div>

        {/* Dashboard Image */}
        <div className="w-full md:w-6/12 relative flex justify-center md:justify-end items-end">
          <img
            src="/admin-dashboard.png"
            alt="Admin Dashboard Preview"
            className="w-full h-auto object-contain drop-shadow-2xl  md:mt-20"
          />
        </div>
      </div>
    </section>
  );
}
