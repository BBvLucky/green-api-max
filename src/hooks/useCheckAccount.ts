import { useCallback, useState } from "react";

import type { CheckAccountResponse } from "../types/api";
import { buildInstanceUrl } from "../utils/buildInstanceUrl";

export function useCheckAccount() {
  const [data, setData] = useState<CheckAccountResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const check = useCallback(async (phoneNumber: number, force = false) => {
    setIsLoading(true);
    setError("");
    setData(null);

    try {
      const url = buildInstanceUrl("checkAccount");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, force }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка API (${response.status})`);
      }

      setData((await response.json()) as CheckAccountResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось выполнить запрос",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, check };
}
