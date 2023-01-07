import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  //set user to either user or null here

  isError: false,
  isSuccess:false,
  message:'',
}
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    reset:(state)=> {
      state.isError = false,
      state.isSuccess = false,
      state.message = ''
    }
  },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;