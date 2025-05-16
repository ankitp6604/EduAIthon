import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Lesson from "../components/lesson";
import Lesson1 from "../components/lesson1";
import Lesson2 from "../components/lesson2";
import Lesson3 from "../components/lesson3";
import QuestionsForm1 from "../components/QandA/Finance";
import QuestionsForm from "../components/QandA/Invest";
import QuestionsForm2 from "../components/QandA/Budgeting.jsx";
import QuestionsForm3 from "../components/QandA/Banking.jsx";
import BudgetingImage from "../assets/budget.jpg";
import fin from "../assets/fin.jpg";
import invest from "../assets/invest.jpg";
import bank from "../assets/Banking.jpg";
import { Home, QuestionAnswerRounded } from "@mui/icons-material";

export function Learning() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#33006F]">Financial Education</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 m-4 md:m-8">
        <Card
          to="/banking"
          title="Banking"
          description="Understanding Banking Systems and how to use them effectively."
          image={bank}
        />
        <Card
          to="/budgeting"
          title="Budgeting"
          description="Learn budget planning, expense tracking, and saving strategies."
          image={BudgetingImage}
        />
        <Card
          to="/investing"
          title="Investing"
          description="Explore investment basics, risk management, and long-term planning."
          image={invest}
        />
        <Card
          to="/financing"
          title="Financing"
          description="Understand loans, credit management, and financial planning tools."
          image={fin}
        />
        
      </div>
    </div>
  );
}

export function Card({ to, title, description, image }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#33006F]">{title}</h2>
        <p className="text-gray-600 mb-4 text-sm md:text-base">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#33006F] font-semibold text-sm md:text-base">Click to explore {title}</p>
          <Link
            to={`${to}/qanda`}
            className="text-[#33006F] hover:text-[#662d91] transition-colors duration-300 flex items-center gap-2"
          >
            <QuestionAnswerRounded />
            <span className="hidden md:inline">Q and A</span>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export function Budgeting() {
  return (
    <div className="container mx-auto px-4 py-8 w-full flex flex-col items-center justify-evenly min-h-screen">
      <div className="w-full max-w-4xl">
        <Lesson />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Link
          to="/budgeting/qanda"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <QuestionAnswerRounded />
          <span>Q and A</span>
        </Link>
        <Link 
          to="/learning" 
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function BudgetingQAndA() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <QuestionsForm2 />
        <Link 
          to="/learning" 
          className="flex items-center gap-2 mt-8 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function Investing() {
  return (
    <div className="container mx-auto px-4 py-8 w-full flex flex-col items-center justify-evenly min-h-screen">
      <div className="w-full max-w-4xl">
        <Lesson1 />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Link
          to="/investing/qanda"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <QuestionAnswerRounded />
          <span>Q and A</span>
        </Link>
        <Link 
          to="/learning" 
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function InvestingQAndA() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <QuestionsForm />
        <Link 
          to="/learning" 
          className="flex items-center gap-2 mt-8 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function Financing() {
  return (
    <div className="container mx-auto px-4 py-8 w-full flex flex-col items-center justify-evenly min-h-screen">
      <div className="w-full max-w-4xl">
        <Lesson2 />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Link
          to="/financing/qanda"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <QuestionAnswerRounded />
          <span>Q and A</span>
        </Link>
        <Link 
          to="/learning" 
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function FinancingQAndA() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <QuestionsForm1 />
        <Link 
          to="/learning" 
          className="flex items-center gap-2 mt-8 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function Banking() {
  return (
    <div className="container mx-auto px-4 py-8 w-full flex flex-col items-center justify-evenly min-h-screen">
      <div className="w-full max-w-4xl">
        <Lesson3 />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Link
          to="/banking/qanda"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <QuestionAnswerRounded />
          <span>Q and A</span>
        </Link>
        <Link 
          to="/learning" 
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export function BankingQAndA() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <QuestionsForm3 />
        <Link 
          to="/learning" 
          className="flex items-center gap-2 mt-8 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Learning;
