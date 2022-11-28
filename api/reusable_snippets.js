// ===============================================================
// requestMethod.js
//public and private root api with base url
// ===============================================================
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});


// ===============================================================
// use-case
// ===============================================================

//calling publicRrquest
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    //calling the publicRequst -- 
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//calling userRequest
useEffect(() => {
  const getStats = async () => {
    try {
      const res = await userRequest.get("orders/income?pid=" + productId);
      const list = res.data.sort((a,b)=>{
          return a._id - b._id
      })
      list.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  };
  getStats();
}, [productId, MONTHS]);
