/**
 * @page Disclaimer
 * @description Displays important disclaimers for the platform
 * @route /disclaimer
 * @component
 */

import { AlertTriangle, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Disclaimer | Indian Stock Screener"
        description="Important disclaimer regarding the use of Indian Stock Screener platform and investment advice."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={40} className="text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100">
                Disclaimer
              </h1>
            </div>
            <p className="text-lg text-red-600 dark:text-red-400 font-semibold">
              Please read this disclaimer carefully before using our platform
            </p>
          </div>

          {/* Main Warning Banner */}
          <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-600 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle size={28} />
              Critical Disclaimer
            </h2>
            <p className="text-red-900 dark:text-red-200 text-lg font-semibold leading-relaxed">
              Indian Stock Screener provides financial data and analysis tools for educational and informational 
              purposes ONLY. We are NOT a financial advisor, investment broker, or trading platform. Nothing on 
              this platform constitutes financial advice or a recommendation to buy, sell, or hold any security.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* 1. Not Financial Advice */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4">
                1. Not Financial Advice ⚠️
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  Any content, data, or analysis provided on this platform is for informational and educational 
                  purposes only and should NOT be construed as financial advice or investment recommendations.
                </p>
                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border-l-4 border-red-600">
                  <p className="text-red-900 dark:text-red-300 font-semibold">
                    Always consult with a qualified financial advisor or investment professional before making 
                    any investment decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Data Accuracy Disclaimer */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-l-4 border-orange-600">
              <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-400 mb-4">
                2. Data Accuracy Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
                While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, 
                completeness, or timeliness of any data displayed on our platform.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                <li>Stock prices and data may be delayed or inaccurate</li>
                <li>Technical indicators and charts are for reference only</li>
                <li>We are not responsible for errors or omissions in the data</li>
                <li>Always verify important information with official sources</li>
              </ul>
            </section>

            {/* 3. Risk Warning */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4">
                3. Risk Warning
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed font-semibold">
                  Investing in stocks carries significant financial risk:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                  <li>You may lose some or all of your invested capital</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Market volatility can cause rapid price fluctuations</li>
                  <li>Individual stocks carry higher risk than diversified portfolios</li>
                  <li>Leverage and derivatives can magnify losses</li>
                  <li>Only invest money you can afford to lose</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded mt-4 border-l-4 border-yellow-600">
                  <p className="text-yellow-900 dark:text-yellow-300">
                    <span className="font-semibold">Do Your Own Research (DYOR):</span> Never make investment decisions 
                    based solely on screener results or third-party analysis. Conduct thorough research and due diligence.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. External Links Disclaimer */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ExternalLink size={24} className="text-blue-600" />
                4. External Links Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for the content, 
                accuracy, or practices of these external sites. Accessing external links is at your own risk. 
                We do not endorse any third-party content or services.
              </p>
            </section>

            {/* 5. No Guarantee */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                5. No Guarantee of Results
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
                We make no representation or warranty regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 ml-2">
                <li>Profitability or success of any investment strategy</li>
                <li>Accuracy of technical analysis or indicators</li>
                <li>Future performance of any stock</li>
                <li>Uninterrupted availability of our platform</li>
              </ul>
            </section>

            {/* 6. Regulatory Compliance */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                6. Regulatory Compliance Notice
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Indian Stock Screener is not registered as a financial advisor, broker, or investment fund manager 
                with SEBI or any other regulatory authority. We do not operate as a financial services entity. 
                All users are responsible for ensuring compliance with applicable laws and regulations in their jurisdiction.
              </p>
            </section>

            {/* 7. Limitation of Liability */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                Under no circumstances shall Indian Stock Screener, its creators, owners, or team members be liable 
                for any direct, indirect, incidental, special, consequential, or punitive damages arising from your 
                use of or reliance on information from our platform, including but not limited to financial losses.
              </p>
            </section>

            {/* Acknowledgment Section */}
            <section className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 shadow-sm border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">
                Your Acknowledgment
              </h3>
              <p className="text-blue-900 dark:text-blue-300 leading-relaxed">
                By using Indian Stock Screener, you acknowledge that you have read and understood this disclaimer, 
                recognize the risks involved in stock market investing, and agree that you alone are responsible for 
                your investment decisions and any financial outcomes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
