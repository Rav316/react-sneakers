import type { ErrorResponse, OrderItemResponse } from '../../service/model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../service/api-client.ts';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';

interface OrderItemSlice {
  itemsByOrderId: Record<number, OrderItemResponse>;
  loadingByOrderId: Record<number, boolean>;
  errorByOrderId: Record<number, ErrorResponse | undefined>;
}

const initialState: OrderItemSlice = {
  itemsByOrderId: {},
  loadingByOrderId: {},
  errorByOrderId: {},
};

export const fetchOrderItems = createAsyncThunk<
  OrderItemResponse,
  number,
  { rejectValue: ErrorResponse }
>(
  'orderItem/fetchOrderItems',
  async (orderId: number, { rejectWithValue }) => {
    return await callApiWithErrorHandling(
      Api.orders.findItemsByOrder,
      orderId,
      rejectWithValue,
    )
  },
);

const orderItemSlice = createSlice({
  name: 'orderItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderItems.pending, (state, action) => {
      const orderId = action.meta.arg;
      state.loadingByOrderId[orderId] = true;
      state.errorByOrderId[orderId] = undefined;
    })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        const payload = action.payload;
        state.loadingByOrderId[payload.orderId] = false;
        state.itemsByOrderId[payload.orderId] = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        const orderId = action.meta.arg;
        state.loadingByOrderId[orderId] = false;
        state.errorByOrderId[orderId] = action.payload;
      });
  }
});

export default orderItemSlice.reducer;