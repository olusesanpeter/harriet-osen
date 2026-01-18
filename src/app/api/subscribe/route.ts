import { NextRequest, NextResponse } from "next/server";
import { addNewsletterToNotion } from "@/lib/notion";

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

    // Save newsletter subscription to Notion
    try {
      await addNewsletterToNotion({
        email,
        firstName,
      });
    } catch (error) {
      console.error("Notion API error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to subscribe. Please try again later.",
        },
        { status: 500 }
      );
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
