import React, {useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Container from '../Container'
import Logo from '../icons/LogoIcon';
import Button from '../Button';
import Search from '../Search';
import {ArrowDown, Cart, HelpIcon, Profile} from '../icons/homeIcons/index'

export default function Header({position= ""}) {
  return (
    <>
    <header className={`header ${position} z-30 w-full body-font sticky-header`}>
      <nav className="w-full flex flex-row items-center p-2 py-3 justify-between bg-white shadow-xs ">
      <Container className=" flex relative h-full  items-center justify-between">
        <Link href="/">
        <a className=" text-lg text-gray-600 hidden md:flex">
           <Logo height="50" width="150"/>
        </a>
        </Link>
      <div className="md:w-1/2">
      <Search/>
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
                <span>
                    <Cart />
                  </span>
                  Cart
                  <span>
                    <ArrowDown />
                  </span>
                  
                 
                  </a>
              </Link>
               
            </div>
      </Container>
      
      </nav>
       
    </header>

    
    </>
  );
}
