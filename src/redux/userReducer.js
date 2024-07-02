import {
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  isAuth: false,
  loading: false,
  errorMessage: null,
};
const apiUrl = "https://graph.facebook.com/v20.0/";
let tokenLocal = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);
export const getUser = createAsyncThunk("user/fetch_user", async ({accessToken}) => {
  console.log("🚀 ~ getUser ~ token:", accessToken)
  const url = `${apiUrl}/me?fields=id,name,picture,email&access_token=${accessToken ? accessToken : tokenLocal}`;
  const result = await axios.get(url);

  return result;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.data = action.payload;
      if (action.payload) {
        state.isAuth = true;
      }
    },
  },
  extraReducers(builder) {
    builder

      .addMatcher(isFulfilled(getUser), (state, action) => {
        const { data } = action.payload;
        
        
        return {
          ...state,
          loading: false,
          data: data,
          isAuth : true
        };
      })

      .addMatcher(isPending(getUser), (state) => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { saveUser } = userSlice.actions;

export default userSlice.reducer;
