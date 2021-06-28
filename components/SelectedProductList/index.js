import Link from "next/link";
import { getStrapiMedia } from "../../utils/medias";
import Button from "../Button";

const SelectedProductsList = ({ selectedProducts = [] }) => {
  console.log(selectedProducts)
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 my-3">
      
      {selectedProducts.map((product) => (
       
        <div
          key={product.product.id}
          className=" rounded-lg bg-white hover:shadow-lg "
        >
          <Link href={`/products/${product.product.slug}`}>
            <a>
              <div className="rounded-t-lg bg-gray-100 pt-2 pb-2">
             { product.product.image.length > 0 ?  <img
                  className="crop mx-auto"
                  src={getStrapiMedia(product.product.image[0].formats.thumbnail.url)}
                  alt={product.product.title}
                /> : 
                <img src="http://placehold.jp/3d4070/ffffff/x.png"/>
              }  
                
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4 ">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {product.product.title} sticker
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                ₦ {product.product.price}
                </div>
              </div>
            </a>
          </Link>
          <Button variant="orange" className="w-full justify-center rounder-top-0">Add to cart</Button>

        </div>
      ))}
    </div>
  );
};

export default SelectedProductsList;
