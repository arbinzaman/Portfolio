import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { galleryPhotos } from "./../constants/index";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!galleryPhotos || galleryPhotos.length === 0) return null;

  return (
    <section
      id="gallery"
      data-portfolio-chapter="gallery"
      className="portfolio-section-band relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#915EFF]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
          Press &amp; media
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-3xl font-semibold tracking-[-0.04em] text-white sm:mb-10 sm:text-4xl md:text-5xl"
        >
          Featured stories
        </motion.h2>

        {/* Swiper: Event by Event */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={galleryPhotos.length > 1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
        >
          {galleryPhotos.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-4 sm:gap-6">
                <h3 className="text-lg font-semibold tracking-tight text-[#c4b5fd] sm:text-xl md:text-2xl">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  {event.description}
                </p>

                {/* Images */}
                {event.images?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${event.title} ${idx + 1}`}
                        className="portfolio-panel-hover h-48 w-full cursor-pointer rounded-2xl border border-white/10 object-cover shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:scale-[1.02] sm:h-60 md:h-72 lg:h-80"
                        onClick={() => setSelectedImage(img)}
                        initial={{ opacity: 0.8 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </div>
                ) : event.embedUrl ? (
                  <div className="w-full aspect-video sm:aspect-[16/9] relative">
                    <iframe
                      src={event.embedUrl}
                      className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
                      style={{ border: "none" }}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title={event.title}
                    ></iframe>
                  </div>
                ) : event.imageUrl ? (
                  <motion.img
                    src={event.imageUrl}
                    alt={event.title}
                    className="portfolio-panel-hover h-48 w-full cursor-pointer rounded-2xl border border-white/10 object-cover shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:scale-[1.02] sm:h-60 md:h-72 lg:h-80"
                    onClick={() => setSelectedImage(event.imageUrl)}
                    initial={{ opacity: 0.8 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : event.videoUrl ? (
                  <a
                    href={event.videoUrl || event.embedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:aspect-[16/9]"
                  >
                    <img
                      src={event.imageUrl || event.thumbnailUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-white/10 backdrop-blur-sm shadow-lg">
                        <span className="ml-1 text-2xl text-white">▶</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-sm">
                        Watch video
                      </span>
                    </div>
                  </a>
                ) : null}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal for viewing selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/90 p-4 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-full max-w-full rounded-2xl border border-white/15 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
