export interface SubscribeRequest {
  email: string;
  firstName?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message?: string;
}
