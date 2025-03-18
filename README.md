# Локальная библиотека фильмов

Современная локальная библиотека фильмов, построенная на Bun и React с интеграцией TMDB API.

## Функции

- 🎬 Интеграция с TMDB API для получения информации о фильмах
- 📁 Система папок для организации коллекции
- 🌙 Современный dark-mode интерфейс
- ⚡ Высокая производительность благодаря Bun
- 🔄 Drag-and-drop для управления фильмами

## Требования

- [Bun](https://bun.sh/) >= 1.0.0
- Node.js >= 18.0.0

## Установка

1. Установите Bun (если еще не установлен):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-username/modern-movie-lib.git
   cd modern-movie-lib
   ```

3. Установите зависимости:
   ```bash
   bun install
   ```

4. Создайте файл `.env` и добавьте ваш TMDB API ключ:
   ```env
   TMDB_API_KEY=your_api_key_here
   ```

## Разработка

Запуск в режиме разработки:
```bash
bun dev
```

Сборка проекта:
```bash
bun run build
```

## Использование

1. Запустите приложение:
   ```bash
   bun start
   ```

2. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:3000
   ```

## Структура проекта

```
modern-movie-lib/
├── src/
│   ├── app.ts           # Точка входа сервера
│   ├── routes/          # API маршруты
│   ├── services/        # Бизнес-логика
│   ├── types/          # TypeScript типы
│   └── ui/             # React компоненты
├── public/             # Статические файлы
└── tests/             # Тесты
```

## Лицензия

MIT License