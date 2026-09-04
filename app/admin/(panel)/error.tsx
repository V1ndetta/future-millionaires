"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <div className="admin-panel"><h1 className="admin-title">Не удалось загрузить данные</h1><p className="admin-subtitle">Проверьте подключение к PostgreSQL и повторите попытку.</p><button className="btn btn-dark" style={{ marginTop: "1rem" }} onClick={reset}>Повторить</button></div>;
}
