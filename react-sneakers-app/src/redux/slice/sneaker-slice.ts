import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SearchParams } from '../../service/sneakers.ts';
import { Api } from '../../service/api-client.ts';
import type { AxiosError } from 'axios';
import { extractError } from '../../util/extract-error.ts';
import type {
  ErrorResponse,
  PageResponse,
  SneakerListItem,
} from '../../service/model';

interface SneakerSlice {
  sneakers: PageResponse<SneakerListItem>;
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: SneakerSlice = {
  sneakers: {
    content: [],
    metadata: {
      page: 0,
      size: 0,
      totalElements: 0,
    },
  },
  loading: true,
};

export const fetchSneakers = createAsyncThunk<
  PageResponse<SneakerListItem>,
  SearchParams,
  { rejectValue: ErrorResponse }
>(
  'sneaker/fetchSneakers',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      return await Api.sneakers.findAll(params);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      const message = error.response?.data?.message || 'Unexpected error';
      const code = error.response?.status || 500;

      return rejectWithValue({ message, code });
    }
  },
);

const sneakerSlice = createSlice({
  name: 'sneaker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.sneakers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSneakers.rejected, (state, action) => {
      state.loading = false;
      state.error = extractError(action);
    });
  },
});

export default sneakerSlice.reducer;
