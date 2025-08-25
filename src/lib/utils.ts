import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatISODate(isoString: string) {
  const date = new Date(isoString); // Automatically parses ISO 8601
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // "August"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short", // e.g., GMT, UTC
  };
  return date.toLocaleString(undefined, options);
}
