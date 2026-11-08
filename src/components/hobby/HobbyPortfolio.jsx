import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import HobbyHero from "./layout/HobbyHero";
import HobbyFooter from "./layout/HobbyFooter";

const BangladeshSection = lazy(() => import("./sections/BangladeshSection"));
const TravelGallery = lazy(() => import("./sections/TravelGallery"));
const FeaturedFilmsSection = lazy(
  () => import("./sections/FeaturedFilmsSection"),
);
const StoriesSection = lazy(() => import("./sections/StoriesSection"));
const HobbyContactSection = lazy(
  () => import("./sections/HobbyContactSection"),
);

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
          "Arbin Zaman is an avid traveller, filmmaker, and visual storyteller from Bangladesh. Create your custom 3D Bangladesh 64-district travel map or 176-country World Travel Map, download high-resolution travel posters, and explore award-winning films and photography across Bangladesh and India.",
      },
      {
        name: "keywords",
        content:
          "Bangladesh travel map creator, 64 districts of Bangladesh map generator, visited districts of Bangladesh calculator, world travel map creator, custom travel map maker online, interactive Bangladesh map 64 districts, Arbin Zaman traveller, Md Arbin Zaman travel portfolio, Bangladesh travel blogger, Bangladeshi filmmaker, UITS videography contest winner ZeroOne Fest 5, Untold Story of Security Guard film, Tanguar Haor photography, Sajek Bandarban travel, Sikkim Meghalaya Darjeeling travel guide from Bangladesh, countries visited map generator free, travel photographer Dhaka Bangladesh",
      },
      { name: "author", content: "Arbin Zaman" },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:site_name",
        content: "Arbin Zaman — Traveller, Map Creator & Visual Storyteller",
      },
      {
        property: "og:title",
        content:
          "Arbin Zaman — Traveller, Visual Storyteller & 3D Travel Map Creator",
      },
      {
        property: "og:description",
        content:
          "Interactive 3D Bangladesh 64-District Map Creator & World Travel Map Generator by Arbin Zaman. Track visited districts and countries, download custom travel map posters, and watch award-winning travel films.",
      },
      { property: "og:url", content: "https://arbin.vercel.app/hobby" },
      {
        property: "og:image",
        content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
      },
      {
        property: "og:image:alt",
        content:
          "Arbin Zaman — Traveller, Visual Storyteller & Travel Map Creator from Bangladesh",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Arbin Zaman — Traveller, Visual Storyteller & 3D Travel Map Creator",
      },
      {
        name: "twitter:description",
        content:
          "Calculate your visited Bangladesh 64 districts and 176 world countries, download your custom 3D travel map poster, and explore Arbin Zaman's visual stories.",
      },
      {
        name: "twitter:image",
        content: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
      },
    ];

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");
    const applyTravelIdentity = () => {
      document.title =
        "Arbin Zaman — Traveller, Visual Storyteller & Filmmaker";
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
          name: "Arbin Zaman — Traveller, Visual Storyteller & Filmmaker",
          description:
            "Official travel portfolio, filmmaker showcase, and interactive 3D Bangladesh 64-District & World Travel Map Creator by Arbin Zaman.",
          mainEntity: { "@id": "https://arbin.vercel.app/#person" },
        },
        {
          "@type": "WebApplication",
          "@id": "https://arbin.vercel.app/hobby#bangladesh-map-creator",
          name: "Bangladesh 64-District Travel Map Creator & Calculator",
          alternateName: [
            "Bangladesh Visited Districts Map Generator",
            "64 Districts of Bangladesh Interactive Map",
            "Custom Bangladesh Travel Map Maker",
          ],
          url: "https://arbin.vercel.app/hobby#journeys",
          applicationCategory: "TravelApplication",
          operatingSystem: "All Web Browsers (Desktop & Mobile)",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Interactive 3D map of all 64 districts of Bangladesh across 8 divisions",
            "Real-time calculation of visited districts, divisions, and completion percentage",
            "Custom traveler name badge and instant high-resolution PNG travel poster download",
            "District filter by Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh divisions",
          ],
          author: { "@id": "https://arbin.vercel.app/#person" },
          description:
            "Free interactive 3D Bangladesh 64-district travel map creator. Select the districts of Bangladesh you have visited, calculate your travel stats across all 8 divisions, and download a personalized travel map poster.",
        },
        {
          "@type": "WebApplication",
          "@id": "https://arbin.vercel.app/hobby#world-map-creator",
          name: "World Travel Map Creator & Visited Countries Calculator",
          alternateName: [
            "Countries Visited Map Generator",
            "Custom World Travel Atlas Maker",
          ],
          url: "https://arbin.vercel.app/hobby#journeys",
          applicationCategory: "TravelApplication",
          operatingSystem: "All Web Browsers (Desktop & Mobile)",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Interactive 3D world map covering 176 countries and 6 continents",
            "Search and select visited countries with instant world coverage percentage",
            "Downloadable custom World Travel Map poster with traveler name",
          ],
          author: { "@id": "https://arbin.vercel.app/#person" },
          description:
            "Create your custom World Travel Map online. Select the countries you have visited across Asia, Europe, Africa, Americas, and Oceania, and download a shareable high-resolution world map poster.",
        },
        {
          "@type": "VideoObject",
          "@id": "https://arbin.vercel.app/hobby#featured-award-film",
          name: "Untold Story of Security Guard — 1st Place Winner (UITS Videography Contest, ZeroOne Fest 5)",
          description:
            "Awarded 1st Place in the UITS Videography Contest at ZeroOne Fest 5 and showcased live on the main monitor among 500+ attendees. Directed and filmed by Arbin Zaman.",
          thumbnailUrl: "https://i.ytimg.com/vi/SxExkBBE0fs/maxresdefault.jpg",
          uploadDate: "2024-01-01T00:00:00+06:00",
          embedUrl: "https://www.youtube.com/embed/SxExkBBE0fs",
          contentUrl: "https://www.youtube.com/watch?v=SxExkBBE0fs",
          director: { "@id": "https://arbin.vercel.app/#person" },
        },
        {
          "@type": "Person",
          "@id": "https://arbin.vercel.app/#person",
          name: "Arbin Zaman",
          alternateName: [
            "Md. Arbin Zaman",
            "Arbin Zaman Traveller",
            "Arbin Zaman Filmmaker",
            "Arbin Zaman Software Engineer",
          ],
          url: "https://arbin.vercel.app/hobby",
          image: "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
          email: "mailto:arbinzmn@gmail.com",
          jobTitle: "Software Engineer, Traveller & Visual Storyteller",
          award:
            "1st Place Winner — UITS Videography Contest at ZeroOne Fest 5",
          description:
            "Avid traveller from Bangladesh, award-winning filmmaker, travel photographer, creator of the interactive 3D Bangladesh 64-District & World Travel Map Generator, and software engineer.",
          homeLocation: {
            "@type": "Place",
            name: "Dhaka, Bangladesh",
          },
          knowsAbout: [
            "Bangladesh 64 districts travel",
            "Interactive Travel Map Creator",
            "World Travel Map Generator",
            "Travel Photography",
            "Documentary & Travel Filmmaking",
            "Himalayas & Northeast India Travel (Sikkim, Meghalaya, Darjeeling)",
            "Software Engineering & WebGL 3D Visualization",
          ],
          sameAs: [
            "https://github.com/arbinzaman",
            "https://www.linkedin.com/in/zamanarbin/",
            "https://www.instagram.com/zamanarbin/",
            "https://www.youtube.com/@zamanarbin",
            "https://www.facebook.com/zamanarbin/",
            "https://arbin.me",
            "https://arbin.vercel.app/",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": "https://arbin.vercel.app/hobby#faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "How can I create my own Bangladesh 64-district visited travel map?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On Arbin Zaman's Travel Portfolio (/hobby#journeys), click 'Create Your Map' on the 3D Bangladesh Atlas, enter your name, click or search the districts you have visited out of all 64 districts of Bangladesh, and click 'Download My Map' to save a high-resolution PNG travel poster.",
              },
            },
            {
              "@type": "Question",
              name: "Can I create a custom World Travel Map of countries I have visited?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Switch the atlas view to 'World Map' or click 'Create Your World Map' to select from 176 countries across 6 continents, track your global coverage percentage, and download a custom World Travel Map poster for free.",
              },
            },
          ],
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
      <DeferredSection id="films">
        <Suspense fallback={<SectionFallback />}>
          <FeaturedFilmsSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="stories">
        <Suspense fallback={<SectionFallback />}>
          <StoriesSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="contact">
        <Suspense fallback={<SectionFallback />}>
          <HobbyContactSection />
        </Suspense>
      </DeferredSection>

      {/* Visually Hidden Semantic SEO Directory (Invisible in UI, indexed by search crawlers) */}
      <section
        className="sr-only"
        aria-label="Travel Map Creator, Visited Districts & Visual Storytelling Directory"
      >
        <h2>
          Arbin Zaman — Bangladesh Travel Map Creator, World Travel Map
          Generator, Filmmaker &amp; Travel Photographer
        </h2>
        <p>
          Welcome to the travel and visual storytelling portfolio of Md. Arbin
          Zaman (arbinzmn@gmail.com), an avid traveller, documentary filmmaker,
          photographer, and software engineer from Dhaka, Bangladesh. Use the
          free interactive 3D Bangladesh 64-District Travel Map Creator and
          176-Country World Travel Map Generator to mark the places you have
          visited, calculate your travel statistics, and download a custom
          high-resolution travel map poster.
        </p>

        <h3>
          Interactive 3D Bangladesh 64-District Map Creator &amp; Calculator
        </h3>
        <p>
          Track and generate your personalized visited map across all 8
          divisions and 64 districts of Bangladesh: Dhaka Division (Dhaka,
          Gazipur, Narayanganj, Narsingdi, Tangail, Kishoreganj, Manikganj,
          Munshiganj, Rajbari, Faridpur, Gopalganj, Madaripur, Shariatpur),
          Chattogram Division (Chattogram, Cox&apos;s Bazar, Bandarban,
          Rangamati, Khagrachhari, Cumilla, Brahmanbaria, Chandpur, Feni,
          Lakshmipur, Noakhali), Sylhet Division (Sylhet, Sunamganj, Moulvibazar,
          Habiganj), Rajshahi Division (Rajshahi, Bogura, Pabna, Sirajganj,
          Naogaon, Natore, Chapainawabganj, Joypurhat), Khulna Division (Khulna,
          Jashore, Kushtia, Satkhira, Bagerhat, Jhenaidah, Magura, Meherpur,
          Narail, Chuadanga), Barishal Division (Barishal, Patuakhali, Bhola,
          Pirojpur, Barguna, Jhalokati), Rangpur Division (Rangpur, Dinajpur,
          Kurigram, Gaibandha, Nilphamari, Panchagarh, Thakurgaon, Lalmonirhat),
          and Mymensingh Division (Mymensingh, Netrokona, Jamalpur, Sherpur).
        </p>

        <h3>
          Landmark Destinations Photographed &amp; Filmed Across Bangladesh &amp;
          India
        </h3>
        <ul>
          <li>
            Haors, Rivers &amp; Coast of Bangladesh: Tanguar Haor, Shimul Bagan
            (Sunamganj), Saint Martin&apos;s Coral Island, Chera Dwip, Cox&apos;s
            Bazar Marine Drive, Nikli &amp; Netrokona Haor, Bichnakandi, Lala
            Khal, Jaflong (Sylhet), Padma Riverfront (Rajshahi), Meghna River
            Alexander &amp; Chairman Ghat (Noakhali), Bhairab Railway Bridge.
          </li>
          <li>
            Hills, Rainforests &amp; Waterfalls: Mirinja Valley (Lama,
            Bandarban), Kaptai &amp; Hanging Bridge (Rangamati), Chandranath
            Peak, Supto Dhara &amp; Napittachora Waterfalls (Sitakunda),
            Mohamaya Lake (Mirsarai), Lawachara National Park &amp; Satchari
            Rainforest (Moulvibazar &amp; Habiganj), Bhawal National Park
            (Gazipur).
          </li>
          <li>
            Heritage &amp; Architecture: Ahsan Manzil Pink Palace (Old Dhaka),
            Shalban Buddhist Vihara (Mainamati, Cumilla), Tangail Circuit House.
          </li>
          <li>
            India &amp; Himalayan Journeys: East Sikkim, Nathula Pass &amp;
            Gangtok (Sikkim), Living Root Bridges, Dawki &amp; Cherrapunji
            (Meghalaya), Darjeeling &amp; Siliguri Himalayan Tea Hills (West
            Bengal), Howrah Bridge &amp; Victoria Memorial (Kolkata), and the
            Taj Mahal (Agra, Uttar Pradesh).
          </li>
          <li>
            Award-Winning Filmmaking: Untold Story of Security Guard — 1st Place
            Winner at the UITS Videography Contest (ZeroOne Fest 5), screened
            live before 500+ viewers, alongside vertical travel reels and
            cinematic visual stories.
          </li>
        </ul>
      </section>

      <HobbyFooter />
    </main>
  );
};

export default HobbyPortfolio;
