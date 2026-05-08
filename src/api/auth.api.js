import axiosInstance from "./axiosInstance";

// REFRESH ACCESS TOKEN
export const refreshAccessToken = () =>
  axiosInstance.post("/auth/refresh");

// LOGOUT
export const logoutUser = () =>
  axiosInstance.post("/auth/logout");