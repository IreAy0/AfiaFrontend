import Link from "next/link";
import { useEffect, useState , useContext} from "react";
import { getStrapiMedia } from "../utils/medias";
import Button from "./Button";
import  {CartContext} from "../components/Context/CartContext";
import Alert from "./Alert";



const ProductsList = ({ products = [] }) => {
  const { addProduct, cartItems, increase, alert, item } = useContext(CartContext);
  const [close, setClose] = useState(false)
const [alertAdd, setAlertAdd] = useState(false)

  const InCart = product => {
    return !!cartItems.find(item => item.id === product.id)
  }
  useEffect(() => {
    const interval = setInterval(() => {
     setAlertAdd(false)
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    {alertAdd && 
    <Alert name={item.title} text={" Added to cart"} />
   }
    <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8">
      
      {products.map((_product) => (
        <>
        <div
          key={_product.id}
          className=" rounded-lg  hover:shadow-lg "
        >
          
          <Link href={`/products/${_product.slug}`}>
            <a>
              <div className="rounded-t-lg bg-gray-100 pt-2 pb-2">
              {_product.image.length > 0 ?  <img
                  className="crop mx-auto"
                  src={getStrapiMedia(_product.image[0].formats.thumbnail.url)}
                  alt={_product.title}
                />: 
                <img   className="crop mx-auto" src="http://placehold.jp/3d4070/ffffff/x.png"/>
              }  
                
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_product.title} sticker
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_product.price}
                </div>
              </div>
            </a>
          </Link>
          {InCart(_product) ?           <Button variant="orange"  onClick={() => {increase(_product); setAlertAdd(true) }} className="w-full justify-center rounder-top-0">Add More</Button>
 :           <Button variant="orange"  onClick={() => {addProduct(_product); setAlertAdd(true)}} className="w-full justify-center rounder-top-0">Add to cart</Button>
}
        </div>
        </>
      ))}
    </div>
    </>
  );
};

export default ProductsList;
