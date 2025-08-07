import { configureStore } from '@reduxjs/toolkit';

import cartDrawerReducer from './slice/cart-drawer-slice';
import authModalReducer from './slice/auth-modal-slice';
import sneakerReducer from './slice/sneaker-slice';
import sneakerDetailsReducer from './slice/sneaker-details-slice';
import sneakerFavoritesReducer from './slice/sneaker-favorites-slice';
import searchReducer from './slice/search-slice';
import authReducer from './slice/auth-slice';
import favoriteReducer from './slice/favorite-slice';
import cartReducer from './slice/cart-slice';
import orderReducer from './slice/order-slice';
import orderItemReducer from './slice/order-item-slice';
import cancelOrderModalReducer from './slice/cancel-order-slice';

export const store = configureStore({
  reducer: {
    cartDrawer: cartDrawerReducer,
    authModal: authModalReducer,
    sneaker: sneakerReducer,
    sneakerDetails: sneakerDetailsReducer,
    sneakerFavorites: sneakerFavoritesReducer,
    search: searchReducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    order: orderReducer,
    orderItem: orderItemReducer,
    cancelOrderModal: cancelOrderModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
