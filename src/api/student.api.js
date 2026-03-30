import axiosInstance from "./axiosInstance";

// Register
export const registerStudent = (data) =>
  axiosInstance.post("/student/register", data);

// Login
export const loginStudent = (data) =>
  axiosInstance.post("/student/login", data);

// OTP Verify
export const verifyOtp = (data) =>
  axiosInstance.post("/student/otp-verify", data);

// Forgot Password
export const forgotPassword = (data) =>
  axiosInstance.post("/student/forgot-password", data);

// Reset Password
export const resetPassword = (data) =>
  axiosInstance.post("/student/reset-password", data);

// Update Student
export const updateStudent = (id, data) =>
  axiosInstance.put(`/student/update/${id}`, data);

// Get Students
export const getStudents = () =>
  axiosInstance.get("/student/view-students");