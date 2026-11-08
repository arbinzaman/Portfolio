import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ResponsiveTilt from "../common/ResponsiveTilt";
import OptimizedImage from "../common/OptimizedImage";

import { recognitions } from "../../constants";
import { styles } from "../../styles";
import britishCouncilLogo from "../../assets/recognization/britishCouncilLogo.svg";
import "swiper/css";

const certifiedBy = [
  ...recognitions
    .filter((item) => item.logo)
    .map(({ logo, organization, title }) => ({ logo, organization, title })),
  {
    logo: britishCouncilLogo,
    organization: "British Council",
    label: "IELTS · British Council",
  },
];

const Certified = () => {
  return (
    <section
      id="credentials"
      data-portfolio-chapter="credentials"
      className="portfolio-section-band relative w-full overflow-hidden px-6 py-16 sm:px-16 sm:py-24"
    >
      <div aria-hidden="true" className="perspective-floor h-32 opacity-55">
        <div className="perspective-floor__plane" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <p className={`${styles.sectionSubText} text-white/45`}>
            Professional milestones
          </p>
          <h2 className="extrude-3d mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            <span
              data-text="Recognition & credentials"
              className="exploded-type-3d"
            >
              Recognition &amp; credentials
            </span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1600}
          loop={false}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 28 },
            1024: { slidesPerView: 5, spaceBetween: 32 },
          }}
          className="mt-12 !py-4"
        >
          {certifiedBy.map(({ logo, organization, title, label }, idx) => (
            <SwiperSlide key={`${organization}-${title || idx}`}>
              <ResponsiveTilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.03}
                transitionSpeed={400}
                className="plate-3d group"
              >
                <div className="plate-3d-face flex h-32 flex-col items-center justify-center gap-3 px-4 py-4">
                  <div className="z-lift-lg flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-2 shadow-[0_4px_0_0_rgba(145,94,255,0.28)]">
                    <OptimizedImage
                      src={logo}
                      alt={`${organization} logo`}
                      width={104}
                      height={40}
                      maxMobileDim={256}
                      className="h-10 max-w-[6.5rem] object-contain grayscale opacity-70 sm:transition-all sm:duration-500 sm:group-hover:grayscale-0 sm:group-hover:opacity-100"
                    />
                  </div>
                  <p className="z-lift-sm line-clamp-1 text-center font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 transition-colors duration-300 group-hover:text-white/95">
                    {label || organization}
                  </p>
                </div>
              </ResponsiveTilt>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Certified;
