//=========================================================
//Query-apram - Access query param from URL in getServerSideProps 
//Teh  fetch data  from server
// ========================================================
export async function getServerSideProps(context) {
    //fetching query from url and sgowing data accordingly....
    // you can pass the query param in url like this -> router.push(`/?genre=${key}`)
    const genre = context.query.genre;
    const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url ||
      requests.fetchTrending.url}`).then((res) => res.json())
  
      console.log(`my request ${request.results}`)
  
      console.log(`my request ${request}`)
    return {
      props: {
        results: request.results,
      }
    }
  
  }
  