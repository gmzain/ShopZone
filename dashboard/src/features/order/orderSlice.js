import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    orders : [],
    orderError : false,
    orderSuccess : false,
    orderLoading : false,
    orderMessage : ''
}

export const getOrder = createAsyncThunk('get-order' , async(_ , thunkAPI)=>{
    try {
        let response = await axios.get('http://localhost:5000/get-order')
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {orderReset : (state)=>{
    state.orders = []
    state.orderError = false
    state.orderLoading = false
    state.orderSuccess = false
    state.orderMessage = ''
  },
   deleteOrder : (state , action)=>{
    state.orders = state.orders.filter(item=>item._id !== action.payload)
   } 
  },
  extraReducers : (builder)=>{
    builder.addCase(getOrder.pending , (state)=>{
        state.orderLoading = true
    })
    .addCase(getOrder.rejected , (state , action)=>{
        state.orderError = false
        state.orderLoading = false
        state.orderSuccess = false
        state.orderMessage = action.payload
    })
    .addCase(getOrder.fulfilled , (state , action)=>{
        state.orderError = false
        state.orderMessage = action.payload
        state.orderSuccess = true
        state.orderLoading = false
        state.orders = action.payload
    })
  }
});

export const {orderReset , deleteOrder} = orderSlice.actions

export default orderSlice.reducer