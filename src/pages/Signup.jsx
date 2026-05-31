import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService"; 

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      // 1. Firebase mein user register kerna
      await registerUser(form.email, form.password);
      
      console.log("User registered successfully!");

      // 2. SUCCESS: Redirect to Planner so user can setup profile
      navigate("/planner");

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("This email address is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters long.");
      } else {
        setError("Registration failed. Please check your internet connection.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-[10px] border-emerald-600">
        
        {/* Header with Logo & Brand Name */}
        <div className="text-center mb-8 flex flex-col items-center">
          <img 
            src="/logo.jpg" 
            alt="Nutrismart Logo" 
            className="w-16 h-16 object-contain mb-3 rounded-xl mix-blend-multiply"
          />
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">
            Nutri<span className="text-emerald-600">smart</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Create your account to start your personalized fitness journey</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 rounded-r-xl animate-pulse">
            <p className="text-red-700 text-xs font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1">Full Name</label>
            <input 
              name="name" 
              placeholder="E.g. Ali Khan" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
              onChange={handleChange} 
              value={form.name}
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1">Email Address</label>
            <input 
              name="email" 
              type="email"
              placeholder="name@email.com" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
              onChange={handleChange} 
              value={form.email}
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
              onChange={handleChange} 
              value={form.password}
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 mt-4 ${
              loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100'
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up Now →"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-50 pt-6">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account? {" "}
            <Link to="/login" className="text-emerald-600 font-black hover:underline underline-offset-4 uppercase">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;