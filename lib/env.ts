function stripTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

export const PUBLIC_BACKEND_ORIGIN = stripTrailingSlash(
  process.env.NEXT_PUBLIC_TMPVAULT_API_URL ?? "",
);

export const BACKEND_ORIGIN =
  PUBLIC_BACKEND_ORIGIN || "http://127.0.0.1:8080";

export const SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

export const IS_DEV = process.env.NODE_ENV === "development";
