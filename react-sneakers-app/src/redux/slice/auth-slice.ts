import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ErrorResponse, UserAuthData } from "../../service/model.ts";
import { Api } from "../../service/api-client.ts";
import type { LoginData } from "../../service/auth.ts";
import type { AxiosError } from "axios";

interface AuthSlice {
  user: UserAuthData;
  loading: boolean;
  error?: ErrorResponse;
}

const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthSlice = {
  user: tokenFromStorage ? { token: tokenFromStorage } : {},
  loading: false
};

export const login = createAsyncThunk<UserAuthData, LoginData, { rejectValue: ErrorResponse }>(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      return await Api.auth.login(loginData);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      const message = error.response?.data?.message || "Unexpected error";
      const code = error.response?.status || 500;

      return rejectWithValue({ message, code });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.payload.token != null) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message || "Unknown error", code: 500 };
        }
      })
  },
});

export default authSlice.reducer;
export const { clearError, logout } = authSlice.actions;