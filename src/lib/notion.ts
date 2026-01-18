/**
 * Notion API integration for storing feedback and newsletter data
 */

export interface FeedbackData {
  name: string;
  email: string;
  selectedShoes: string[];
  newsletter: boolean;
}

export interface NewsletterData {
  email: string;
  firstName?: string;
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
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

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
            rich_text: [
              {
                text: {
                  content: "",
                },
              },
            ],
          },
          Newsletter: {
            checkbox: true,
          },
          "submitted on": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", errorData);
      throw new Error(
        errorData.message || "Failed to add entry to Notion database"
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
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

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
          "Selected Shoes": {
            rich_text: [
              {
                text: {
                  content: data.selectedShoes.join(", "),
                },
              },
            ],
          },
          Newsletter: {
            checkbox: data.newsletter,
          },
          "submitted on": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", errorData);
      throw new Error(
        errorData.message || "Failed to add entry to Notion database"
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
