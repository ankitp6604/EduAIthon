import { QuestionAnswer } from "@mui/icons-material";
import React from "react";

const lessonContent = {
  budgeting: {
    title: "Budgeting Basics",
    content: `💡 What is Budgeting?
Budgeting means making a simple plan for how you'll use your money. It’s like giving every rupee a job! Instead of wondering where your money went, you’ll always know where it’s going.

Imagine you have ₹500. Would you rather spend it all on snacks in one day, or plan it out for a week with groceries, travel, and maybe save a little? That’s budgeting in action! 🧠

🧭 Why Is Budgeting Important?
✅ Helps you avoid running out of money
✅ Makes sure you always cover your basic needs first
✅ Helps you save — even a small amount — for your dreams 🎯
✅ Keeps you in control (not your cravings or surprises)

📊 A Real-Life Example
Let’s say Ravi earns ₹10,000/month. If he doesn’t plan, he might spend ₹5,000 in just a week. Then what?

Instead, Ravi makes a budget:
🍚 Groceries: ₹3,000
🏠 Rent & Bills: ₹2,000
🚌 Travel: ₹1,000
🎓 Children’s School: ₹1,500
💰 Savings: ₹2,000
🆘 Emergency/Other: ₹500

Now he’s covered everything and saved. Nice work, Ravi! 🙌

🌾 Simple Analogy
Think of your money like grains. Would you dump all your grains into one bag without knowing how much goes for food, seeds, or emergencies? Nope! You'd separate them carefully — just like a budget.

🚫 Common Budgeting Mistakes
❌ Spending more than you earn
❌ Forgetting to save first
❌ Ignoring small expenses (tea, snacks, mobile recharges)
❌ Spending on wants before needs

🛠️ Budgeting Tips That Actually Work
📝 Write things down — even in a small notebook
💡 Spend only after saving a little first
🔍 Track where your money goes, even the small stuff
👫 Discuss it with your family — budgeting is a team effort!

🎯 Try This (Activity)
Start by saving just ₹100 this month. Can you do it? 💪

Make a list of your needs vs wants. You’ll be surprised how much you can manage better — without feeling like you're sacrificing anything!
`,
    videoLink:
      "https://www.youtube.com/embed/g1Xth5XVobg?list=PLnYt61Ja2yQ9k-0LRO58a_I2Q0ZH2wYE4",
  },
};

function Lesson() {
  return (
    <div className="lesson-container mx-auto max-w-4xl p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F] hover:underline">
        {lessonContent.budgeting.title}
      </h1>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {lessonContent.budgeting.content}
        </p>
      </div>

      <div className="video-container mb-8 relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={lessonContent.budgeting.videoLink}
          title="Session 1 - What is a Budget? (Budgeting Basics)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="playlist mt-8 bg-white rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#33006F]">Modules</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="text-[#33006F] hover:text-[#662d91] transition-colors duration-300 flex items-center gap-2"
            >
              <QuestionAnswer className="text-lg" />
              <span>Budgeting Basics</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lesson;
