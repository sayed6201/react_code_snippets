// "react-stripe-checkout": "^2.6.3",

//import stripe-checkout
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router";

//states...
const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

// button handler function
const onToken = (token) => {
    setStripeToken(token);
  };

//sending stripe token to backend and redirecting to suucess screen
useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);


//stripe checkout UI component ....
<StripeCheckout
name="Lama Shop"
image="https://avatars.githubusercontent.com/u/1486366?v=4"
billingAddress
shippingAddress
description={`Your total is $${cart.total}`}
amount={cart.total * 100}
token={onToken}
stripeKey={KEY}
>
<Button>CHECKOUT NOW</Button>
</StripeCheckout>

