import axios from "axios";

const isBrowser = typeof window !== "undefined";
const API_BASE_URL = isBrowser ? "/api/" : process.env.NEXT_PUBLIC_API_BASE_URL;

// Use same-origin image paths in the browser so both the production domain
// and direct IP host resolve uploaded assets consistently.
export const HOST_API = isBrowser ? "" : process.env.NEXT_PUBLIC_API_IMAGE;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

// Keep errors in-place; admin routes are now publicly reachable.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
