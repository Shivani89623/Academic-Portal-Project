
import React, { useEffect, useState } from "react";

import {
  getBatches,
  createBatch,
  deleteBatch,
  updateBatch,
} from "../../api/batchApi";
import { getCourses } from "../../api/courseApi";

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [batchName, setBatchName] = useState("");
  const [batchType, setBatchType] = useState("REGULAR");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("UPCOMING");
  const [type, setType] = useState("ONLINE");

  const [editingId, setEditingId] = useState(null);

  // ✅ Load Courses
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Load Batches
  const loadBatches = async (courseId) => {
    if (!courseId) return;

    try {
      const res = await getBatches();
      let filtered = res.data.filter(
        (b) => Number(b.courseId) === Number(courseId)
      );

      if (filterStatus) {
        filtered = filtered.filter((b) => b.status === filterStatus);
      }

      setBatches(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Course change
  const handleCourseChange = (e) => {
    const courseId = Number(e.target.value);
    setSelectedCourse(courseId);
    loadBatches(courseId);
  };

  // ✅ Filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    loadBatches(selectedCourse);
  };

  // ✅ Create / Update
  const handleSave = async () => {
    if (!batchName || !selectedCourse) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      batchName,
      batchType,
      startDate,
      endDate,
      status,
      type,
      courseId: selectedCourse,
    };

    try {
      if (editingId) {
        await updateBatch(editingId, payload);
        setEditingId(null);
      } else {
        await createBatch(payload);
      }

      // Reset
      setBatchName("");
      setBatchType("REGULAR");
      setStartDate("");
      setEndDate("");
      setStatus("UPCOMING");
      setType("ONLINE");

      loadBatches(selectedCourse);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this batch?")) return;
    try {
      await deleteBatch(id);
      loadBatches(selectedCourse);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Edit
  const handleEdit = (b) => {
    setEditingId(b.id);
    setBatchName(b.batchName);
    setBatchType(b.batchType);
    setStartDate(b.startDate);
    setEndDate(b.endDate);
    setStatus(b.status);
    setType(b.type);
  };

  return (
    <div className="page-container">
      <h2>🔥 Batch Management</h2>

      {/* Course + Filter */}
      <div className="form-section">
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseName}
            </option>
          ))}
        </select>

        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Form */}
      <div className="form-section">
        <input
          type="text"
          placeholder="Batch Name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />

        <select value={batchType} onChange={(e) => setBatchType(e.target.value)}>
          <option value="REGULAR">Regular</option>
          <option value="CRASH">Crash</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
        </select>

        <button className="btn" onClick={handleSave}>
          {editingId ? "Update Batch" : "Add Batch"}
        </button>
      </div>

      {/* Table */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
            <th>Mode</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {batches.length === 0 ? (
            <tr>
              <td colSpan="9">No batches found</td>
            </tr>
          ) : (
            batches.map((b) => (
              <tr key={b.id || `${b.batchName}-${Math.random()}`}>
                <td>{b.id}</td>
                <td>{b.batchName}</td>
                <td>{b.batchType}</td>
                <td>{b.status}</td>
                <td>
                  {b.startDate
                    ? new Date(b.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {b.endDate
                    ? new Date(b.endDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>{b.type}</td>
                <td>{b.courseName}</td>
                <td>
                  <button
                    className="btn-blue"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn-red"
                    onClick={() => handleDelete(b.id)}
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