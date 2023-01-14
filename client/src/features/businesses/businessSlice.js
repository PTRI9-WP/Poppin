import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const businessURL = '/businesses/';

const initialState = {
  businesses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
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
  async (businessData, { rejectWithValue }) => {
    try {
      const response = await axios.put(businessURL + businessData.id, {
        currentcapacity: businessData.currentcapacity,
        poppinscore: businessData.poppinscore,
      });
      if (response.data) {
        console.log('RESPONSE DATA', response.data);
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const checkCode = createAsyncThunk(
  'business/checkCode',
  async (businessData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        businessURL + 'checkin/' + businessData.id,
        { code: businessData.code }
      );
      if (response.data) {
        return response.data;
      }
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
      })
      .addCase(updateBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedBusiness = action.payload;
        state.businesses = state.businesses.map((el) => {
          if (el.id === updatedBusiness.id) {
            el = updatedBusiness;
            return el;
          } else {
            return el;
          }
        });
      })
      .addCase(
        updateBusiness.rejected((state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
      )
      .addCase(checkCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(checkCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      });
  },
});

export const { reset, resetSelectedBusiness, setSelectedBusiness } =
  businessSlice.actions;

export default businessSlice.reducer;
