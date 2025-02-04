import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { IoStar } from "react-icons/io5";
import "./carousel.css";

function CarouselComponent({ businessData }) {
  return (
    <div className="business-carousel">
      {businessData && businessData.images && businessData.images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {businessData.images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="carousel-item">
                <img
                  src={image}
                  alt={`Business image ${idx + 1}`}
                  className="d-block w-100"
                />
                <div className="carousel-caption">
                  <div className="rating">
                    <IoStar color="gold" />
                    <span>{businessData.rating || "No rating"}</span>
                  </div>
                  <h3>{businessData.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="no-images">
          <p>No images available</p>
          {/* <div className="carousel-caption">
            <div className="rating">
              <IoStar color="gold" />
              <span>{businessData?.rating || "No rating"}</span>
            </div>
            <h3>{businessData?.name}</h3>
            <p>{businessData?.description}</p>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CarouselComponent;
