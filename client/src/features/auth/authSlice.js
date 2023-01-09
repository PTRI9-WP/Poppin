import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  //set user to either user or null here

  isError: false,
  isSuccess: false,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    //axios error response || backend response || error from here
    const message = err.response?.data.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false), (state.isSuccess = false), (state.message = '');
    },
  },
  extraReducers: {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
