# MCREW Design Studio Website

Полноценный веб-сайт для дизайн-студии MCREW с авторизацией через Telegram.

## Особенности

- ✅ Адаптивный дизайн (desktop + mobile)
- ✅ Авторизация через Telegram Bot
- ✅ Синхронизация с Mini App (общее портфолио)
- ✅ Темная/светлая тема
- ✅ Портфолио с аудио плеером
- ✅ Форма заказа услуг
- ✅ Минималистичный дизайн в стиле YSL

## Структура

```
website/
├── index.html      # Главная страница
├── styles.css      # Стили
├── app.js          # JavaScript логика
└── README.md       # Документация
```

## Разделы сайта

### 1. Hero Section
- Главный экран с логотипом
- Призыв к действию (CTA)

### 2. Services
- Graphic Design
- UI/UX Design
- Motion Design
- Video Editing

### 3. Portfolio
- Track Covers (с аудио плеером)
- Posters & Flyers
- Motion Design

### 4. Contact
- Форма заказа
- Ссылка на Telegram Bot

## Авторизация через Telegram

Используется официальный Telegram Login Widget:

```javascript
// Callback функция
window.onTelegramAuth = function(user) {
    // user содержит:
    // - id
    // - first_name
    // - last_name
    // - username
    // - photo_url
    // - auth_date
    // - hash
};
```

## Запуск локально

1. Откройте `index.html` в браузере
2. Или используйте локальный сервер:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

Затем откройте: `http://localhost:8000`

## Деплой

### GitHub Pages

1. Создайте ветку `gh-pages`
2. Скопируйте файлы из `website/` в корень ветки
3. Включите GitHub Pages в настройках репозитория

URL будет: `https://maori17227.github.io/mcrew-design-bot/`

### Cloudflare Pages

1. Подключите репозиторий к Cloudflare Pages
2. Build command: (пусто)
3. Build output directory: `website`

## API Integration

Сайт использует тот же API что и Mini App:

```javascript
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';
```

Endpoints:
- `GET /api/portfolio?category=covers` - Получить портфолио
- `POST /api/order` - Отправить заказ

## Синхронизация с Mini App

Портфолио загружается из тех же источников:
- GitHub Raw URLs для изображений
- Cloudflare KV для динамического контента (для админа)

## Настройка

В `app.js` измените:

```javascript
const API_BASE = 'ваш-api-url';
const BOT_USERNAME = 'ваш_бот';
const GITHUB_BASE = 'ваш-github-url';
```

## Темы

Сайт поддерживает темную и светлую темы:

```css
:root {
    --bg-primary: #000000;
    --accent: #ff0000;
    /* ... */
}

[data-theme="light"] {
    --bg-primary: #ffffff;
    /* ... */
}
```

## Адаптивность

Breakpoints:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## Браузеры

Поддерживаются:
- Chrome/Edge (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Mobile browsers

## Лицензия

© 2024 MCREW. All rights reserved.
