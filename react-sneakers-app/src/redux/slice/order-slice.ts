import type { ErrorResponse, OrderListItem } from '../../service/model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../service/api-client.ts';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { extractError } from '../../util/extract-error.ts';

interface OrderSlice {
  orders: OrderListItem[];
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: OrderSlice = {
  orders: [],
  loading: true,
};

export const fetchOrders = createAsyncThunk<
  OrderListItem[],
  void,
  { rejectValue: ErrorResponse }
>('order/fetchOrders', async (_, { rejectWithValue }) => {
  return await callApiWithErrorHandling(Api.orders.findAll, {}, rejectWithValue);
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = extractError(action);
    });
  }
});

export default orderSlice.reducer;