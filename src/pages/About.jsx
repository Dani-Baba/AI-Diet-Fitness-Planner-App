import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section with Custom Dual-Tone Branding */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            About <span className="text-gray-900">Nutri</span><span className="text-emerald-600">smart</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            A Final Year Project dedicated to revolutionizing personal health through 
            Artificial Intelligence and modern web technologies.
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Mission & AI Workflow */}
          <div className="lg:col-span-2 space-y-8">
            {/* Our Mission Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center uppercase tracking-tight">
                <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span>
                Our Mission
              </h2>
              <p className="text-gray-700 font-medium leading-relaxed">
                Everyone deserves access to personalized health guidance. This platform democratizes 
                nutrition and fitness planning by providing scientifically-backed, customized 
                recommendations that adapt to your unique physiology and goals.
              </p>
            </div>

            {/* How it Works - Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center uppercase tracking-tight">
                <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span>
                The AI Workflow
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Assessment", desc: "Calculates BMR & TDEE using the Harris-Benedict formula.", icon: "📊" },
                  { title: "AI Generation", desc: "Groq API-driven algorithms create customized meal & workout paths.", icon: "🧠" },
                  { title: "Analytics", desc: "Visual tracking of weight, BMI, and calorie expenditure.", icon: "📈" },
                  { title: "Export", desc: "Generate professional PDF reports for offline reference.", icon: "📄" }
                ].map((step, i) => (
                  <div key={i} className="group p-5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all duration-300">
                    <span className="text-3xl mb-3 block transform group-hover:scale-110 transition-transform duration-200">{step.icon}</span>
                    <h3 className="font-extrabold text-gray-900 mb-1.5 uppercase tracking-tight text-base">{step.title}</h3>
                    <p className="text-sm text-gray-600 font-medium leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Tech Stack, Privacy & Creator */}
          <div className="lg:col-span-1 space-y-8">
            {/* Built With Sidebar */}
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white border border-gray-800">
              <h2 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center justify-between">
                <span>Built With</span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "React.js", detail: "Frontend Interface" },
                  { name: "Tailwind CSS", detail: "Responsive Styling" },
                  { name: "Firebase", detail: "Backend & Auth" },
                  { name: "Groq API", detail: "Intelligence Engine" },
                  { name: "Recharts", detail: "Data Visualization" }
                ].map((tech, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-800 pb-2 hover:border-emerald-500/40 transition-colors group">
                    <span className="font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">{tech.name}</span>
                    <span className="text-xs text-gray-400 font-medium">{tech.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Developer Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-tight">The Team</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                Hi, I'm Muhammad Danish! I built Nutrismart to combine my interests in technology, fitness, and bodybuilding. This project is a culmination of my journey as a developer.
              </p>
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p>Lead Developer: Muhammad Danish</p>
                <p className="mt-1 text-gray-500 font-medium">Team Members: Rafay & Hashir</p>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-100 shadow-sm">
              <h3 className="text-emerald-800 font-black mb-2 flex items-center text-sm uppercase tracking-wider">
                <svg className="w-4 h-4 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Privacy Focused
              </h3>
              <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                Your health data is stored securely. No account required for basic generation, 
                giving you full control over your personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Development Note */}
        <div className="text-center text-gray-500 font-semibold text-sm mt-16">
          <p>© 2026 Final Year Project | Computer Science Division</p>
        </div>
      </div>
    </div>
  );
};

export default About;