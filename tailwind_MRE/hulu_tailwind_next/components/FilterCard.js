import React from 'react'

export default function FilterCard(props) {
  return (
    <div className='card mx-1 p-3 border m-1 shadow '>
      
      <p className='text-white text-2xl my-2'>Filter Data</p>

      {/* <label class="relative block"> */}
        {/* <span class="sr-only">Filter by Postcode</span> */}
        {/* <span class="absolute inset-y-0 left-0 flex items-center">
            <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span> */}
        <input 
        class="placeholder:italic placeholder:text- block bg-white w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Postcode. eg:ng" 
        type="text" 
        name="search"
        onKeyPress={event => {
            if (event.key === 'Enter') {
            //   searchMovies(event.target.value)
            console.log(`search: ${event.target.value}`)
            props.enterPostCodeFunc(event.target.value)
            }
        }}
        />
      {/* </label> */}

        <input 
        class="mt-3 placeholder:italic placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Company name" 
        type="text" 
        name="search"
        onKeyPress={event => {
            if (event.key === 'Enter') {
            //   searchMovies(event.target.value)
            console.log(`search: ${event.target.value}`)
            props.enterComNameFunc(event.target.value)
            }
        }}
        />
  

      <p className='text-white text-2xl my-2 mt-5'>Advance Search</p>
      <input 
        class="placeholder:italic placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Postcode. eg:ng" 
        type="text" 
        name="search"
        onKeyPress={event => {
            if (event.key === 'Enter') {
            //   searchMovies(event.target.value)
            console.log(`search: ${event.target.value}`)
            props.filterByCompanyName(event.target.value)
            }
        }}
        />

    </div>
  )
}
