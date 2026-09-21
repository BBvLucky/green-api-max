import { useState, useRef, useEffect } from "react";

import MessageBubble from "../../components/MessageBubble/MessageBubble";
import InputWithButton from "../../components/InputWithButton/InputWithButton";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useGetMessage } from "../../hooks/useGetMessage";

import "./ChatPage.css";

interface ChatPageProps {
  chatId: string;
  onLogout: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

function ChatPage({ chatId, onLogout }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    sendMessage,
    isLoading,
    error: sendError,
    clearError,
  } = useSendMessage();

  const { message: incomingMessage, startPolling } = useGetMessage();

  useEffect(() => {
    if (!incomingMessage) return;

    if (incomingMessage.chatId !== chatId) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages((prev) => {
      const isDuplicate = prev.some((m) => m.id === incomingMessage.id);
      if (isDuplicate) return prev;

      const newIncomingMessage: Message = {
        id: incomingMessage.id,
        text: incomingMessage.text,
        sender: "other",
        timestamp: new Date(incomingMessage.timestamp),
      };

      return [...prev, newIncomingMessage];
    });
  }, [incomingMessage, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (sendError) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [sendError, clearError]);

  useEffect(() => {
    startPolling();
  }, [startPolling]);

  const handleSendMessage = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText || isLoading) return;

    const message: Message = {
      id: crypto.randomUUID(),
      text: trimmedText,
      sender: "me",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setInputText("");
    void sendMessage({ chatId, message: trimmedText });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-page__header">
        <h2 className="chat-page__title">Чат: {chatId}</h2>
        <button className="chat-page__logout-button" onClick={onLogout}>
          Выйти
        </button>
      </div>

      <div className="chat-page__messages">
        {/* решение для демо, "по-хорошему" тут лучше использовать виртуализированный список */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-page__input-section">
        <InputWithButton
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onButtonClick={handleSendMessage}
          buttonLabel={isLoading ? "Отправка..." : "Отправить"}
          placeholder="Введите сообщение"
          rounded
          error={sendError?.message}
          className={sendError ? "chat-page__input-with-error" : ""}
          btnDisabled={isLoading}
          inputDisabled={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatPage;
