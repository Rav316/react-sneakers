import { createSlice } from '@reduxjs/toolkit';

interface AuthModalSlice {
  isOpen: boolean;
}

const initialState: AuthModalSlice = {
  isOpen: false,
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default authModalSlice.reducer;
export const { setIsModalOpen } = authModalSlice.actions;
