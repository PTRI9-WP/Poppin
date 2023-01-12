import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import businessService from './businessService';
import axios from 'axios';
const businessURL = '/businesses/';

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
  'business/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(businessURL);
      if (response.data) {
        return response.data.businesses;
      }
    } catch (err) {
      const message = err.response?.data.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBusiness = createAsyncThunk(
  'business/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(businessURL + data[0], data[1]);
    } catch (err) {
      const message = err.response?.data.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

//put all reducers in here its the home base for all global funcs/states to be utilized by all the various businessess

export const businessSlice = createSlice({
  name: 'businesses',
  initialState,
  reducers: {
    reset: (state) => {
      state.businesses = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    resetSelectedBusiness: (state) => {
      state.selectedBusiness = null;
    },
    setSelectedBusiness: (state, action) => {
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
        state.businesses = action.payload;
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
