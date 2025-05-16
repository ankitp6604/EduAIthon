import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Economy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        💸 Banks and the Economy – In Simple Words!
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">🏦 What Do Banks Do for the Economy?</h2>
        <p className="text-gray-700 mb-4">
          Think of banks like the heart in your body. Just like the heart keeps blood moving, banks keep money moving in the country. They help people, shops, farmers, and even the government! 🏃‍♂️💰
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🛠️ How Banks Help Everyone</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Keep your money safe, like a strong locker 🔐</li>
          <li>Give loans to start or grow a business 🧑‍🌾</li>
          <li>Help people buy homes, tractors, and bikes 🚜🏠</li>
          <li>Give money to the government for roads, schools, etc. 🛣️🏫</li>
          <li>Provide jobs to many people in the community 👩‍💼👨‍💼</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📈 Banks and Business Growth</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">💵 Business Loans</h3>
            <p className="text-gray-700">
              Want to open a tea stall? Or buy more cattle? Banks can help by giving you a loan:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Start new shops or services 🏪</li>
              <li>Grow your farming or business 📈</li>
              <li>Buy machines or tools 🛠️</li>
              <li>Hire more helpers or workers 👨‍🔧</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🌾 Growth in Villages and Towns</h3>
            <p className="text-gray-700">
              When businesses do well:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>More people get jobs 👷‍♀️</li>
              <li>Government gets more money through taxes 💰</li>
              <li>Other nearby businesses also grow 🔄</li>
              <li>The whole village or town becomes better 🏘️</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🏛️ Banks Help the Government Too</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Keep the government’s money safe 🏦</li>
          <li>Help build things like schools, roads, hospitals 🏥</li>
          <li>Support programs for farmers and poor families 🌿</li>
          <li>Help keep the economy stable – like no sudden shocks 📉</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🙋‍♀️ How YOU Can Help the Economy</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Save money in a bank account 🏦</li>
          <li>Take loans only when needed and pay on time 🕒</li>
          <li>Buy from local sellers and shops 🛒</li>
          <li>Learn about money and teach others too 📚</li>
          <li>Share what you learn with family and friends 🗣️</li>
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

export default Economy;
