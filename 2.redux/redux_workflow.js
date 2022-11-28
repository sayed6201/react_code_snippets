// ===================================
// install following packages
// ===================================
// "@reduxjs/toolkit": "^1.6.1",
// "react-redux": "^7.2.5",
// ===================================

// ========================================
// Redux state workflow
// ========================================

    // ---------------------------
    // step:1 - create slice
    // ---------------------------

    import { createSlice } from "@reduxjs/toolkit";

    const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
        },
    },
    });

    export const { addProduct } = cartSlice.actions;
    export default cartSlice.reducer;


    // ---------------------------
    // step:2 - create store and configure
    // ---------------------------
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

    // export const store = configureStore({
    //   reducer: cartReducer,
    // });

    export let persistor = persistStore(store);


    // ---------------------------
    // step:3 - configure provider in root level
    // ---------------------------
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";
    import { Provider } from "react-redux";
    import { store, persistor } from "./redux/store";
    import { PersistGate } from 'redux-persist/integration/react'

    ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
    );

    //if you dont use persistGate

    {/* <Provider store={store}>
        <App />
    </Provider>, */}


    // ---------------------------
    // step:4 - accessing state
    // ---------------------------
    import { useSelector } from "react-redux";


    //accessing redux stste using useSelector redux hook
    const quantity = useSelector(state=>state.cart.quantity)


    // ---------------------------
    // step:5 - updating state
    // ---------------------------
    import { useSelector } from "react-redux";


    //accessing redux stste using useSelector redux hook
    import { useDispatch } from "react-redux";
    const dispatch = useDispatch();

    //updating ib button click
    const handleClick = () => {
        dispatch(
          addProduct({ ...product, quantity, color, size })
        );
      };



