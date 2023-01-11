
// variable init
let sort_by_param  = req.query.sort_by || 'date_of_creation'


// ----------------------------------------
//curried function:
// ----------------------------------------
  // First, examine this function with two parameters 


  const add = (x, y) => x + y
  // add(2, 3) //=> 5

// Here it is again in curried form …
  const add = x => y => x + y

// Here is the same1 code without arrow functions …

  const add = function (x) {
    return function (y) {
      return x + y
    }
  }

//`generating objects from vars
const blog = { title, body, author };

// distructing objects to vars \
//you can change the name
const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);


// Arrow Function
return () => abortCont.abort(); //sn


//displaying jsx
return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
        </article>
      )}
    </div>
  );