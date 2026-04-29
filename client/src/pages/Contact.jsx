/**
 * @page Contact
 * @description Contact form and information for the platform
 * @route /contact
 * @component
 */

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Seo from '../components/Seo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setTimeout(() => setStatus(''), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <>
      <Seo
        title="Contact Us | Indian Stock Screener"
        description="Get in touch with the Indian Stock Screener team. Send us your feedback and inquiries."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-400">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900 dark:text-slate-100">Email</h3>
              </div>
              <p className="text-gray-600 dark:text-slate-400">
                <a href="mailto:contact@indianstockscreener.com" className="hover:text-blue-600 transition-colors">
                  contact@indianstockscreener.com
                </a>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900 dark:text-slate-100">Location</h3>
              </div>
              <p className="text-gray-600 dark:text-slate-400">
                India
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900 dark:text-slate-100">Support</h3>
              </div>
              <p className="text-gray-600 dark:text-slate-400">
                Response within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg 
                    bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg 
                    bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg 
                    bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  placeholder="What is this about?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg 
                    bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
                  ✕ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                  text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
              We typically respond within 24 business hours
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
