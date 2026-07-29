export {};

interface PuterChatResponse {
  message?: { content?: string };
  text?: string;
}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string, options?: { model?: string }) => Promise<PuterChatResponse | string>;
      };
    };
  }
}
