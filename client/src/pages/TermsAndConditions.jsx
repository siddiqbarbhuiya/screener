/**
 * @page TermsAndConditions
 * @description Displays the Terms & Conditions for the platform
 * @route /terms-and-conditions
 * @component
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';

export default function TermsAndConditions() {
  return (
    <>
      <Seo
        title="Terms & Conditions | Indian Stock Screener"
        description="Read our Terms & Conditions for using the Indian Stock Screener platform."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              Terms & Conditions
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
                Welcome to Indian Stock Screener. These Terms & Conditions ("Terms") govern your use of our platform, 
                website, and services. By accessing or using our platform, you agree to be bound by these Terms. 
                If you do not agree to any part of these Terms, please do not use our services.
              </p>
            </section>

            {/* 2. Acceptance of Terms */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                2. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                By using our platform, you acknowledge that you have read, understood, and agree to be bound by 
                these Terms & Conditions and our Privacy Policy. We reserve the right to modify these Terms at any 
                time. Changes will be effective upon posting to the platform. Your continued use of the platform 
                following the posting of revised Terms means you accept and agree to the changes.
              </p>
            </section>

            {/* 3. Use of Service */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                3. Use of Service
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  You agree to use the platform only for lawful purposes and in a way that does not infringe upon 
                  the rights of others or restrict their use and enjoyment of the platform. Prohibited behavior includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                  <li>Harassing or causing distress or inconvenience to any person</li>
                  <li>Transmitting obscene or offensive content</li>
                  <li>Disrupting the normal flow of dialogue within our platform</li>
                  <li>Attempting unauthorized access to our systems</li>
                  <li>Using automated tools without permission</li>
                </ul>
              </div>
            </section>

            {/* 4. User Responsibilities */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                4. User Responsibilities
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                You are responsible for all content you upload, post, or display on our platform. You agree not to post 
                any content that is unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable. 
                You maintain full responsibility for the accuracy and legality of any information you provide.
              </p>
            </section>

            {/* 5. Financial Disclaimer */}
            <section className="bg-red-50 dark:bg-red-950/20 rounded-lg p-6 shadow-sm border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
                <ChevronRight size={24} />
                5. Financial Disclaimer ⚠️
              </h2>
              <div className="space-y-3">
                <p className="text-red-900 dark:text-red-300 leading-relaxed font-semibold">
                  IMPORTANT: The information provided on this platform is for educational and informational purposes only.
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-900 dark:text-red-300 ml-2">
                  <li>We are NOT a financial advisor or investment broker</li>
                  <li>Nothing on this platform should be considered as financial or investment advice</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Stock market investments carry substantial risk of loss</li>
                  <li>Always consult with a qualified financial advisor before investing</li>
                  <li>Do your own research before making investment decisions</li>
                </ul>
              </div>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                To the fullest extent permitted by law, in no event shall Indian Stock Screener be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, 
                or use, even if advised of the possibility of such damages. Your sole remedy for dissatisfaction with 
                the platform is to stop using it.
              </p>
            </section>

            {/* 7. Termination */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                7. Termination
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                We may terminate or suspend your access to our platform immediately, without prior notice or liability, 
                for any reason, including if you breach the Terms. Upon termination, your right to use the platform will 
                immediately cease.
              </p>
            </section>

            {/* 8. Governing Law */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ChevronRight size={24} className="text-blue-600" />
                8. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                These Terms & Conditions are governed by and construed in accordance with the laws of India, 
                and you irrevocably submit to the exclusive jurisdiction of the courts located in India.
              </p>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 shadow-sm border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">Questions?</h3>
              <p className="text-blue-900 dark:text-blue-300 mb-4">
                If you have any questions about our Terms & Conditions, please contact us at:
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
