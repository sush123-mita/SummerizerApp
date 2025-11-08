import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { login as apiLogin} from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();
  const {login: authLogin} = useAuth();

  useEffect(() => {
    document.title = "Login | MyApp";
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await apiLogin({ email, password });

         // 👇 Save user + token via context (this updates AppRoutes)
      authLogin({
        token: res.data.token,
        user: {email},
      });

      // Redirect after login 
      navigate("/");
    }catch(err){
      setError(err.response?.data?.message || "Login failed")

    }finally{
      setLoading(false);
    }

  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully 👋");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {!isLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome Back 👋
            </h2>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50">
                <Mail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center border rounded-xl p-3 bg-gray-50">
                <Lock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              You are already logged in 🎉
            </h2>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
