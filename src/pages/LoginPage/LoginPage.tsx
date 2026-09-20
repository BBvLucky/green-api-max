import { useCallback, useState, type SubmitEvent } from "react";

import { STORAGE_KEY } from "../../const";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";

import "./LoginPage.css";

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      const credentials = { idInstance, apiTokenInstance };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
      onLogin();
    },
    [apiTokenInstance, idInstance, onLogin],
  );

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Авторизация</h1>

        <InputWithLabel
          label="ID Instance"
          id="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="Введите idInstance"
        />

        <InputWithLabel
          label="API Token Instance"
          id="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          placeholder="Введите apiTokenInstance"
          type="password"
        />

        <button type="submit" className="login-form__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
