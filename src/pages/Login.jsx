import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password state handle karne ke liye

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(form.email, form.password);
      // Successfully authenticated users are redirected to the main dashboard
      navigate("/dashboard");
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/wrong-password' || 
        err.code === 'auth/invalid-credential'
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Authentication failed. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-[10px] border-emerald-600">
        
        {/* Logo & Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <img 
            src="/logo.jpg" 
            alt="Nutrismart Logo" 
            className="w-16 h-16 object-contain mb-3 rounded-xl mix-blend-multiply"
          />
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">
            Nutri<span className="text-emerald-600">smart</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Welcome back! Continue your fitness journey.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 rounded-r-xl animate-pulse">
            <p className="text-red-700 text-xs font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1">Email Address</label>
            <input 
              name="email" 
              type="email"
              placeholder="name@email.com" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
              onChange={handleChange} 
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1">Password</label>
            {/* Input Wrapper Container taake Eye button input ke andar right side par set ho jaye */}
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} // Toggle state control
                placeholder="••••••••" 
                className="w-full p-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                onChange={handleChange} 
                required
              />
              {/* Custom Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  /* Open Eye SVG Icon */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  /* Closed Eye SVG Icon */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.391 4.167 5.327 7.178 9.963 7.178 2.112 0 4.097-.613 5.772-1.677m4.29-4.294a10.467 10.467 0 0 0 1.954-4.207M13.5 5.438A10.53 10.53 0 0 0 12 4.5c-4.638 0-8.573 3.007-9.963 7.178a10.49 10.49 0 0 0 1.34 3.046M9.167 9.167a3 3 0 0 1 4.167 4.167m-1.15 1.15a3 3 0 0 1-4.167-4.167M21 21 3 3" />
                  </svg>
                )}
              </button>
            </div>
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
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : "Sign In →"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-50 pt-6">
          <p className="text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-600 font-black hover:underline underline-offset-4 uppercase">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;