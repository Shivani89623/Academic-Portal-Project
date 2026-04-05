


import api from "./axios";

// GET progress by batch
export const getProgress = (batchId) => api.get(`/progress/${batchId}`);

