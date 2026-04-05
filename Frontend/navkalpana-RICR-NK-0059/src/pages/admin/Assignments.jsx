
import React, { useEffect, useState } from "react";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../../api/assignmentApi";
import { getBatches } from "../../api/batchApi";


export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [editId, setEditId] = useState(null);

  // Load batches
  useEffect(() => {
    const loadBatches = async () => {
      try {
        const res = await getBatches();
        setBatches(res.data);
      } catch (error) {
        console.error("Error loading batches:", error);
      }
    };
    loadBatches();
  }, []);

  // Load assignments when batch changes
  useEffect(() => {
    if (!selectedBatchId) return;

    const loadAssignments = async () => {
      try {
        const res = await getAssignments(selectedBatchId);
        setAssignments(res.data);
      } catch (error) {
        console.error("Error loading assignments:", error);
      }
    };

    loadAssignments();
  }, [selectedBatchId]);

  // Create OR Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBatchId) return alert("Please select a batch");
    if (!title || !desc) return alert("All fields required");

    try {
      if (editId) {
        await updateAssignment(editId, { title, description: desc });
        alert("Assignment updated successfully");
      } else {
        await createAssignment(selectedBatchId, { title, description: desc });
        alert("Assignment created successfully");
      }

      setTitle("");
      setDesc("");
      setEditId(null);

      const res = await getAssignments(selectedBatchId);
      setAssignments(res.data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await deleteAssignment(id);
      const res = await getAssignments(selectedBatchId);
      setAssignments(res.data);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Edit
  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setDesc(assignment.description);
    setEditId(assignment.id);
  };

  return (
    <div className="assignments-container">
      <h2>📘 Assignment Management</h2>

      {/* Batch Dropdown */}
      <select
        value={selectedBatchId}
        onChange={(e) => setSelectedBatchId(e.target.value)}
        className="border p-3 rounded mb-6 w-full"
      >
        <option value="">Select Batch</option>
        {batches.map((b) => (
          <option key={b.id} value={b.id}>
            {b.batchName}
          </option>
        ))}
      </select>

      {/* Form */}
      <form onSubmit={handleSubmit} className="assignments-form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Assignment Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className={editId ? "update-btn" : "add-btn"}
        >
          {editId ? "Update Assignment" : "Add Assignment"}
        </button>
      </form>

      {/* Assignment List */}
      {assignments.length === 0 ? (
        <p className="text-center text-gray-500">
          📭 No assignments found for this batch.
        </p>
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className="assignment-card">
              <div>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(a)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}