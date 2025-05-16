import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Safety() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        🔐 Banking Safety Made Simple
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">🏦 Keeping Your Money Safe</h2>
        <p className="text-gray-700 mb-4">
          Just like you lock your house or shop at night, banks also use smart ways to keep your money safe! Let’s learn how they protect your savings.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🛡️ Bank Security Features</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>💰 Strong vaults (like treasure boxes!)</li>
          <li>👁️ CCTV cameras watching all day and night</li>
          <li>🛡️ Deposit insurance – your money is protected</li>
          <li>🚨 Systems that catch fraud fast</li>
          <li>🌐 Safe and secure online banking</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🧍‍♂️ Protecting *Your* Account</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🔑 Password Safety</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Make your password like a secret recipe 🍛—don’t share it!</li>
              <li>Use strong passwords (not 1234 or your name) 🧠</li>
              <li>Change them every few months 🔄</li>
              <li>Turn on two-step login for extra safety 🛡️</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#33006F]">🏧 ATM Safety</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use ATMs in busy, well-lit places 🔦</li>
              <li>Hide the keypad when entering your PIN 🤫</li>
              <li>Check the card slot for strange devices 🔍</li>
              <li>Keep your ATM card like your ID card—safe and close 🪪</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📱 Online Banking Safety</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Use internet only from trusted networks (not free public WiFi) 🌐</li>
          <li>Always log out after using the app 🚪</li>
          <li>Check your balance often 📊</li>
          <li>Tell the bank quickly if anything seems wrong 🚨</li>
          <li>Keep your phone number and email updated 📞📧</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">🆘 If Something Goes Wrong</h2>
        <p className="text-gray-700 mb-2">
          Don’t worry! Follow these steps:
        </p>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Call your bank immediately 📞</li>
          <li>Tell them about any suspicious activity 🔍</li>
          <li>Change your password quickly 🔑</li>
          <li>File a police complaint if needed 📝</li>
          <li>Watch your account closely for a few days 👁️</li>
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

export default Safety;
