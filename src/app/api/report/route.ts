import { NextResponse } from "next/server";

import { getApiBaseUrl } from "@/lib/api";

export async function POST(request: Request) {
  let payload: unknown = null;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const apiBase = getApiBaseUrl();

  try {
    const res = await fetch(`${apiBase}/api/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await res.json();

    return NextResponse.json(responseBody, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit the report. Please try again." },
      { status: 502 },
    );
  }
}
