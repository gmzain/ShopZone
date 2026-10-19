import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../assets/img7.png";
import slide2 from "../assets/img5.png";
import slide3 from "../assets/img6.png";

const Carousel = () => {
  return (
    <div className="w-full md:h-[60vh] overflow-hidden bg-slate-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center">
          <img
            src={slide2}
            alt="Slide 1"
            className="w-full h-full "
          />
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center">
          <img
            src={slide1}
            alt="Slide 2"
            className="w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center">
          <img
            src={slide3}
            alt="Slide 3"
            className="w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;