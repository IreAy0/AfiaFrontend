import Container from "../components/Container";
import Layout from "../components/Layout/index";
import { useEffect, useState, useContext } from "react";
import { getStrapiMedia } from "../utils/medias";
import { CartContext } from "../components/Context/CartContext";
import Alert from "../components/Alert";

const CategoryPage = () => {
  const { cartItems, removeProduct, item } = useContext(
    CartContext
  );
  const [items, setItems] = useState([]);
  const [alertAdd, setAlertAdd] = useState(false);

  useEffect(() => {
    var storage = localStorage.getItem("entries");
    setItems(storage);
  }, []);

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
      <Container className="my-6">
        {alertAdd && (
          <Alert
            name={item.title}
            text={" Deleted from cart"}
            type={"remove"}
          />
        )}
        <div className=" bg-white rounded-md ">
          <div className="overflow-x-auto">
            <div className=" flex items-center justify-center font-sans overflow-hidden">
              <div className="w-full ">
                <div className="bg-white shadow-md rounded ">
                  {cartItems.length > 0 ? (
                    <div>
                      <table className="min-w-max w-full table-fixed">
                        <thead>
                          <tr className="bg-white border-b-2 text-gray-600 uppercase text-sm leading-normal">
                            <th colSpan="3" className="py-3 px-6 text-left">
                              Item
                            </th>
                            <th colSpan="3" className="py-3 px-6 text-left">
                              Quantity
                            </th>
                            <th colSpan="3" className="py-3 px-6 text-left">
                              Unit Price
                            </th>
                            <th colSpan="3" className="py-3 px-6 text-left">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                          {cartItems.map((product, index) => (
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td
                              colSpan="3"
                              key={index}
                              className=" text-left border-r"
                              >
                                <div className="flex  bg-white items-center ">
                                  <div className="w-2/6 ">
                                    {product.image.length > 0 ? (
                                      <img
                                        className="    "
                                        src={getStrapiMedia(
                                        product.image[0].formats.thumbnail.url
                                      )}
                                        alt={product.title}
                                        />
                                        ) : (
                                      <img 
                                        className="  "
                                        src="http://placehold.jp/3d4070/ffffff/x.png" />)
                                                                    }
                                                                </div>
                                                                <div className="w-5/6 ">
                                                                    <h1 className="text-gray-900 font-bold text-2xl">
                                                                        {product.title}
                                                                    </h1>
                                                                    <p className="mt-2 text-gray-600 text-sm">
                                                                        {product.description}
                                                                    </p>
                                                                    <div className="flex item-center justify-end mt-3">
                                                                        <div onClick={() => { removeProduct(product); setAlertAdd(true) }} className=" flex mr-2 transform hover:text-orange-100  cursor-pointer">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                            <span>Remove</span>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>


                                                        <td className="py-3 px-6 text-center border-r ">
                                                            <div className="">

                                                                <span className="	">{product.quantity}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center border-r">
                                                            <span className=" py-1 px-3 rounded-full ">{product.price}</span>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex item-center justify-center">
                                                                {subTotal(product.quantity, product.price)}
                                                            </div>
                                                        </td>
                                                    </tr>))}

                                                </tbody>
                                            </table>


                                        </div>
                                    )
                                        :

                                        <p className="text-center">Cart is Empty</p>}

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

