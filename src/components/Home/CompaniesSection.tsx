const COMPANIES = [
  { name: "Vodafone", logo: "/companies/vodafone.png" },
  { name: "Intel", logo: "/companies/intel.png" },
  { name: "Tesla", logo: "/companies/tesla.png" },
  { name: "AMD", logo: "/companies/amd.png" },
  { name: "Talkit", logo: "/companies/talkit.png" },
];

export default function CompaniesSection() {
  return (
    <section className="py-16">
      <div className="common_container">
        <h3 className="text-gray-500 text-base mb-10">
          Companies we helped grow
        </h3>

        <div className="flex flex-wrap justify-between items-center gap-10 md:gap-4">
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className="flex items-center  justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-8 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
