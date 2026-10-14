import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { recognitions } from "../constants";
import { styles } from "../styles";
import "swiper/css";

const certifiedBy = recognitions
  .filter((item) => item.logo)
  .map(({ logo, organization, title }) => ({ logo, organization, title }));

const Certified = () => {
  return (
    <section className="w-full overflow-hidden border-y border-white/10 bg-primary px-6 py-14 sm:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className={`${styles.sectionSubText} text-white/45`}>
            Recognized by
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Certified By
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
          loop={certifiedBy.length > 4}
          slidesPerView={3}
          spaceBetween={28}
          breakpoints={{
            640: { slidesPerView: 4, spaceBetween: 36 },
            1024: { slidesPerView: 6, spaceBetween: 48 },
          }}
          className="mt-12"
        >
          {certifiedBy.map(({ logo, organization, title }) => (
            <SwiperSlide key={`${organization}-${title}`}>
              <div className="group flex h-28 flex-col items-center justify-center gap-4 px-3">
                <img
                  src={logo}
                  alt={`${organization} logo`}
                  className="h-12 max-w-[8rem] object-contain grayscale opacity-55 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <p className="line-clamp-1 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-white/80">
                  {organization}
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
