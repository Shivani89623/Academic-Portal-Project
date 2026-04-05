
import React, { useState, useEffect } from "react";


import {
  getAttendance,
  markAttendance,
  getAttendancePercentage,
  getPresentCount,
  getAbsentCount,
} from "../../api/attendanceApi";

import { getBatches } from "../../api/batchApi";
import { getCourses } from "../../api/courseApi";

export default function Attendance() {
  const [studentId, setStudentId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [remarks, setRemarks] = useState("");

  const [message, setMessage] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [studentPercentages, setStudentPercentages] = useState({});

  useEffect(() => {
    loadCourses();
    fetchAttendanceList();
  }, []);

  useEffect(() => {
    if (studentId) {
      fetchStudentStats(Number(studentId));
    }
  }, [studentId]);

  const loadCourses = async () => {
    const res = await getCourses();
    setCourses(res.data || []);
  };

  const loadBatches = async (courseId) => {
    const res = await getBatches();
    const filtered = res.data.filter(
      (b) => Number(b.courseId) === Number(courseId)
    );
    setBatches(filtered);
  };

  const fetchAttendanceList = async () => {
    const res = await getAttendance();
    const list = res.data || [];
    setAttendanceList(list);

    const percentages = {};
    await Promise.all(
      list.map(async (a) => {
        try {
          const resPercent = await getAttendancePercentage(a.studentId);
          percentages[a.studentId] = resPercent.data || 0;
        } catch {
          percentages[a.studentId] = 0;
        }
      })
    );
    setStudentPercentages(percentages);
  };

  const fetchStudentStats = async (id) => {
    const [p, a, per] = await Promise.all([
      getPresentCount(id),
      getAbsentCount(id),
      getAttendancePercentage(id),
    ]);

    setPresentCount(p.data || 0);
    setAbsentCount(a.data || 0);
    setPercentage(per.data || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: Number(studentId),
      batchId: Number(selectedBatch),
      date: date,
      status,
      remarks,
    };

    try {
      const res = await markAttendance(payload);
      setMessage(res.data);

      fetchAttendanceList();

      setStudentId("");
      setSelectedCourse("");
      setSelectedBatch("");
      setDate("");
      setStatus("PRESENT");
      setRemarks("");
    } catch (err) {
      setMessage("Error marking attendance");
    }
  };

  return (
    <div className="attendance-container">

      <h2 className="title">📘 Attendance Management</h2>

      {message && <div className="message">{message}</div>}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="attendance-form">

        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            loadBatches(e.target.value);
          }}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.courseName}</option>
          ))}
        </select>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>{b.batchName}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LATE">Late</option>
        </select>

        <input
          type="text"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <button>Mark Attendance</button>
      </form>

      {/* STATS */}
      {studentId && (
        <div className="stats">
          <p>✅ Present: {presentCount}</p>
          <p>❌ Absent: {absentCount}</p>
          <p>📊 Attendance: {percentage.toFixed(2)}%</p>
        </div>
      )}

      {/* TABLE */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Batch</th>
            <th>Date</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>%</th>
          </tr>
        </thead>

        <tbody>
          {attendanceList.map((a, index) => (
            <tr key={a.id || index}>
              <td>{a.id}</td>
              <td>{a.studentName || a.student?.name || a.studentId}</td>
              <td>{a.batchId}</td>
              <td>{a.date}</td>

              <td className={`status ${a.status.toLowerCase()}`}>
                {a.status}
              </td>

              <td>{a.remarks}</td>

              <td>
                {studentPercentages[a.studentId] !== undefined
                  ? studentPercentages[a.studentId].toFixed(2)
                  : "0.00"}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}