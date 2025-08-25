import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transcriptionApi = createApi({
  reducerPath: "transcriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openai.com/v1/audio/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    transcribe: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "transcriptions",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useTranscribeMutation } = transcriptionApi;
