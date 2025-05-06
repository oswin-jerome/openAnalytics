import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function formatSeconds(seconds: number, locale = "en") {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m > 0 ? m + "m " : ""}${s}s`.trim();
}

export const getColor = (index: number) => {
  const colors = ["var(--color-red-400)", "var(--color-app-500)", "var(--color-green-400)", "var(--color-orange-400)", "var(--color-blue-400)", "var(--color-purple-400)"];
  return colors[index % colors.length];
};
