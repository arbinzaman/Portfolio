import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet"; // ✅ Import Helmet

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
      {/* ✅ Structured data for Google Knowledge Panel */}
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Arbin Zaman",
              "alternateName": "Arbin",
              "url": "https://arbin.me",
              "jobTitle": "Software Engineer",
              "image": "./assets/arbinzaman.jpg",
              "sameAs": [
                "https://www.linkedin.com/in/zamanarbin",
                "https://github.com/arbinzaman",
                "https://twitter.com/arbinzaman",
                "https://arbin.me"
              ]
            }
          `}
        </script>
        <title>Arbin Zaman — Software Engineer</title>
        <meta
          name="description"
          content="Portfolio of Arbin Zaman, Software Engineer specializing in modern UI/UX and modern web technologies."
        />
      </Helmet>

      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Recognitions />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
          <Socials />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
