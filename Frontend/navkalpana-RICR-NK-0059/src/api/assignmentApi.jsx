
import api from "./axios";

// Get all assignments OR by batch
export const getAssignments = (batchId) => {
  return batchId
    ? api.get(`/assignments/batch/${batchId}`)
    : api.get("/assignments");
};

// Create assignment (batchId required)
export const createAssignment = (batchId, data) => {
  return api.post(`/assignments/${batchId}`, data);
};

// Update assignment
export const updateAssignment = (id, data) => {
  return api.put(`/assignments/${id}`, data);
};

// Delete assignment
export const deleteAssignment = (id) => {
  return api.delete(`/assignments/${id}`);
};