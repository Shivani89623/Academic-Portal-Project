
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="layout-container">
      
      <Navbar />

      <div className="layout-body">
        <Sidebar />
        <div className="layout-page">
          <Outlet />
        </div>
      </div>

    </div>
  );
}


