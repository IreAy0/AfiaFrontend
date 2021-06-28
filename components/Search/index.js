import React from 'react';

import Button from '../Button'
export default function Search() {
  return (
    <div className="w-full flex">
    <span className="w-full  h-10 cursor-pointer border border-gray-300 text-sm rounded-lg  flex">
            <input type="search" name="search" placeholder="Search" className="flex-grow px-4 rounded-md text-sm focus:outline-none"/>
          </span>
            <div className="flex flex-row-reverse text-gray-600 mr-4 ml-2 ">
              <Button variant="orange" >
                Search
              </Button>
            </div>
    </div>
  );
}
