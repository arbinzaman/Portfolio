import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Tech,
  Works,
  Recognitions,
  Socials,
  PhotoGallery,
  Certified,
  HobbyPortfolio,
  HobbyTravelLoader,
  TravelGalleryPage,
  TravelPhotoPage,
  TravelStoryPage,
  HobbyThemeProvider,
  SmartLoader,
  SoundToggle,
} from "./components";

const PortfolioScrollExperience = lazy(() =>
  import("./components/scrollExperience/PortfolioScrollExperience"),
);

const PortfolioContent = () => {
  const location = useLocation();
  const [backgroundReady, setBackgroundReady] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/hobby")) return undefined;
    const timeoutId = window.setTimeout(() => setBackgroundReady(true), 150);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  const isHobbyRoute = location.pathname.startsWith("/hobby");

  return (
    <>
      {!isHobbyRoute && <SmartLoader />}
      {isHobbyRoute && (
        <HobbyThemeProvider>
          <HobbyTravelLoader />
          {location.pathname === "/hobby/gallery" && <TravelGalleryPage />}
          {location.pathname.startsWith("/hobby/gallery/") && (
            <TravelPhotoPage />
          )}
          {location.pathname.startsWith("/hobby/stories/") && (
            <TravelStoryPage />
          )}
          {location.pathname === "/hobby" && <HobbyPortfolio />}

          {/* Floating Hobby Music Toggle (Charlie BGM) */}
          <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
            <SoundToggle variant="hobby" active={isHobbyRoute} />
          </div>
        </HobbyThemeProvider>
      )}

      {/* Main Coding Portfolio Music Toggle (Hidden on /hobby) */}
      {!isHobbyRoute && (
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
          <SoundToggle variant="portfolio" active={!isHobbyRoute} />
        </div>
      )}
      <div
        className={`relative isolate min-h-screen overflow-x-hidden bg-primary ${
          isHobbyRoute ? "hidden" : ""
        }`}
      >
      {backgroundReady && (
        <Suspense fallback={null}>
          <PortfolioScrollExperience />
        </Suspense>
      )}
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
          <Footer />
        </div>
      </div>
      </div>
    </>
  );
};

const App = () => {
  useEffect(() => {
    document.title = "Arbin Zaman — Software Engineer";

    const metaTags = [
      {
        name: "description",
        content:
          "Portfolio of Arbin Zaman, Software Engineer specializing in modern UI/UX and modern web technologies.",
      },
      { property: "og:title", content: "Arbin Zaman — Software Engineer" },
      {
        property: "og:description",
        content:
          "Explore the portfolio of Arbin Zaman, a software engineer skilled in React and modern development tools.",
      },
      { property: "og:url", content: "https://arbin.me" },
      {
        property: "og:image",
        content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Arbin Zaman — Software Engineer" },
      {
        name: "twitter:description",
        content:
          "React Developer Portfolio — Arbin Zaman. Showcasing frontend, full-stack and UI/UX development.",
      },
      {
        name: "twitter:image",
        content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
      },
      { name: "robots", content: "index, follow" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name
        ? `meta[name="${name}"]`
        : `meta[property="${property}"]`;
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

    let scriptTag = document.head.querySelector(
      'script[data-schema="arbin-person"]',
    );
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
