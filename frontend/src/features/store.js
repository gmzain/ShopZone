import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import productReducer from "./products/productSlice"
import orderReducer from "./orders/orderSlice"
import cartReducer from "./cart/cartSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        order: orderReducer,
        cart: cartReducer
    }
})