import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    productLoading : false,
    productSuccess : false,
    productError : false,
    productMessage : '',
    product : null,
    categoryPro : []
}

export const getByCategory = createAsyncThunk('get-by-category' , async(category , thunkAPI)=>{
    try {
        let response = await axios.get(`http://localhost:5000/get-category/${category}`)
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

export const productDetail = createAsyncThunk('product-detail' , async(id , thunkAPI)=>{
  try {
  let response = await axios.get(`http://localhost:5000/get-detail/${id}`)
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
    state.product = null
    state.categoryPro = []
  }},
  extraReducers : (builder)=>{
    builder.addCase(getProducts.pending , (state)=>{
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
    .addCase(getByCategory.pending , (state)=>{
      state.productLoading = true
      state.productError = false;
      state.productSuccess = false;
      state.productMessage = "";
    })
    .addCase(getByCategory.rejected , (state , action)=>{
      state.productLoading = false
      state.productError = true
      state.productSuccess = false
      state.productMessage = action.payload
    })
    .addCase(getByCategory.fulfilled , (state , action)=>{
      state.productLoading = false
      state.productSuccess = true
      state.productError = false
      state.productMessage = action.payload
      state.categoryPro = action.payload
    })
    .addCase(productDetail.pending , (state)=>{
      state.productLoading = true
      state.productError = false;
      state.productSuccess = false;
      state.productMessage = "";
    })
    .addCase(productDetail.rejected , (state , action)=>{
      state.productLoading = false
      state.productError = true
      state.productSuccess = false
      state.productMessage = action.payload
    })
    .addCase(productDetail.fulfilled , (state , action)=>{
      state.productLoading = false
      state.productSuccess = true
      state.productError = false
      state.productMessage = action.payload
      state.product = action.payload
    })
  }
});

export const {productReset} = productSlice.actions

export default productSlice.reducer