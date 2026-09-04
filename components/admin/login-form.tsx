"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type AuthState } from "@/lib/actions/auth-actions";

function LoginButton() {
  const { pending } = useFormStatus();
  return <button className="btn btn-primary" disabled={pending}>{pending ? "Проверяем…" : "Войти в панель"}</button>;
}

export function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(loginAction, {});
  return <form action={action} className="login-form"><div className="field"><label htmlFor="login">Логин</label><input id="login" name="login" autoComplete="username" required /></div><div className="field"><label htmlFor="password">Пароль</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>{state.error ? <p role="alert" className="form-message error">{state.error}</p> : null}<LoginButton /></form>;
}
