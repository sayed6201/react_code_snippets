// import React from 'react'
// import Thumbnail from './Thumbnail'
// // import {FlipMove} from 'react-flip-move'
// import ListCardView from './ListCardView'
// import EmptyCardView from './EmptyCardView'

// function Results({results}) {
//   // console.log(`myres ${results.items[0].company_name}`)
//   return (
//     // 3xl -> is the custom break point. configured in
//     // <FlipMove></FlipMove> -> use this for hte animation
//     // <>
//     // {
//       // results.items.length > 0 ? 
//     <div className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center'>
//         {
//           results.items.map((item) => {
//             <ListCardView
//             key = {item.company_number} result = {item}
//             />
//           }
//          ) 
//         }
//     </div>
//     // : 
//     //    <div className='mx-auto'>
//     //      <EmptyCardView/>
//     //    </div>
//     // }
//     // </>
//   )
// }

// export default Results


import React from 'react'
import Thumbnail from './Thumbnail'
// import {FlipMove} from 'react-flip-move'
import ListCardView from './ListCardView'
import EmptyCardView from './EmptyCardView'
import { useState, useEffect } from 'react'



function Results({results}) {
  // console.log(`myres ${results.items[0].company_name}`)

  const [companyInfoView, setCompanyInfoView] = useState(null)

  let companyInfo = null;

  useEffect(()=>{
    if(results.items === 0){
      companyInfo = (
        <div className='mx-auto'>
           <EmptyCardView/>
         </div>
      )
      setCompanyInfoView(companyInfo)
    }else{
      companyInfo = (
        <div className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center'>
        {results.items.map(item=>(
          <ListCardView
            key = {item.company_number} result = {item}
           />
          // <p key={item.company_number} className='text-white'>{item.company_name}</p>
        ))}
      </div>
      )
      setCompanyInfoView(companyInfo)
  
    }
  },[results])

  return (
    // 3xl -> is the custom break point. configured in
    // <FlipMove></FlipMove> -> use this for hte animation
    <>
    {companyInfoView}
    </>
    
  )
}

export default Results