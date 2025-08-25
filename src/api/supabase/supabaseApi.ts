import { decrypt, encrypt } from "@/lib/cryptoUtils";
import { formatISODate } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Transcription } from "./transcription.type";

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  tagTypes: ["transcription"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${
      import.meta.env.VITE_SUPABASE_PROJECT_ID
    }.supabase.co/rest/v1/`,
    prepareHeaders: (headers) => {
      headers.set("apikey", import.meta.env.VITE_SUPABASE_ANON_KEY);
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTranscription: builder.query<Array<Transcription>, void>({
      query: () => "transcription?order=id.asc",
      transformResponse: (response: Array<Transcription>) => {
        return response.map((item) => ({
          ...item,
          ciphertext: decrypt(item.ciphertext),
          created_at: formatISODate(item.created_at),
        }));
      },
      providesTags: ["transcription"],
    }),
    getTranscriptionById: builder.query({
      query: (id) => `transcription?${id}`,
    }),
    createTranscription: builder.mutation({
      query: (newTranscription: string) => ({
        url: "transcription",
        method: "POST",
        body: {
          ciphertext: encrypt(newTranscription),
        },
      }),
      invalidatesTags: ["transcription"],
    }),
    updateTranscription: builder.mutation({
      query: ({ id, newTranscription }) => ({
        url: `transcription?id=eq.${id}`,
        method: "PATCH",
        body: {
          ciphertext: encrypt(newTranscription),
        },
      }),
      invalidatesTags: ["transcription"],
    }),
    deleteTranscription: builder.mutation({
      query: (id) => ({
        url: `transcription?id=eq.${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transcription"],
    }),
  }),
});

export const {
  useGetTranscriptionQuery,
  useCreateTranscriptionMutation,
  useGetTranscriptionByIdQuery,
  useUpdateTranscriptionMutation,
  useDeleteTranscriptionMutation,
} = supabaseApi;
