
import React, { useEffect, useState } from "react";

import { getStudents, createStudent, deleteStudent } from "../../api/studentApi";
import { getBatches } from "../../api/batchApi";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const [name, setName] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Load batches
  const loadBatches = async () => {
    try {
      const res = await getBatches();
      setBatches(res.data || []);
    } catch (error) {
      console.error("Error loading batches:", error);
    }
  };

  // ✅ Load students based on batch
  const loadStudents = async (batchId) => {
    try {
      const res = await getStudents();
      const filtered = res.data.filter(
        (s) => Number(s.batchId) === Number(batchId)
      );
      setStudents(filtered);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  // ✅ Batch change
  const handleBatchChange = (e) => {
    const batchId = Number(e.target.value);
    setSelectedBatch(batchId);
  };

  // ✅ Create student
  const handleCreate = async () => {
    if (!name || !enrollmentId || !email || !selectedBatch) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createStudent({
        name,
        enrollmentId,
        email,
        batchId: selectedBatch,
      });

      setName("");
      setEnrollmentId("");
      setEmail("");

      loadStudents(selectedBatch);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      loadStudents(selectedBatch);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      loadStudents(selectedBatch);
    }
  }, [selectedBatch]);

  return (
    <div className="page-container">
      <h2>🎓 Student Management</h2>

      {/* Batch Select */}
      <div className="form-section">
        <select value={selectedBatch} onChange={handleBatchChange}>
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.batchName}
            </option>
          ))}
        </select>
      </div>

      {/* Add Student */}
      <div className="form-section">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enrollment ID"
          value={enrollmentId}
          onChange={(e) => setEnrollmentId(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn" onClick={handleCreate}>
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Enrollment</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.enrollmentId}</td>
                <td>{s.email}</td>
                <td>
                  <button
                    className="btn-red"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}