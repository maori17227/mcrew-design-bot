# ⚡ Быстрая настройка file_id

## Шаг 1: Узнай свой chat_id

Напиши боту @userinfobot в Telegram - он пришлет твой chat_id.

---

## Шаг 2: Запусти скрипт

```bash
python get_file_ids.py
```

Введи свой chat_id когда попросит.

---

## Шаг 3: Скопируй результат

Скрипт выведет что-то типа:

```javascript
const MEDIA_FILE_IDS = {
  logo: 'AgACAgIAAxkBAAIBY2ZhY3RvcmlhbC1ib3QtdGVzdC0x...',
  covers: 'AgACAgIAAxkBAAIBY3RvcmlhbC1ib3QtdGVzdC0yMzQ1...',
  posters: 'AgACAgIAAxkBAAIBY4RvcmlhbC1ib3QtdGVzdC0zNDU2...',
  video: 'BAACAgIAAxkBAAIBY5RvcmlhbC1ib3QtdGVzdC00NTY3...'
}
```

---

## Шаг 4: Вставь в worker.js

Открой `worker.js` и найди строку:

```javascript
// Portfolio media URLs (using GitHub raw URLs or Telegram file_id)
```

Замени весь блок `PORTFOLIO_MEDIA` на:

```javascript
// Telegram file_id (faster and more reliable)
const MEDIA_FILE_IDS = {
  logo: 'твой_file_id_логотипа',
  covers: 'твой_file_id_обложек',
  posters: 'твой_file_id_постеров',
  video: 'твой_file_id_видео'
}

const PORTFOLIO_MEDIA = {
  covers: MEDIA_FILE_IDS.covers,
  posters: MEDIA_FILE_IDS.posters,
  video: MEDIA_FILE_IDS.video
}
```

---

## Шаг 5: Деплой

```bash
wrangler deploy
```

---

## Шаг 6: Проверь

1. Открой бота: https://t.me/mindescrew_bot
2. Напиши `/start`
3. Нажми "💼 Portfolio"
4. Нажми "🖼️ View Examples"
5. Фото и видео должны загрузиться мгновенно!

---

## Готово! 🎉

Теперь бот работает на максимальной скорости с Telegram file_id!
