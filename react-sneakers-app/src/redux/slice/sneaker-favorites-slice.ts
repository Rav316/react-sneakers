import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { Api } from '../../service/api-client.ts';
import { extractError } from '../../util/extract-error.ts';
import type { ErrorResponse, SneakerListItem } from '../../service/model';

interface SneakerFavoritesSlice {
  items: SneakerListItem[];
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: SneakerFavoritesSlice = {
  items: [],
  loading: true,
};

export const fetchFavoriteSneakers = createAsyncThunk<
  SneakerListItem[],
  void,
  { rejectValue: ErrorResponse }
>('sneaker/fetchFavoriteSneakers', async (_, { rejectWithValue }) => {
  return callApiWithErrorHandling(
    Api.sneakers.findAllFavorites,
    {},
    rejectWithValue,
  );
});

export const fetchSneakersByIds = createAsyncThunk<
  SneakerListItem[],
  number[],
  { rejectValue: ErrorResponse }
>('sneaker/fetchSneakersByIds', async (ids: number[], { rejectWithValue }) => {
  return callApiWithErrorHandling(
    Api.sneakers.findAllByIds,
    ids,
    rejectWithValue,
  );
});

export const removeAllFavorites = createAsyncThunk<
  void,
  void,
  { rejectValue: ErrorResponse }
>('sneaker/removeFavoriteSneakers', async (_, { rejectWithValue }) => {
  return callApiWithErrorHandling(
    Api.sneakers.removeAllFavorites,
    {},
    rejectWithValue,
  );
});

const sneakerFavoritesSlice = createSlice({
  name: 'sneakerFavorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeAllFavorites.fulfilled, (state) => {
        state.items = [];
      })
      .addMatcher(
        isAnyOf(fetchFavoriteSneakers.pending, fetchSneakersByIds.pending),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        isAnyOf(fetchFavoriteSneakers.fulfilled, fetchSneakersByIds.fulfilled),
        (state, action) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addMatcher(
        isAnyOf(fetchFavoriteSneakers.rejected, fetchSneakersByIds.rejected),
        (state, action) => {
          state.loading = false;
          state.error = extractError(action);
        },
      );
  },
});

export default sneakerFavoritesSlice.reducer;
