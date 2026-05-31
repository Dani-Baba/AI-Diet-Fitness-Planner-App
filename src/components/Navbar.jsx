import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService.js';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsOpen(false); 
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          
          {/* BRAND LOGO & NAME (Nutrismart) - Aligned & Balanced */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group py-1">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 border border-gray-100 p-0.5 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/logo.jpg" 
                alt="Nutrismart Logo" 
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase italic leading-none flex items-center">
              Nutri<span className="text-emerald-600">smart</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 font-bold text-base hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 font-bold text-base hover:text-emerald-600 transition-colors">About</Link>

            {user ? (
              <>
                <Link to="/planner" className="text-gray-700 font-bold text-base hover:text-emerald-600 transition-colors">Planner</Link>
                <Link to="/dashboard" className="text-gray-700 font-bold text-base hover:text-emerald-600 transition-colors">Dashboard</Link>
                <Link to="/reports" className="text-gray-700 font-bold text-base hover:text-emerald-600 transition-colors">Reports</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-extrabold text-base uppercase tracking-wide hover:bg-red-600 transition shadow-md shadow-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="text-emerald-600 font-extrabold text-base uppercase tracking-wide hover:text-emerald-700">
                  Login
                </Link>
                <Link to="/signup" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-extrabold text-base uppercase tracking-wide hover:bg-emerald-700 transition shadow-md shadow-emerald-100">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none p-2"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-800 font-bold text-lg rounded-xl hover:bg-emerald-50">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-800 font-bold text-lg rounded-xl hover:bg-emerald-50">About</Link>
          
          {user ? (
            <>
              <Link to="/planner" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-800 font-bold text-lg rounded-xl hover:bg-emerald-50">Planner</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-800 font-bold text-lg rounded-xl hover:bg-emerald-50">Dashboard</Link>
              <Link to="/reports" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-800 font-bold text-lg rounded-xl hover:bg-emerald-50">Reports</Link>
              <button 
                onClick={handleLogout}
                className="w-full text-center py-3.5 bg-red-50 text-red-600 font-extrabold uppercase tracking-wide text-base rounded-xl mt-4"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-3 border-t mt-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center py-3.5 text-emerald-600 font-extrabold text-base uppercase tracking-wide border-2 border-emerald-600 rounded-xl">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-3.5 bg-emerald-600 text-white font-extrabold text-base uppercase tracking-wide rounded-xl shadow-lg shadow-emerald-50">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;