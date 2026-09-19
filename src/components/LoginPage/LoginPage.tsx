import { useCallback, useState, type SubmitEvent } from "react";

import { STORAGE_KEY } from "../../const";

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

        <div className="login-form__field">
          <label htmlFor="idInstance" className="login-form__label">
            ID Instance
          </label>
          <input
            id="idInstance"
            type="text"
            className="login-form__input"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="Введите idInstance"
          />
        </div>

        <div className="login-form__field">
          <label htmlFor="apiTokenInstance" className="login-form__label">
            API Token Instance
          </label>
          <input
            id="apiTokenInstance"
            type="password"
            className="login-form__input"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Введите apiTokenInstance"
          />
        </div>

        <button type="submit" className="login-form__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
