import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS initialize
emailjs.init("MlFQucTwfRlyOU9WP");

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // EmailJS API Call
    emailjs.send(
      "service_a5z4hjz", 
      "template_vnumjjs", 
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "MlFQucTwfRlyOU9WP"
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    })
    .catch((error) => {
      console.error('Email error:', error);
      alert("Message bhejne mein masla aaya, please dobara try karein.");
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Brand Colors */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Get in <span className="text-emerald-600">Touch</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Have questions about our Nutrismart planner or need technical support? 
            Our team is here to help you build a smarter nutrition path.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Information Card - Upgraded Premium Dark Theme */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl border border-gray-800">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-wider text-gray-100">Contact Info</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-emerald-600/20 text-emerald-400 p-3.5 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email us at</p>
                    <p className="font-semibold text-gray-200 text-sm md:text-base">codexdani2k26@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-emerald-600/20 text-emerald-400 p-3.5 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Visit Location</p>
                    <p className="font-semibold text-gray-200 text-sm md:text-base">Kohat University</p>
                  </div>
                </div>
              </div>

              {/* Social Links Progress */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-xs font-black mb-4 uppercase tracking-widest text-emerald-500">Follow Our Progress</p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 font-bold rounded-lg flex items-center justify-center cursor-pointer hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">GH</div>
                  <div className="w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 font-bold rounded-lg flex items-center justify-center cursor-pointer hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">LI</div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Snippet */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-gray-900 mb-2 uppercase text-sm tracking-tight">Fast Response</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                We typically respond to technical queries and form validations within 24 hours during working days.
              </p>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-20 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Message Sent!</h3>
                <p className="text-gray-700 font-medium">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none bg-gray-50 text-gray-900 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none bg-gray-50 text-gray-900 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none bg-gray-50 text-gray-700 font-semibold"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none bg-gray-50 text-gray-900 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-extrabold text-white uppercase tracking-wide transition-all transform active:scale-95 shadow-lg ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-100'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;