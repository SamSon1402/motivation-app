// src/app/test-dashboard/page.tsx
"use client";

import { useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestDashboard() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Test the motivation endpoint
  const testMotivationAPI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      console.log("Sending request with input:", input);

      const res = await fetch("/api/motivation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input.trim() }),
      });

      const data = await res.json();
      console.log("Received response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setResponse(data.response);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-light tracking-wide text-center mb-12">
          Claude API Test Dashboard
        </h1>

        {/* Test Input */}
        <Card className="bg-[#1A1A1A]/50 border-white/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-light mb-4">Test API Request</h2>
            <form onSubmit={testMotivationAPI} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter test message..."
                  className="w-full px-6 py-4 bg-black/30 text-white rounded-full border border-white/10 focus:outline-none focus:border-white/30"
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
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
            <span className="text-red-400">{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <Card className="bg-[#1A1A1A]/50 border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-light mb-4">API Response</h2>
              <div className="p-4 bg-black/30 rounded-lg">
                <pre className="whitespace-pre-wrap text-white/80">
                  {response}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Request Log */}
        <Card className="bg-[#1A1A1A]/50 border-white/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-light mb-4">Debug Info</h2>
            <div className="space-y-2 text-sm text-white/60">
              <p>
                Status:{" "}
                {isLoading
                  ? "Loading..."
                  : response
                    ? "Success"
                    : error
                      ? "Error"
                      : "Ready"}
              </p>
              <p>Last Input: {input || "None"}</p>
              <p>Response Length: {response?.length || 0} characters</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
