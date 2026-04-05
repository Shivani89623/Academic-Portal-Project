
import api from "./axios";

// GET all quizzes
export const getQuizzes = () => api.get("/quizzes");

// CREATE quiz
export const createQuiz = (data) => api.post("/quizzes", data);

// DELETE quiz
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);
