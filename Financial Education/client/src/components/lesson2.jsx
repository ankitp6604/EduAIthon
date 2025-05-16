import React from "react";

const lessonContent = {
  financing: {
    title: "Financing Fundamentals",
    content: `💰 What Is Financing?

Financing means getting money to help you do something important — like starting a small shop, going to school, or buying tools for farming.

It’s like borrowing seeds 🌱 from a neighbor to plant your crops. You use the seeds now and return some later when your harvest is ready.

---

🤔 Why Do We Need Financing?

Sometimes, you don’t have enough money saved to buy things or start a project. Financing helps you:

✅ Get money to buy what you need now  
✅ Start or grow your business or farm  
✅ Pay back in small amounts over time  

---

🏦 Where Does Financing Come From?

Here are some common ways to get financing:

🔹 Loans from Banks or Microfinance  
You borrow money and promise to pay it back slowly with a little extra (interest).

🔹 Credit from Shops 
Some stores let you take goods now and pay later.

🔹 Fundraising  
People in your community or family may help you with money gifts or support.

---

🌾 Simple Farming Analogy

Think of financing like borrowing water from a well during dry days. You use it now to grow your crops and give back when it rains again.

---

⚠️ Be Careful!

❌ Don’t borrow more money than you can repay  
❌ Avoid borrowing from strangers or high-interest lenders  
❌ Always ask a trusted elder or teacher before taking a loan

---

✅ Tips for Smart Financing

📝 Plan how much money you need and how you will pay it back  
👨‍👩‍👧 Talk to your family or village leaders for advice  
📅 Make sure you can repay on time to avoid problems

`,
    videoLink:
      "https://www.youtube.com/embed/LLdKcFpHgM8?list=PL8uhW8cclMiOSfw_Kzi6YpLx1PhL8GIS9",
  },
};

function Lesson2() {
  return (
    <div className="lesson-container mx-auto max-w-4xl p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#33006F]">
        {lessonContent.financing.title}
      </h1>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {lessonContent.financing.content}
        </p>
      </div>

      <div className="video-container mb-8 relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={lessonContent.financing.videoLink}
          title="Financial Planning for Beginners | Personal Financial Planning Course"
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
              <span>Financing Fundamentals</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lesson2;
