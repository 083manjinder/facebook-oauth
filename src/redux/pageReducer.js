import axios from "axios";
import {
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errorMessage: null,
  data: [],
};

const apiUrl = "https://graph.facebook.com/v20.0/";
let token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);
export const getPages = createAsyncThunk(
  "facebookPage/fetch_page_list",
  async ({ userId, accessToken }) => {
    const url = `${apiUrl}${userId}/accounts?access_token=${token ? token : accessToken}&fields=picture,name, category,cover_photo,access_token`;
    const result = await axios.get(url);

    return result;
  }
);

export const pageSlice = createSlice({
  name: "facebookPage",
  initialState,
  extraReducers(builder) {
    builder

      .addMatcher(isFulfilled(getPages), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          data: data.data,
        };
      })

      .addMatcher(isPending(getPages), (state) => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = pageSlice.actions;

// Reducer
export default pageSlice.reducer;
