import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
  //set user to either user or null here
  user: user ? user : null,
  isError: false,
  isSuccess: false,

  message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
  
    //axios response || backend response || error from this function
    const message = err.response?.data.message ?? err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//not sure if the cb has to be async
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {

      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  //handle lifecycle of our promise functions
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      });
  },

});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
