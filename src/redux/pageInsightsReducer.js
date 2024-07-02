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
export const getInsights = createAsyncThunk(
  "pageInsight/fetch_list",
  async ({ pageId, since, until, pageToken }) => {
    let metric = 'page_follows,page_post_engagements,page_impressions,page_actions_post_reactions_like_total'
    const url = `${apiUrl}${pageId}/insights?metric=${metric}${since && until ? `&since=${since}&until=${until}` :''}&period=total_over_range&access_token=${pageToken}`;
    const result = await axios.get(url);

    return result;
  }
);

export const pageInsightsSlice = createSlice({
  name: "pageInsight",
  initialState,
  extraReducers(builder) {
    builder

      .addMatcher(isFulfilled(getInsights), (state, action) => {
        const { data } = action.payload;
        let updateData = data?.data?.map((items) => {
          if (items.name === 'page_follows') {
              items.name = "Total Followers";
          } else if (items.name === "page_post_engagements") {
              items.name = "Total Engagement";
          } else if (items.name === "page_impressions") {
            items.name = "Total Impressions";
        } else if (items.name === "page_actions_post_reactions_like_total") {
          items.name = "Total Reactions";
      }
          return items; // Return the modified item
      });
              
        return {
          ...state,
          loading: false,
          data: updateData,
        };
      })

      .addMatcher(isPending(getInsights), (state) => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = pageInsightsSlice.actions;

// Reducer
export default pageInsightsSlice.reducer;
