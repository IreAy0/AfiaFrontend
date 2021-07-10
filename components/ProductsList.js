import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { getStrapiMedia } from "../utils/medias";
import Button from "./Button";
import { CartContext } from "../components/Context/CartContext";
import Alert from "./Alert";

const ProductsList = ({ products = [] }) => {
  const { addProduct, cartItems, increase, item, removeProduct, decrease } =
    useContext(CartContext);
  const [alertAdd, setAlertAdd] = useState(false);

  const InCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const singleItem = (product) => {
    return cartItems.find((item) => item.id === product?.id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertAdd(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {alertAdd && <Alert name={item.title} text={" Added to cart"} />}
      <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8">
        {products.map((_product) => {
          const Item = singleItem(_product);

          const remove = (product) => {
            if (Item?.quantity <= 0) {
              removeProduct(product);
              console.log("list removeProduct");
            }
          };
          return (
            <>
              <div
                key={_product.id}
                className="pb-3 rounded-lg bg-white hover:shadow-lg "
              >
                <Link href={`/products/${_product.slug}`}>
                  <a>
                    <div className="rounded-t-lg bg-gray-100 pt-2 pb-2">
                      {_product.image.length > 0 ? (
                        <img
                          className="crop mx-auto"
                          src={getStrapiMedia(
                            _product.image[0].formats.thumbnail.url
                          )}
                          alt={_product.title}
                        />
                      ) : (
                        <img
                          alt="placeholder"
                          className="crop mx-auto"
                          src="http://placehold.jp/3d4070/ffffff/x.png"
                        />
                      )}
                    </div>
                    <div className="pl-4 pr-4 pb-4 pt-4  rounded-lg">
                      <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                        {_product.title} sticker
                      </h4>
                      <div className="mt-1 text-sm text-gray-700">
                        {_product.price}
                      </div>
                    </div>
                  </a>
                </Link>
                {remove(_product)}
                {InCart(_product) ? (
                  <div class="custom-number-input h-10  w-5/6 justify-center mx-auto flex">
                    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                      <button
                        onClick={() => {
                          decrease(_product);
                          // setAlertAdd(true);
                        }}
                        data-action="decrement"
                        class="shadow-lg  bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-l cursor-pointer outline-none"
                      >
                        <span class="m-auto text-2xl font-bold">−</span>
                      </button>
                      <input
                        type="text"
                        class=" focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                        name="custom-input-number"
                        value={Item?.quantity}
                      ></input>
                      <button
                        onClick={() => {
                          increase(_product);
                          setAlertAdd(true);
                        }}
                        data-action="increment"
                        class="shadow-lg bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-r cursor-pointer"
                      >
                        <span class="m-auto text-2xl font-bold">+</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-10  w-5/6 justify-center mx-auto flex">
                    <button
                      variant="orange"
                      onClick={() => {
                        addProduct(_product);
                        setAlertAdd(true);
                      }}
                      className="shadow-lg h-10 mx-auto bg-orange-100 text-white hover:text-white hover:bg-orange-200  w-full  rounded cursor-pointer"
                    >
                      Add to cart
                    </button>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
