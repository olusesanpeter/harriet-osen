import { NextRequest, NextResponse } from "next/server";

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

    // TODO: Save feedback to your database or send to your email service
    console.log("Feedback received:", {
      selectedShoes,
      name,
      email,
      newsletter,
    });

    // If newsletter is checked, subscribe via ConvertKit
    if (newsletter) {
      const apiKey = process.env.CONVERTKIT_API_KEY;
      const formId = process.env.CONVERTKIT_FORM_ID;

      if (apiKey && formId) {
        try {
          // Prepare custom fields for ConvertKit
          const fields: Record<string, string> = {};
          if (selectedShoes && selectedShoes.length > 0) {
            // Store selected shoes as a comma-separated string
            fields.selected_shoes = selectedShoes.join(", ");
            // Also store as JSON for easier parsing if needed
            fields.selected_shoes_json = JSON.stringify(selectedShoes);
          }

          await fetch(
            `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                api_key: apiKey,
                email,
                first_name: name,
                fields: Object.keys(fields).length > 0 ? fields : undefined,
              }),
            }
          );
        } catch (error) {
          console.error("ConvertKit subscription error:", error);
          // Don't fail the whole request if newsletter subscription fails
        }
      }
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
