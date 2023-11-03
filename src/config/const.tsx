export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_APP_URL + "/api"
    : "http://localhost:3000/api";
