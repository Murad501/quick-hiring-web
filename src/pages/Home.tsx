import Hero from "../components/Home/Hero";
import CompaniesSection from "../components/Home/CompaniesSection";
import ExploreByCategory from "../components/Home/ExploreByCategory";
import FeaturedJobs from "../components/Home/FeaturedJobs";
import LatestJobs from "../components/Home/LatestJobs";
import CallToAction from "../components/Home/CallToAction";

export default function Home() {
  return (
    <div>
      <Hero />
      <CompaniesSection />
      <ExploreByCategory />
      <CallToAction />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
