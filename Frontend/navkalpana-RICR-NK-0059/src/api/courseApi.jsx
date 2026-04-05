
import api from "./axios";
// Courses API
export const getCourses = () => api.get("/courses"); // GET /api/courses
export const createCourse = (data) => api.post("/courses", data); // POST /api/courses
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data); // PUT /api/courses/{id}
export const deleteCourse = (id) => api.delete(`/courses/${id}`); // DELETE /api/courses/{id}


