import axiosInstance from "./axiosInstance";

export const getProviders = () =>
  axiosInstance.get("/providers");

export const getProviderById = (id) =>
  axiosInstance.get(`/providers/${id}`);

export const createProvider = (data) =>
  axiosInstance.post("/providers", data);

export const updateProvider = (id, data) =>
  axiosInstance.put(`/providers/${id}`, data);

export const deleteProvider = (id) =>
  axiosInstance.delete(`/providers/${id}`);