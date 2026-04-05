
import React, { useEffect, useState } from "react";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../api/courseApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState("");

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourseName, setEditingCourseName] = useState("");
  const [editingActive, setEditingActive] = useState(true);

  // Load courses
  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load courses");
    }
  };

  // Create
  const handleCreate = async () => {
    if (!courseName.trim()) return alert("Enter course name");

    try {
      await createCourse({ courseName, active });
      setCourseName("");
      setActive(true);
      setMessage("✅ Course added successfully");
      loadCourses();
    } catch {
      setMessage("❌ Failed to add course");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);
      setMessage("🗑️ Course deleted");
      loadCourses();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  // Edit
  const handleEdit = (course) => {
    setEditingCourseId(course.id);
    setEditingCourseName(course.courseName);
    setEditingActive(course.active);
  };

  // Update
  const handleUpdate = async () => {
    try {
      await updateCourse(editingCourseId, {
        courseName: editingCourseName,
        active: editingActive,
      });

      setEditingCourseId(null);
      setMessage("✏️ Course updated");
      loadCourses();
    } catch {
      setMessage("❌ Update failed");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="page-container max-w-5xl mx-auto mt-10 p-6">
      <h2>📘 Course Management</h2>

      {message && <div className="mb-4 p-2 rounded">{message}</div>}

      {/* FORM */}
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <select
          value={active}
          onChange={(e) => setActive(e.target.value === "true")}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button onClick={handleCreate}>➕ Add Course</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No courses available</td>
            </tr>
          ) : (
            courses.map((c, index) => (
              <tr key={c.id || index}>
                <td>{c.id}</td>

                {/* NAME */}
                <td>
                  {editingCourseId === c.id ? (
                    <input
                      value={editingCourseName}
                      onChange={(e) =>
                        setEditingCourseName(e.target.value)
                      }
                    />
                  ) : (
                    c.courseName
                  )}
                </td>

                {/* STATUS */}
                <td>
                  {editingCourseId === c.id ? (
                    <select
                      value={editingActive}
                      onChange={(e) =>
                        setEditingActive(e.target.value === "true")
                      }
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={
                        c.active ? "badge active" : "badge inactive"
                      }
                    >
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td>
                  {editingCourseId === c.id ? (
                    <>
                      <button
                        className="bg-green-500"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500"
                        onClick={() => setEditingCourseId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}