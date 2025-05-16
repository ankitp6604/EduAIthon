import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Digital() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        📲 Digital Banking Basics
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#33006F]">📱 Mobile Banking</h2>
        <p className="text-gray-700 mb-4">
          Imagine carrying your bank in your pocket! That’s mobile banking for you. It lets you manage your money anytime, anywhere using your phone.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🔍 Check your account balance instantly</li>
          <li>🔄 Transfer money to friends or family</li>
          <li>💡 Pay your electricity, phone, and water bills with a few taps</li>
          <li>📢 Get alerts when money goes in or out</li>
          <li>📍 Find nearby ATMs using GPS</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">📲 Banking Apps & SMS Services</h2>
        <p className="text-gray-700 mb-4">
          Banking apps are like your personal finance assistant. They keep you informed and in control:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>🔐 Log in securely with your fingerprint or face scan</li>
          <li>🔔 Get real-time notifications about every transaction</li>
          <li>📊 Track investments like mutual funds or fixed deposits</li>
          <li>📈 Use built-in tools to set budgets and manage spending</li>
          <li>💬 Chat with customer support directly through the app</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-[#33006F] mt-8">💸 UPI & Mobile Payments</h2>
        <p className="text-gray-700 mb-4">
          UPI (Unified Payments Interface) is a game-changer in India’s digital payment system. It makes money transfer as easy as sending a text!
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>⚡ Instantly transfer money 24/7 – even on holidays!</li>
          <li>📷 Scan QR codes to pay shopkeepers, vendors, or autos</li>
          <li>👬 Split bills with friends after a meal or movie</li>
          <li>💡 Pay for mobile recharge, DTH, and more – all in one app</li>
          <li>🎟️ Book train/bus tickets and movie seats hassle-free</li>
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

export default Digital;
