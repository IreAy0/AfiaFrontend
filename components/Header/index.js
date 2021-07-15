import React, { useContext } from "react";
import Link from "next/link";
import Container from "../Container";
import Logo from "../icons/LogoIcon";
import Search from "../Search";
import { Cart } from "../icons/homeIcons/index";
import { CartContext } from "../Context/CartContext";

export default function Header({ position = "" }) {
  const { itemCount } = useContext(CartContext);

  return (
    <>
      <header
        className={`header ${position} z-30 w-full body-font sticky-header`}
      >
        <nav className="w-full flex flex-row items-center p-2 py-3 justify-between bg-white shadow-xs ">
          <Container className=" flex relative h-full  items-center justify-between">
            <Link href="/">
              <a className=" text-lg text-gray-600  md:flex">
                <Logo height="50" width="150" />
              </a>
            </Link>
            <div className="hidden lg:block md:w-1/2">
              <Search />
            </div>

            <div className="flex   flex-wrap md:flex-nowrap text-gray-700 items-center text-base justify-between">
              {/* <Link href="/#features">
                <a className={`mr-5 hover:text-green  text-sm flex items-end`} >
                  <span>
                    <HelpIcon />
                  </span>
                  Help
                  <span>
                    <ArrowDown />
                  </span>
                  </a>
                  
              </Link> */}
              {/* <Link href="/#pricing">
                <a className={`mr-5 hover:text-green  text-sm flex items-end`}>
                <span>
                    <Profile />
                  </span>
                  Login
                  <span>
                    <ArrowDown />
                  </span>
                  </a>
              </Link> */}
              <Link href="/cart">
                <a className={` hover:text-green  text-sm flex items-end`}>
                  <span class="relative inline-block">
                    <Cart />
                    <span
                      class="absolute top-0 right-0 inline-flex items-center 
                  justify-center px-1 py-1 text-xs font-bold leading-none 
                  text-red-100 transform -translate-x-9	 -translate-y-1/2 
                  bg-red-600 rounded-full"
                    >
                      {itemCount}
                    </span>
                    Cart
                  </span>

                  {/* <span>
                    <ArrowDown />
                  </span> */}
                </a>
              </Link>
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
}
