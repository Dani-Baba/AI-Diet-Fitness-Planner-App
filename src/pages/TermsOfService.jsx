import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
          Terms of <span className="text-emerald-600">Service</span>
        </h1>
        <p className="text-gray-500 text-sm mb-6 font-semibold">Last Updated: May 2026</p>

        <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Use of AI Recommendations</h2>
            <p className="text-sm text-gray-600">
              Nutrismart provides automated fitness and meal blueprints derived via machine learning API setups. These guidelines are for informational purposes and should not override certified clinical consultation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Account Responsibility</h2>
            <p className="text-sm text-gray-600">
              Users are completely responsible for managing the protection of their personal application credentials and session security integrity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;