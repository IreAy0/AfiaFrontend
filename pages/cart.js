import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../components/Container";
import Layout from "../components/Layout/index";
import ProductsList from "../components/ProductsList";
import { getCategories, getCategory } from "../utils/api";
import FeaturedSection from "../components/Sections/FeaturedSection"
import { useGlobalContext} from '../components/Context/context'
import { useEffect, useState } from "react";
import Button from "../components/Button/index"
import { getStrapiMedia } from "../utils/medias";


const CategoryPage = ({ category }) => {
  const {removeFromCart, cart} = useGlobalContext()
  console.log("cart", cart)
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    
      const storedNames = JSON.parse(window.localStorage.getItem("allEntries")); 
      
        setLoading(false);
        setProducts(storedNames);
  }, [cart])

  //  console.log(products);
  
  
  return (
    <Layout headerTwo={false}>
       
      <Container className="my-6">
      <div className=" bg-white rounded-md ">
     
<div class="overflow-x-auto">
        <div class="   flex items-center justify-center font-sans overflow-hidden">
            <div class="w-full ">
                <div class="bg-white shadow-md rounded py-6">
                {products.length>0? <table class="min-w-max w-full table-fixed">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">Project</th>
                                <th class="py-3 px-6 text-left w-1/4">Client</th>
                                <th class="py-3 px-6 text-center">Users</th>
                                <th class="py-3 px-6 text-center">Status</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                       
                        
                        <tbody class="text-gray-600 text-sm font-light">
                        {/* { products.length > 0  ? <div> {products.map((product) => (
        <div>
          <li>{product.item.title}, {product.item.id}</li>
          <Button onClick={(e) => { e.preventDefault(); removeFromCart(product.item.id)}} type="button" variant="orange" >Delete</Button>
        </div>
        ))}</div> : <div>Cart is empty</div> } */}
              
                           {products.map((product, index) => (<tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td key={index} class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                           
                                        </div>
                                        <span class="font-medium">{product.item.title}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-left ">
                                    <div class="">
                                        
                                        <span class="	">{product.item.description}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex items-center justify-center">
                                        <img class="w-10 h-10 rounded-md border-gray-200 border transform hover:scale-125" src={getStrapiMedia(product.item.image[0].formats.thumbnail.url)}/>
                                      </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{product.item.price}</span>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div onClick={(e) => { e.preventDefault(); removeFromCart(product.item.id)}} class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>)) }
                          
                          
                          </tbody>
                    </table> : "Cart is Empty"}
                    
                </div>
            </div>
        </div>
    </div>
        </div>
     
      
      </Container>
      <Container className="my-6">

        <FeaturedSection sectionTitle="You may also like" />
        </Container>
    </Layout>
  );
};

export default CategoryPage;

