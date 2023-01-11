// =========================================================
// hulu nav - logo and jumping menu items
// =========================================================
function Header() {
    return (
      //we are following mobile first design, flex-col when it goes above sm then flex-row
      //flex-col -> contents will be placed in one colmn
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
        <Image
          className='object-contain'
          src="https://links.papareact.com/ua6"
          width={200}
          height={100}
        />
      </header>
    )
}


// =========================================================
// hulu nav tab - Scrollable , with fade effect
// =========================================================
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