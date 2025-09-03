import React from "react";

const categories = [
  "AI-SaaS",
  "Productivity Tools",
  "Startup",
  "Blog",
  "Ad Copy",
  "Instagram Reel",
];

function PromptInput({
  prompt,
  setPrompt,
  category,
  setCategory,
  handleGenerate,
  loading,
}) {
  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-12 bg-white rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 underline">
        AI Landing Page Generator
      </h1>
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-black"
        type="text"
        placeholder="Enter your product name (e.g., travel, shopping)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-black"
        value={category}
        onChange={e => setCategory(e.target.value)}
        disabled={loading}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg transition"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Landing Page"}
      </button>
    </div>
  );
}

export default PromptInput;
