import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products : [],
    productLoading : false,
    productSuccess : false,
    productError : false,
    productMessage : ''
}

export const addProduct = createAsyncThunk('addProduct' , async(productData , thunkAPI)=>{
    try {
      let response = await axios.post(`http://localhost:5000/add-product` , productData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
})

export const getProducts = createAsyncThunk('get-Product' , async(_, thunkAPI)=>{
    try {
      let response = await axios.get(`http://localhost:5000/get-product`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
})


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {productReset : (state)=>{
    state.productLoading = false
    state.productError = false
    state.productSuccess = false
    state.productMessage = ''
  },
    removeProduct: (state, action) => {
    state.products = state.products.filter(
      (item) => item._id !== action.payload
    );
    },
  },
  extraReducers : (builder)=>{
    builder.addCase(addProduct.pending , (state)=>{
      state.productLoading = true
      state.productError = false;
      state.productSuccess = false;
      state.productMessage = "";
    })
    .addCase(addProduct.rejected , (state , action)=>{
      state.productLoading = false
      state.productError = true
      state.productSuccess = false
      state.productMessage = action.payload
    })
    .addCase(addProduct.fulfilled , (state , action)=>{
      state.productLoading = false
      state.productSuccess = true
      state.productError = false
      state.productMessage = action.payload
      state.products.push(action.payload)
    })
    .addCase(getProducts.pending , (state)=>{
      state.productLoading = true
      state.productError = false;
      state.productSuccess = false;
      state.productMessage = "";
    })
    .addCase(getProducts.rejected , (state , action)=>{
      state.productLoading = false
      state.productError = true
      state.productSuccess = false
      state.productMessage = action.payload
    })
    .addCase(getProducts.fulfilled , (state , action)=>{
      state.productLoading = false
      state.productSuccess = true
      state.productError = false
      state.productMessage = action.payload
      state.products = action.payload
    })
  }
});

export const {productReset , removeProduct} = productSlice.actions

export default productSlice.reducer