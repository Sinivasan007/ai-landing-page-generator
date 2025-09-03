import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import ResultOutput from "./components/ResultOutput";

function App() {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("AI-SaaS");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Please enter a product or service name");
      return;
    }

    setLoading(true);
    setResult("");
    toast.loading("Talking to AI...");
    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please add it to your .env");
      }

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Write a clean and responsive HTML landing page for the product "${prompt}". The main heading (H1) must be "${prompt}" only—do not include category in the heading. Page should include a bold heading, a short subheading, three feature cards, a call to action button, and use plain HTML + Tailwind CSS. Return only valid HTML.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AI Landing Page Generator",
          },
        }
      );

      const html = response.data.choices?.[0]?.message?.content || "";
      if (!html) toast.error("No response from AI");
      setResult(html);
      toast.success("Response ready ✅");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-black px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <Toaster />
          <Header />
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            category={category}
            setCategory={setCategory}
            handleGenerate={handleGenerate}
            loading={loading}
          />
          <ResultOutput html={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
