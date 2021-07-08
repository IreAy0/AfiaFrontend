// Import Swiper React components
import { getStrapiMedia } from "../../utils/medias";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
  EffectFade
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, EffectFade, Pagination, Scrollbar, A11y, Autoplay]);

const Carousel = ({ banners }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      loop={true}
      pagination={{ clickable: true }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide>
          <div style={{ height: "500px" }}>
            <img
              key={index}
              className="object-cover	"
              src={getStrapiMedia(banner.image.url)}
              alt={banner.title}
              srcSet=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
