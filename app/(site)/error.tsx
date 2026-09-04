"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="container section"><p className="eyebrow">Ошибка</p><h1 className="heading-lg">Не удалось загрузить страницу</h1><p className="lede" style={{ margin: "1.5rem 0" }}>Попробуйте обновить данные. Если проблема повторится, свяжитесь со школой.</p><button className="btn btn-dark" onClick={reset}>Попробовать снова</button></div>;
}
