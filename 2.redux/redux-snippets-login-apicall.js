//=============================================================
// login api call and state management usung redux
//=============================================================

// -------------------------------
//apiCalls.js
// -------------------------------
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    //passing dispatch function reference from UI
    dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// -------------------------------
//userRedux.js
// states to manager user data
// -------------------------------
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;

// -------------------------------
//inside login-UI
// -------------------------------
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
  
    const handleClick = (e) => {
      e.preventDefault();
      //passing displatch function reference and user creds data to redux
      login(dispatch, { username, password });
    };
    return (
        <Container>
          <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
              <Input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleClick} disabled={isFetching}>
                LOGIN
              </Button>
              {error && <Error>Something went wrong...</Error>}
              <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
              <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
          </Wrapper>
        </Container>
      );
    };

// -------------------------------
//inside store.js -> configuring the redux
// -------------------------------
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//you have to add all the reduceers in combineReducers
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

    //single reducer without persistReducer
    //--------------------------------
    // export const store = configureStore({
    //   reducer: cartReducer,
    // });

    //you can add multiple without persistReducer 
    //--------------------------------
    // export const store = configureStore({
    //   reducer: {
    //   cart: cartReducer,
    //   user: userReducer
    // }
    // });

export let persistor = persistStore(store);

