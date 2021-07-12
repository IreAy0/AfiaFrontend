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
        <div className=" bg-white rounded-md container">
          <div className="overflow-x-auto container">
            <div className=" flex items-center justify-center font-sans overflow-hidden">
              <div className="w-full ">
                <div className="bg-white shadow-md rounded ">
                  {cartItems.length > 0 ? (
                    <div>
                      <table className="min-w-max w-full table-auto">
                        <thead>
                          <tr className="bg-white border-b-2 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Item</th>
                            <th className="py-3 px-6 text-center">Quantity</th>
                            <th className="py-3 px-6 text-center">
                              Unit Price
                            </th>
                            <th className="py-3 px-6 text-center">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                          {cartItems.map((product, index) => (
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td key={index} className=" text-left border-r">
                                <div className="flex  bg-white items-center ">
                                  <div className="w-28 ">
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
                                  <div className="w-5/6 ">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                      {product.title}
                                    </h1>
                                    <p className="mt-2 text-gray-600 text-sm">
                                      {product.description}
                                    </p>
                                    <div className="flex item-center justify-end mt-3">
                                      <div
                                        onClick={() => {
                                          removeProduct(product);
                                          setAlertAdd(true);
                                        }}
                                        className=" flex mr-2 transform hover:text-orange-100  cursor-pointer"
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
                              </td>
                              {product.quantity <= 0 && removeProduct(product)}

                              <td className="py-3 px-6 text-center border-r ">
                                <div class="custom-number-input h-10 w-32 mx-auto">
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
                              </td>
                              <td className="py-3 px-6 text-center border-r">
                                <span className=" py-1 px-3 rounded-full ">
                                  {product.price}
                                </span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                  {subTotal(product.quantity, product.price)}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div class="px-5 bg-white py-5 flex flex-col  items-end xs:flex-row  flex-end  xs:justify-between">
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
                      <div class="px-5 bg-white py-5 flex flex-col  items-end xs:flex-row  flex-end  xs:justify-between">
                        <div class="flex justify-between items-end w-2/6">
                          <Button className="w-1/2 mr-1 h-12" variant="orange">
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
