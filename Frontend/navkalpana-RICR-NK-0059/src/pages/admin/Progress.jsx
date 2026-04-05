
import React, { useEffect, useState } from "react";
import { getBatches } from "../../api/batchApi";
import { getProgress } from "../../api/progressApi";

export default function Progress() {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [progressData, setProgressData] = useState([]);

  // Load batches
  useEffect(() => {
    const loadBatches = async () => {
      try {
        const res = await getBatches();
        setBatches(res.data || []);
      } catch (err) {
        console.error("Failed to fetch batches:", err);
      }
    };
    loadBatches();
  }, []);

  // Load progress when batch changes
  useEffect(() => {
    if (!selectedBatchId) return;

    const loadProgress = async () => {
      try {
        const res = await getProgress(selectedBatchId);
        setProgressData(res.data || []);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
        setProgressData([]);
      }
    };

    loadProgress();
  }, [selectedBatchId]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📊 Student Progress
      </h2>

      {/* Batch Selection */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedBatchId}
          onChange={(e) => setSelectedBatchId(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.batchName}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Student</th>
              <th className="border px-4 py-2">Attendance %</th>
              <th className="border px-4 py-2">Assignments %</th>
              <th className="border px-4 py-2">Quizzes %</th>
              <th className="border px-4 py-2">Overall Growth</th>
            </tr>
          </thead>
          <tbody>
            {progressData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              progressData.map((p) => (
                <tr
                  key={p.studentId}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-2 font-medium">
                    {p.studentName || "Unknown Student"}
                  </td>
                  <td className="border px-4 py-2">{p.attendancePercentage ?? 0}%</td>
                  <td className="border px-4 py-2">{p.assignmentAverage ?? 0}%</td>
                  <td className="border px-4 py-2">{p.quizAverage ?? 0}%</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      (p.overallGrowthIndex ?? 0) >= 75
                        ? "text-green-600"
                        : (p.overallGrowthIndex ?? 0) >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.overallGrowthIndex ?? 0}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}