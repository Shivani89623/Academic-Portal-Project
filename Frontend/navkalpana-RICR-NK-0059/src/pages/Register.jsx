
import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", data);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-card">
        <h2>Register</h2>
        <input placeholder="Name" onChange={(e)=>setData({...data, name:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setData({...data, email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setData({...data, password:e.target.value})}/>
        <button type="submit">Register</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}