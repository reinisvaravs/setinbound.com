import { NextRequest, NextResponse } from "next/server";

// Types
interface ChatRequest {
  userId: string;
  username: string;
  content: string;
  model: string;
}

interface ChatResponse {
  response: string;
  model: string;
  timestamp: string;
}

// Mock response function - replace with actual AI service integration
async function generateAIResponse(
  content: string,
  model: string,
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000),
  );

  // Mock responses based on content
  const responses = [
    "I understand you're asking about that. Let me help you with that.",
    "That's an interesting question! Here's what I can tell you about it.",
    "I'd be happy to help you with that. Let me provide some information.",
    "Great question! Based on what you've asked, here's my response.",
    "I can see you're looking for information about that topic. Here's what I found.",
  ];

  // Simple keyword-based responses
  if (
    content.toLowerCase().includes("hello") ||
    content.toLowerCase().includes("hi")
  ) {
    return "Hello! I'm WALL-E, your AI assistant. How can I help you today?";
  }

  if (content.toLowerCase().includes("help")) {
    return "I'm here to help! I can answer questions, provide information, and assist with various tasks. What would you like to know?";
  }

  if (content.toLowerCase().includes("weather")) {
    return "I can't check the weather in real-time, but I can help you find weather information or answer other questions!";
  }

  if (content.toLowerCase().includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there anything else I can help you with?`;
  }

  // Return random response for other queries
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();

    // Validate required fields
    if (!body.userId || !body.content || !body.model) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: userId, content, and model are required",
        },
        { status: 400 },
      );
    }

    // Validate content length
    if (body.content.length > 4000) {
      return NextResponse.json(
        { error: "Message too long. Maximum 4000 characters allowed." },
        { status: 400 },
      );
    }

    // Validate model
    const validModels = ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"];
    if (!validModels.includes(body.model)) {
      return NextResponse.json(
        { error: "Invalid model specified" },
        { status: 400 },
      );
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(body.content, body.model);

    // Prepare response
    const response: ChatResponse = {
      response: aiResponse,
      model: body.model,
      timestamp: new Date().toISOString(),
    };

    // Add some delay to simulate real API processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send messages." },
    { status: 405 },
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send messages." },
    { status: 405 },
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send messages." },
    { status: 405 },
  );
}
