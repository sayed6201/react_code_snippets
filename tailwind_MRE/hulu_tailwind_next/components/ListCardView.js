import Image from 'next/image'
import React from 'react'
import {ThumbUpIcon} from '@heroicons/react/outline'
import { forwardRef } from 'react'

const ListCardView = ({result}) => {

//   const BASE_URL = "https://image.tmdb.org/t/p/w500/";
//   console.log(`backdrop_path: ${result.backdrop_path}`)
//   console.log(`poster_path: ${result.poster_path}`)
//   console.log(`mama: ${BASE_URL}${result.backdrop_path}`)
//   console.log(`mama2: ${BASE_URL}${result.backdrop_path || result.poster_path }`)
//   console.log(`mama3: ${BASE_URL}${result.poster_path}`)
  // console.log(`mama3: ${result.company_name}`)



  return (
    <div 
    //   ref={ref}
      className='card shadow-2xl p-8 m-3 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
      {/* <Image
      layout = "responsive"
      height={1080}
      width= {1920}
      src={`${BASE_URL}${result.backdrop_path || result.poster_path }` || 
      `${BASE_URL}${result.poster_path }`}
      ></Image> */}

      <div className='p-2'>
      {/* 
      truncate -> too long text to  ....  
      max-w-md -> max with medium
      */}
        <p className='bg-blue-600 mb-3 animate-pulse rounded-2xl p-1 truncate w-40 text-center'>Number: {result.company_number}</p>
        <h2 className='mt-1 text-2xl text-white transition duration-100 ease-in-out group-hover:font-bold'>
          Company Name: {result.company_name}
        </h2>
        <p className='flex items-center  group-hover:opacity-100'>
          Date of Cessation: {result.date_of_cessation} 
        </p>
        <p className='flex items-center  group-hover:opacity-100'>
          Date of Creation: {result.date_of_creation}
        </p>
       
        <p>
            Address line1:{result.registered_office_address.address_line_1}
        </p>
        <p>
            Address line2:{result.registered_office_address.address_line_2}
        </p>
        <p>
            Locality: {result.registered_office_address.locality}
        </p>
        <p>
             <span className='font-bold'>
             Postal Code: {result.registered_office_address.postal_code}
             </span>
             
         </p>
         <p>
             Region: {result.registered_office_address.region}
         </p>
         <p>
          Country: {result.registered_office_address.country}
         </p>
         <p className='flex items-center  group-hover:opacity-100'>
          <ThumbUpIcon className="h-5 mx-2 text-green-400" /> {result.vote_count}
        </p>
        <div className='bg-green-600 w-40 text-center mt-5 float-right text-white group-hover:animate-bounce rounded-3xl'>
            Company Profile
        </div>
        
      </div>
    </div>
  )
}

export default ListCardView