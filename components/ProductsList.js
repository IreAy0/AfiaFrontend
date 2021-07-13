import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useEffect, useState, useContext } from "react";
import { getStrapiMedia } from "../utils/medias";
import { CartContext } from "../components/Context/CartContext";
import Alert from "./Alert";

const ProductsList = ({ products = [] }) => {
  const {
    addProduct,
    cartItems,
    increase,
    item,
    removeProduct,
    decrease,
    layout,
    changeLayoutList,
    changeLayoutGrid
  } = useContext(CartContext);
  const [alertAdd, setAlertAdd] = useState(false);
  // const [data, setData] = useState(products);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const InCart = (product) => {
    return !!cartItems?.find((item) => item.id === product.id);
  };
  const singleItem = (product) => {
    return cartItems?.find((item) => item.id === product?.id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertAdd(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const getProducts = () => {
    const sliceData = products.slice(offset, offset + perPage);
    setData(sliceData);
    setPageCount(Math.ceil(products.length / perPage));
  };
  const handlePageChange = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };
  useEffect(() => {
    getProducts();
  }, [offset]);
  return (
    <>
      {alertAdd && <Alert name={item.title} text={" Added to cart"} />}
      <div className="filter bg-white py-4 px-8 flex">
        <p className="text-sm text-gray-400">
          {products.length} product(s) found
        </p>
        <div className="ml-auto flex">
          <svg
            onClick={() => {
              changeLayoutGrid();
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer mx-1 text-gray-500"
            viewBox="0 0 20 20"
            fill={`${layout === "grid" ? " #EA8000" : " currentColor"}`}
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <svg
            onClick={() => {
              changeLayoutList();
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={`${layout === "list" ? " #EA8000" : " currentColor"}`}
            className="cursor-pointer bi bi-list-ul mx-1 text-gray-500"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </div>
      </div>

      <div
        className={`${
          layout === "list"
            ? " grid-cols-1 "
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 "
        } grid  gap-4 my-4`}
      >
        {data.map((_product) => {
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
                className={`${
                  layout === "list" ? "flex-row" : " flex-col pb-3"
                } flex  rounded-lg bg-white hover:shadow-lg`}
              >
                <Link href={`/products/${_product.slug}`}>
                  <a
                    className={`${
                      layout === "list" ? "flex-row" : " flex-col "
                    } flex `}
                  >
                    <div
                      className={`${
                        layout === "list"
                          ? " "
                          : " rounded-t-lg bg-gray-100 pt-2 pb-2 "
                      } flex `}
                    >
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
                <div
                  className={`${
                    layout === "list"
                      ? " flex-1 flex justify-end items-end p-4 "
                      : "  "
                  } `}
                >
                  {remove(_product)}
                  {InCart(_product) ? (
                    <div
                      className={`${
                        layout === "list"
                          ? " w-2/5 "
                          : " h-10  w-5/6 justify-center mx-auto "
                      } flex custom-number-input  `}
                    >
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          onClick={() => {
                            decrease(_product);
                            // setAlertAdd(true);
                          }}
                          data-action="decrement"
                          className="shadow-lg  bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span className="m-auto text-2xl font-bold">−</span>
                        </button>
                        <input
                          type="text"
                          className=" focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                          name="custom-input-number"
                          value={Item?.quantity}
                        ></input>
                        <button
                          onClick={() => {
                            increase(_product);
                            setAlertAdd(true);
                          }}
                          data-action="increment"
                          className="shadow-lg bg-orange-100 text-white hover:text-white hover:bg-orange-200 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span className="m-auto text-2xl font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${
                        layout === "list"
                          ? " w-2/5 "
                          : " h-10  w-5/6 justify-center mx-auto "
                      } flex custom-number-input  `}
                    >
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
              </div>
            </>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"|<"}
        nextLabel={">|"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default ProductsList;
