import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import BangladeshSection from "./BangladeshSection";
import HobbyHero from "./HobbyHero";
import IndiaVideosSection from "./IndiaVideosSection";
import StoriesSection from "./StoriesSection";
import TravelOverview from "./TravelOverview";

const HobbyPortfolio = () => {
  useEffect(() => {
    document.title = "Arbin Zaman — Travel & Visual Stories";
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#17231f]">
      <HobbyHero />
      <BangladeshSection />
      <TravelOverview />
      <IndiaVideosSection />
      <StoriesSection />
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-[#17231f]/55 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <p>Arbin Zaman · Travel & visual stories</p>
        <Link to="/" className="font-medium text-[#36745e] hover:text-[#17231f]">
          Explore my engineering work →
        </Link>
      </footer>
    </main>
  );
};

export default HobbyPortfolio;
