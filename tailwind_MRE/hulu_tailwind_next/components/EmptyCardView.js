import Image from 'next/image'
import React from 'react'
import {ThumbUpIcon} from '@heroicons/react/outline'
import { forwardRef } from 'react'

const EmptyCardView = () => {

//   const BASE_URL = "https://image.tmdb.org/t/p/w500/";
//   console.log(`backdrop_path: ${result.backdrop_path}`)
//   console.log(`poster_path: ${result.poster_path}`)
//   console.log(`mama: ${BASE_URL}${result.backdrop_path}`)
//   console.log(`mama2: ${BASE_URL}${result.backdrop_path || result.poster_path }`)
//   console.log(`mama3: ${BASE_URL}${result.poster_path}`)



  return (
    <div 
    //   ref={ref}
      className='card w-50 mt-40 shadow-2xl animate-bounce p-20 m-3 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
      {/* <Image
      layout = "responsive"
      height={1080}
      width= {1920}
      src={`${BASE_URL}${result.backdrop_path || result.poster_path }` || 
      `${BASE_URL}${result.poster_path }`}
      ></Image> */}

     <p className='text-5xl text-white text-center font-extrabold'>No Data Found</p>
    </div>
  )
}

export default EmptyCardView