
// ========================================
// useParam
// Passssing param in route
// ========================================
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          {/* <h1>Hello react world</h1> */}
          <Switch>
                {/* sending parameter */}
                <Route path="/blogs/:id">
                <BlogDetails />
                </Route>
                <Route path="*">
                <NotFound />
                </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;

// -------------------------------------------------
// BlogDetails.js component
// retrieving parameter in blog detail page
// -------------------------------------------------
const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    
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
}
    
export default BlogDetails;




const productId = location.pathname.split("/")[2];

