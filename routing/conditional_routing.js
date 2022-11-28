
//============================================================
//conditionally diplsaying component
//common component in multiple routes
//============================================================

function App() {
    const admin = useSelector((state) => state.user.currentUser.isAdmin);
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {admin && (
            <>
            {/* common component after login */}
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
              </div>
            </>
          )}
        </Switch>
      </Router>
    );
  }


//============================================================
//common navbar component in multiple routes
//============================================================
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