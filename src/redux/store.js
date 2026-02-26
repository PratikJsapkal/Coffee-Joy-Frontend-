import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/features/productSlice"
import filterReducer from "./features/filterSlice"
import authReducer from "@/redux/features/authSlice"
import cartReducer from "@/redux/features/cartSlice"
import categoryReducer from "./features/categorySlice"
import searchReducer from "./features/searchSlice";
import shippingReducer from "./features/shippingSlice"
import paymentRouter  from "./features/paymentSlice"
import cheakoutRouter from "./features/cheakoutSlice"
import subscriptionReducer from "./features/subscriptionSlice";
import ordersReducer from "./features/orderSlice"
import couponReducer from "./features/couponSlice";
import uiReducer from "./features/uiSlice";
import reviewReducer from "./features/reviewSlice"


const store = configureStore({
    reducer : {
          product : productReducer,
          filter: filterReducer,
          auth : authReducer,
          cart : cartReducer,
          category: categoryReducer,
          search: searchReducer,
          shipping : shippingReducer,
          payment : paymentRouter,
          cheakout : cheakoutRouter,
          subscription: subscriptionReducer,
          orders : ordersReducer,
          coupon: couponReducer,
          ui : uiReducer,
           reviews: reviewReducer,
          
    }
})

export default store;