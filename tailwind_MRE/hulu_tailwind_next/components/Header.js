import React from 'react'
import Image from 'next/dist/client/image'
import HeaderItem from './HeaderItem'
import { CheckCircleIcon, CheckIcon, CollectionIcon, FireIcon, HomeIcon, SearchIcon, UserIcon } from '@heroicons/react/outline'

function Header() {
  return (
    //we are following mobile first design, flex-col when it goes above sm then flex-row
    // flex-col -> contents will be placed in one colmn
    //flex -> contents will 
    //justify-between -> horizontal spacing
    //items-center -> vertical
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center">
      {/* max-w-2xl -> limiting the width otherwise thales the whole width */}
      <div className='flex flex-grow justify-evenly max-w-2xl '>
        <HeaderItem
          title="HOME"
          Icon={HomeIcon}
        ></HeaderItem>

        <HeaderItem
          title="TRENDING"
          Icon={FireIcon}
        ></HeaderItem>

        <HeaderItem
          title="VERIFIED"
          Icon={CheckCircleIcon}
        ></HeaderItem>

        <HeaderItem
          title="COLLECTIONS"
          Icon={CollectionIcon}
        ></HeaderItem>

        <HeaderItem
          title="SEARCH"
          Icon={SearchIcon}
        ></HeaderItem>

        <HeaderItem
          title="ACCOUNT"
          Icon={UserIcon}
        ></HeaderItem>


      </div>
      <p className='font-mono font-extrabold text-white text-5xl'>TULIP<span className='text-xl'>Analytics</span></p>
      {/* <Image
        className='object-contain'
        src="https://links.papareact.com/ua6"
        width={200}
        height={100}
      /> */}
    </header>
  )
}

export default Header