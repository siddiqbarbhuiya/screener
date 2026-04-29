/**
 * @page About
 * @description Displays information about the Indian Stock Screener platform
 * @route /about
 * @component
 */

import { Heart, Target, Zap, BarChart3, TrendingUp, Users } from 'lucide-react';
import Seo from '../components/Seo';

export default function About() {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Screener',
      description: 'Filter stocks using 50+ technical and fundamental parameters',
    },
    {
      icon: TrendingUp,
      title: 'Company Analysis',
      description: 'Deep dive into company financials, metrics, and peer comparisons',
    },
    {
      icon: Zap,
      title: 'Real-Time Data',
      description: 'Live stock prices, market indices, and trading information',
    },
    {
      icon: Users,
      title: 'Portfolio Tracking',
      description: 'Monitor and analyze your investment portfolio',
    },
  ];

  return (
    <>
      <Seo
        title="About Us | Indian Stock Screener"
        description="Learn about Indian Stock Screener - your platform for analyzing and screening Indian stocks."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About Indian Stock Screener
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Empowering retail investors with data-driven insights to make informed decisions about the Indian stock market
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Mission */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Target className="text-blue-600 flex-shrink-0" size={32} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
                    We believe that quality financial data and analysis tools should be accessible to everyone. 
                    Our mission is to democratize stock market research by providing retail investors with powerful, 
                    easy-to-use tools to screen, analyze, and understand the Indian stock market.
                  </p>
                </div>
              </div>
            </section>

            {/* Vision */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Zap className="text-amber-600 flex-shrink-0" size={32} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                    Our Vision
                  </h2>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
                    To become the most trusted and comprehensive stock screener for Indian markets, enabling millions of 
                    retail investors to build wealth through informed investment decisions and continuous learning.
                  </p>
                </div>
              </div>
            </section>

            {/* Values */}
            <section className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Heart className="text-red-600 flex-shrink-0" size={32} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                    Our Values
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Transparency</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">
                        We provide clear disclaimers and ensure users understand that we're not financial advisors
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Accuracy</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">
                        We strive for data accuracy and continuously improve our information sources
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Accessibility</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">
                        Quality tools should be available to everyone, regardless of investment experience
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Education</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">
                        We help users learn and understand market analysis through our platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-8 text-center">
                What We Offer
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <Icon className="text-blue-600 flex-shrink-0" size={28} />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Important Notice */}
            <section className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-8 shadow-sm border-l-4 border-yellow-600">
              <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-400 mb-4">
                Important Notice
              </h3>
              <p className="text-yellow-900 dark:text-yellow-300 leading-relaxed mb-3">
                Indian Stock Screener is a data and analysis platform for educational purposes. 
                We are NOT a financial advisor, broker, or regulated financial institution.
              </p>
              <p className="text-yellow-900 dark:text-yellow-300 leading-relaxed">
                Always consult with a qualified financial advisor before making investment decisions. 
                Past performance does not guarantee future results. Investing carries risk of loss.
              </p>
            </section>

            {/* Contact CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-lg p-8 shadow-sm text-center text-white">
              <h3 className="text-2xl font-bold mb-3">Have Questions?</h3>
              <p className="mb-6 text-blue-100 text-lg">
                We'd love to hear from you. Get in touch with our team.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
