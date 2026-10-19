import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userLoading : false,
    userSuccess : false,
    userError : false,
    userMessage : '',
    user : JSON.parse(localStorage.getItem('user'))
}

export const resgisterUser = createAsyncThunk('signinUser/register' , async(userData , thunkAPI)=>{
    try {
        let response = await axios.post('http://localhost:5000/signup', userData)
        localStorage.setItem('user' , JSON.stringify(response.data))
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const loginUser = createAsyncThunk('login-user' , async(loginData , thunkAPI)=>{
    try {
        let response = await axios.post(`http://localhost:5000/login` , loginData)
        localStorage.setItem('user' , JSON.stringify(response.data))
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {userReset : (state)=>{
    state.userLoading = false
    state.userError = false
    state.userSuccess = false
    state.userMessage = ''
  }},
  extraReducers : (builder)=>{
    builder.addCase(resgisterUser.pending , (state)=>{
        state.userLoading = true
    })
    .addCase(resgisterUser.rejected , (state , action)=>{
        state.userLoading = false
        state.userError = true
        state.userSuccess = false
        state.userMessage = action.payload
    })
    .addCase(resgisterUser.fulfilled , (state , action)=>{
        state.userLoading = false
        state.userError = false
        state.userSuccess = true
        state.userMessage = action.payload
    })
    .addCase(loginUser.pending , (state)=>{
        state.userLoading = true
    })
    .addCase(loginUser.rejected , (state , action)=>{
        state.userLoading = false
        state.userError = true
        state.userSuccess = false
        state.userMessage = action.payload
    })
    .addCase(loginUser.fulfilled , (state , action)=>{
        state.userLoading = false
        state.userError = false
        state.userSuccess = true
        state.userMessage = action.payload
    })
  } 
});

export const {userReset} = authSlice.actions

export default authSlice.reducer