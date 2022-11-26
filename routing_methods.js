
import { useLocation } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

//==============================
//get path of a page from this
//==============================
const location = useLocation();


//==============================
//getting url from parent component and adding new url from child component
//==============================
let match = useRouteMatch();
<Link to={`${match.url}/components`}>Components</Link>


//==============================
//getting patameters from route oath
//===============================
 {
 <Route path={`${match.path}/:topicId`}>
 <Topic />
</Route>
}
 let { topicId } = useParams();
