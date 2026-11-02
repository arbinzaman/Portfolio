import { useEffect } from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Recognitions,
  Socials,
  PhotoGallery,
  Certified,
  HobbyPortfolio,
} from "./components";
import TravelGalleryPage from "./components/hobby/TravelGalleryPage";
import TravelPhotoPage from "./components/hobby/TravelPhotoPage";
import TravelStoryPage from "./components/hobby/TravelStoryPage";
import PortfolioScrollExperience from "./components/PortfolioScrollExperience";

const PortfolioContent = () => {
  const location = useLocation();

  if (location.pathname === "/hobby/gallery") {
    return <TravelGalleryPage />;
  }

  if (location.pathname.startsWith("/hobby/gallery/")) {
    return <TravelPhotoPage />;
  }

  if (location.pathname.startsWith("/hobby/stories/")) {
    return <TravelStoryPage />;
  }

  if (location.pathname === "/hobby") {
    return <HobbyPortfolio />;
  }

  return (
    <div className="relative isolate min-h-screen bg-primary">
      <PortfolioScrollExperience />
      <div className="relative z-10">
        <div className="relative bg-transparent">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Recognitions />
        <Certified />
        <PhotoGallery />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <Socials />
          <footer className="border-t border-white/10 px-6 py-10 sm:px-12">
            <Link
              to="/hobby"
              className="group relative mx-auto flex max-w-xl items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#915EFF]/60 hover:bg-[#915EFF]/10 hover:shadow-[0_12px_40px_rgba(145,94,255,0.18)] sm:px-6"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#915EFF] to-cyan-400" />
              <span className="pl-2">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#915EFF]">
                  Beyond the screen
                </span>
                <span className="mt-1 block text-sm font-medium text-white">
                  Explore the places, stories, and miles behind the code
                </span>
              </span>
              <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[#915EFF] group-hover:bg-[#915EFF]">
                →
              </span>
            </Link>
            <p className="mt-4 text-center text-xs text-secondary/60">
              © 2026 Arbin Zaman · Software Engineer & Traveller
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.title = "Arbin Zaman — Software Engineer";

    const metaTags = [
      { name: "description", content: "Portfolio of Arbin Zaman, Software Engineer specializing in modern UI/UX and modern web technologies." },
      { property: "og:title", content: "Arbin Zaman — Software Engineer" },
      { property: "og:description", content: "Explore the portfolio of Arbin Zaman, a software engineer skilled in React and modern development tools." },
      { property: "og:url", content: "https://arbin.me" },
      { property: "og:image", content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Arbin Zaman — Software Engineer" },
      { name: "twitter:description", content: "React Developer Portfolio — Arbin Zaman. Showcasing frontend, full-stack and UI/UX development." },
      { name: "twitter:image", content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg" },
      { name: "robots", content: "index, follow" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let tag = document.head.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");
        if (name) tag.setAttribute("name", name);
        if (property) tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://arbin.me");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Arbin Zaman",
      alternateName: "Arbin",
      url: "https://arbin.me",
      jobTitle: "Software Engineer",
      image: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
      sameAs: [
        "https://www.linkedin.com/in/zamanarbin",
        "https://github.com/arbinzaman",
        "https://twitter.com/arbinzaman",
        "https://arbin.me",
        "https://arbin.vercel.app",
      ],
    };

    let scriptTag = document.head.querySelector('script[data-schema="arbin-person"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-schema", "arbin-person");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);
  }, []);

  return (
    <BrowserRouter>
      <PortfolioContent />
    </BrowserRouter>
  );
};

export default App;
