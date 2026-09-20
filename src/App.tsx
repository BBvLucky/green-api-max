import { useCallback, useState } from "react";

import LoginPage from "./pages/LoginPage/LoginPage";
import CreateChatPage from "./pages/CreateChatPage/CreateChatPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import type { Page } from "./types/app";
import { STORAGE_KEY } from "./const";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [currentChatId, setCurrentChatId] = useState<string>("");

  const handleLogin = useCallback(() => {
    setCurrentPage("create-chat");
  }, []);

  const handleStartChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setCurrentPage("chat");
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentChatId("");
    setCurrentPage("login");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "create-chat":
        return (
          <CreateChatPage
            onStartChat={handleStartChat}
            onLogout={handleLogout}
          />
        );
      case "chat":
        return <ChatPage chatId={currentChatId} onLogout={handleLogout} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
