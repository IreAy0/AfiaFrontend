import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
import { CartContext } from "../../components/Context/CartContext";
import Alert from "../../components/Alert";

SwiperCore.use([Navigation, EffectFade, Pagination, Scrollbar, A11y, Autoplay]);

const ProductPage = ({ product = [] }) => {
  const { addProduct, cartItems, increase, item, decrease, removeProduct } =
    useContext(CartContext);
  const [alertAdd, setAlertAdd] = useState(false);
  const InCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const singleItem = (product) => {
    return cartItems.find((item) => item.id === product?.id);
  };

  const Item = singleItem(product);

  const remove = (product) => {
    if (Item?.quantity <= 0) {
      removeProduct(product);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertAdd(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <Layout title={product.title}>
      {alertAdd && <Alert text={" cart updated"} type={"add"} />}
      <Container className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
        <div className="rounded-lg  w-full bg-white">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={true}
          >
            {product.image.length > 0 ? (
              <>
                {product.image.map((img, index) => (
                  <SwiperSlide>
                    <div key={index} style={{ height: "400px" }}>
                      <img
                        alt="placeholder"
                        className="object-cover	rounded-lg"
                        src={getStrapiMedia(img.url)}
                        srcSet=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <img
                style={{ height: "400px" }}
                className="w-full	 object-cover"
                alt="placeholder"
                src="http://placehold.jp/3d4070/ffffff/x.png"
              />
            )}
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
              {product.quantity}
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
            <>
              {remove(product)}
              {InCart(product) ? (
                <div class="custom-number-input h-10 w-full items-center  flex">
                  <div class="flex flex-row h-14 w-1/3 rounded-lg relative bg-transparent mt-1">
                    <button
                      onClick={() => {
                        decrease(product);
                        setAlertAdd(true);
                      }}
                      data-action="decrement"
                      class=" border bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span class="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="text"
                      class=" focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value={Item?.quantity}
                    ></input>
                    <button
                      onClick={() => {
                        increase(product);
                        setAlertAdd(true);
                      }}
                      data-action="increment"
                      class="border bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span class="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                  <p className="w-1/2">( {Item?.quantity} item(s) added )</p>
                </div>
              ) : (
                <Button
                  variant="orange"
                  onClick={() => {
                    addProduct(product);
                    setAlertAdd(true);
                  }}
                  className="w-full justify-center rounder-top-0"
                >
                  Add to cart
                </Button>
              )}
            </>
          ) : (
            <div className="text-center mr-10 mb-1">
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
