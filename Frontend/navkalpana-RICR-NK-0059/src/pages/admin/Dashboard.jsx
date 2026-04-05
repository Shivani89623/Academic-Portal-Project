
import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboardApi";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalCourses: 0,
    totalBatches: 0,
    totalStudents: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const res = await getDashboardSummary();
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching dashboard summary", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Summary</h2>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h3>Total Courses</h3>
          <p>{summary.totalCourses}</p>
        </div>

        <div className="dashboard-box">
          <h3>Total Batches</h3>
          <p>{summary.totalBatches}</p>
        </div>

        <div className="dashboard-box">
          <h3>Total Students</h3>
          <p>{summary.totalStudents}</p>
        </div>

        <div className="dashboard-box">
          <h3>Total Quizzes</h3>
          <p>{summary.totalQuizzes}</p>
        </div>

        <div className="dashboard-box">
          <h3>Total Assignments</h3>
          <p>{summary.totalAssignments}</p>
        </div>
      </div>
    </div>
  );
}