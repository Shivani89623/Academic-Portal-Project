// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "TEACHER"
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleRegister = async () => {
//     try {
//       await axios.post(
//         "http://localhost:8080/api/auth/register",
//         form
//       );
//       alert("Registration Successful");
//       navigate("/");
//     } catch (err) {
//       alert("Error while registering");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <input name="name" placeholder="Name" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />

//       <select name="role" onChange={handleChange}>
//         <option value="TEACHER">Teacher</option>
//         <option value="ADMIN">Admin</option>
//       </select>

//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }








import { useState } from "react";
import API from "../api/Axoisinstance";
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