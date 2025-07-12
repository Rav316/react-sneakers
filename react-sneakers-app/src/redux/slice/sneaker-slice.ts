import type { PageResponse, SneakerListItem } from "../../service/model.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SearchParams } from "../../service/sneakers.ts";
import { Api } from "../../service/api-client.ts";

interface SneakerSlice {
  sneakers: PageResponse<SneakerListItem>;
  loading: boolean;
  error: string;
}

const initialState: SneakerSlice = {
  sneakers: {
    content: [],
    metadata: {
      page: 0,
      size: 0,
      totalElements: 0
    },
  },
  loading: true,
  error: ""
}

export const fetchSneakers = createAsyncThunk<PageResponse<SneakerListItem>, SearchParams>(
  "sneaker/fetchSneakers",
  async (params: SearchParams) => {
    return await Api.sneakers.findAll(params)
  }
)

const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.sneakers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSneakers.rejected, (state, action) => {
      state.error = action.error.message || "";
      state.loading = false;
    });
  }
});

export default sneakerSlice.reducer;