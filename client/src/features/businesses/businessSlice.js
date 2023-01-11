//BUSINESS SLICE / STATE GOES HERE

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //store array of visible businesses here ??  like businesses: []  ?? 

  isLoading:false,
  isError: false,
  isSuccess:false,
  message:'',

  //select business here ?? --> Dispatch action when user clicks on business to set this
  selectedBusiness:null,
}

export const businessSlice = createSlice({
  name:'business',
  initialState,
  reducers:{
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    resetSelectedBusiness:(state) => {
      state.selectedBusiness = null;
    },
    setSelectedBusiness:(state) => {
      state.selectedTask = action.payload;
    }
  }

})

export const { reset, resetSelectedBusiness, setSelectedBusiness } = businessSlice.actions;

export default businessSlice.reducer;