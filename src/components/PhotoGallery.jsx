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
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 mb-8 sm:mb-10"
        >
          In the Spotlight ✨
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
                <h3 className="text-cyan-300 font-semibold text-lg sm:text-xl md:text-2xl">
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
                        className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedImage(img)}
                        initial={{ opacity: 0.8 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </div>
                ) : event.imageUrl ? (
                  <motion.img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(event.imageUrl)}
                    initial={{ opacity: 0.8 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : event.embedUrl ? (
                  <div className="w-full aspect-video sm:aspect-[16/9] relative">
                    <iframe
                      src={event.embedUrl}
                      className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                      style={{ border: "none" }}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      title={event.title}
                    ></iframe>
                  </div>
                ) : null}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal for viewing selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-full max-w-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
