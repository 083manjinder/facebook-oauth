import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import pageReducer from './pageReducer'
import pageInsightsReducer from './pageInsightsReducer'
export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    pageInsight: pageInsightsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),

})