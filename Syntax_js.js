// ------------------------------------------------------------------------------------
//  string checker
// ------------------------------------------------------------------------------------
Empty string, undefined, null, ...
To check for a truthy value:

if (strValue) {
    // strValue was non-empty string, true, 42, Infinity, [], ...
}
To check for a falsy value:

if (!strValue) {
    // strValue was empty string, false, 0, null, undefined, ...
}


// ------------------------------------------------------------------------------------
//null checker
// ------------------------------------------------------------------------------------

let y

y = false || 'default'       // y = 'default'
y = false ?? 'default'       // y = false

y = 0n || 'default'          // y = 'default'
y = 0n ?? 'default'          // y = 0n

y = NaN || 'default'         // y = 'default'
y = NaN ?? 'default'         // y = NaN

y = '' || 'default'          // y = 'default'
y = '' ?? 'default'          // y = ''
// Since the new Nullish Coalescing Operator can differentiate between no value and a falsey value, it can be beneficial if you, for example, need to check if there is no String or an empty String. Generally, you probably want to use ?? instead of || most of the time.

// Last and also least here are the two instances where they behave the same:

let y

y = null || 'default'        // y = 'default'
y = null ?? 'default'        // y = 'default'

y = undefined || 'default'   // y = 'default'
y = undefined ?? 'default'   // y = 'default'


// ------------------------------------------------------------------------------------
// variable init
// ------------------------------------------------------------------------------------
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