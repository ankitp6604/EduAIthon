import React, { useState } from 'react';

const QuestionsForm1 = () => {
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
    setScore((correctAnswers / 15) * 100); // Assuming each question is worth 1 point
  };

  const questions = [
    "What is the primary goal of financial management within a business?",
    "Define the concept of 'time value of money' and its significance in finance.",
    "Equity financing differs from debt financing in that:",
    "Financial statements primarily serve to:",
    "The balance sheet of a company represents:",
    "Which of the following is NOT a component of an income statement?",
    "Cash flow management is crucial in financial decision-making because:",
    "Working capital is defined as:",
    "Fixed costs differ from variable costs in that:",
    "Leverage refers to:",
    "Budgeting is important in financial planning because it:",
    "Financial ratios are useful in evaluating a company's performance because they:",
    "Which of the following is a source of short-term financing for businesses?",
    "Capital budgeting involves:",
    "Inflation impacts financial decision-making and investment strategies by:"
  ];

  const choices = [
    ['a) Maximizing shareholder wealth', 'b) Maximizing revenue', 'c) Minimizing expenses', 'd) Increasing market share'],
    ['a) The principle that money loses value over time', 'b) The principle that money can earn interest over time', 'c) The principle that money should be spent immediately', 'd) The principle that money should be saved for the future'],
    ['a) Equity financing involves selling ownership stakes, while debt financing involves borrowing money with an obligation to repay.', 'b) Equity financing involves borrowing money with an obligation to repay, while debt financing involves selling ownership stakes.', 'c) Both equity and debt financing involve borrowing money with an obligation to repay.', 'd) Both equity and debt financing involve selling ownership stakes.'],
    ['a) Track employee performance', 'b) Assess the financial health of a company', 'c) Evaluate customer satisfaction', 'd) Analyze market trends'],
    ['a) Its revenue and expenses over a period of time', 'b) Its assets, liabilities, and equity at a specific point in time', 'c) Its income and expenditure for a financial year', 'd) Its cash flows from operating, investing, and financing activities'],
    ['a) Revenue', 'b) Expenses', 'c) Assets', 'd) Net income'],
    ['a) It ensures the company has enough cash to meet its obligations', 'b) It minimizes taxes', 'c) It maximizes shareholder wealth', 'd) It helps in reducing operating costs'],
    ['a) The difference between a company\'s current assets and current liabilities', 'b) The total assets of a company', 'c) The equity financing obtained by a company', 'd) The amount of cash a company has on hand'],
    ['a) Fixed costs change with the level of production, while variable costs remain constant.', 'b) Fixed costs remain constant regardless of the level of production, while variable costs change.', 'c) Both fixed and variable costs remain constant.', 'd) Both fixed and variable costs change with the level of production.'],
    ['a) The use of debt to finance operations', 'b) The use of equity to finance operations', 'c) The use of retained earnings to finance operations', 'd) The use of cash reserves to finance operations'],
    ['a) Helps in tracking historical performance', 'b) Ensures compliance with tax regulations', 'c) Provides a roadmap for future financial goals', 'd) Facilitates mergers and acquisitions'],
    ['a) Provide a snapshot of a company\'s financial health', 'b) Measure employee productivity', 'c) Analyze customer satisfaction', 'd) Predict market trends'],
    ['a) Bonds', 'b) Preferred stock', 'c) Bank loans', 'd) Common stock'],
    ['a) Managing day-to-day expenses', 'b) Making long-term investment decisions', 'c) Allocating funds for marketing activities', 'd) Calculating quarterly earnings'],
    ['a) Decreasing the purchasing power of money', 'b) Increasing the value of assets', 'c) Reducing interest rates', 'd) Encouraging savings over spending']
  ];

  const correctChoices = ['a) Maximizing shareholder wealth', 'b) The principle that money can earn interest over time', 'a) Equity financing involves selling ownership stakes, while debt financing involves borrowing money with an obligation to repay.', 'b) Assess the financial health of a company', 'b) Its assets, liabilities, and equity at a specific point in time', 'c) Assets', 'a) It ensures the company has enough cash to meet its obligations', 'a) The difference between a company\'s current assets and current liabilities', 'b) Fixed costs remain constant regardless of the level of production, while variable costs change.', 'a) The use of debt to finance operations', 'c) Provides a roadmap for future financial goals', 'a) Provide a snapshot of a company\'s financial health', 'c) Bank loans', 'b) Making long-term investment decisions', 'a) Decreasing the purchasing power of money'];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 md:p-6">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <p className="mb-4 text-lg md:text-xl font-medium text-[#33006F]">
              Q{index + 1}: {question}
            </p>
            <div className="space-y-3">
              {choices[index].map((choice, i) => (
                <label 
                  key={i} 
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={choice}
                    checked={answers[index] === choice}
                    onChange={() => handleAnswerChange(index, choice)}
                    className="mr-3 h-4 w-4 text-[#33006F]"
                    disabled={showAnswers}
                  />
                  <span className="text-gray-700 text-sm md:text-base">{choice}</span>
                </label>
              ))}
            </div>
            {showAnswers && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">Correct answer: {correctChoices[index]}</p>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-2 bg-[#33006F] text-white rounded-lg hover:bg-[#662d91] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={showAnswers}
          >
            Submit Answers
          </button>
          {showAnswers && (
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-[#33006F]">Your score: {score}%</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionsForm1;
