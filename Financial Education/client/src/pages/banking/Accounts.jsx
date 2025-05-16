import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Accounts() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        🏦 Types of Bank Accounts
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">💰 Savings Account</h2>
        <p className="text-gray-700 mb-4">
          A savings account is like a piggy bank 🐷 that grows your money over time! It’s meant for storing money safely and earning a little extra from the bank as interest 💸. Ideal for:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🛡️ Emergency funds (for unexpected expenses)</li>
          <li>🎯 Saving for goals like school, gadgets, or trips</li>
          <li>📈 Earning interest so your money grows passively</li>
          <li>🏃 Easy access whenever you need it</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🏢 Current Account</h2>
        <p className="text-gray-700 mb-4">
          A current account is for people who need to move money frequently — like shop owners, freelancers, or business people. Think of it like a daily use wallet 💼 with bank support. It offers:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🔁 Unlimited transactions (deposits & withdrawals)</li>
          <li>📝 Checkbook for writing payments</li>
          <li>💳 Debit card for purchases & ATM withdrawals</li>
          <li>🌐 Online banking for transfers and payments</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📦 Fixed Deposit (FD)</h2>
        <p className="text-gray-700 mb-4">
          FD is like storing your money in a safety locker for a fixed time 🗓️ and getting a bigger return at the end 📈. It's a great option if you don’t need the money immediately.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🔒 Higher interest than a savings account</li>
          <li>🕒 Choose how long to keep your money (from months to years)</li>
          <li>📊 Guaranteed returns – no risk!</li>
          <li>💼 Suitable for long-term planning (education, marriage, etc.)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📝 How to Open a Bank Account</h2>
        <p className="text-gray-700 mb-4">
          Don’t worry — opening an account is easy! Here’s a simple step-by-step guide to get started:
        </p>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>🔍 Choose the right type (Savings, Current, or FD)</li>
          <li>🏦 Visit a nearby bank or apply online</li>
          <li>✍️ Fill out the account opening form</li>
          <li>🆔 Submit documents (Aadhaar, PAN, address proof)</li>
          <li>💵 Make the initial deposit if required</li>
          <li>✅ Complete verification and get your account activated!</li>
        </ol>
        <p className="text-gray-700 mt-4">
          Once opened, you’ll get a passbook 📘 and debit card 💳 to manage your money easily. Some banks even offer mobile apps 📱 for total convenience!
        </p>
      </div>

      <Link 
        to="/banking" 
        className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
      >
        <Home />
        <span>Back to Banking Basics</span>
      </Link>
    </div>
  );
}

export default Accounts;
