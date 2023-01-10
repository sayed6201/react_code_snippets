
import { useLocation } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import { useHistory } from "react-router";

//==============================
//useHistory
//==============================
const history = useHistory();

//sendign data through history
history.push("/success", {
  stripeData: res.data,
  products: cart, }
  )

//retrieving params inside component
const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  // ....
}

//You will need to define the route before usage
{
  <Router>
      <Switch>
        <Route path="/success">
          <Success />
        </Route>
      <Switch>
  <Router>
}
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
//getting patameters from route eith useParams
//===============================
 {
 <Route path={`${match.path}/:topicId`}>
 <Topic />
</Route>
}

 let { topicId } = useParams();
