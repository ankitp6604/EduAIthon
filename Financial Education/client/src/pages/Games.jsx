import React from "react";
import { Link } from "react-router-dom";

const games = [
  {
    title: "Budget Guessing Game",
    description: "Test your budgeting skills and learn how to allocate your income wisely.",
    path: "/budget-game",
    image: "https://img.icons8.com/color/96/000000/budget.png",
    isExternal: false
  },
  {
    title: "Credit Decision Game",
    description: "Make smart choices about credit and loans in real-life scenarios.",
    path: "http://localhost:3000",
    image: "https://img.icons8.com/color/96/000000/decision.png",
    isExternal: true
  },
  {
    title: "Good Financial Habits",
    description: "Learn and practice essential financial habits for a secure future.",
    path: "http://localhost:3001",
    image: "https://img.icons8.com/color/96/000000/money-bag.png",
    isExternal: true
  },
  // Add more games here as you build them!
];

export default function Games() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#33006F]">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game.title} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <img src={game.image} alt={game.title} className="w-24 h-24 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-[#33006F]">{game.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{game.description}</p>
            {game.isExternal ? (
              <a
                href={game.path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#33006F] text-white px-4 py-2 rounded-lg hover:bg-[#4a0099] transition-colors"
              >
                Play Now
              </a>
            ) : (
              <Link
                to={game.path}
                className="bg-[#33006F] text-white px-4 py-2 rounded-lg hover:bg-[#4a0099] transition-colors"
              >
                Play Now
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
