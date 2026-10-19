import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./products/productSlice"
import orderReducer from "./order/orderSlice"


export const store = configureStore({
    reducer: {
        product: productReducer,
        order: orderReducer,
    }
})