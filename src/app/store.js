import {configureStore} from '@reduxjs/toolkit';
import shipmentReducer from '../features/shipment/shipmentSlice';

export default configureStore({
  reducer: {
    shipment: shipmentReducer,
  },
});
