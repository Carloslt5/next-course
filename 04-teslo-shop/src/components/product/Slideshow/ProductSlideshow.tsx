"use client";
import { ProductImage } from "@/components/ui/ProductImage";
import { type ProductImage as ProductImageType } from "@/interfaces/product.type";
import { CSSProperties, useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slideshow.css";

type ProductSlideshowProps = {
  images: ProductImageType[];
  title: string;
  className?: string;
};

export const ProductSlideshow = ({ images, title, className }: ProductSlideshowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ProductImage
              src={image.url}
              alt={title}
              className="rounded-md"
              height={800}
              width={1024}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ProductImage
              src={image.url}
              alt={title}
              className="rounded-md"
              height={800}
              width={1024}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
