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
  const [errorIdInstance, setErrorIdInstance] = useState("");
  const [errorApiToken, setApiTokenError] = useState("");

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      if (!idInstance) {
        setErrorIdInstance("Обязательное поле");
        return;
      }
      if (!apiTokenInstance.trim()) {
        setApiTokenError("Обязательное поле");
        return;
      }

      const credentials = { idInstance, apiTokenInstance };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
      onLogin();
    },
    [apiTokenInstance, idInstance, onLogin],
  );

  const handleOnIdInstanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorIdInstance) {
      setErrorIdInstance("");
    }
    setIdInstance(e.target.value);
  };

  const handleOnApiTokenInstanceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (errorApiToken) {
      setApiTokenError("");
    }
    setApiTokenInstance(e.target.value);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Авторизация</h1>

        <InputWithLabel
          label="ID Instance"
          id="idInstance"
          value={idInstance}
          onChange={handleOnIdInstanceChange}
          placeholder="Введите idInstance"
          error={errorIdInstance}
        />

        <InputWithLabel
          label="API Token Instance"
          id="apiTokenInstance"
          value={apiTokenInstance}
          onChange={handleOnApiTokenInstanceChange}
          placeholder="Введите apiTokenInstance"
          type="password"
          error={errorApiToken}
        />

        <button
          type="submit"
          className="login-form__button"
          disabled={!!errorIdInstance || !!errorIdInstance}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
