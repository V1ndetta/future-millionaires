# «Будущие миллионеры» — шахматная школа

Первая полноценная версия многостраничного сайта и закрытой панели директора. Проект построен на Next.js 16 App Router, TypeScript, Tailwind CSS 4, PostgreSQL и Prisma.

## Что реализовано

- 9 публичных разделов: главная, о школе, тренеры, программы, расписание, достижения, новости, галерея и контакты;
- адаптивная дизайн-система, анимации, SEO metadata, sitemap и robots.txt;
- форма пробного занятия с записью заявки в PostgreSQL;
- защищённая админ-панель `/admin` с JWT-сессией в HttpOnly cookie;
- CRUD тренеров, программ, расписания, филиалов, достижений, новостей и галереи;
- просмотр и изменение статусов заявок;
- редактирование контактов и основной информации школы;
- Prisma migration и seed с наполненным демо-контентом;
- loading, empty, error и 404 states.

Публичные страницы используют демо-данные как read-only fallback, если локальная PostgreSQL ещё не запущена. Отправка заявок, авторизация и изменения в админке всегда требуют рабочего подключения к БД.

## Локальный запуск

Требования: Node.js 20.9+ и PostgreSQL 15+ (или Docker).

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:deploy
npm run db:seed
npm run dev
```

На Windows PowerShell вместо `cp`:

```powershell
Copy-Item .env.example .env
```

Сайт будет доступен на [http://localhost:3000](http://localhost:3000), админ-панель — на [http://localhost:3000/admin](http://localhost:3000/admin).

Демо-вход после seed:

- логин: значение `SEED_ADMIN_LOGIN` (по умолчанию `director`);
- пароль: значение `SEED_ADMIN_PASSWORD` (по умолчанию `ChangeMe123!`).

Перед реальным запуском обязательно задайте собственный сложный пароль и новый `AUTH_SECRET`.

## Переменные окружения

| Переменная | Обязательна | Назначение |
| --- | --- | --- |
| `DATABASE_URL` | Да | PostgreSQL connection string. На Vercel используйте pooled URL провайдера. |
| `AUTH_SECRET` | Да | Секрет подписи админ-сессии, не менее 32 случайных символов. |
| `NEXT_PUBLIC_SITE_URL` | Да | Публичный URL для canonical metadata и sitemap. |
| `SEED_ADMIN_LOGIN` | Для seed | Логин первого администратора. |
| `SEED_ADMIN_PASSWORD` | Для seed | Пароль первого администратора. |

Сгенерировать секрет можно так:

```bash
openssl rand -base64 48
```

## Команды

```bash
npm run dev          # development server
npm run lint         # ESLint
npm run typecheck    # TypeScript без emit
npm run build        # Prisma Client + production build
npm run db:migrate   # новая локальная миграция
npm run db:deploy    # применить существующие миграции
npm run db:seed      # демо-контент и администратор
```

## Деплой на Vercel

1. Импортируйте репозиторий в Vercel.
2. Подключите PostgreSQL (Neon, Supabase, Railway или другой совместимый провайдер).
3. Добавьте `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`.
4. Примените миграции командой `npm run db:deploy` из доверенного CI/локального окружения.
5. Один раз выполните `npm run db:seed` с безопасными значениями `SEED_ADMIN_LOGIN` и `SEED_ADMIN_PASSWORD`.
6. Стандартная команда сборки — `npm run build`.

Не запускайте seed на каждом деплое: он обновляет пароль администратора из переменных окружения.

## Структура

```text
app/(site)           публичные маршруты
app/admin            вход и защищённая панель
components           общие UI-компоненты
components/admin     переиспользуемые компоненты панели
lib/actions          server actions
lib/data.ts          запросы и безопасный demo fallback
prisma               схема, миграция и seed
public/images        локальные брендовые изображения
```
