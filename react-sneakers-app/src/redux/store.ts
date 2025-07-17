import { configureStore } from '@reduxjs/toolkit';

import cartDrawerReducer from './slice/cart-drawer-slice';
import authModalReducer from './slice/auth-modal-slice';
import sneakerReducer from './slice/sneaker-slice';
import sneakerFavoritesReducer from './slice/sneaker-favorites-slice';
import searchReducer from './slice/search-slice';
import authReducer from './slice/auth-slice';
import favoriteReducer from './slice/favorite-slice';

export const store = configureStore({
  reducer: {
    cartDrawer: cartDrawerReducer,
    authModal: authModalReducer,
    sneaker: sneakerReducer,
    sneakerFavorites: sneakerFavoritesReducer,
    search: searchReducer,
    auth: authReducer,
    favorites: favoriteReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
