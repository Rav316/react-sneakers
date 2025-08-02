import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { Api } from '../../service/api-client.ts';
import type { ErrorResponse } from '../../service/model';

interface FavoriteSlice {
  items: number[];
}

const initialState: FavoriteSlice = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const addToFavorites = createAsyncThunk<
  void,
  number,
  { rejectValue: ErrorResponse }
>('favorite/addToFavorites', async (id: number, { rejectWithValue }) => {
  return await callApiWithErrorHandling(
    Api.sneakers.addToFavorites,
    id,
    rejectWithValue,
  );
});

export const removeFromFavorites = createAsyncThunk<
  void,
  number,
  { rejectValue: ErrorResponse }
>('favorite/removeFromFavorites', async (id: number, { rejectWithValue }) => {
  return await callApiWithErrorHandling(
    Api.sneakers.removeFromFavorites,
    id,
    rejectWithValue,
  );
});

export const syncGuestFavorites = createAsyncThunk<
  void,
  number[],
  { rejectValue: ErrorResponse }
>(
  'favorite/syncGuestFavorites',
  async (favorites: number[], { rejectWithValue }) => {
    return await callApiWithErrorHandling(
      Api.sneakers.syncGuestFavorites,
      favorites,
      rejectWithValue,
    );
  },
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteToLocalStorage: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    removeFavoriteFromLocalStorage: (state, action) => {
      state.items = state.items.filter(
        (favorite) => favorite !== action.payload,
      );
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('favorites');
    },
  },
});

export default favoriteSlice.reducer;
export const {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  clearFavorites,
} = favoriteSlice.actions;
