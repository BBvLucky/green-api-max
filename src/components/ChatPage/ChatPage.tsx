import { useState, useRef, useEffect } from "react";

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "me",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    }
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
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-page__message chat-page__message--${message.sender}`}
          >
            <div className="chat-page__message-text">{message.text}</div>
            <span className="chat-page__message-time">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-page__input-section">
        <input
          type="text"
          className="chat-page__input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение"
        />
        <button className="chat-page__send-button" onClick={handleSendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
