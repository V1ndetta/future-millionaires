"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { submitLead, type LeadState } from "@/lib/actions/lead-actions";

const initialState: LeadState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="btn btn-dark" type="submit" disabled={pending}>{pending ? "Отправляем…" : "Отправить заявку"}<ArrowUpRight size={17} /></button>;
}

export function LeadForm({ programs }: { programs: { title: string }[] }) {
  const [state, action] = useActionState(submitLead, initialState);
  return (
    <form action={action} className="form-grid">
      <div className="field"><label htmlFor="name">Имя родителя</label><input id="name" name="name" autoComplete="name" required placeholder="Как к вам обращаться" /></div>
      <div className="field"><label htmlFor="phone">Телефон</label><input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="+7 ___ ___ __ __" /></div>
      <div className="field"><label htmlFor="studentAge">Возраст ученика</label><input id="studentAge" name="studentAge" type="number" inputMode="numeric" min="4" max="99" required placeholder="10" /></div>
      <div className="field"><label htmlFor="level">Уровень игры</label><select id="level" name="level" required defaultValue=""><option value="" disabled>Выберите уровень</option><option>Не играл раньше</option><option>Знает правила</option><option>Есть турнирный опыт</option><option>Есть рейтинг FIDE</option></select></div>
      <div className="field field-full"><label htmlFor="program">Программа</label><select id="program" name="program" required defaultValue=""><option value="" disabled>Подобрать вместе</option>{programs.map((program) => <option key={program.title}>{program.title}</option>)}</select></div>
      <div className="field field-full"><label htmlFor="comment">Комментарий</label><textarea id="comment" name="comment" placeholder="Расскажите о целях, опыте или удобном времени" /></div>
      {state.message ? <p role="status" className={`form-message ${state.status}`}>{state.message}</p> : null}
      <div className="field-full"><SubmitButton /><p className="form-note">Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.</p></div>
    </form>
  );
}
