"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import QRCode from "qrcode";

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a 6-digit OTP
 * Safe for client-side usage
 */
export function generateOTP(): string {
  return Math.random().toString().slice(2, 8).padStart(6, "0");
}

/**
 * Generate a QR code as a data URL
 * Only works on the client to avoid SSR issues
 */
export async function generateQRCode(data: string): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("generateQRCode should only be called on the client");
  }

  return QRCode.toDataURL(data, {
    width: 256,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
}
