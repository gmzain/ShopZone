import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    orders : [],
    orderSuccess : false,
    orderLoading : false,
    orderError : false,
    orderMessage : ''
}

export const userOrder = createAsyncThunk('userOrder' , async({id , orderData} , thunkAPI)=>{
    try {
        let response = await axios.post(`http://localhost:5000/user-order/${id}` , orderData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {orderReset : (state=>{
    state.orders = []
    state.orderError = false
    state.orderSuccess = false
    state.orderLoading = false
    state.orderMessage = ''
  })},
  extraReducers : (builder)=>{
    builder.addCase(userOrder.pending , (state)=>{
        state.orderLoading = true
    })
    .addCase(userOrder.rejected , (state , action)=>{
        state.orderLoading = false
        state.orderSuccess = false
        state.orderError = true
        state.orderMessage = action.payload
    })
    .addCase(userOrder.fulfilled , (state , action)=>{
        state.orderLoading = false
        state.orderError = false
        state.orderSuccess = true
        state.orderMessage = action.payload
        state.orders.push(action.payload)
    })
  }
});

export const {orderReset} = orderSlice.actions

export default orderSlice.reducer