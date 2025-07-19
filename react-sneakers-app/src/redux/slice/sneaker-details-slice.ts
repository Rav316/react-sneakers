import type { ErrorResponse, Sneaker } from '../../service/model.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../service/api-client.ts';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';

interface SneakerDetailsSlice {
  sneaker: Sneaker;
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: SneakerDetailsSlice = {
  sneaker: {
    id: 0,
    name: '',
    imageUrl: '',
    price: 0,
    description: '',
    firm: '',
    type: {
      id: 0,
      name: '',
    },
    items: [],
  },
  loading: true,
};

export const fetchSneakerDetails = createAsyncThunk<
  Sneaker,
  number,
  { rejectValue: ErrorResponse }
>('sneaker/fetchSneakerDetails', async (id: number, { rejectWithValue }) => {
  return await callApiWithErrorHandling(
    Api.sneakers.findById,
    id,
    rejectWithValue,
  );
});

const sneakerDetailsSlice = createSlice({
  name: 'sneakerDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSneakerDetails.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    }).addCase(fetchSneakerDetails.fulfilled, (state, action) => {
      state.sneaker = action.payload;
      state.loading = false;
    }).addCase(fetchSneakerDetails.rejected, (state, action) => {
      state.loading = false;
      if(action.payload) {
        state.error = action.payload;
      } else {
        state.error = {
          message: action.error.message || 'Unknown error',
          code: 500,
        };
      }
    })
  }
});

export default sneakerDetailsSlice.reducer;