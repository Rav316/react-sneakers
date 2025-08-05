import { createSlice } from '@reduxjs/toolkit';

interface CancelOrderModalSlice {
  isOpen: boolean;
  orderId?: number;
}

const initialState: CancelOrderModalSlice = {
  isOpen: false
}

const cancelOrderModalSlice = createSlice({
  name: 'cancelOrder',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.orderId = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.orderId = undefined
    }
  }}
);

export default cancelOrderModalSlice.reducer;
export const { openModal, closeModal } = cancelOrderModalSlice.actions;