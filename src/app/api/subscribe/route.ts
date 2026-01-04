import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get ConvertKit credentials from environment
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
      console.error("ConvertKit API credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Newsletter service is not configured. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Call ConvertKit API
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: firstName,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ConvertKit API error:", errorData);
      throw new Error("ConvertKit API error");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      },
      { status: 500 }
    );
  }
}
