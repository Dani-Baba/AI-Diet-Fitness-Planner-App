import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Nutrismart Logo" 
                className="w-10 h-10 object-contain rounded-xl bg-white p-1" 
              />
              <span className="text-2xl font-black tracking-tight uppercase italic">
                Nutri<span className="text-emerald-500">smart</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto sm:mx-0 leading-relaxed text-base">
              Empowering your health journey with AI-powered personalized diet and fitness plans. 
              Transform your lifestyle with scientifically-backed recommendations tailored just for you.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-5">
              <a href="#" className="p-2 bg-gray-800 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-xl text-gray-400 hover:text-pink-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base font-black tracking-wider uppercase text-gray-400 mb-5 border-b border-gray-800 pb-2 inline-block sm:block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">About Us</Link></li>
              <li><Link to="/planner" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Get Started</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Progress Reports</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support Section - NOW COMPLETELY ACTIVE */}
          <div className="text-center sm:text-left">
            <h3 className="text-base font-black tracking-wider uppercase text-gray-400 mb-5 border-b border-gray-800 pb-2 inline-block sm:block">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Help Center</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">Terms of Service</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-emerald-400 transition-colors text-base font-bold">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 font-bold">
            © 2026 Nutrismart. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-emerald-400 transition-colors font-bold">Privacy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-emerald-400 transition-colors font-bold">Terms</Link>
            <Link to="/faq" className="text-gray-500 hover:text-emerald-400 transition-colors font-bold">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;