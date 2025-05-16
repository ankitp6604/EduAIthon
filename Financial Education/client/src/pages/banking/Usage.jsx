import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Usage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        🏦 How to Use a Bank Account
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">💵 Depositing Money</h2>
        <p className="text-gray-700 mb-4">
          Want to add money to your bank account? Here’s how you can do it:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🏢 Visit a bank branch and fill out a deposit slip</li>
          <li>🏧 Use a Cash Deposit Machine (CDM) or ATM to deposit money</li>
          <li>💼 Set up direct deposit from your employer (salary comes straight to your account!)</li>
          <li>📱 Use mobile banking apps to deposit checks (just snap a photo!)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">💸 Withdrawing Money</h2>
        <p className="text-gray-700 mb-4">
          Need to take money out? Here are your options:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🏧 Use an ATM with your debit card — quick and easy!</li>
          <li>👨‍💼 Visit a bank teller and withdraw cash manually</li>
          <li>✍️ Write a check to yourself or others</li>
          <li>🔁 Transfer money online to another account</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📖 Using Passbooks & Statements</h2>
        <p className="text-gray-700 mb-4">
          Always know what’s happening in your account. Here's how:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>📘 Update your passbook at the bank regularly</li>
          <li>📄 Review monthly statements sent by your bank</li>
          <li>📲 Check your balance using net banking or mobile apps</li>
          <li>🗂️ Keep digital or paper records of important transactions</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🏧 ATM Basics</h2>
        <p className="text-gray-700 mb-4">
          ATMs are super convenient, but here’s how to stay safe while using them:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>🔒 Always cover the keypad while entering your PIN</li>
          <li>💡 Use ATMs in well-lit, secure areas</li>
          <li>👀 Be aware of your surroundings — stay alert!</li>
          <li>🧾 Collect your receipt or cancel it on the screen</li>
          <li>🚨 Report any machine errors or suspicious activity immediately</li>
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

export default Usage;
