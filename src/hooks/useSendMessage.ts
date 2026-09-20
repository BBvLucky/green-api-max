import { useState, useCallback } from "react";

import type { SendMessageRequest, ApiError } from "../types/api";
import { buildInstanceUrl } from "../utils/buildInstanceUrl";

interface UseSendMessageReturn {
  sendMessage: (request: SendMessageRequest) => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
  clearError: () => void;
}

export function useSendMessage(): UseSendMessageReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (request: SendMessageRequest): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const url = buildInstanceUrl("sendMessage");

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          let errorMessage: string;

          try {
            const errorData = await response.json();
            errorMessage =
              errorData.reason ||
              errorData.message ||
              "Ошибка отправки сообщения";
          } catch {
            errorMessage = `Ошибка отправки сообщения (HTTP ${response.status})`;
          }

          const apiError: ApiError = {
            message: errorMessage,
            httpStatus: response.status,
          };

          setError(apiError);
          return;
        }
      } catch (err) {
        const apiError: ApiError = {
          message:
            err instanceof Error ? err.message : "Неизвестная ошибка сети",
          httpStatus: 0,
        };

        setError(apiError);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { sendMessage, isLoading, error, clearError };
}
