import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Recognitions,
  Socials,
  PhotoGallery,
  Certified,
} from "./components";

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
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
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
          <StarsCanvas />
          <Socials />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
