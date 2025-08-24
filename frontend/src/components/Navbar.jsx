import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const nav = useNavigate();
  const isAdmin = user?.role === "admin";

  return (
    <header className="bg-white  font-bebas">
      <div className="  px-4 py-3 flex items-center justify-between">
     <Link to="/" className="flex items-center font-bold text-3xl">
  <span className="mr-2">Front</span>
  {/* <img className="w-12 h-12 mb-3" src="/shield.png" alt="logo" /> */}
</Link>

        <nav className="flex items-center gap-4">
          {token ? (
            <>
              {!isAdmin && <Link to="/dashboard">Dashboard</Link>}
              {isAdmin && <Link to="/admin/dashboard">Admin</Link>}
              <span className="text-sm text-gray-600">Hi, {user?.username}</span>
              <button onClick={() => { logout(); nav("/login"); }}
                className="px-3 py-1 rounded bg-gray-900 text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

