import React from "react";

const lessonContent = {
  investing: {
    title: "Investing Essentials",
    content: `🪙 What Is Investing?

Investing means putting your money into something so it can grow over time. 

It’s like planting a seed 🌱 — you don’t eat the seed today, but water it, care for it, and one day it becomes a big tree with fruits! 🍎

💭 Why Should You Invest?

Let’s say you get ₹100. You can:

Spend it all now — it's gone! 🫢  
OR  
Save and invest a part — it can grow into ₹150 or ₹200 later! 💰✨

Investing helps you:
✅ Make more money slowly and safely  
✅ Prepare for your dreams — like buying a bicycle 🚲 or helping your family  
✅ Protect against tough times (like a crop failure or illness) 🛡️

🧺 Where Can You Invest?

Here are a few ways people invest their money:

🏦 Bank Fixed Deposit (FD)  
You give money to the bank for a few months or years. They return it with extra money (interest)!

🪙 Gold  
Many families buy gold as an investment. Over time, gold often increases in value.

📮 Post Office Schemes  
Safe for saving and investing, and earns interest every year.

📈 Mutual Funds & Shares  
These are like helping big companies grow. They share part of their profit with you.

🌾 Simple Farming Analogy

Think of your money like seeds 🌾:

If you eat all your seeds today (spend everything), you have nothing for tomorrow.  
If you plant some seeds (invest), you get crops later.

👉 Investing is planting your money for the future!

⚠️ Be Careful!

❌ Don’t invest in anything you don’t understand  
❌ Don’t give money to strangers promising “double returns”  
❌ Always talk to a trusted elder or teacher before investing

✅ Tips for Smart Investing

🪙 Start small — even ₹10 or ₹50 is a good start  
📖 Learn before you invest  
👨‍👩‍👧 Ask family or teachers for help  
📅 Be patient — investing takes time!

🎯 Try This (Activity)

Save ₹100 this month. Now ask your teacher or parent:
“Where can I invest this so it grows safely?” 🌱💡  
Make a small plan and start your investing journey!`,
    videoLink:
      "https://www.youtube.com/embed/TLGalocqj00?list=PL8uhW8cclMiOa7d0IkBnkuNFsq7IUSlpl",
  },
};

function Lesson1() {
  return (
    <div className="lesson-container mx-auto max-w-4xl p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        {lessonContent.investing.title}
      </h1>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {lessonContent.investing.content}
        </p>
      </div>

      <div className="video-container mb-8 relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={lessonContent.investing.videoLink}
          title="Top 5 Investment Strategies for Beginners | Investment Masterclass"
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
              <span>Investing Essentials</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lesson1;
