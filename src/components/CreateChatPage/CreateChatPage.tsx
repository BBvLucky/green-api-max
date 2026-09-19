import { useState } from "react";

import "./CreateChatPage.css";

interface CreateChatPageProps {
  onStartChat: (chatId: string) => void;
  onLogout: () => void;
}

function CreateChatPage({ onStartChat, onLogout }: CreateChatPageProps) {
  const [chatId, setChatId] = useState("");
  const [error, setError] = useState("");

  const handleConfirmChat = () => {
    if (!chatId.trim()) {
      setError("Введите ID чата");
      return;
    }
    setError("");
    onStartChat(chatId.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(e.target.value);
    if (error) {
      setError("");
    }
  };

  const inputClassName = `create-chat-page__input${error ? " create-chat-page__input--error" : ""}`;

  return (
    <div className="create-chat-page">
      <div className="create-chat-page__content">
        <h1 className="create-chat-page__title">Создание чата</h1>
        <div className="create-chat-page__input-section">
          <input
            type="text"
            className={inputClassName}
            value={chatId}
            onChange={handleInputChange}
            placeholder="Введите ID чата"
          />
          <button
            className="create-chat-page__button"
            onClick={handleConfirmChat}
          >
            Начать чат
          </button>
        </div>
        <div className="create-chat-page__error">{error}</div>
        <button className="create-chat-page__logout-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default CreateChatPage;
