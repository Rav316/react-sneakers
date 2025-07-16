import { createSlice } from '@reduxjs/toolkit';

interface CartDrawerSlice {
  isOpen: boolean;
}

const initialState: CartDrawerSlice = {
  isOpen: false,
};

const cartDrawerSlice = createSlice({
  name: 'cartDrawer',
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default cartDrawerSlice.reducer;
export const { setIsDrawerOpen } = cartDrawerSlice.actions;
