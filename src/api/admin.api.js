import axiosInstance from "./axiosInstance";

export const updateSchedule = (id, data) =>
  axiosInstance.put(`/admin/schedules/${id}`, data);

export const updateClass = (id, data) =>
  axiosInstance.put(`/admin/courses/classes/${id}`, data);

export const createClass = (courseId, data) =>
  axiosInstance.post(`/admin/courses/${courseId}/classes`, data);

export const cancelSchedule = (id) =>
  axiosInstance.patch(`/admin/schedules/${id}/cancel`);

export const viewStudents = () =>
  axiosInstance.get(`/admin/view-students`);