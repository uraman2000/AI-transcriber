import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface ErrorData {
  message?: string;
  error?: {
    message?: string;
  };
}

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload as { data: ErrorData };
    //supabbase data.message
    //openAI data.error.message
    console.log(data);
    toast.error(data.message || data.error?.message || "An error occurred");
  }

  return next(action);
};
