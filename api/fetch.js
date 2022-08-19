//================================
//GET- Fetching data with query param
//================================
 //react state management
    const [movies, setMovies] = useState([]);

    //gets called whenever the page loaded
    useEffect(() => {
      searchMovies("Batman");
      console.log("heelo " + movies.length)
    }, []);
  
  //react
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };



//================================
//POST-request 
//================================
    const handleSubmit = (e) => {
      e.preventDefault();
      const blog = { title, body, author };
  
      fetch('http://localhost:8000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      }).then(() => {
        // history.go(-1);
        history.push('/');
      })
    }

//================================
//Delete-request 
//================================
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  //delete request.......
  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;