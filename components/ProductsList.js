import Link from "next/link";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "../utils/medias";
import Button from "./Button";
import {useGlobalContext} from '../components/Context/context'



const ProductsList = ({ products = [] }) => {

  const {addToCart} = useGlobalContext()
  
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8">
      
      {products.map((_product) => (
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
          <Button onClick={(e) => { e.preventDefault(); addToCart(_product)}} type="button" variant="orange" className="w-full justify-center rounder-top-0">Add to cart</Button>

        </div>
      ))}
    </div>
  );
};

export default ProductsList;
