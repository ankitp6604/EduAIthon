import React from 'react';
import { QuestionAnswerRounded, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const lessonContent = {
  banking: {
    title: 'Banking Basics',
    content: 'Banking is a fundamental part of managing your finances. Learn about different types of accounts, how to use them, and make the most of banking services.',
    videoLink: 'https://www.youtube.com/embed/your-banking-video-id',
    modules: [
      {
        title: "Introduction to Banks",
        content: "What is a Bank? Introduction to banks — what they do and why they matter. Simple analogy: Bank as a safe place for your money.",
        path: "/banking/introduction"
      },
      {
        title: "Types of Bank Accounts",
        content: "Savings Account, Current Account, Fixed Deposit (FD) — basic concept. How to open an account.",
        path: "/banking/accounts"
      },
      {
        title: "How to Use a Bank Account",
        content: "Depositing money, Withdrawing money, Using passbooks or bank statements, ATM basics.",
        path: "/banking/usage"
      },
      {
        title: "Digital Banking Basics",
        content: "Mobile banking (simple explanation), Using apps and SMS for banking, UPI and mobile payments introduction.",
        path: "/banking/digital"
      },
      {
        title: "Bank Loans and Credit",
        content: "What is a loan? Types of loans (personal, education, agriculture). How to apply and repay loans responsibly.",
        path: "/banking/loans"
      },
      {
        title: "Interest in Banking",
        content: "What is interest? How banks pay interest on savings. How interest is charged on loans (simple explanation).",
        path: "/banking/interest"
      },
      {
        title: "Bank Safety and Security",
        content: "Keeping your money safe. Avoiding fraud and scams. Importance of PIN, passwords, and never sharing details.",
        path: "/banking/safety"
      },
      {
        title: "Role of Banks in the Economy",
        content: "How banks help people and businesses grow. Banks and community development (simple explanation).",
        path: "/banking/economy"
      },
      {
        title: "Basic Banking Transactions Practice",
        content: "Filling deposit and withdrawal slips. Checking account balance. Mini quiz or activities for practice.",
        path: "/banking/practice"
      }
    ]
  }
};

function Lesson3() {
  return (
    <div className="lesson-container mx-auto max-w-4xl p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        {lessonContent.banking.title}
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {lessonContent.banking.content}
        </p>
      </div>

      <div className="video-container mb-8 relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/-OWR2oyKbf8?si=KbHWlVwSl7WFv0wE"
          title="Banking Basics Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="playlist mt-8 bg-white rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#33006F]">Modules</h2>
        <ul className="space-y-2">
          {lessonContent.banking.modules.map((module, index) => (
            <li key={index}>
              <Link
                to={module.path}
                className="text-[#33006F] hover:text-[#662d91] transition-colors duration-300 flex items-center gap-2"
              >
                <QuestionAnswerRounded className="text-lg" />
                <span>{module.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link
          to="/banking/qanda"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <QuestionAnswerRounded />
          <span>Go to Q&A</span>
        </Link>
        <Link
          to="/home"
          className="flex items-center gap-2 text-[#33006F] hover:text-[#662d91] transition-colors duration-300"
        >
          <Home />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Lesson3; 