import type {
  CartItemCreateDto, CartResponse,
  ErrorResponse
} from '../../service/model.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { Api } from '../../service/api-client.ts';
import { extractError } from '../../util/extract-error.ts';

interface CartSlice {
  cart: CartResponse;
  loading: boolean;
  error?: ErrorResponse;
  addStatus: {
    loading: boolean;
    error?: ErrorResponse;
  };
}

const initialState: CartSlice = {
  cart: {
    items: [],
    sum: 0,
    tax: 0,
  },
  loading: true,
  addStatus: {
    loading: false,
  },
};

export const fetchCart = createAsyncThunk<
  CartResponse,
  void,
  { rejectValue: ErrorResponse }
>('cart/fetchCart', async (_, { rejectWithValue }) => {
  return await callApiWithErrorHandling(Api.cart.findAll, {}, rejectWithValue);
});

export const addToCart = createAsyncThunk<
  void,
  CartItemCreateDto,
  { rejectValue: ErrorResponse }
>(
  'cart/addToCart',
  async (cartItemCreateDto: CartItemCreateDto, { rejectWithValue }) => {
    return await callApiWithErrorHandling(
      Api.cart.addToCart,
      cartItemCreateDto,
      rejectWithValue,
    );
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = extractError(action.payload);
      })
      .addCase(addToCart.pending, (state) => {
        state.addStatus = {
          loading: true,
        };
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.addStatus = {
          loading: false,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addStatus = {
          loading: false,
          error: extractError(action),
        };
      });
  },
});

export default cartSlice.reducer;
