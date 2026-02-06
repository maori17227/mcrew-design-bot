# ⚡ Быстрый старт - 5 минут

## 1. Установи Wrangler
```bash
npm install -g wrangler
```

## 2. Логин
```bash
wrangler login
```

## 3. Деплой
```bash
wrangler deploy
```

## 4. Добавь переменные в Cloudflare Dashboard
- Зайди в Workers & Pages → Settings → Variables
- Добавь:
  - `BOT_TOKEN` = `8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M`
  - `ADMIN_CHAT_ID` = твой chat_id (узнай у @userinfobot)

## 5. Установи webhook
Замени `YOUR_WORKER_URL` на URL который дал wrangler:

```bash
curl -X POST "https://api.telegram.org/bot8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M/setWebhook?url=YOUR_WORKER_URL"
```

## Готово! 🎉

Бот работает: https://t.me/mindescrew_bot

---

## Обновление
```bash
wrangler deploy
```

## Логи
```bash
wrangler tail
```

Всё!
