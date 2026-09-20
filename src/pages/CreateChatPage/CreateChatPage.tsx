import { useState } from "react";

import InputWithButton from "../../components/InputWithButton/InputWithButton";
import { useCheckAccount } from "../../hooks/useCheckAccount";

import "./CreateChatPage.css";

interface CreateChatPageProps {
  onStartChat: (chatId: string) => void;
  onLogout: () => void;
}

function CreateChatPage({ onStartChat, onLogout }: CreateChatPageProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const { isLoading, error: checkError, check, data } = useCheckAccount();

  const handleConfirmChat = async () => {
    if (!phoneNumber.trim()) {
      setError("Введите номер телефона");
      return;
    }
    setError("");
    await check(+phoneNumber);
    if (data?.exist) {
      onStartChat(data.chatId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="create-chat-page">
      <div className="create-chat-page__content">
        <h1 className="create-chat-page__title">Создание чата</h1>
        <InputWithButton
          value={phoneNumber}
          onChange={handleInputChange}
          onButtonClick={handleConfirmChat}
          buttonLabel="Начать чат"
          placeholder="Введите ID чата"
          error={error || checkError}
          btnDisabled={isLoading ?? error}
          inputDisabled={isLoading}
        />
        <button className="create-chat-page__logout-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default CreateChatPage;
