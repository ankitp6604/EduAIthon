import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Loans() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        💰 Bank Loans & Credit Made Simple
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">🤔 What is a Loan?</h2>
        <p className="text-gray-700 mb-4">
          A loan is when the bank gives you money now, and you promise to return it slowly with a little extra (called interest). It's like getting help to build something today and paying for it bit by bit.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📚 Types of Loans</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">👨‍👩‍👧 Personal Loans</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Medical treatment 🏥</li>
              <li>Wedding expenses 💍</li>
              <li>Fixing or improving your home 🏠</li>
              <li>Paying off other debts 🔁</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🎓 Education Loans</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>College or university fees 🎓</li>
              <li>Professional skill training 🛠️</li>
              <li>Studying abroad ✈️</li>
              <li>Laptop, books, or study tools 💻📚</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🌾 Agriculture Loans</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Buy seeds and fertilizers 🌱</li>
              <li>New tractors or farming tools 🚜</li>
              <li>Drip irrigation or pumps 💧</li>
              <li>Improving your farm land 🧑‍🌾</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📝 How to Apply for a Loan</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
          <li>Know your credit score (bank can help)</li>
          <li>Ask about different loan types 🏦</li>
          <li>Collect documents like ID, income proof 📄</li>
          <li>Fill out the loan form 🖊️</li>
          <li>Wait for the bank to approve it ⏳</li>
          <li>Sign the agreement and receive money ✍️💵</li>
        </ol>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">✅ Smart Loan Repayment Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Always pay on time ⏰</li>
          <li>Set reminders or auto-pay 📆</li>
          <li>Pay more if you can, to finish faster 🏁</li>
          <li>Mark your due dates on a calendar 🗓️</li>
          <li>If facing trouble, talk to the bank 💬</li>
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

export default Loans;
