import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

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
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      {/* SEO + Google Knowledge Panel Structured Data */}
      <Helmet>
        <title>Arbin Zaman — Software Engineer</title>
        <meta
          name="description"
          content="Portfolio of Arbin Zaman, Software Engineer specializing in modern UI/UX and modern web technologies."
        />
        <meta property="og:title" content="Arbin Zaman — Software Engineer" />
        <meta
          property="og:description"
          content="Explore the portfolio of Arbin Zaman, a software engineer skilled in React and modern development tools."
        />
        <meta property="og:url" content="https://arbin.me" />
        <meta property="og:image" content="https://i.ibb.co/zhjfpq71/arbinzaman.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arbin Zaman — Software Engineer" />
        <meta
          name="twitter:description"
          content="React Developer Portfolio — Arbin Zaman. Showcasing frontend, full-stack and UI/UX development."
        />
        <meta name="twitter:image" content="https://i.ibb.co/zhjfpq71/arbinzaman.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://arbin.me" />

        {/* Google Knowledge Panel Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Arbin Zaman",
            "alternateName": "Arbin",
            "url": "https://arbin.me",
            "jobTitle": "Software Engineer",
            "image": "https://i.ibb.co/zhjfpq71/arbinzaman.jpg",
            "sameAs": [
              "https://www.linkedin.com/in/zamanarbin",
              "https://github.com/arbinzaman",
              "https://twitter.com/arbinzaman",
              "https://arbin.me",
              "https://arbin.vercel.app"
            ]
          }
        `}
        </script>
      </Helmet>

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
