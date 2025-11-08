import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import Dashboard from "./components/DashBoard.jsx";
import LoginForm from "./components/Loginform.jsx";
import Signupform from "./components/Signupform.jsx";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* If user logged in -> Dashboard, else -> Login */}
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />

      {/* Auth routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginForm />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Signupform />}
      />

      {/* fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

