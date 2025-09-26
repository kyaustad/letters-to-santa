import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSubcurrency(amount: number) {
  return Math.round(amount * 100);
}

export function formatPhoneNumber(phoneNumber: string | undefined) {
  if (!phoneNumber) {
    return "";
  }
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}
