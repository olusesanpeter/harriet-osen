/**
 * Notion API integration for storing feedback and newsletter data
 */

/**
 * Fetches the database schema to see available properties
 */
export async function getNotionDatabaseSchema() {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim().replace(/['"]/g, '');

  if (!apiKey || !databaseId) {
    throw new Error("Notion API credentials not configured");
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch database schema");
    }

    const data = await response.json();
    return data.properties;
  } catch (error) {
    console.error("Error fetching database schema:", error);
    throw error;
  }
}

export interface FeedbackData {
  name: string;
  email: string;
  country: string;
  selectedShoes: string[];
  newsletter: boolean;
}

export interface NewsletterData {
  email: string;
  firstName?: string;
}

export interface ProductNotifyData {
  firstName: string;
  lastName: string;
  email: string;
  productName: string;
  productSlug: string;
  newsletter: boolean;
}

export interface NotionResponse {
  success: boolean;
  message?: string;
}

/**
 * Adds a newsletter subscription to Notion database
 */
export async function addNewsletterToNotion(
  data: NewsletterData
): Promise<NotionResponse> {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim().replace(/['"]/g, '');

  if (!apiKey || !databaseId) {
    throw new Error("Notion API credentials not configured");
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: databaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.firstName || "Newsletter Subscriber",
                },
              },
            ],
          },
          Email: {
            email: data.email,
          },
          "Selected Shoes": {
            multi_select: [],
          },
          Newsletter: {
            checkbox: true,
          },
          "Submitted On": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        errorData.message || `Notion API error: ${response.status} ${response.statusText}`
      );
    }

    return {
      success: true,
      message: "Newsletter subscription added to Notion successfully",
    };
  } catch (error) {
    console.error("Notion API error:", error);
    throw error;
  }
}

/**
 * Adds a feedback entry to Notion database
 */
export async function addFeedbackToNotion(
  data: FeedbackData
): Promise<NotionResponse> {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim().replace(/['"]/g, '');

  if (!apiKey || !databaseId) {
    throw new Error("Notion API credentials not configured");
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: databaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.name,
                },
              },
            ],
          },
          Email: {
            email: data.email,
          },
          "Where do you live?": {
            select: {
              name: data.country,
            },
          },
          "Selected Shoes": {
            multi_select: data.selectedShoes.map((shoe) => ({ name: shoe })),
          },
          Newsletter: {
            checkbox: data.newsletter,
          },
          "Submitted On": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        errorData.message || `Notion API error: ${response.status} ${response.statusText}`
      );
    }

    return {
      success: true,
      message: "Feedback added to Notion successfully",
    };
  } catch (error) {
    console.error("Notion API error:", error);
    throw error;
  }
}

/**
 * Adds a product notification request to Notion database
 */
export async function addProductNotifyToNotion(
  data: ProductNotifyData
): Promise<NotionResponse> {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim().replace(/['"]/g, '');

  if (!apiKey || !databaseId) {
    throw new Error("Notion API credentials not configured");
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: databaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: `${data.firstName} ${data.lastName}`,
                },
              },
            ],
          },
          Email: {
            email: data.email,
          },
          "Selected Shoes": {
            multi_select: [{ name: data.productName }],
          },
          Newsletter: {
            checkbox: data.newsletter,
          },
          "Submitted On": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        errorData.message || `Notion API error: ${response.status} ${response.statusText}`
      );
    }

    return {
      success: true,
      message: "Product notification added to Notion successfully",
    };
  } catch (error) {
    console.error("Notion API error:", error);
    throw error;
  }
}
