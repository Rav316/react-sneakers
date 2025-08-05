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
  return await callApiWithErrorHandling(
    Api.orders.findAll,
    {},
    rejectWithValue,
  );
});

export const cancelOrder = createAsyncThunk<
  void,
  number,
  { rejectValue: ErrorResponse }
>('order/cancelOrder', async (orderId: number, { rejectWithValue }) => {
  return await callApiWithErrorHandling(
    Api.orders.cancelOrder,
    orderId,
    rejectWithValue,
  );
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = extractError(action);
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) => {
          if (order.id === action.meta.arg) {
            return { ...order, status: 0 };
          }
          return order;
        });
      });
  },
});

export default orderSlice.reducer;
