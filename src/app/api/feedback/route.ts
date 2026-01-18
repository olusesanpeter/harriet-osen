import { NextRequest, NextResponse } from "next/server";
import { addFeedbackToNotion } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const { selectedShoes, name, email, country, newsletter } = await request.json();

    // Validate required fields
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Name and valid email are required" },
        { status: 400 }
      );
    }

    if (!selectedShoes || selectedShoes.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one shoe" },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        { success: false, message: "Please select your country" },
        { status: 400 }
      );
    }

    // Save feedback to Notion
    try {
      await addFeedbackToNotion({
        name,
        email,
        country,
        selectedShoes,
        newsletter: newsletter || false,
      });
    } catch (error) {
      console.error("Notion API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Error details:", errorMessage);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to save feedback: ${errorMessage}. Please check the console for details.`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit feedback. Please try again later.",
      },
      { status: 500 }
    );
  }
}
