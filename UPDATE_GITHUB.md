# Как обновить файлы на GitHub

## Способ 1: Через веб-интерфейс (5 минут)

### Шаг 1: index.html

1. Открой: https://github.com/maori17227/mcrew-design-bot/blob/main/miniapp/index.html
2. Нажми на иконку карандаша ✏️ (Edit this file)
3. Удали весь текст (Ctrl+A, Delete)
4. Открой файл `miniapp/index.html` на своем компьютере
5. Скопируй весь код (Ctrl+A, Ctrl+C)
6. Вставь в GitHub (Ctrl+V)
7. Внизу нажми "Commit changes" → "Commit changes"

### Шаг 2: styles.css

1. Открой: https://github.com/maori17227/mcrew-design-bot/blob/main/miniapp/styles.css
2. Нажми ✏️
3. Удали всё (Ctrl+A, Delete)
4. Открой `miniapp/styles.css` на компьютере
5. Скопируй всё (Ctrl+A, Ctrl+C)
6. Вставь (Ctrl+V)
7. Commit changes

### Шаг 3: app.js

1. Открой: https://github.com/maori17227/mcrew-design-bot/blob/main/miniapp/app.js
2. Нажми ✏️
3. Удали всё (Ctrl+A, Delete)
4. Открой `miniapp/app.js` на компьютере
5. Скопируй всё (Ctrl+A, Ctrl+C)
6. Вставь (Ctrl+V)
7. Commit changes

### Шаг 4: README.md (опционально)

1. Открой: https://github.com/maori17227/mcrew-design-bot/blob/main/miniapp/README.md
2. Нажми ✏️
3. Удали всё
4. Открой `miniapp/README.md` на компьютере
5. Скопируй всё
6. Вставь
7. Commit changes

---

## Способ 2: Через Git (если установлен)

```bash
cd путь/к/твоей/папке
git add miniapp/*
git commit -m "Update Mini App with order form"
git push
```

---

## Способ 3: Удалить и загрузить заново

1. Зайди: https://github.com/maori17227/mcrew-design-bot/tree/main/miniapp
2. Для каждого файла:
   - Нажми на файл
   - Нажми на три точки (...)
   - Delete file
   - Commit
3. Нажми "Add file" → "Upload files"
4. Перетащи все файлы из папки `miniapp/` на компьютере
5. Commit changes

---

## После обновления

Подожди 2-3 минуты, потом открой Mini App в Telegram и проверь:

✅ Нет "ДИЗАЙН СТУДИЯ"
✅ Нет emoji иконок
✅ Все 5 категорий
✅ Форма заказа работает
✅ Красный цвет (#ff0000)

---

## Что нового в Mini App:

### Форма заказа
- Нажми "Place Order" в любой категории
- Заполни форму:
  - Детали проекта
  - Стиль и цвета
  - Срок
  - Бюджет
  - Контакт
- Нажми "Send Order"
- Заказ отправится через Telegram

### Все исправления
- ✅ Убрано "ДИЗАЙН СТУДИЯ"
- ✅ Убраны все emoji
- ✅ Добавлены все 5 категорий
- ✅ Форма заказа как в боте
- ✅ Красный цвет вместо розового
- ✅ Переводы работают полностью

---

Выбери любой способ и обнови файлы!
