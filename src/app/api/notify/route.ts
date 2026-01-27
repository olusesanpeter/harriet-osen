import { NextRequest, NextResponse } from "next/server";
import { addProductNotifyToNotion } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const { email, productName, productSlug } = await request.json();

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
        email,
        productName,
        productSlug,
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
