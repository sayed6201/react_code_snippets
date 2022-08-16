import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

  //-------------------------------------------
  //despite using following lines use useFetch()
  //-------------------------------------------
  // const [blogs, setBlogs] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:8000/blogs')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setBlogs(data);
  //     })
  // }, [])

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;