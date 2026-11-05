import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ResponsiveTilt from "./ResponsiveTilt";
import OptimizedImage from "./OptimizedImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { galleryPhotos } from "./../constants/index";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsGalleryVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsGalleryVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!galleryPhotos || galleryPhotos.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      data-portfolio-chapter="gallery"
      className="portfolio-section-band relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:px-8"
    >
      {/* Background Gradient & 3D Floor */}
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#915EFF]/10 blur-[100px]" />
      <div aria-hidden="true" className="perspective-floor h-36 opacity-50">
        <div className="perspective-floor__plane" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
          Press &amp; media
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="extrude-3d mb-8 text-3xl font-semibold tracking-[-0.04em] text-white sm:mb-10 sm:text-4xl md:text-5xl"
        >
          <span data-text="Featured stories" className="exploded-type-3d">
            Featured stories
          </span>
        </motion.h2>

        {/* Swiper: Event by Event */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={false}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="!pb-12 !pt-2"
        >
          {galleryPhotos.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="plate-3d mx-auto max-w-6xl p-2">
                <div className="plate-3d-face flex flex-col gap-4 p-6 sm:gap-6 sm:p-8">
                  <div className="z-lift-md flex flex-col items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-[#c4b5fd] sm:text-xl md:text-2xl">
                      {event.title}
                    </h3>
                    <p className="max-w-3xl text-sm text-gray-300 sm:text-base">
                      {event.description}
                    </p>
                  </div>

                  {/* Images */}
                  {event.images?.length > 0 ? (
                    <div className="z-lift-lg grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                      {event.images.map((img, idx) => (
                        <ResponsiveTilt
                          key={idx}
                          tiltMaxAngleX={7}
                          tiltMaxAngleY={7}
                          perspective={1100}
                          scale={1.02}
                          transitionSpeed={400}
                        >
                          <OptimizedImage
                            src={img}
                            alt={`${event.title} ${idx + 1}`}
                            maxMobileDim={1080}
                            className="h-48 w-full cursor-pointer rounded-2xl border border-white/15 object-cover shadow-[0_6px_0_0_rgba(18,14,38,0.95),0_20px_50px_rgba(0,0,0,0.45)] sm:transition-transform sm:duration-500 sm:h-60 md:h-72"
                            onClick={() => setSelectedImage(img)}
                          />
                        </ResponsiveTilt>
                      ))}
                    </div>
                  ) : event.embedUrl ? (
                    <div className="z-lift-lg relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-[#080a16] shadow-[0_8px_0_0_rgba(18,14,38,0.95),0_24px_60px_rgba(0,0,0,0.5)] sm:aspect-[16/9]">
                      {isGalleryVisible && (
                        <iframe
                          src={event.embedUrl}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full rounded-2xl"
                          style={{ border: "none" }}
                          scrolling="no"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                          allowFullScreen
                          title={event.title}
                        ></iframe>
                      )}
                    </div>
                  ) : event.imageUrl ? (
                    <ResponsiveTilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={1200}
                      scale={1.01}
                      transitionSpeed={400}
                      className="z-lift-lg"
                    >
                      <OptimizedImage
                        src={event.imageUrl}
                        alt={event.title}
                        maxMobileDim={1280}
                        className="h-52 w-full cursor-pointer rounded-2xl border border-white/15 object-cover shadow-[0_8px_0_0_rgba(18,14,38,0.95),0_24px_60px_rgba(0,0,0,0.45)] sm:h-64 md:h-80"
                        onClick={() => setSelectedImage(event.imageUrl)}
                      />
                    </ResponsiveTilt>
                  ) : event.videoUrl ? (
                    <a
                      href={event.videoUrl || event.embedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="z-lift-lg group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_0_0_rgba(18,14,38,0.95),0_24px_70px_rgba(0,0,0,0.45)] sm:aspect-[16/9]"
                    >
                      <img
                        src={
                          event.imageUrl ||
                          event.thumbnailUrl ||
                          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={event.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/45" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="key-3d key-3d--primary flex h-16 w-16 !rounded-full">
                          <span className="ml-1 text-2xl text-white">▶</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <span className="tag-3d !text-cyan-200">
                          Watch video ↗
                        </span>
                      </div>
                    </a>
                  ) : null}
                </div>
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
