import { NextRequest, NextResponse } from "next/server";
import { addProductNotifyToNotion } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, productName, productSlug, newsletter } = await request.json();

    // Validate name
    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name" },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate product info
    if (!productName || !productSlug) {
      return NextResponse.json(
        { success: false, message: "Product information missing" },
        { status: 400 }
      );
    }

    // Save notification request to Notion
    try {
      await addProductNotifyToNotion({
        firstName,
        lastName,
        email,
        productName,
        productSlug,
        newsletter: newsletter || false,
      });
    } catch (error) {
      console.error("Notion API error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to register. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "We'll notify you when this shoe is available!",
    });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register. Please try again later.",
      },
      { status: 500 }
    );
  }
}
