import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const shipmentSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipmentList: (state, action) => {
      state.list = action.payload;
    },
  }
});

export const {setShipmentList} = shipmentSlice.actions;

export const fetchAllShipments = state => state.shipment.list;

export default shipmentSlice.reducer;
