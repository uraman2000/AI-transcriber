import { configureStore } from "@reduxjs/toolkit";
import { transcriptionApi } from "../api/transcriptionApi";
import { supabaseApi } from "../api/supabase/supabaseApi";
import { rtkQueryErrorHandler } from "@/api/middleware/rtkQueryErrorHandler";

export const store = configureStore({
  reducer: {
    [transcriptionApi.reducerPath]: transcriptionApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      transcriptionApi.middleware,
      supabaseApi.middleware,
      rtkQueryErrorHandler
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
