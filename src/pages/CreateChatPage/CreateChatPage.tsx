import { useState } from "react";

import InputWithButton from "../../components/InputWithButton/InputWithButton";

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


  return (
    <div className="create-chat-page">
      <div className="create-chat-page__content">
        <h1 className="create-chat-page__title">Создание чата</h1>
        <InputWithButton
          value={chatId}
          onChange={handleInputChange}
          onButtonClick={handleConfirmChat}
          buttonLabel="Начать чат"
          placeholder="Введите ID чата"
          error={error}
        />
        <button className="create-chat-page__logout-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default CreateChatPage;
