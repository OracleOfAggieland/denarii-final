// src/types/index.ts
// This file is currently empty but imported by ChatInterface.tsx
// Add this content to fix the build error:

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ConversationHistory {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ConversationHistory[];
}

export interface ChatResponse {
  response?: string;
  error?: string;
  details?: string;
}