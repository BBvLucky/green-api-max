import { useCallback, useRef, useState } from "react";

import { buildInstanceUrl } from "../utils/buildInstanceUrl";

interface IncomingMessage {
  id: string;
  chatId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export function useGetMessage() {
  const [message, setMessage] = useState<IncomingMessage>();

  const isPollingRef = useRef(false);

  const startPolling = useCallback(() => {
    if (isPollingRef.current) return;
    isPollingRef.current = true;
    async function run() {
      while (isPollingRef.current) {
        try {
          const res = await fetch(
            `${buildInstanceUrl("receiveNotification")}?receiveTimeout=60`,
          );
          const text = await res.text();

          if (!isPollingRef.current) break;

          if (text && text !== "null") {
            const data = JSON.parse(text);
            const body = data.body;

            if (
              body?.typeWebhook === "incomingMessageReceived" &&
              body?.messageData?.typeMessage === "textMessage"
            ) {
              setMessage({
                id: body.idMessage,
                chatId: body.senderData.chatId,
                senderName: body.senderData.senderName ?? "",
                text: body.messageData.textMessageData.textMessage,
                timestamp: body.timestamp,
              });
            }

            await fetch(
              `${buildInstanceUrl("deleteNotification")}/${data.receiptId}`,
              { method: "DELETE" },
            );
          }
        } catch {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }
    run();
  }, []);

  const stopPolling = useCallback(() => {
    isPollingRef.current = false;
  }, []);

  return { message, startPolling, stopPolling };
}
