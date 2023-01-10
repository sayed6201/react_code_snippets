import React from 'react'
import requests from '../utils/requests'
import {useRouter} from "next/router"

function Nav() {
    const router = useRouter();
  return (
    <nav className='relative'>
        {/* 
        whitespace-nowrap -> no wrapping contents are placed top of each other 
        text-2xl -> increases text size
        space-x-10 -> spcaes
        overflow-x-scroll -> overflow text gets scoll but adds a scrollable bar
        scrollbar-hide -> hides scrollbar, you haveto install it
        */}
        <div className='flex justify-between px-10 sm:px-20 text-2xl 
        whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide'>
            {Object.entries(requests).map(([key, {title, url}]) => (

                // transition duration-100  -> allows transition and duration
                // you cna define hover effect -> hover:scale-125
                //last:pr-24 -> last item padding right is 24
                <h2 
                key={key} 
                onClick={()=> router.push(`/?genre=${key}`)}
                className="last:pr-24 cursor-pointer transition duration-100 hover:scale-125 hover:text-white active:text-red-400">{title}</h2>
            ))}
        </div>
       
        {/* 
        this div creates the fade effect
        absolute -> the parent has to be relative
        bg-gradient-to-l  and from-[#06202A] -> is used to give gradient effect to the scrollbar(if you dont give 'to-white' it becomes transparent)
          */}
        <div className='absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12'/>
    </nav>
  )
}

export default Nav