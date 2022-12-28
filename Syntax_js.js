

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