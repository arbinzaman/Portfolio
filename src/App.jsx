import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Compass, MapPin, Sparkles } from "lucide-react";

import { logo } from "./assets";
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
  SoundToggle,
} from "./components";
import TravelGalleryPage from "./components/hobby/TravelGalleryPage";
import TravelPhotoPage from "./components/hobby/TravelPhotoPage";
import TravelStoryPage from "./components/hobby/TravelStoryPage";
const PortfolioScrollExperience = lazy(() =>
  import("./components/PortfolioScrollExperience"),
);

const footerNavLinks = [
  { label: "Overview", href: "#about" },
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Recognition", href: "#recognition" },
  { label: "Testimonials", href: "#feedback" },
  { label: "Contact", href: "#contact" },
];

const PortfolioContent = () => {
  const location = useLocation();
  const [backgroundReady, setBackgroundReady] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/hobby")) return undefined;

    let timeoutId;
    let idleCallbackId;
    const loadBackground = () => setBackgroundReady(true);

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(loadBackground, {
        timeout: 1200,
      });
    } else {
      timeoutId = window.setTimeout(loadBackground, 400);
    }

    return () => {
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.pathname]);

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
    <div className="relative isolate min-h-screen overflow-x-hidden bg-primary">
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

          <footer className="relative overflow-hidden border-t border-white/[0.1] bg-gradient-to-b from-transparent via-[#060816]/90 to-[#03050e] pt-12 pb-10 sm:pt-16 sm:pb-12">
            {/* 3D Perspective Horizon Grid Floor */}
            <div
              aria-hidden="true"
              className="perspective-floor h-60 opacity-60"
            >
              <div className="perspective-floor__plane" />
            </div>

            {/* Ambient Cosmic Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-56 w-[38rem] -translate-x-1/2 rounded-full bg-[#915EFF]/12 blur-[110px]"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
              {/* 3D CTA Deck */}
              <div className="plate-3d mb-10 sm:mb-12">
                <div className="plate-3d-face flex flex-col items-start justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:p-10">
                  <div className="max-w-2xl">
                    <div className="z-lift-sm mb-3 inline-flex flex-wrap items-center gap-2.5">
                      <span className="tag-3d !border-emerald-400/35 !text-emerald-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                        AVAILABLE FOR NEW OPPORTUNITIES
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/50">
                        <MapPin size={12} className="text-[#a78bfa]" />
                        Dhaka, Bangladesh
                      </span>
                    </div>
                    <h3 className="z-lift-md extrude-3d text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                      Have a project or idea in mind?
                    </h3>
                    <p className="z-lift-sm mt-2 text-sm leading-6 text-secondary sm:text-base">
                      Let&apos;s collaborate to build scalable web applications,
                      ERP systems, and interactive digital products.
                    </p>
                  </div>

                  <div className="z-lift-lg flex flex-wrap items-center gap-3">
                    <a
                      href="#contact"
                      className="key-3d key-3d--primary px-5 py-3.5 text-xs uppercase tracking-[0.12em]"
                    >
                      <Sparkles size={14} />
                      Let&apos;s talk
                      <ArrowUpRight size={15} />
                    </a>
                    <Link
                      to="/hobby"
                      className="key-3d key-3d--outline px-5 py-3.5 text-xs uppercase tracking-[0.12em]"
                    >
                      <Compass size={14} className="text-[#a78bfa]" />
                      Travel journal
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3-Column Architectural Footer Grid */}
              <div className="grid grid-cols-1 gap-8 border-t border-white/[0.08] py-8 md:grid-cols-12 md:items-center">
                {/* Brand Column */}
                <div className="flex flex-col gap-3 md:col-span-5">
                  <a
                    href="#intro"
                    className="group inline-flex w-fit items-center gap-3"
                    aria-label="Back to Arbin Zaman introduction"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] shadow-[0_3px_0_0_rgba(145,94,255,0.35)]">
                      <img
                        src={logo}
                        alt="Arbin Zaman logo"
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    <div>
                      <span className="block text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#c4b5fd]">
                        Arbin Zaman
                      </span>
                    </div>
                  </a>
                </div>

                {/* Navigation Pills Column */}
                <nav
                  aria-label="Footer navigation"
                  className="flex flex-wrap items-center gap-2 md:col-span-5 md:justify-center"
                >
                  {footerNavLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="tag-3d !text-[11px] !text-white/75 hover:!text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Back to Top Keycap Column */}
                <div className="flex md:col-span-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    aria-label="Back to top of page"
                    className="key-3d key-3d--outline group w-fit shrink-0 px-4 py-2.5 font-mono text-xs"
                  >
                    <span>Back to top</span>
                    <ArrowUp
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>

              {/* Bottom Signature Bar */}
              <div className="flex items-center justify-center border-t border-white/[0.06] pt-6 text-xs text-white/40 sm:justify-start">
                <p>
                  © {new Date().getFullYear()} Arbin Zaman · All rights reserved
                </p>
              </div>
            </div>
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
      <motion.div
        className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <SoundToggle />
      </motion.div>
    </BrowserRouter>
  );
};

export default App;
