# «Будущие миллионеры» — шахматная школа

Готовая к Vercel первая версия многостраничного сайта и закрытой панели директора. Стек: Next.js 16 App Router, TypeScript, Tailwind CSS 4, PostgreSQL, Prisma и Vercel Blob.

## Что реализовано

- девять публичных разделов: главная, о школе, тренеры, программы, расписание, достижения, новости, галерея и контакты;
- premium education / editorial chess дизайн, адаптивная сетка, анимации, SEO metadata, sitemap, robots, loading, empty, error и 404 states;
- CMS в `/admin/content` для hero, CTA, заголовков, описаний, текстов главной и страницы «О школе», формы пробного занятия и показателей главной;
- настройки города, страны, основных данных школы, контактов и социальных сетей в `/admin/settings`;
- CRUD тренеров, программ, расписания, филиалов, достижений, новостей и галереи;
- загрузка JPG, PNG, WebP и AVIF в Vercel Blob с превью, заменой и удалением (до 5 МБ);
- форма пробного занятия с сохранением заявки в PostgreSQL и управление статусом заявки;
- JWT-сессия администратора в `HttpOnly` cookie, проверка прав в каждой мутации и upload route;
- Zod-валидация всех Server Actions, проверка URL, PostgreSQL rate limit для входа и публичных заявок;
- GitHub Actions CI: install, Prisma Client, lint, typecheck и production build.

Демо-данные находятся только в `lib/demo-data.ts` и применяются командой seed. В development они также служат read-only fallback, если локальная PostgreSQL не запущена. В production fallback отключён: публичный сайт не показывает вымышленные факты при пустой или недоступной базе.

## Локальный запуск с демо-контентом

Требования: Node.js 20.9+ и PostgreSQL 15+ (либо Docker).

```powershell
npm install
Copy-Item .env.example .env
docker compose up -d
npm run db:deploy
npm run db:seed
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000). Панель: [http://localhost:3000/admin](http://localhost:3000/admin).

Локальный тестовый вход после seed берётся из `SEED_ADMIN_LOGIN` и `SEED_ADMIN_PASSWORD` в `.env`. Значения из `.env.example` предназначены только для development; `.env` исключён из git.

## Переменные окружения

| Переменная | Где нужна | Назначение |
| --- | --- | --- |
| `DATABASE_URL` | Всегда | PostgreSQL connection string; на Vercel используйте pooled URL провайдера. |
| `AUTH_SECRET` | Всегда | Секрет подписи сессии длиной не менее 32 случайных символов. |
| `NEXT_PUBLIC_SITE_URL` | Всегда | Публичный origin сайта для metadata и sitemap. Не является секретом. |
| `BLOB_READ_WRITE_TOKEN` | Для upload | Серверный токен Vercel Blob. Никогда не добавляйте префикс `NEXT_PUBLIC_`. |
| `SEED_ADMIN_LOGIN` | Только demo seed | Логин тестового администратора. |
| `SEED_ADMIN_PASSWORD` | Только demo seed | Пароль тестового администратора, минимум 12 символов. |
| `SEED_DEMO_CONTENT` | Только demo seed | Должно быть `true` для явного разрешения демо-наполнения. |
| `ALLOW_PRODUCTION_SEED` | Только demo seed | Дополнительный предохранитель; production seed запрещён, пока значение не `true`. |
| `ADMIN_BOOTSTRAP_LOGIN` | Первый production admin | Логин реального директора. |
| `ADMIN_BOOTSTRAP_PASSWORD` | Первый production admin | Уникальный пароль реального директора, минимум 12 символов. |
| `ADMIN_BOOTSTRAP_NAME` | Первый production admin | Отображаемое имя администратора. |

Сгенерировать `AUTH_SECRET` можно командой `openssl rand -base64 48`. В PowerShell без OpenSSL: `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`.

## Безопасный production bootstrap

Не запускайте demo seed на production-базе. После подключения БД:

```powershell
npm run db:deploy
$env:ADMIN_BOOTSTRAP_LOGIN="real-director-login"
$env:ADMIN_BOOTSTRAP_PASSWORD="a-unique-long-password"
$env:ADMIN_BOOTSTRAP_NAME="Директор школы"
npm run db:create-admin
```

После первого входа директор заполняет `/admin/settings`, `/admin/content` и остальные разделы реальными данными. Bootstrap-переменные после создания пользователя можно удалить из окружения.

## Vercel

1. Импортируйте репозиторий в Vercel.
2. Подключите PostgreSQL (например, Neon через Vercel Marketplace) и Vercel Blob.
3. Добавьте `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN`.
4. Примените миграции из доверенного локального окружения или release job: `npm run db:deploy`.
5. Создайте реального администратора командой выше.
6. Стандартная команда сборки: `npm run build`.

CI использует синтаксически корректный фиктивный `DATABASE_URL`: `prisma generate` и `next build` не подключаются к БД, поскольку все data-driven страницы динамические. Реальные секреты для CI-проверки не требуются.

## Команды

```text
npm run dev              development server
npm run lint             ESLint
npm run typecheck        TypeScript без emit
npm run build            Prisma Client + production build
npm run db:migrate       создать локальную migration
npm run db:deploy        применить существующие migrations
npm run db:seed          намеренно загрузить demo-контент
npm run db:create-admin  создать/обновить production-администратора
```

## Какие реальные данные нужны от владельца

- город, страна, адрес, телефон, email и ссылки на официальные соцсети;
- утверждённые hero/CTA и тексты всех основных секций;
- фактическая статистика школы и год основания;
- реальные филиалы, расписание, программы, возрастные диапазоны и стоимость;
- имена, квалификация, биографии и фотографии тренеров;
- подтверждённые достижения учеников с разрешением на публикацию;
- новости, турнирный календарь и фотографии с корректными alt-описаниями;
- финальная формулировка согласия на обработку персональных данных и ссылка на политику конфиденциальности.
