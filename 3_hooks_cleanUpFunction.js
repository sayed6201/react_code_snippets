/*========================================================
We don't want to run fetch() or update any state when the component is destroyed
    *We have to use AbortController() 
    *And cleanup method in useEffect to clean up the request when component is destroyed
========================================================*/

import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    //we can associate abort controller with a fetch request
    //then we can stop the fetch when the component is detroyed
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        //Aborting fetch will throw an error
        // we don't want to update error state when the fetch() is aborted
         if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);

    // --------------------------------------------
    // abort the fetch
    // --------------------------------------------
    return () => abortCont.abort(); //sn

    // return () => console.log("gets executed when the component gets destroyed")
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;