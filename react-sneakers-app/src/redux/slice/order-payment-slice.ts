import type { ErrorResponse } from '../../service/model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../service/api-client.ts';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { extractError } from '../../util/extract-error.ts';

interface OrderPaymentSlice {
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: OrderPaymentSlice = {
  loading: false,
};

export const payForOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ErrorResponse }
>(
  'orderPayment/payForOrder',
  async (orderId: string, { rejectWithValue }) => {
    return await callApiWithErrorHandling(
      Api.orders.payForOrder,
      orderId,
      rejectWithValue,
    );
  },
);

const orderPaymentSlice = createSlice({
  name: 'orderPayment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(payForOrder.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    }).addCase(payForOrder.fulfilled, (state) => {
      state.loading = false;
    }).addCase(payForOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = extractError(action);
    });
  }
});

export default orderPaymentSlice.reducer;