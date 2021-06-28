import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Container from '../Container'
import Logo from '../icons/LogoIcon';
import Button from '../Button';
import Search from '../Search';
import {ArrowDown, Cart, HelpIcon, More, Profile} from '../icons/homeIcons/index'
import { getCategories } from '../../utils/api';

export default function HeaderTwo({position= ""}) {
 
  const [open, setOpen] = useState(false)
  const [categories , setCategories] = useState("")
  useEffect( async () => {
    const cat = await getCategories();
    setCategories(cat)
  }, [])
  
  return (
    <>
    <header className={`header ${position} z-30 w-full bg-gray-100 body-font sticky-header`}>
      <nav className="w-full flex flex-row items-center  justify-between  shadow-xs ">
      <Container className=" flex relative h-full  items-center justify-between">
        <div className="relative   bg-myGreen-100 py-5  w-44 text-white  ">
    
        <button type="button" onClick={()=> setOpen(!open)} className=" focus:outline-none h-inherit cursor-pointer flex items-center  w-full px-4  text-base font-medium text-white  " id="options-menu">
        <span>
            <More/>
          </span>
          <span className="ml-3">
          Categories
          </span>
        </button>
    
   {open &&  <div className="z-20 origin-top-right absolute right-0 top-16	  w-44 rounded-b-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
           {categories.map((category) =>
             (
             <Link href={`/categories/${category.slug}`} key={category.id}> 
             <a href="#" className="block  px-4 py-2 text-md  border-b text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">
                    <span>
                        {category.name}
                    </span>
                </span>
            </a>
           </Link>
            
           )) } 
           
            
        </div>
    </div>
}

        </div>
        <div>

        </div>
      
        <div>
          <Button href="/" variant="green" >Sell on jalo</Button>
        </div>

     
      </Container>
      
      </nav>
       
    </header>

    
    </>
  );
}

