import { NextResponse } from "next/server";
import { getNotionDatabaseSchema } from "@/lib/notion";

export async function GET() {
  try {
    const properties = await getNotionDatabaseSchema();
    
    // Extract property names and types
    const propertyList = Object.keys(properties).map((key) => ({
      name: key,
      type: properties[key].type,
    }));

    return NextResponse.json({
      success: true,
      properties: propertyList,
      raw: properties,
    });
  } catch (error) {
    console.error("Error fetching database schema:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
