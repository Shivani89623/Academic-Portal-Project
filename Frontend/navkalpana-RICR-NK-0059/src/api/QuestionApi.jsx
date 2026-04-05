import api from "./axios";

// GET questions by quiz
export const getQuestions = (quizId) =>
  api.get(`/questions/quiz/${quizId}`);

// ADD question
export const addQuestion = (quizId, data) =>
  api.post(`/questions/${quizId}`, data);

// DELETE question
export const deleteQuestion = (id) =>
  api.delete(`/questions/${id}`);