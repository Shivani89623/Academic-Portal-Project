
import { NavLink } from "react-router-dom";
 // optional, styling

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/courses" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Courses
        </NavLink>
        <NavLink to="/admin/batches" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Batches
        </NavLink>
        <NavLink to="/admin/students" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Students
        </NavLink>
        <NavLink to="/admin/attendance" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Attendance
        </NavLink>
        <NavLink to="/admin/assignments" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Assignments
        </NavLink>
        <NavLink to="/admin/quizzes" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Quizzes
        </NavLink>
        <NavLink to="/admin/progress" className={({ isActive }) => isActive ? "active-link" : "link"}>
          Progress
        </NavLink>
      </nav>
    </aside>
  );
}





