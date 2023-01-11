//BUSINESS SLICE / STATE GOES HERE

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import businessService from './businessService';

const initialState = {
  //store array of visible businesses here ??  like businesses: []  ??
  businesses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',

  //select business here ?? --> Dispatch action when user clicks on business to set this
  selectedBusiness: null,
};

export const getAllBusinesses = createAsyncThunk(
  'business/get',
  async (_, thunk) => {
    try {
      return await businessService.getAllBusinesses();
    } catch (err) {
      const message = err.response?.data.message || err.toString();
      return thunk.rejectWithValue(message);
    }
  }
);

//put all reducers in here its the home base for all global funcs/states to be utilized by all the various businessess

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    resetSelectedBusiness: (state) => {
      state.selectedBusiness = null;
    },
    setSelectedBusiness: (state) => {
      state.selectedBusiness = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBusinesses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBusinesses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businesses.push(action.payload);
      })
      .addCase(getAllBusinesses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetSelectedBusiness, setSelectedBusiness } =
  businessSlice.actions;

export default businessSlice.reducer;
