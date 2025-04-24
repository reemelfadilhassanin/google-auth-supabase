// frontend/src/App.jsx

import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "../supabaseClient";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthCallback from "./AuthCallback"; // The callback component after Google login

function Home() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update session state on auth changes
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const signOut = async () => {
    // Clear session from Supabase and frontend
    await supabase.auth.signOut();
    setSession(null); // Clear session state on frontend
    localStorage.removeItem("supabase.auth.token"); // Remove token from local storage (if used)
    navigate("/"); // Navigate back to home
  };

  const signUp = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend for Google OAuth
  };

  if (!session) {
    return <button onClick={signUp}>Sign in with Google</button>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.email}</h2>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
