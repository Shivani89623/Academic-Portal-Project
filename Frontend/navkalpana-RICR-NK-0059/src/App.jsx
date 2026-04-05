
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import MainLayout from "./layout/MainLayout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Dashboard from "./pages/admin/Dashboard";
// import Courses from "./pages/admin/Courses";
// import Batches from "./pages/admin/Batches";
// import Students from "./pages/admin/Students";
// import Attendance from "./pages/admin/Attendance";
// import Assignments from "./pages/admin/Assignments";
// import Quizzes from "./pages/admin/Quizzes";
// import Progress from "./pages/admin/Progress";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
          
//           <Route path="/" element={<Home/>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
        
// 
  
      
//           <Route
//             path="/*"  element={<ProtectedRoute>
//  <MainLayout />
//               </ProtectedRoute>
//             }
//           > 
            
//             <Route index element={<Dashboard />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="courses" element={<Courses />} />
//             <Route path="batches" element={<Batches />} />
//             <Route path="students" element={<Students />} />
//             <Route path="attendance" element={<Attendance />} />
//             <Route path="assignments" element={<Assignments />} />
//             <Route path="quizzes" element={<Quizzes />} />
//             <Route path="progress" element={<Progress />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;








import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Batches from "./pages/admin/Batches";
import Students from "./pages/admin/Students";
import Attendance from "./pages/admin/Attendance";
import Assignments from "./pages/admin/Assignments";
import Quizzes from "./pages/admin/Quizzes";
import Progress from "./pages/admin/Progress";
import Questions from "./pages/admin/Questions";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="batches" element={<Batches />} />
              <Route path="students" element={<Students />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="quizzes" element={<Quizzes />} />
          
                <Route path="quizzes/:quizId" element={<Questions />} />
              <Route path="progress" element={<Progress />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;




