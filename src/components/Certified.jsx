import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { recognitions } from "../constants";
import { styles } from "../styles";
import britishCouncilLogo from "../assets/recognization/britishCouncilLogo.svg";
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
      className="portfolio-section-band relative w-full overflow-hidden px-6 py-16 sm:px-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className={`${styles.sectionSubText} text-white/45`}>
            Professional milestones
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            Recognition &amp; credentials
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
          loop={certifiedBy.length > 6}
          slidesPerView={3}
          spaceBetween={28}
          breakpoints={{
            640: { slidesPerView: 4, spaceBetween: 36 },
            1024: { slidesPerView: 6, spaceBetween: 48 },
          }}
          className="mt-12"
        >
          {certifiedBy.map(({ logo, organization, title, label }) => (
            <SwiperSlide key={`${organization}-${title}`}>
              <div className="portfolio-panel-hover group flex h-28 flex-col items-center justify-center gap-4 rounded-2xl border border-transparent px-3">
                <img
                  src={logo}
                  alt={`${organization} logo`}
                  className="h-12 max-w-[8rem] object-contain grayscale opacity-55 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <p className="line-clamp-1 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-white/45 transition-colors duration-300 group-hover:text-white/80">
                  {label || organization}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Certified;
