import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.js";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Planner from './pages/Planner';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HelpCenter from './pages/HelpCenter';
// import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQ from './pages/FAQ';
import './App.css';

// Protected Route Component: Unauthorized users ko login page par redirect karta hai
const ProtectedRoute = ({ children, user, loading }) => {
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner color matched with Nutrismart Green */}
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-emerald-700 font-black italic tracking-widest animate-pulse uppercase text-xs">Authenticating...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar user={user} /> 

        <main className="flex-grow pt-16">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" replace /> : <Home />} 
            />

            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
            />

            {/* SIGNUP: New user is directed to Planner to set up their profile */}
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/planner" replace /> : <Signup />} 
            />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* NEWLY ADDED SUPPORT & LEGAL ROUTES */}
            <Route path="/help" element={<HelpCenter />} />
            {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />

            {/* PROTECTED ROUTES: Only accessible after Login/Signup */}
            <Route 
              path="/planner" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Planner />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/reports" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Reports />
                </ProtectedRoute>
              } 
            />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;