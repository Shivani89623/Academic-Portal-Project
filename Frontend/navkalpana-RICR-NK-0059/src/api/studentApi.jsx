import api from "./axios";

export const getStudents = () => api.get("/students");
export const createStudent = (data) => api.post("/students", data);
export const getStudentById = (id) => api.get(`/students/${id}`);
export const deleteStudent = (id) => api.delete(`/students/${id}`);