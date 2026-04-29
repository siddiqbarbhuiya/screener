/**
 * @page PrivacyPolicy
 * @description Displays the Privacy Policy for the platform
 * @route /privacy-policy
 * @component
 */

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Indian Stock Screener"
        description="Read our Privacy Policy to understand how we collect, use, and protect your data."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-400">
              Last updated: April 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Personal Data</h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    If you contact us through our contact form or email, we may collect your name, email address, 
                    and message content. This information is used solely to respond to your inquiry.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Usage Data</h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    We automatically collect information about your interactions with our platform, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-slate-300 ml-2 mt-2">
                    <li>Pages viewed and time spent on each page</li>
                    <li>Search queries and stocks viewed</li>
                    <li>Device information (browser type, OS)</li>
                    <li>IP address and approximate location</li>
                    <li>Referrer information</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Cookies & Tracking */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                3. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                <li>Remember your preferences and theme settings</li>
                <li>Understand how you use our platform</li>
                <li>Improve your user experience</li>
                <li>Analyze platform performance</li>
              </ul>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
                You can control cookie settings through your browser. However, disabling cookies may affect platform functionality.
              </p>
            </section>

            {/* 4. Data Storage & Security */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                4. Data Storage & Security
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet or electronic storage is 100% secure.
              </p>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Your data is stored on secure servers. We do not retain personal data longer than necessary for the 
                purposes for which it was collected.
              </p>
            </section>

            {/* 5. Third-Party Services */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                5. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
                Our platform integrates with third-party services for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                <li>Stock market data (APIs)</li>
                <li>News and market information</li>
                <li>Analytics (to understand platform usage)</li>
              </ul>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
                These third parties have their own privacy policies. We are not responsible for their practices. 
                We recommend reviewing their privacy policies.
              </p>
            </section>

            {/* 6. User Rights */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                6. Your Rights
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of non-essential tracking</li>
                <li>Request a copy of your data</li>
              </ul>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information in the Contact section below.
              </p>
            </section>

            {/* 7. Children's Privacy */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                7. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Our platform is not intended for children under 18 years of age. We do not knowingly collect personal 
                information from children. If we become aware that a child has provided us with personal information, 
                we will delete such information and terminate the child's account.
              </p>
            </section>

            {/* 8. Contact Us */}
            <section className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 shadow-sm border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">Contact Us</h3>
              <p className="text-blue-900 dark:text-blue-300 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Contact Us
                <ChevronRight size={18} />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
