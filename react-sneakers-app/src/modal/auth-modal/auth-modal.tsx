import styles from "./auth-modal.module.scss";
import { HeaderLogo } from "../../components/ui/header-logo/header-logo.tsx";
import { FormInput } from "../../components/ui/input/form-input.tsx";
import { Button } from "../../components/ui/button/button.tsx";

import closeIcon from "../../assets/close.svg";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../redux/slice/auth-modal-slice.ts";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { useEffect, useState } from "react";
import type { LoginData } from "../../service/auth.ts";
import { clearError, login } from "../../redux/slice/auth-slice.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const AuthModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  const [mouseDownOnRoot, setMouseDownOnRoot] = useState(false);

  useEffect(() => {
    if (user.token) {
      toast.success("Вы успешно вошли в аккаунт");
      dispatch(setIsModalOpen(false));
      navigate("/profile");
    }
  }, [dispatch, navigate, user.token]);

  useEffect(() => {
    if (error) {
      if (error.code === 403) {
        toast.error("Неправильный логин или пароль");
      } else {
        toast.error(`Произошла ошибка: ${error.message}`);
      }
    }
  }, [error]);

  useEffect(() => {
    dispatch(clearError());
  });

  const onModalClose = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleRootMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnRoot(true);
    }
  };

  const handleRootMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownOnRoot && e.target === e.currentTarget) {
      onModalClose();
    }
    setMouseDownOnRoot(false);
  };

  const handleRootMouseLeave = () => {
    setMouseDownOnRoot(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div
      className={styles.root}
      onMouseDown={handleRootMouseDown}
      onMouseUp={handleRootMouseUp}
      onMouseLeave={handleRootMouseLeave}
    >
      <div className={styles.modal}>
        <img
          onClick={() => onModalClose()}
          className={styles.closeButton}
          src={closeIcon}
          alt={"close icon"}
        />
        <HeaderLogo />
        <h1>Вход</h1>
        <form className={styles.elementWrapper} onSubmit={handleSubmit}>
          <FormInput
            placeholder={"Введите e-mail..."}
            id={"email"}
            label={"E-mail"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <FormInput
            placeholder={"Введите пароль..."}
            id={"password"}
            label={"Пароль"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            width={"100%"}
            content={"Войти"}
            type={"submit"}
            disabled={loading}
          />
        </form>
        <div className={styles.elementWrapper}>
          <Button width={"100%"} content={"Регистрация"} alt={true} />
        </div>
      </div>
    </div>
  );
};
