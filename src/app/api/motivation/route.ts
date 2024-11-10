// src/app/api/motivation/route.ts
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const { input } = await req.json();

    if (!input?.trim()) {
      return NextResponse.json(
        { error: "Please enter your question" },
        { status: 400 },
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `As a motivational coach, provide encouraging and practical advice for: "${input}"`,
        },
      ],
    });

    if (!message.content[0]?.text) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({
      response: message.content[0].text,
    });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "Service error. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
