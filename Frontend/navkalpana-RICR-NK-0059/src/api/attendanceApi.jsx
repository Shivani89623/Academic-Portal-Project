
// src/api/attendanceApi.jsx
import api from "./axios";

// ✅ Named exports for all API methods
export const getAttendance = () => api.get("/attendance");
export const markAttendance = (data) => api.post("/attendance", data);
export const getAttendancePercentage = (studentId) =>
  api.get(`/attendance/percentage/${studentId}`);
export const getPresentCount = (studentId) => api.get(`/attendance/present/${studentId}`);
export const getAbsentCount = (studentId) => api.get(`/attendance/absent/${studentId}`);



