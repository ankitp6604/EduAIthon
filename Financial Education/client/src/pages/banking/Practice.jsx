import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Practice() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        🏦 Let's Practice Banking – The Fun Way!
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">🔧 Hands-On Banking Skills</h2>
        <p className="text-gray-700 mb-4">
          Just like riding a cycle or cooking your favorite dish, banking gets easier with practice! Let's try some fun activities to help you manage money better. 💰🚲
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🧾 Basic Banking Exercises</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">📘 Account Management</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Practice filling a deposit slip (ask your parents for one!)</li>
              <li>Try writing a cheque for ₹500 (just for practice) ✍️</li>
              <li>Use a notebook to track how much you spend on snacks 🍪</li>
              <li>Balance your pocket money like a mini checkbook 💡</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🏧 ATM Practice</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Watch your parents use an ATM and learn how it works 👀</li>
              <li>Know how to check your balance 🧾</li>
              <li>Understand how to take out money safely 💳</li>
              <li>Learn about ATM charges (ask at your local bank) 🏦</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🌐 Online Banking – Learn With Family</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Ask a parent to show you how online banking works 👨‍👩‍👦</li>
          <li>Check the balance online with them 📱</li>
          <li>See how they send money to others 📨</li>
          <li>Learn how to pay electricity or phone bills online 🔌📞</li>
          <li>Understand passwords and how to stay safe online 🔒</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📊 Budgeting – Plan Your Money!</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🗓️ Monthly Budget</h3>
            <p className="text-gray-700">
              Pretend you're running a small shop or managing home expenses:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Write down your income (pocket money, small job, etc.)</li>
              <li>List what you spend (snacks, school items, etc.)</li>
              <li>Try saving ₹50 every month 🪙</li>
              <li>Check how you're doing at the end of the month 📅</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🎯 Savings Goals</h3>
            <p className="text-gray-700">
              Want a cricket bat, new shoes, or a cycle? Let’s save for it!
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Pick something to save for 🛍️</li>
              <li>Keep ₹10-₹20 aside every week 🪙</li>
              <li>Mark your progress in a piggy bank or chart 🐖📊</li>
              <li>Celebrate when you reach your goal! 🎉</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🌍 Try in the Real World</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Go to the bank with a parent and watch how it works 🏦</li>
          <li>Help open a savings account in your name ✨</li>
          <li>Put your savings into the account each month 💰</li>
          <li>Learn how to read the bank passbook 📒</li>
          <li>Ask questions like: “What is interest?” or “What is FD?” 🤔</li>
        </ol>
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

export default Practice;
