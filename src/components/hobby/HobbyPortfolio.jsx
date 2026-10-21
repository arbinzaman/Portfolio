import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import HobbyHero from "./HobbyHero";

const BangladeshSection = lazy(() => import("./BangladeshSection"));
const TravelGallery = lazy(() => import("./TravelGallery"));
const StoriesSection = lazy(() => import("./StoriesSection"));

const SectionFallback = () => (
  <div
    className="mx-auto min-h-[18rem] max-w-7xl animate-pulse px-6 py-20 sm:px-12"
    aria-hidden="true"
  >
    <div className="h-3 w-28 rounded-full bg-[#17231f]/10" />
    <div className="mt-5 h-10 max-w-md rounded-xl bg-[#17231f]/10" />
    <div className="mt-8 h-32 rounded-[1.5rem] bg-[#17231f]/5" />
  </div>
);

const DeferredSection = ({ children, id }) => {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id={id}>
      {shouldRender ? children : <SectionFallback />}
    </div>
  );
};

const HobbyPortfolio = () => {
  useEffect(() => {
    const travelMetadata = [
      {
        name: "description",
        content:
          "Arbin Zaman is an avid traveller from Bangladesh and software engineer exploring destinations, districts, and cultures through travel photography, cinematic videos, and visual storytelling.",
      },
      {
        name: "keywords",
        content:
          "Arbin Zaman traveller, Bangladesh traveller, Bangladesh travel map, Bangladesh travel photographer, Bangladesh districts, India travel, travel photography Bangladesh, travel videos, software engineer Bangladesh, React developer Bangladesh",
      },
      { name: "author", content: "Arbin Zaman" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: "Arbin Zaman — Travel & Visual Stories" },
      {
        property: "og:title",
        content: "Arbin Zaman | Traveller from Bangladesh & Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Meet Arbin Zaman, an avid traveller from Bangladesh and software engineer sharing destination films, travel photography, district maps, and stories from a life on the road.",
      },
      { property: "og:url", content: "https://arbin.vercel.app/hobby" },
      { property: "og:image", content: "https://github.com/arbinzaman.png" },
      { property: "og:image:alt", content: "Arbin Zaman — traveller from Bangladesh" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Arbin Zaman | Traveller from Bangladesh",
      },
      {
        name: "twitter:description",
        content:
          "Arbin Zaman is an avid traveller from Bangladesh and software engineer capturing destinations, landscapes, and cultures through film and photography.",
      },
      { name: "twitter:image", content: "https://github.com/arbinzaman.png" },
    ];

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");
    const applyTravelIdentity = () => {
      document.title =
        "Arbin Zaman | Traveller from Bangladesh & Software Engineer";
      if (canonical) {
        canonical.setAttribute("href", "https://arbin.vercel.app/hobby");
      }
      travelMetadata.forEach(({ name, property, content }) => {
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
    };
    const identityFrame = window.requestAnimationFrame(applyTravelIdentity);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://arbin.vercel.app/hobby#profile",
          url: "https://arbin.vercel.app/hobby",
          name: "Arbin Zaman — Travel & Visual Stories",
          description:
            "Travel portfolio of Arbin Zaman, an avid traveller from Bangladesh and software engineer.",
          mainEntity: { "@id": "https://arbin.vercel.app/#person" },
        },
        {
          "@type": "Person",
          "@id": "https://arbin.vercel.app/#person",
          name: "Arbin Zaman",
          alternateName: [
            "Arbin Zaman traveller",
            "Arbin Zaman software engineer",
          ],
          url: "https://arbin.vercel.app/",
          image: "https://github.com/arbinzaman.png",
          jobTitle: "Software Engineer",
          description:
            "Avid traveller from Bangladesh, software engineer, photographer, and visual storyteller.",
          homeLocation: {
            "@type": "Country",
            name: "Bangladesh",
          },
          knowsAbout: [
            "Travel photography",
            "Travel videography",
            "Bangladesh districts",
            "India travel",
            "React.js",
            "Node.js",
            "Full-stack web development",
          ],
          sameAs: [
            "https://github.com/arbinzaman",
            "https://www.linkedin.com/in/zamanarbin/",
            "https://www.instagram.com/zamanarbin/",
            "https://www.youtube.com/@zamanarbin",
            "https://arbin.vercel.app/",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://arbin.vercel.app/#website",
          url: "https://arbin.vercel.app/",
          name: "Arbin Zaman",
          description:
            "The portfolio of Arbin Zaman, an avid traveller from Bangladesh and software engineer.",
          publisher: { "@id": "https://arbin.vercel.app/#person" },
        },
      ],
    };

    let schemaTag = document.head.querySelector(
      'script[data-schema="arbin-travel"]',
    );
    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.setAttribute("type", "application/ld+json");
      schemaTag.setAttribute("data-schema", "arbin-travel");
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(schema);

    return () => {
      window.cancelAnimationFrame(identityFrame);
      document.title = "Arbin Zaman — Software Engineer";
      if (canonical && previousCanonical) {
        canonical.setAttribute("href", previousCanonical);
      }
      schemaTag.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#17231f]">
      <HobbyHero />
      <DeferredSection id="journeys">
        <Suspense fallback={<SectionFallback />}>
          <BangladeshSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="gallery">
        <Suspense fallback={<SectionFallback />}>
          <TravelGallery />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="stories">
        <Suspense fallback={<SectionFallback />}>
          <StoriesSection />
        </Suspense>
      </DeferredSection>
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
