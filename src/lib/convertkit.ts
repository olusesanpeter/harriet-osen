import type { SubscribeRequest, SubscribeResponse } from "@/types";

export async function subscribeToNewsletter(
  data: SubscribeRequest
): Promise<SubscribeResponse> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to subscribe");
  }

  return response.json();
}
