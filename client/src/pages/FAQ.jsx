/**
 * @page FAQ
 * @description Frequently Asked Questions about the platform
 * @route /faq
 * @component
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Seo from '../components/Seo';

const FAQData = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Indian Stock Screener?',
        a: 'Indian Stock Screener is a web-based platform that provides tools for analyzing and screening stocks listed on Indian stock exchanges (NSE and BSE). It offers real-time data, technical analysis, company fundamentals, and portfolio tracking features for retail investors.',
      },
      {
        q: 'Is Indian Stock Screener free to use?',
        a: 'Yes! Indian Stock Screener is completely free to use. We believe financial data and analysis tools should be accessible to everyone. There are no hidden charges or premium subscriptions.',
      },
      {
        q: 'Do I need to register to use the platform?',
        a: 'No registration is required. You can use most features without creating an account. However, creating an account allows you to save your preferences and create custom watchlists.',
      },
    ],
  },
  {
    category: 'Data & Technical',
    questions: [
      {
        q: 'How is the stock market data fetched?',
        a: 'We fetch stock data from reputable financial data providers and APIs. While we strive for accuracy, data may sometimes be delayed by a few minutes. Always verify important information with official sources or your broker.',
      },
      {
        q: 'Is the data real-time?',
        a: 'Our data is updated regularly throughout the trading day. However, there may be a slight delay (typically a few minutes) compared to real-time broker terminals. For live trading decisions, please verify with your broker.',
      },
      {
        q: 'Which stocks can I screen?',
        a: 'You can screen stocks listed on the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) of India, including stocks in the Nifty 50, Nifty 100, and other major indices.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'Is my data safe on Indian Stock Screener?',
        a: 'Yes, we take security seriously. We use industry-standard encryption and security practices to protect your data. We do not share your information with third parties without consent. Please review our Privacy Policy for detailed information.',
      },
      {
        q: 'Does the platform store my investment data?',
        a: 'If you create an account, we can store your watchlists and portfolio preferences locally in your browser. Sensitive information like passwords and financial transactions are not stored on our servers.',
      },
      {
        q: 'Does this platform trade on my behalf?',
        a: 'No. Indian Stock Screener is a research and analysis tool only. We cannot execute trades, access your brokerage account, or manage your portfolio. All investment decisions and trading are done through your broker.',
      },
    ],
  },
  {
    category: 'Investment & Financial Advice',
    questions: [
      {
        q: 'Can I use this platform for automated trading?',
        a: 'Indian Stock Screener is designed for research and analysis. It is not a trading platform. For automated trading, you would need to use your broker\'s trading terminal or dedicated trading platforms.',
      },
      {
        q: 'Is this platform a financial advisor?',
        a: 'No. Indian Stock Screener is NOT a financial advisor, broker, or investment service provider. Nothing on our platform constitutes financial advice. Always consult with a qualified financial advisor before making investment decisions.',
      },
      {
        q: 'What does the screener help me do?',
        a: 'The screener helps you filter stocks based on specific criteria like price, market cap, P/E ratio, technical indicators, etc. This helps you identify stocks worth researching further. However, the final investment decision must be your own.',
      },
      {
        q: 'Should I invest in stocks that appear in my screener results?',
        a: 'No. Screener results are just data-driven suggestions. Always conduct thorough research, analyze company fundamentals, understand the risks, and consult with a financial advisor before investing.',
      },
    ],
  },
  {
    category: 'Features & Usage',
    questions: [
      {
        q: 'How do I create a custom watchlist?',
        a: 'You can create a watchlist by clicking the "Add to Watchlist" button on any stock page. Your watchlists are saved locally in your browser and can be managed from the Portfolio section.',
      },
      {
        q: 'Can I compare multiple stocks?',
        a: 'Yes! You can view company details and peer comparisons for any stock. Visit the company dashboard to see detailed metrics and how stocks compare to similar companies.',
      },
      {
        q: 'How do I use the technical analysis charts?',
        a: 'Our charts display price history with common technical indicators like moving averages, RSI, MACD, etc. These are for educational purposes and historical analysis. Always combine technical analysis with fundamental analysis and professional advice.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        q: 'Why is some stock data showing as N/A?',
        a: 'Data may be unavailable for newly listed stocks, penny stocks, or stocks with limited trading. Try refreshing the page or check back later when data becomes available.',
      },
      {
        q: 'The platform seems slow or unresponsive. What should I do?',
        a: 'Try clearing your browser cache, disabling browser extensions, or using a different browser. If the issue persists, please contact us with details about the problem.',
      },
      {
        q: 'How do I report a bug or provide feedback?',
        a: 'You can report bugs or provide feedback through our Contact Us page. We appreciate all feedback as it helps us improve the platform.',
      },
    ],
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 
          flex items-center justify-between transition-colors text-left"
      >
        <span className="font-semibold text-gray-900 dark:text-slate-100">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-600 dark:text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-200 dark:border-slate-700">
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Seo
        title="FAQ | Indian Stock Screener"
        description="Frequently Asked Questions about Indian Stock Screener platform, features, and data."
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle size={48} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-400">
              Find answers to common questions about Indian Stock Screener
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {FAQData.map((section) => (
              <section key={section.category}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4 pb-2 border-b-2 border-blue-600">
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.questions.map((item, index) => {
                    const itemId = `${section.category}-${index}`;
                    return (
                      <FAQItem
                        key={itemId}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItems[itemId] || false}
                        onToggle={() => toggleItem(itemId)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-8 text-center border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-3">
              Still have questions?
            </h3>
            <p className="text-blue-900 dark:text-blue-300 mb-6 text-lg">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 
                text-white font-semibold rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-6 border-l-4 border-yellow-600">
            <p className="text-yellow-900 dark:text-yellow-300">
              <span className="font-semibold">⚠️ Disclaimer:</span> Indian Stock Screener provides data and analysis 
              for educational purposes only. We are not financial advisors. Always consult with a qualified financial 
              professional before making investment decisions. See our{' '}
              <a href="/disclaimer" className="underline hover:no-underline">Disclaimer</a> and{' '}
              <a href="/terms-and-conditions" className="underline hover:no-underline">Terms & Conditions</a> for more details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
