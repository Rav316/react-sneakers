import { configureStore } from "@reduxjs/toolkit";

import cartDrawerReducer from './slice/cart-drawer-slice';
import authModalReducer from './slice/auth-modal-slice';
import sneakerReducer from './slice/sneaker-slice';

export const store = configureStore({
  reducer: {
    cartDrawer: cartDrawerReducer,
    authModal: authModalReducer,
    sneaker: sneakerReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;