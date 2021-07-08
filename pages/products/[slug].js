import { useRouter } from "next/router";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Layout from "../../components/Layout/index";
import FeaturedSection from "../../components/Sections/FeaturedSection";
import { getProducts, getProduct } from "../../utils/api";
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

const ProductPage = ({ product = [] }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <Layout title={product.title}>
      <Container className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
        <div className="rounded-lg  w-full bg-white">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={true}
          >
            {product.image.map((img) => (
              <SwiperSlide>
                <div style={{ height: "400px" }}>
                  <img
                    alt="placeholder"
                    className="object-cover	rounded-lg"
                    src={getStrapiMedia(img.url)}
                    srcSet=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-5xl mt-1 mb-3 font-semibold  leading-tight truncate ">
              {product?.title}
            </h4>
            <h5 className="text-2xl mb-3 text-orange-200 font-light">
              {" "}
              ₦ {product.price}
            </h5>
            <p className="mt-1 mb-3 text-gray-600 font-light">
              {product.description}
            </p>
          </div>
          <div>
            <h2>
              Categories:
              {product.categories.map((category) => {
                return (
                  <span className="text-gray-400 font-light ">
                    {" "}
                    {category.name},
                  </span>
                );
              })}
            </h2>
          </div>
          {product?.status === "published" ? (
            <Button variant="orange" className="justify-center">
              Add to cart
            </Button>
          ) : (
            <div className="text-center mr-10 mb-1" v-else>
              <div
                className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                  Coming soon...
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  Out of stock
                </span>
              </div>
            </div>
          )}
        </div>
      </Container>
      <Container className="my-6">
        <FeaturedSection sectionTitle="You may also like" />
      </Container>
    </Layout>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);
  return { props: { product } };
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug }
      };
    }),
    fallback: true
  };
}
