import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: null,
    cartLoading: false,
    cartSuccess: false,
    cartError: false,
    cartMessage: ""
};
export const addToCart = createAsyncThunk( "cart/addToCart",  async (productId, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post( `http://localhost:5000/add-to-cart/${productId}`, {} , config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to add product"
            );
        }
    }
);

export const getCart = createAsyncThunk( "cart/getCart", async (_, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get("http://localhost:5000/get-cart", config);
            return response.data;
            } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to get cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartReset: (state) => {
            state.cartLoading = false;
            state.cartSuccess = false;
            state.cartError = false;
            state.cartMessage = "";
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.cartLoading = true;
                state.cartSuccess = false;
                state.cartError = false;
                state.cartMessage = "";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartSuccess = true;
                state.cartError = false;
                state.cartMessage = action.payload.message;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartSuccess = false;
                state.cartError = true;
                state.cartMessage = action.payload;
            });
        builder
            .addCase(getCart.pending, (state) => {
                state.cartLoading = true;
                state.cartError = false;
                state.cartSuccess = false;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartSuccess = true;
                state.cartError = false;
                state.cart = action.payload;
})
            .addCase(getCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartSuccess = false;
                state.cartError = true;
                state.cartMessage = action.payload;
            });
    }

});

export const { cartReset } = cartSlice.actions;
export default cartSlice.reducer;