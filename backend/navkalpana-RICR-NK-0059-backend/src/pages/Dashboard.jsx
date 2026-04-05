// import { useEffect, useState } from "react";
// import API from "../api/Axoisinstance";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [summary, setSummary] = useState({});

//   useEffect(() => {
//     API.get("/dashboard/summary")
//       .then(res => setSummary(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div>
//         <div>
      
//       <h2>Dashboard Content Here</h2>
//     </div>
//       <h2>Dashboard</h2>
//       <p>Total Batches: {summary.totalBatches}</p>
//       <p>Active: {summary.activeBatches}</p>
//       <p>Completed: {summary.completedBatches}</p>
//     </div>
//  
import { useEffect, useState } from "react";
import API from "../api/Axoisinstance";


export default function Dashboard() {

  const [summary, setSummary] = useState({
    totalStudents: 0,
    activeCourses: 0,
    pendingAssignments: 0
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await API.get("/dashboard/summary");
    setSummary(res.data);
  };

  return (
    <div className="dashboard-container">

      <h2>📊 Dashboard Overview</h2>

      <div className="dashboard-cards">

        <div className="card students">
          <h3>Total Students</h3>
          <p>{summary.totalStudents}</p>
        </div>

        <div className="card courses">
          <h3>Active Courses</h3>
          <p>{summary.activeCourses}</p>
        </div>

        <div className="card assignments">
          <h3>Pending Assignments</h3>
          <p>{summary.pendingAssignments}</p>
        </div>

      </div>
    </div>
  );
}

