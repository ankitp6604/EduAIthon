import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Interest() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        💸 Understanding Interest in Banking
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">🔍 What is Interest?</h2>
        <p className="text-gray-700 mb-4">
          Interest is like a **thank you gift** 🎁 from the bank when you **save money**, or a **small charge** 💵 you pay when you **borrow money**. It keeps the bank running and helps your money grow!
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">💰 Interest on Savings</h2>
        <p className="text-gray-700 mb-4">
          Put your money in a bank account and watch it grow! 🌱 Here's how:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Bank adds extra money (interest) to your savings 💹</li>
          <li>Longer deposits = higher rewards 🏆</li>
          <li>Different accounts give different rates 📊</li>
          <li>Interest is added monthly or every 3 months 🗓️</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🏦 Interest on Loans</h2>
        <p className="text-gray-700 mb-4">
          If you borrow money, the bank charges interest. It's like saying, "I'll lend you this, but you return a little extra later."
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Personal loans (for health, home, weddings) 🧑‍⚕️🏡💒</li>
          <li>Home loans 🏠</li>
          <li>Education loans 🎓</li>
          <li>Business loans 🛒</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📐 How is Interest Calculated?</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🧮 Simple Interest</h3>
            <p className="text-gray-700">
              Interest is only on the original amount. Formula: <br />
              <strong>Principal × Rate × Time</strong>
              <br />🪙 Imagine planting seeds—only the seeds give crops.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🌿 Compound Interest</h3>
            <p className="text-gray-700">
              Interest on interest! Your money grows faster. 🌳<br />
              🪴 Like a tree that gives fruits, and those fruits grow more trees!
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📈 Tips to Get Better Interest</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Check interest rates in different banks 🏦</li>
          <li>Choose long-term savings for higher returns 📆</li>
          <li>Keep a good credit score (like trust score) ✅</li>
          <li>Watch out for bank offers and bonus rates 🎉</li>
          <li>Always read terms before saying yes 📑</li>
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

export default Interest;
