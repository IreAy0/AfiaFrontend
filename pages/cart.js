import Container from "../components/Container";
import Layout from "../components/Layout/index";
import { useEffect, useState, useContext } from "react";
import { getStrapiMedia } from "../utils/medias";
import { CartContext } from "../components/Context/CartContext";
import Alert from "../components/Alert";
import Button from "../components/Button";

const CategoryPage = () => {
  const { cartItems, removeProduct, total, increase, decrease } =
    useContext(CartContext);
  const [alertAdd, setAlertAdd] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertAdd(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const subTotal = (qty, price) => {
    let total = (qty * price).toFixed(2);
    return total;
  };
  return (
    <Layout headerTwo={false}>
      <Container className="my-6 ">
        {alertAdd && <Alert text={" cart updated"} type={"add"} />}
        <div className=" container">
          <div className="overflow-x-auto container">
            <div className=" flex items-center justify-center font-sans overflow-hidden">
              <div className="w-full ">
                <div className=" ">
                  {cartItems.length > 0 ? (
                    <div>
                      <div class="xl:flex lg:flex md:flex xl:w-full md:justify-center w-11/12 mx-auto lg:justify-center xl:justify-betweens flex-wrap justify-between lg:flex-col lg:items-center  xl:justify-between">
                        {cartItems.map((product, index) => (
                          <div class=" md:w-9/12 mb-4 xl:px-2">
                            <div class="bg-white dark:bg-gray-800 shadow xl:flex lg:flex md:flex sm:flex p-5 items-start sm:justify-between  rounded">
                              <div class="xl:w-1/6 lg:w-1/6 md:w-2/6 sm:w-1/6 w-2/6 h-24  rounded-sm flex items-center justify-center mr-4">
                                {product.image.length > 0 ? (
                                  <img
                                    className=" h-24	   "
                                    src={getStrapiMedia(
                                      product.image[0].formats.thumbnail.url
                                    )}
                                    alt={product.title}
                                  />
                                ) : (
                                  <img
                                    className=" h-24	 "
                                    alt="placeholder"
                                    src="http://placehold.jp/3d4070/ffffff/x.png"
                                  />
                                )}
                              </div>
                              {product.quantity <= 0 && removeProduct(product)}
                              <div class=" w-full md:w-5/6 xl:flex lg:flex md:flex sm:flex flex flex-row  items-start sm:justify-between ">
                                <div class="md:w-4/6 mb-4 xl:mb-0 lg:mb-0 md:mb-0">
                                  <a
                                    tabindex="0"
                                    class="focus:outline-none text-gray-800 dark:text-gray-100"
                                  >
                                    {" "}
                                    <p class="text-lg  mb-1 font-normal">
                                      {product.title}
                                    </p>
                                  </a>
                                  <p
                                    tabindex="0"
                                    class="focus:outline-none text-base text-gray-600 dark:text-gray-400 font-normal"
                                  >
                                    {product.description}
                                  </p>
                                  <p
                                    tabindex="0"
                                    class="focus:outline-none text-sm text-gray-600 dark:text-gray-400 font-normal"
                                  >
                                    {product.price}
                                  </p>
                                </div>
                                <div class="xl:w-2/6 flex-wrap-reverse lg:w-2/6 md:w-2/6 h-5/6 flex justify-end flex-col xl:items-end lg:items-end md:items-end items-start">
                                  <p
                                    tabindex="0"
                                    class="focus:outline-none text-sm text-gray-600 dark:text-gray-400 font-normal"
                                  >
                                    <div class="custom-number-input w-32 mx-auto">
                                      <div class="flex flex-row h-14 w-full rounded-lg relative bg-transparent mt-1">
                                        <button
                                          onClick={() => {
                                            decrease(product);
                                            setAlertAdd(true);
                                          }}
                                          data-action="decrement"
                                          class=" border text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                        >
                                          <span class="m-auto text-2xl font-thin">
                                            −
                                          </span>
                                        </button>
                                        <input
                                          type="text"
                                          class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                          name="custom-input-number"
                                          value={product.quantity}
                                        ></input>
                                        <button
                                          onClick={() => {
                                            increase(product);
                                            setAlertAdd(true);
                                          }}
                                          data-action="increment"
                                          class="border text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                        >
                                          <span class="m-auto text-2xl font-thin">
                                            +
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </p>
                                  <p
                                    tabindex="0"
                                    class="focus:outline-none text-lg text-gray-600 dark:text-gray-400 font-normal"
                                  >
                                    {subTotal(product.quantity, product.price)}
                                  </p>

                                  <div
                                    tabindex="0"
                                    class=" focus:outline-none text-gray-400 text-xs  rounded mb-2 font-normal py-1 item-center justify-end mt-3"
                                  >
                                    {" "}
                                    <div
                                      onClick={() => {
                                        removeProduct(product);
                                        setAlertAdd(true);
                                      }}
                                      className=" flex  transform hover:text-orange-100  cursor-pointer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="inline-flex h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <span>Remove</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="md:w-9/12 mb-4 xl:px-2">
                          <div class=" px-5 bg-white py-5 flex flex-col  lg:items-end xs:flex-row  lg:flex-end  xs:justify-between">
                            <div class="flex justify-between items-end w-1/6">
                              <h6 className="font-bold">Total: </h6>
                              <span className="text-orange-100 text-xl">
                                {" "}
                                {total}
                              </span>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {" "}
                              Delivery fee not included yet{" "}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-9/12 mb-4 xl:px-2">
                          <div class="px-5 bg-white py-5 flex flex-col  lg:items-end xs:flex-row  lg:flex-end  xs:justify-between">
                            <div class="flex justify-between items-end lg:w-2/6">
                              <Button
                                className="w-1/2 mr-1 h-12"
                                variant="orange"
                              >
                                Continue Shopping
                              </Button>
                              <Button
                                variant="green"
                                className="h-12 w-1/2 ml-1 text-center justify-center"
                              >
                                Checkout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center">Cart is Empty</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CategoryPage;
