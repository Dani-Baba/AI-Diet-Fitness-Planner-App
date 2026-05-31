import React from 'react';

const FAQ = () => {
  const faqs = [
    { q: "How does the AI generate my meal plans?", a: "Nutrismart takes your age, weight, target goals, and filters them through automated algorithms to compute optimal caloric values and macro distribution targets." },
    { q: "Is my personal workout log data safe?", a: "Yes, all your authentication credentials and database documents are encrypted and managed via safe system rules." },
    { q: "Can I modify my fitness preferences later?", a: "Absolutely. You can switch up your target matrices at any time via your interactive personal user dashboard configuration." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tight text-center">
          Frequently Asked <span className="text-emerald-600">Questions</span>
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-emerald-200">
              <h3 className="font-extrabold text-gray-900 text-base md:text-lg mb-2 flex gap-2">
                <span className="text-emerald-600">Q.</span> {faq.q}
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;