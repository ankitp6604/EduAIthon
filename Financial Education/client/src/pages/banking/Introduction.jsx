import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Introduction() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        Introduction to Banks
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">What is a Bank? 🏦</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          A bank is like a safe home for your money. Instead of keeping all your money at home where it could get lost or stolen, you give it to the bank. The bank keeps it safe and helps your money grow a little over time.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">Why Do Banks Matter? 🤔</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>They keep your money safe like a strong locker 🔒</li>
          <li>Help you save money and even give you extra money called interest 💰</li>
          <li>Can lend money for important needs like school, farming, or starting a shop 💸</li>
          <li>Make it easy to send money to family or friends far away 📲</li>
          <li>Support farmers, shopkeepers, and businesses to grow and create jobs 🌾🏪</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">Simple Analogy 🤝</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          Think of a bank as your trusted friend. When you give your money to this friend, they:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Keep it safe in a secret place only you both know 🔐</li>
          <li>Give you a receipt so you know exactly how much money you gave them 🧾</li>
          <li>Return your money whenever you ask 🔄</li>
          <li>Sometimes even give you a little extra money as a thank you for trusting them (that’s called interest!) 🎁</li>
        </ul>
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

export default Introduction;
