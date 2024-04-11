"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slideshow.css";

type ProductSlideshowProps = {
  images: string[];
  title: string;
  className?: string;
};

export const ProductMobileSlideshow = ({ images, title, className }: ProductSlideshowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100%",
          height: "500px",
        }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              className="rounded-md"
              fill
              sizes="(max-width: 768px) 100%"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
