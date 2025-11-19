import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api.js";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest("/api/auth/signout", "GET");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav>
      <h2>Portfolio</h2>

      {/* Always visible after login */}
      {user && (
        <>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/qualifications">Qualifications</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </>
      )}

      {/* Admin-only link */}
      {user?.role === "admin" && (
        <NavLink to="/admin/contacts">Messages</NavLink>
      )}

      {/* Guest links */}
      {!user && (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/signin">Signin</NavLink>
        </>
      )}

      {/* Logged-in user */}
      {user && (
        <>
          <span>Welcome {user.fullName}</span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
