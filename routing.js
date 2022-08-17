// ========================================
// ------------------
// install using    ||
// ------------------
      // yarn add react-router-dom
      // yarn add react-router-dom@5
      // yarn add react-router-dom@6
      // * Router
      // * Switch
      // * Route
      // * <Link to`="">
// ========================================

// ========================================
// Routing sample from Code Ninja
// ========================================
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
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
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
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

    // -----------------------
    // Navbar.js component
    // -----------------------
    import { Link } from "react-router-dom";

    const Navbar = () => {
      return (
        <nav className="navbar">
          <h1>The Dojo Blog</h1>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create" style={{ 
              color: 'white', 
              backgroundColor: '#f1356d',
              borderRadius: '8px' 
            }}>New Blog</Link>
          </div>
        </nav>
      );
    }
    
    export default Navbar;

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

    // ------------------------
    // BlogList.js component
    // Routing from a list
    // ------------------------
    import { Link } from 'react-router-dom';
    const BlogList = ({ blogs }) => {
      return (
        <div className="blog-list">
          {blogs.map(blog => (
            <div className="blog-preview" key={blog.id} >
              <Link to={`/blogs/${blog.id}`}>
                <h2>{ blog.title }</h2>
                <p>Written by { blog.author }</p>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    
    export default BlogList;


// ========================================
// Code Ninja Routing Sample
// ========================================
// This example shows how nested routing works. 
// The route /topics loads the Topics component,
//  which renders any further <Route>'s conditionally on the paths :id value.import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  //getting url from parent component and adding new url from child component
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}





