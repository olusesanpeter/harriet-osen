import { NextRequest, NextResponse } from "next/server";
import { addFeedbackToNotion } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const { selectedShoes, name, email, newsletter } = await request.json();

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

    // Save feedback to Notion
    try {
      await addFeedbackToNotion({
        name,
        email,
        selectedShoes,
        newsletter: newsletter || false,
      });
    } catch (error) {
      console.error("Notion API error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save feedback. Please try again later.",
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
