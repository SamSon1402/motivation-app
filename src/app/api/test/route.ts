// src/app/api/test/route.ts
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Check if API key exists
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    // Test Claude connection
    const anthropic = new Anthropic({
      apiKey,
    });

    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Hello Claude! This is a test message.",
        },
      ],
    });

    return NextResponse.json({
      status: "success",
      message: "Claude API is working correctly",
      response: message.content[0]?.text,
    });
  } catch (error) {
    console.error("API Test Error:", error);

    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "API test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
