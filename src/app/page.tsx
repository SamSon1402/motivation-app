// src/app/page.tsx
"use client";

import { useState } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MotivationPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter your question");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/motivation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data.response);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0">
          {/* Stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 71) % 100}%`,
              }}
            />
          ))}

          {/* Mountains */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              className="fill-[#0D0D0D]"
              d="M0,320L1440,320L1440,220L720,320L0,220Z"
            />
            <path
              className="fill-[#1A1A1A]"
              d="M0,320L1440,320L1440,260L720,180L0,260Z"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative bg-transparent p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="text-white text-xl font-light tracking-[0.2em]">
          MOTIVATE.AI
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 pt-28 pb-24 text-center">
        {/* Title */}
        <div className="mb-20">
          <h1 className="text-white text-4xl font-light tracking-[0.3em] opacity-90">
            DREAM
            <span className="inline-block ml-3">✧</span>
          </h1>
        </div>

        {!response && (
          <>
            <h2 className="text-3xl font-light tracking-wide mb-6 text-white/90">
              Navigate your journey under the
              <span className="block mt-2">moonlit path of possibility</span>
            </h2>

            <p className="text-gray-400 mb-12 text-lg font-light leading-relaxed">
              Share your aspirations with our AI guide, and let's illuminate the
              way to your dreams together
            </p>
          </>
        )}

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative z-10">
          <div
            className={`transform transition-all duration-300 ${
              isSearchFocused ? "scale-105" : ""
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="What's your dream?"
              className="w-full px-6 py-4 bg-[#1A1A1A]/50 text-white rounded-full border border-white/10 focus:outline-none focus:border-white/30 text-lg transition-all duration-300 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              ) : (
                <Search className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-300 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Response Card */}
        {response && (
          <Card className="mt-8 bg-[#1A1A1A]/50 border border-white/10 text-white">
            <CardContent className="p-6">
              <div className="text-left whitespace-pre-wrap font-light">
                {response}
              </div>
              <button
                onClick={() => {
                  setResponse("");
                  setInput("");
                }}
                className="mt-6 text-gray-400 hover:text-white transition-colors"
              >
                Ask another question
              </button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
