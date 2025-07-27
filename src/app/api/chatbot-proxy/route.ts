import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.CHATBOT_SECRET_KEY;
  const isDev = process.env.NEXT_PUBLIC_DEV === "true";
  const backendUrl = isDev
    ? process.env.NEXT_PUBLIC_BACKEND_URL_TEST
    : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 500 },
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();

    const apiRes = await fetch(`${backendUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const responseText = await apiRes.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        {
          error: "Invalid JSON response from backend",
          details: responseText.substring(0, 200),
        },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: apiRes.status });
  } catch (error: unknown) {
    console.error("Proxy error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Proxy error", details: errorMessage },
      { status: 500 },
    );
  }
}
