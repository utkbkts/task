import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...classes: any) {
  return twMerge(clsx(...classes));
}
