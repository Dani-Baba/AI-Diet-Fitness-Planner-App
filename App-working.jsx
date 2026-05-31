import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Simple components for testing
const Navbar = () => (
  <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">AI Diet & Fitness Planner</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          <a href="/planner" className="text-gray-700 hover:text-blue-600 transition-colors">Planner</a>
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="/reports" className="text-gray-700 hover:text-blue-600 transition-colors">Reports</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p>&copy; 2024 AI Diet & Fitness Planner. All rights reserved.</p>
    </div>
  </footer>
);

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
    {/* Hero Section */}
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Personal
          <span className="text-blue-600"> Diet & Fitness</span> Planner
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your health journey with personalized diet plans and workout routines 
          powered by artificial intelligence. Get started today and achieve your fitness goals.
        </p>
        <div className="space-x-4">
          <a 
            href="/planner" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Start Planning
          </a>
          <a 
            href="/about" 
            className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our AI Planner?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
            <p className="text-gray-600">AI-generated diet and workout plans tailored to your specific goals and preferences.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your progress with detailed charts and analytics to stay motivated.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
            <p className="text-gray-600">Download your plans and progress reports as PDF for offline access.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About AI Diet & Fitness Planner</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-lg text-gray-600 mb-6">
          Our AI-powered platform revolutionizes personal health and fitness planning by providing 
          customized diet and workout recommendations based on your individual profile, goals, and preferences.
        </p>
        <p className="text-lg text-gray-600">
          Using advanced artificial intelligence algorithms, we analyze your data to create personalized 
          plans that adapt to your lifestyle and help you achieve sustainable results.
        </p>
      </div>
    </div>
  </div>
);

const SimplePlanner = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Create Your Plan</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-lg text-gray-600 mb-6 text-center">
          The planner feature is being developed. This will include forms to collect your information 
          and generate personalized diet and fitness plans.
        </p>
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SimpleDashboard = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-lg text-gray-600 text-center">
          Your progress dashboard will appear here once you create a plan.
        </p>
      </div>
    </div>
  </div>
);

const SimpleReports = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Reports</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-lg text-gray-600 text-center">
          Your progress reports and analytics will be available here.
        </p>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-4">
              Have questions about our AI Diet & Fitness Planner? We'd love to hear from you.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">📧 support@aidietfitness.com</p>
              <p className="text-gray-600">📞 +1 (555) 123-4567</p>
              <p className="text-gray-600">📍 123 Health St, Wellness City, WC 12345</p>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/planner" element={<SimplePlanner />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/reports" element={<SimpleReports />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

