import React from 'react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
          Help <span className="text-emerald-600">Center</span>
        </h1>
        <p className="text-gray-600 mb-8 font-medium">
          Welcome to the Nutrismart Support Desk. How can we help you structure your fitness journey today?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Account & Access</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Trouble logging in or resetting your fitness dashboard credentials? Contact our auth desk via the contact form.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-2">AI Planner Issues</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              If the macro-nutrient generator is lagging or failing to load your custom diet, clear your browser cache or re-login.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
          <p className="text-emerald-900 font-bold mb-3">Still need immediate technical support?</p>
          <p className="text-sm text-emerald-700">Drop us a line directly through our active support desk.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;