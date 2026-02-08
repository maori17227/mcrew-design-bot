# Исправление авторизации Telegram

## Проблема: "Bot domain invalid"

Это происходит потому что домен не добавлен в настройки бота.

## Решение:

### 1. Открой @BotFather в Telegram

### 2. Выполни команды:

```
/mybots
```

Выбери своего бота: **@mcrew_bot**

### 3. Нажми "Bot Settings"

### 4. Нажми "Domain"

### 5. Добавь домены:

```
maori17227.github.io
localhost
```

### 6. Готово!

Теперь авторизация будет работать на:
- https://maori17227.github.io/mcrew-design-bot/
- http://localhost:8080

---

## Альтернатива: Используй правильный bot username

Проверь что в `app.js` указан правильный username:

```javascript
const BOT_USERNAME = 'mcrew_bot';  // Без @
```

Если бот называется по-другому, измени это значение.
