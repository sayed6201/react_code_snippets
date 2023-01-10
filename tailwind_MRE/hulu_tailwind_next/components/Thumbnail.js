import Image from 'next/image'
import React from 'react'
import {ThumbUpIcon} from '@heroicons/react/outline'
import { forwardRef } from 'react'

const Thumbnail = forwardRef(({result}, ref) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500/";
  console.log(`backdrop_path: ${result.backdrop_path}`)
  console.log(`poster_path: ${result.poster_path}`)
  console.log(`mama: ${BASE_URL}${result.backdrop_path}`)
  console.log(`mama2: ${BASE_URL}${result.backdrop_path || result.poster_path }`)
  console.log(`mama3: ${BASE_URL}${result.poster_path}`)



  return (
    <div 
      ref={ref}
      className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
      <Image
      layout = "responsive"
      height={1080}
      width= {1920}
      src={`${BASE_URL}${result.backdrop_path || result.poster_path }` || 
      `${BASE_URL}${result.poster_path }`}
      ></Image>

      <div className='p-2'>
      {/* 
      truncate -> too long text to  ....  
      max-w-md -> max with miduim
      */}
        <p className='truncate max-w-md'>{result.overview}</p>
        <h2 className='mt-1 text-2xl text-white transition duration-100 ease-in-out group-hover:font-bold'>
          {result.title || result.original_name}
        </h2>
        <p className='flex items-center opacity-0 group-hover:opacity-100'>
          {result.media_tyoe && `${result.media_tyoe} *`} {" "}
          {result.release_date || result.first_air_date} {"* "}
          <ThumbUpIcon className="h-5 mx-2" /> {result.vote_count}
        </p>
      </div>
    </div>
  )
})

export default Thumbnail