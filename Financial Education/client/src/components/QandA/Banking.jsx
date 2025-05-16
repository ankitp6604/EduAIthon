import React, { useState } from 'react';

const QuestionsForm3 = () => {
  const [answers, setAnswers] = useState(Array(15).fill(''));
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateScore();
    setShowAnswers(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === correctChoices[index]) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / 15) * 100);
  };

  const questions = [
    "What is the primary purpose of a bank?",
    "What is the difference between a savings account and a current account?",
    "What is a Fixed Deposit (FD) and how does it work?",
    "What are the basic steps to open a bank account?",
    "How do you deposit money into your bank account?",
    "What is an ATM and how do you use it?",
    "What is mobile banking and what are its benefits?",
    "What is UPI and how does it work?",
    "What are the different types of bank loans?",
    "How does interest work in banking?",
    "What are the key security measures for online banking?",
    "How can you protect yourself from banking fraud?",
    "What role do banks play in the economy?",
    "What is a bank statement and why is it important?",
    "What are the basic banking transactions you should know?"
  ];

  const choices = [
    ["a) To make profit", "b) To provide financial services", "c) To store money", "d) All of the above"],
    ["a) Savings accounts earn interest, current accounts don't", "b) Current accounts are for businesses only", "c) Savings accounts have no minimum balance", "d) There is no difference"],
    ["a) A type of loan", "b) A long-term investment with fixed interest", "c) A checking account", "d) A credit card"],
    ["a) Visit bank, fill form, provide ID, deposit money", "b) Just walk in and ask for an account", "c) Apply online only", "d) Call the bank"],
    ["a) Only through ATM", "b) Only through bank counter", "c) Through ATM, counter, or online", "d) Only through mobile app"],
    ["a) A type of bank", "b) A machine for cash transactions", "c) A type of account", "d) A banking service"],
    ["a) Banking through mobile phone", "b) Only checking balance", "c) Only transferring money", "d) Only paying bills"],
    ["a) A type of bank", "b) A payment system", "c) A type of account", "d) A banking service"],
    ["a) Only personal loans", "b) Only business loans", "c) Personal, business, education, and home loans", "d) Only home loans"],
    ["a) Only on loans", "b) Only on savings", "c) On both savings and loans", "d) Only on fixed deposits"],
    ["a) Only password", "b) Only PIN", "c) Password, PIN, and OTP", "d) Only OTP"],
    ["a) Share your PIN", "b) Never share banking details", "c) Use public WiFi", "d) Save passwords on phone"],
    ["a) Only store money", "b) Only give loans", "c) Facilitate economic growth", "d) Only make profit"],
    ["a) A receipt", "b) A record of transactions", "c) A type of account", "d) A banking service"],
    ["a) Only deposits", "b) Only withdrawals", "c) Deposits, withdrawals, and transfers", "d) Only transfers"]
  ];

  const correctChoices = [
    "d) All of the above",
    "a) Savings accounts earn interest, current accounts don't",
    "b) A long-term investment with fixed interest",
    "a) Visit bank, fill form, provide ID, deposit money",
    "c) Through ATM, counter, or online",
    "b) A machine for cash transactions",
    "a) Banking through mobile phone",
    "b) A payment system",
    "c) Personal, business, education, and home loans",
    "c) On both savings and loans",
    "c) Password, PIN, and OTP",
    "b) Never share banking details",
    "c) Facilitate economic growth",
    "b) A record of transactions",
    "c) Deposits, withdrawals, and transfers"
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">Banking Basics Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-[#33006F]">
              {index + 1}. {question}
            </h2>
            <div className="space-y-2">
              {choices[index].map((choice, choiceIndex) => (
                <label key={choiceIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={choice}
                    checked={answers[index] === choice}
                    onChange={() => handleAnswerChange(index, choice)}
                    className="form-radio text-[#33006F]"
                  />
                  <span className="text-gray-700">{choice}</span>
                </label>
              ))}
            </div>
            {showAnswers && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  Correct Answer: {correctChoices[index]}
                </p>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-[#33006F] text-white px-6 py-2 rounded-lg hover:bg-[#4a0099] transition-colors duration-300"
          >
            Submit
          </button>
          {score !== null && (
            <div className="text-lg font-semibold text-[#33006F]">
              Score: {score.toFixed(1)}%
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionsForm3; 