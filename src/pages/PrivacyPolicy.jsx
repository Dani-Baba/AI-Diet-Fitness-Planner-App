import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
          Privacy <span className="text-emerald-600">Policy</span>
        </h1>
        <p className="text-gray-500 text-sm mb-6 font-semibold">Last Updated: May 2026</p>
        
        <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Data We Collect</h2>
            <p className="text-sm text-gray-600">
              We securely collect user profile parameters including metric weight, height, daily activity logs, and dietary preferences exclusively to structure customized machine learning wellness models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Secure Your Data</h2>
            <p className="text-sm text-gray-600">
              Your sensitive health metrics and personal credentials are protected using Firebase secure authentication schemas and secure API handshakes. We do not sell or leak user metrics.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

