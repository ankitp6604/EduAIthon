import React, { useState } from "react";

const questions = [
  { key: "income", label: "What is your total monthly budget?", min: 1000, max: 50000, step: 500 },
  { key: "food", label: "How much would you spend on food per month?", min: 0, max: 20000, step: 100 },
  { key: "rent", label: "How much would you spend on rent or hostel fees?", min: 0, max: 20000, step: 100 },
  { key: "entertainment", label: "How much would you spend on entertainment (movies, games, outings)?", min: 0, max: 10000, step: 100 },
  { key: "education", label: "How much would you spend on tuition, books or learning material?", min: 0, max: 10000, step: 100 },
  { key: "savings", label: "How much would you save per month?", min: 0, max: 20000, step: 100 },
  { key: "others", label: "How much would you spend on other things (gadgets, sports, etc.)?", min: 0, max: 10000, step: 100 }
];

function BudgetSliderGame() {
  const [responses, setResponses] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.key]: q.min }), {})
  );
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const totalIncome = responses.income;
    const prompt = `
    A student has ₹${totalIncome} monthly income and has planned the following budget:
    ${Object.entries(responses)
      .filter(([k]) => k !== "income")
      .map(([k, v]) => `${k}: ₹${v}`)
      .join(", \n")}

    Give plain text, concise feedback on whether these allocations are reasonable for a college student in India. Do not use formatting. Use full sentences in short, readable paragraphs. Suggest improvements if any category is over- or under-budgeted.
    `;

    try {
      const result = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDsCocYfuUvKQk2FM-RkC-rx7PSIAU9uRE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await result.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not get feedback.";
      setFeedback(text);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      setFeedback("An error occurred while fetching AI feedback.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#33006F]">Student Budgeting Game</h2>
      <p className="mb-4">Adjust the sliders to plan your monthly budget. When you're ready, click Submit to get AI feedback.</p>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.key}>
            <label className="block font-semibold mb-1">{q.label}</label>
            <input
              type="range"
              min={q.min}
              max={q.max}
              step={q.step}
              value={responses[q.key]}
              onChange={(e) => handleChange(q.key, parseInt(e.target.value))}
              className="w-full"
            />
            <p>₹{responses[q.key]}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-[#33006F] text-white px-4 py-2 rounded hover:bg-[#4a0099]"
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {feedback && (
        <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          <h3 className="font-bold mb-2">AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default BudgetSliderGame;
