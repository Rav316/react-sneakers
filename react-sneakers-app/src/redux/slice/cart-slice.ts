import type {
  CartItem,
  CartItemCreateDto,
  CartItemUpdateDto,
  CartResponse,
  ErrorResponse,
} from '../../service/model.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApiWithErrorHandling } from '../../util/call-api-with-error-handling.ts';
import { Api } from '../../service/api-client.ts';
import { extractError } from '../../util/extract-error.ts';

interface CartSlice {
  cart: CartResponse;
  loading: boolean;
  error?: ErrorResponse;
  changeStatus: {
    loading: boolean;
    error?: ErrorResponse;
  };
}

const initialState: CartSlice = {
  cart: {
    items: [],
    sum: 0,
  },
  loading: true,
  changeStatus: {
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
  CartItem,
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

export const updateCartItemQuantity = createAsyncThunk<
  CartItem,
  CartItemUpdateDto,
  { rejectValue: ErrorResponse }
>(
  'cart/updateCartItemQuantity',
  async (cartItemUpdateDto: CartItemUpdateDto, { rejectWithValue }) => {
    return await callApiWithErrorHandling(
      Api.cart.updateCartItemQuantity,
      cartItemUpdateDto,
      rejectWithValue,
    );
  },
);

export const decrementCartItemQuantity = createAsyncThunk<void, number, {rejectValue: ErrorResponse}>(
  'cart/decrementCartItemQuantity',
  async (id: number, { rejectWithValue }) =>
    await callApiWithErrorHandling(
      Api.cart.decrementCartItemQuantity,
      id,
      rejectWithValue,
    ),
)

export const removeFromCart = createAsyncThunk<
  void,
  number,
  { rejectValue: ErrorResponse }
>(
  'cart/removeFromCart',
  async (id: number, { rejectWithValue }) =>
    await callApiWithErrorHandling(
      Api.cart.removeFromCart,
      id,
      rejectWithValue,
    ),
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
        state.changeStatus = {
          loading: true,
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.changeStatus = {
          loading: false,
        };
        state.cart.items.push(action.payload);
        state.cart.sum += action.payload.price * action.payload.quantity;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.changeStatus = {
          loading: false,
          error: extractError(action),
        };
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.changeStatus = {
          loading: true,
        };
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.changeStatus = {
          loading: false,
        };
        state.cart.items = state.cart.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
        state.cart.sum = state.cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.changeStatus = {
          loading: false,
          error: extractError(action),
        };
      })
      .addCase(decrementCartItemQuantity.pending, (state) => {
        state.changeStatus = {
          loading: true
        }
      })
      .addCase(decrementCartItemQuantity.fulfilled, (state, action) => {
        state.changeStatus = {
          loading: false
        }
        state.cart.items = state.cart.items.map((item) => {
          if(item.id === action.meta.arg) {
            item.quantity -= 1;
          }
          return item;
        })
        state.cart.sum = state.cart.sum - (state.cart.items.find((item) => item.id === action.meta.arg)?.price || 0);
      })
      .addCase(decrementCartItemQuantity.rejected, (state, action) => {
        state.changeStatus = {
          loading: false,
          error: extractError(action),
        };
      })
      .addCase(removeFromCart.pending, (state) => {
        state.changeStatus = {
          loading: true,
        };
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== action.meta.arg,
        );
        state.cart.sum = state.cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        state.changeStatus = {
          loading: false,
        };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.changeStatus = {
          loading: false,
          error: extractError(action),
        };
      });
  },
});

export default cartSlice.reducer;
