import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthResponse, ErrorResponse, User } from '../../service/model.ts';
import { Api } from '../../service/api-client.ts';
import type { LoginData, RegisterData } from '../../service/auth.ts';
import type { AxiosError } from 'axios';

interface AuthSlice {
  user?: User;
  token?: string;
  loading: boolean;
  error?: ErrorResponse;
}

const tokenFromStorage = localStorage.getItem('token') ?? undefined;

const initialState: AuthSlice = {
  token: tokenFromStorage,
  loading: false,
};

export const register = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: ErrorResponse }
>('auth/register', async (registerData: RegisterData, { rejectWithValue }) => {
  try {
    return await Api.auth.register(registerData);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    const message = error.response?.data?.message || 'Unexpected error';
    const code = error.response?.status || 500;

    return rejectWithValue({ message, code });
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginData,
  { rejectValue: ErrorResponse }
>('auth/login', async (loginData: LoginData, { rejectWithValue }) => {
  try {
    return await Api.auth.login(loginData);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    const message = error.response?.data?.message || 'Unexpected error';
    const code = error.response?.status || 500;

    return rejectWithValue({ message, code });
  }
});

export const checkAuth = createAsyncThunk<AuthResponse, void>(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      return await Api.auth.refreshToken();
    } catch {
      localStorage.removeItem('token');
      return thunkAPI.rejectWithValue('Unauthorized');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.user = {};
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (action.payload.token != null) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = {
            message: action.error.message || 'Unknown error',
            code: 500,
          };
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = {};
        state.token = undefined;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (action.payload.token != null) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = {
            message: action.error.message || 'Unknown error',
            code: 500,
          };
        }
      });
  },
});

export default authSlice.reducer;
export const { clearError, logout } = authSlice.actions;
