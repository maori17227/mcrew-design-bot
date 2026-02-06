/**
 * MↃREW Telegram Bot - Cloudflare Workers Version
 * Fast, reliable, never goes down
 */

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env)
  }
}

// Language system - store in KV or memory
const userLanguages = new Map()

// Texts in different languages
const TEXTS = {
  en: {
    welcome: `🔥 <b>Welcome to MↃREW!</b>

We create:
• Covers, snippets, visuals
• VFX and motion graphics  
• Brand identity and logos
• UI/UX design
• Print materials
• Video editing

<b>Choose what interests you:</b>`,
    menu_title: `🔥 <b>MↃREW</b>

<b>Choose what interests you:</b>`,
    graphic_design: '🎨 Graphic Design',
    ui_design: '📱 UI/UX Design', 
    print: '📄 Print/Publishing',
    vfx: '🎬 Editing & VFX',
    motion: '🎭 Motion Design',
    portfolio: '💼 Portfolio',
    contact: '📞 Contact',
    language: '🌐 Language',
    back: '◀️ Back to Menu',
    order_thanks: `✅ <b>Thank you for your order!</b>

We received your message and will contact you within 2 hours.

💬 Questions? Write @mcrewdm`,
    new_order: `🔔 <b>NEW ORDER!</b>

👤 <b>Client:</b> {name} (@{username})

📝 <b>Message:</b>
{message}

⏰ <b>Time:</b> {time}`,
    order_logo: '🎯 Order Logo',
    order_brand: '🎯 Order Brand Identity',
    order_book: '🎯 Order Brandbook',
    order_icon: '🎯 Order Icon',
    order_illustration: '🎯 Order Illustration',
    order_landing: '🎯 Order Landing Page',
    order_website: '🎯 Order Website',
    order_mobile: '🎯 Order Mobile Screen',
    order_fullui: '🎯 Order Full Mobile UI',
    order_card: '🎯 Order Business Card',
    order_presentation: '🎯 Order Presentation',
    order_monthly: '🎯 Order Monthly Package',
    order_short: '🎯 Order Short Video Edit',
    order_medium: '🎯 Order Medium Video Edit',
    order_long: '🎯 Order Long Video Edit',
    order_ccsfx: '🎯 Order CC/SFX',
    order_logoanim: '🎯 Order Logo Animation',
    order_2danim: '🎯 Order 2D Animation',
    order_promo: '🎯 Order Promo Video',
    order_event: '🎯 Order Event Visuals',
    order_form: `🛒 <b>ORDER: {service_name}</b>

To create the perfect design, please provide:

📝 <b>PROJECT DETAILS:</b>
• What exactly do you need?
• Purpose/goal of the design

🎨 <b>STYLE & COLORS:</b>
• Preferred style (minimal, dark, colorful, etc.)
• Main colors you want
• Colors to avoid

📏 <b>REQUIREMENTS:</b>
• Format/size needed
• Where will it be used?
• Any text/brand name to include

⏰ <b>TIMELINE & BUDGET:</b>
• When do you need it?
• Your budget range
• Urgent? (+50% for ≤4 days)

📎 <b>REFERENCES:</b>
• Send inspiration images/links
• Any specific requirements

💡 <b>Write all details in your next message!</b>`,
  },
  ru: {
    welcome: `🔥 <b>Добро пожаловать в MↃREW!</b>

Мы создаем:
• Обложки, сниппеты, визуалы
• VFX и моушн графику
• Фирменный стиль и логотипы
• UI/UX дизайн
• Печатные материалы
• Видеомонтаж

<b>Выберите что вас интересует:</b>`,
    menu_title: `🔥 <b>MↃREW</b>

<b>Выберите что вас интересует:</b>`,
    graphic_design: '🎨 Графический дизайн',
    ui_design: '📱 UI/UX дизайн',
    print: '📄 Печать/Издательство', 
    vfx: '🎬 Монтаж и VFX',
    motion: '🎭 Моушн дизайн',
    portfolio: '💼 Портфолио',
    contact: '📞 Контакты',
    language: '🌐 Язык',
    back: '◀️ Назад в меню',
    order_thanks: `✅ <b>Спасибо за ваш заказ!</b>

Мы получили ваше сообщение и свяжемся с вами в течение 2 часов.

💬 Вопросы? Пишите @mcrewdm`,
    new_order: `🔔 <b>НОВЫЙ ЗАКАЗ!</b>

👤 <b>Клиент:</b> {name} (@{username})

📝 <b>Сообщение:</b>
{message}

⏰ <b>Время:</b> {time}`,
    order_logo: '🎯 Заказать логотип',
    order_brand: '🎯 Заказать фирменный стиль',
    order_book: '🎯 Заказать брендбук',
    order_icon: '🎯 Заказать иконку',
    order_illustration: '🎯 Заказать иллюстрацию',
    order_landing: '🎯 Заказать лендинг',
    order_website: '🎯 Заказать сайт',
    order_mobile: '🎯 Заказать экран приложения',
    order_fullui: '🎯 Заказать полный UI',
    order_card: '🎯 Заказать визитку',
    order_presentation: '🎯 Заказать презентацию',
    order_monthly: '🎯 Заказать месячный пакет',
    order_short: '🎯 Заказать короткий монтаж',
    order_medium: '🎯 Заказать средний монтаж',
    order_long: '🎯 Заказать длинный монтаж',
    order_ccsfx: '🎯 Заказать цветокор/звук',
    order_logoanim: '🎯 Заказать анимацию лого',
    order_2danim: '🎯 Заказать 2D анимацию',
    order_promo: '🎯 Заказать промо видео',
    order_event: '🎯 Заказать визуалы для событий',
    order_form: `🛒 <b>ЗАКАЗ: {service_name}</b>

Чтобы создать идеальный дизайн, укажите:

📝 <b>ДЕТАЛИ ПРОЕКТА:</b>
• Что именно вам нужно?
• Цель/назначение дизайна

🎨 <b>СТИЛЬ И ЦВЕТА:</b>
• Предпочитаемый стиль (минимализм, темный, яркий и т.д.)
• Основные цвета
• Цвета, которых следует избегать

📏 <b>ТРЕБОВАНИЯ:</b>
• Нужный формат/размер
• Где будет использоваться?
• Текст/название бренда для включения

⏰ <b>СРОКИ И БЮДЖЕТ:</b>
• Когда нужно готово?
• Ваш бюджет
• Срочно? (+50% за ≤4 дня)

📎 <b>РЕФЕРЕНСЫ:</b>
• Пришлите примеры/ссылки для вдохновения
• Особые требования

💡 <b>Напишите все детали в следующем сообщении!</b>`,
  }
}

// Helper functions
function getUserLanguage(userId) {
  return userLanguages.get(userId) || 'en'
}

function setUserLanguage(userId, lang) {
  userLanguages.set(userId, lang)
}

function getText(userId, key, params = {}) {
  const lang = getUserLanguage(userId)
  let text = TEXTS[lang]?.[key] || TEXTS.en[key] || key
  
  // Replace parameters
  Object.keys(params).forEach(k => {
    text = text.replace(`{${k}}`, params[k])
  })
  
  return text
}

// Telegram API functions
async function sendMessage(chatId, text, replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  }
  
  if (replyMarkup) {
    body.reply_markup = replyMarkup
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  
  return await response.json()
}

async function editMessageText(chatId, messageId, text, replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/editMessageText`
  const body = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'HTML'
  }
  
  if (replyMarkup) {
    body.reply_markup = replyMarkup
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  
  return await response.json()
}

async function answerCallbackQuery(callbackQueryId, token) {
  const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId })
  })
}

// Keyboard builders
function getMainMenuKeyboard(userId) {
  const lang = getUserLanguage(userId)
  return {
    inline_keyboard: [
      [{ text: TEXTS[lang].graphic_design, callback_data: 'cat_graphic' }],
      [{ text: TEXTS[lang].ui_design, callback_data: 'cat_ui' }],
      [{ text: TEXTS[lang].print, callback_data: 'cat_print' }],
      [{ text: TEXTS[lang].vfx, callback_data: 'cat_vfx' }],
      [{ text: TEXTS[lang].motion, callback_data: 'cat_motion' }],
      [{ text: TEXTS[lang].portfolio, callback_data: 'show_portfolio' }],
      [{ text: TEXTS[lang].contact, callback_data: 'show_contact' }],
      [{ text: TEXTS[lang].language, callback_data: 'show_language' }]
    ]
  }
}

// Category handlers
function handleGraphicDesign(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru' 
    ? `🎨 <b>ГРАФИЧЕСКИЙ ДИЗАЙН</b>

<b>Логотип</b> — €110-180
<b>Фирменный стиль</b> (логотип, цвета, типографика) — €270-550
<b>Полный брендбук</b> — €550-1100
<b>Иконка</b> (1 шт.) — €9-22
<b>Простая иллюстрация</b> (обложки и т.д.) — €45-90
<b>Детальная иллюстрация</b> (обложки и т.д.) — €110-230

<i>Выберите услугу для оформления заказа</i>`
    : `🎨 <b>GRAPHIC DESIGN</b>

<b>Logo</b> — €110-180
<b>Brand identity</b> (logo, colors, typography) — €270-550
<b>Full brandbook</b> — €550-1100
<b>Icon</b> (1 pc.) — €9-22
<b>Simple illustration</b> (cover art, etc.) — €45-90
<b>Detailed illustration</b> (cover art, etc.) — €110-230

<i>Choose a service to place an order</i>`

  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'order_logo'), callback_data: 'ord_logo' }],
      [{ text: getText(userId, 'order_brand'), callback_data: 'ord_brand' }],
      [{ text: getText(userId, 'order_book'), callback_data: 'ord_book' }],
      [{ text: getText(userId, 'order_icon'), callback_data: 'ord_icon' }],
      [{ text: getText(userId, 'order_illustration'), callback_data: 'ord_illust' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleUIDesign(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `📱 <b>UI/UX ДИЗАЙН</b>

<b>Лендинг</b> (1 страница) — €140-280
<b>Многостраничный сайт</b> (5-7 страниц) — €460-850

<b>Мобильное приложение</b> (1 экран) — €28-55
<b>Полный UI приложения</b> (10-15 экранов) — €370-850

<i>Выберите услугу для оформления заказа</i>`
    : `📱 <b>UI/UX DESIGN</b>

<b>Landing page</b> (1 page) — €140-280
<b>Multi-page website</b> (5-7 pages) — €460-850

<b>Mobile app</b> (single screen) — €28-55
<b>Mobile app full UI</b> (10-15 screens) — €370-850

<i>Choose a service to place an order</i>`
  
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'order_landing'), callback_data: 'ord_landing' }],
      [{ text: getText(userId, 'order_website'), callback_data: 'ord_website' }],
      [{ text: getText(userId, 'order_mobile'), callback_data: 'ord_mobile' }],
      [{ text: getText(userId, 'order_fullui'), callback_data: 'ord_fullui' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handlePrint(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `📄 <b>ПЕЧАТЬ / ИЗДАТЕЛЬСТВО</b>

<b>Визитка</b> — €13-22
<b>Презентация</b> (1 слайд) — €7-14
<b>Полная презентация</b> (10-20 слайдов) — €70-165
<b>Месячный пакет</b> (8-12 постов + сторис) — €130-195

<i>Выберите услугу для оформления заказа</i>`
    : `📄 <b>PRINT / PUBLISHING</b>

<b>Business card</b> — €13-22
<b>Presentation</b> (1 slide) — €7-14
<b>Full presentation</b> (10-20 slides) — €70-165
<b>Monthly package</b> (8-12 posts + stories) — €130-195

<i>Choose a service to place an order</i>`

  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'order_card'), callback_data: 'ord_card' }],
      [{ text: getText(userId, 'order_presentation'), callback_data: 'ord_present' }],
      [{ text: getText(userId, 'order_monthly'), callback_data: 'ord_monthly' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleVFX(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `🎬 <b>МОНТАЖ И VFX</b>

<b>Видеомонтаж</b> (до 1 мин) — €40-60
<b>Видеомонтаж</b> (до 5 мин) — €80-200
<b>Видеомонтаж</b> (5-15 мин) — €200-350
<b>Цветокоррекция / Звук</b> — €15-25

<i>Выберите услугу для оформления заказа</i>`
    : `🎬 <b>EDITING & VFX</b>

<b>Video editing</b> (up to 1 min) — €40-60
<b>Video editing</b> (up to 5 min) — €80-200
<b>Video editing</b> (5-15 min) — €200-350
<b>CC / SFX</b> — €15-25

<i>Choose a service to place an order</i>`
  
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'order_short'), callback_data: 'ord_short' }],
      [{ text: getText(userId, 'order_medium'), callback_data: 'ord_medium' }],
      [{ text: getText(userId, 'order_long'), callback_data: 'ord_long' }],
      [{ text: getText(userId, 'order_ccsfx'), callback_data: 'ord_ccsfx' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleMotion(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `🎭 <b>МОУШН ДИЗАЙН</b>

<b>Анимация логотипа</b> — €80
<b>Простая 2D анимация</b> (10-20 сек) — €70-80
<b>Рекламная анимация</b> (до 30 сек) — €100-150
<b>Визуалы для событий</b> — от €120

<i>Выберите услугу для оформления заказа</i>`
    : `🎭 <b>MOTION DESIGN</b>

<b>Logo animation</b> — €80
<b>Simple 2D animation</b> (10-20 sec) — €70-80
<b>Promo/advertising animation</b> (up to 30 sec) — €100-150
<b>Event screens/visuals</b> — from €120

<i>Choose a service to place an order</i>`

  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'order_logoanim'), callback_data: 'ord_logoanim' }],
      [{ text: getText(userId, 'order_2danim'), callback_data: 'ord_2danim' }],
      [{ text: getText(userId, 'order_promo'), callback_data: 'ord_promo' }],
      [{ text: getText(userId, 'order_event'), callback_data: 'ord_event' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handlePortfolio(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `💼 <b>ПОРТФОЛИО</b>

📸 <b>Канал:</b> @mindescrew

🔥 <b>Примеры наших работ:</b>
• Обложки альбомов и артворки
• Фирменные стили и логотипы
• UI/UX дизайн
• Моушн графика и VFX
• Контент для социальных сетей
• Печатные материалы

💡 Каждый проект уникален и создается под ваши потребности!

📞 Свяжитесь с нами, чтобы увидеть конкретные примеры для вашего типа проекта.`
    : `💼 <b>OUR PORTFOLIO</b>

📸 <b>Channel:</b> @mindescrew

🔥 <b>Recent work examples:</b>
• Album covers and artwork
• Brand identities and logos
• UI/UX designs
• Motion graphics and VFX
• Social media content
• Print materials

💡 Each project is unique and tailored to your needs!

📞 Contact us to see specific examples for your project type.`
  
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleContact(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `📞 <b>СВЯЗАТЬСЯ С НАМИ</b>

💬 <b>Телеграм:</b> @mcrewdm
🌐 <b>Портфолио:</b> @mindescrew

⏰ <b>Рабочие часы:</b> 
Пн-Пт: 10:00 - 20:00 (UTC+3)
Сб-Вс: 12:00 - 18:00 (UTC+3)

💰 <b>Способы оплаты:</b>
• PayPal • Bank transfer • Cryptocurrency

📋 <b>УСЛОВИЯ:</b>
• 2 бесплатные правки → далее €10 за правку
• Срочный заказ (≤ 4 дня) → +50% к цене
• Переделка существующей работы → +30-50% от базовой стоимости

💱 <b>Курсы валют:</b>
1€ = 100₽ / 50₴ | 1$ = 85₽ / 42₴`
    : `📞 <b>CONTACT US</b>

💬 <b>Telegram:</b> @mcrewdm
🌐 <b>Portfolio:</b> @mindescrew

⏰ <b>Working hours:</b>
Mon-Fri: 10:00 - 20:00 (UTC+3)
Sat-Sun: 12:00 - 18:00 (UTC+3)

💰 <b>Payment methods:</b>
• PayPal • Bank transfer • Cryptocurrency

📋 <b>TERMS:</b>
• 2 free revisions → afterward €10 per revision
• Urgent order (≤ 4 days) → +50% to the price
• Redesign of existing work → +30-50% of base cost

💱 <b>Exchange rates:</b>
1€ = 100₽ / 50₴ | 1$ = 85₽ / 42₴`

  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleLanguageMenu(userId) {
  const lang = getUserLanguage(userId)
  
  const text = lang === 'ru'
    ? `🌐 <b>Выбор языка</b>

Выберите предпочитаемый язык:`
    : `🌐 <b>Language Selection</b>

Choose your preferred language:`
  
  const keyboard = {
    inline_keyboard: [
      [{ text: '🇺🇸 English', callback_data: 'lang_en' }],
      [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
      [{ text: getText(userId, 'back'), callback_data: 'main_menu' }]
    ]
  }
  
  return { text, keyboard }
}

function handleOrder(userId, service) {
  const lang = getUserLanguage(userId)
  
  const serviceNames = {
    ord_logo: lang === 'en' ? 'Logo Design (€110-180)' : 'Логотип (€110-180)',
    ord_brand: lang === 'en' ? 'Brand Identity (€270-550)' : 'Фирменный стиль (€270-550)',
    ord_book: lang === 'en' ? 'Full Brandbook (€550-1100)' : 'Полный брендбук (€550-1100)',
    ord_icon: lang === 'en' ? 'Icon Design (€9-22)' : 'Дизайн иконки (€9-22)',
    ord_illust: lang === 'en' ? 'Illustration (€45-230)' : 'Иллюстрация (€45-230)',
    ord_landing: lang === 'en' ? 'Landing Page (€140-280)' : 'Лендинг (€140-280)',
    ord_website: lang === 'en' ? 'Website (€460-850)' : 'Сайт (€460-850)',
    ord_mobile: lang === 'en' ? 'Mobile Screen (€28-55)' : 'Экран приложения (€28-55)',
    ord_fullui: lang === 'en' ? 'Mobile App UI (€370-850)' : 'Полный UI приложения (€370-850)',
    ord_card: lang === 'en' ? 'Business Card (€13-22)' : 'Визитка (€13-22)',
    ord_present: lang === 'en' ? 'Presentation (€7-165)' : 'Презентация (€7-165)',
    ord_monthly: lang === 'en' ? 'Monthly Package (€130-195)' : 'Месячный пакет (€130-195)',
    ord_short: lang === 'en' ? 'Short Video Edit (€40-60)' : 'Короткий монтаж (€40-60)',
    ord_medium: lang === 'en' ? 'Medium Video Edit (€80-200)' : 'Средний монтаж (€80-200)',
    ord_long: lang === 'en' ? 'Long Video Edit (€200-350)' : 'Длинный монтаж (€200-350)',
    ord_ccsfx: lang === 'en' ? 'CC/SFX (€15-25)' : 'Цветокор/Звук (€15-25)',
    ord_logoanim: lang === 'en' ? 'Logo Animation (€80)' : 'Анимация логотипа (€80)',
    ord_2danim: lang === 'en' ? '2D Animation (€70-80)' : '2D Анимация (€70-80)',
    ord_promo: lang === 'en' ? 'Promo Video (€100-150)' : 'Промо видео (€100-150)',
    ord_event: lang === 'en' ? 'Event Visuals (from €120)' : 'Визуалы для событий (от €120)'
  }
  
  const serviceName = serviceNames[service] || 'Service'
  const text = getText(userId, 'order_form', { service_name: serviceName })
  
  // Map service to category for back button
  const categoryMap = {
    ord_logo: 'cat_graphic', ord_brand: 'cat_graphic', ord_book: 'cat_graphic',
    ord_icon: 'cat_graphic', ord_illust: 'cat_graphic',
    ord_landing: 'cat_ui', ord_website: 'cat_ui', ord_mobile: 'cat_ui', ord_fullui: 'cat_ui',
    ord_card: 'cat_print', ord_present: 'cat_print', ord_monthly: 'cat_print',
    ord_short: 'cat_vfx', ord_medium: 'cat_vfx', ord_long: 'cat_vfx', ord_ccsfx: 'cat_vfx',
    ord_logoanim: 'cat_motion', ord_2danim: 'cat_motion', ord_promo: 'cat_motion', ord_event: 'cat_motion'
  }
  
  const backCategory = categoryMap[service] || 'main_menu'
  
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, 'back'), callback_data: backCategory }]
    ]
  }
  
  return { text, keyboard }
}


// Main request handler
async function handleRequest(request, env) {
  // Check if environment variables are set
  if (!env || !env.BOT_TOKEN) {
    return new Response('❌ BOT_TOKEN not configured. Add it in Workers Settings → Variables', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }
  
  const BOT_TOKEN = env.BOT_TOKEN
  const ADMIN_CHAT_ID = env.ADMIN_CHAT_ID || null
  
  // Handle GET requests (health check)
  if (request.method === 'GET') {
    return new Response('🤖 MↃREW Bot is running on Cloudflare Workers!', { 
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }
  
  // Handle POST requests (Telegram updates)
  if (request.method === 'POST') {
    try {
      const update = await request.json()
      
      // Handle regular messages
      if (update.message) {
        const chatId = update.message.chat.id
        const userId = update.message.from.id
        const text = update.message.text || ''
        const user = update.message.from
        
        if (text === '/start') {
          // Set default language to English
          setUserLanguage(userId, 'en')
          
          const welcomeText = getText(userId, 'welcome')
          const keyboard = getMainMenuKeyboard(userId)
          
          await sendMessage(chatId, welcomeText, keyboard, BOT_TOKEN)
        } else if (text) {
          // Handle order text message
          const orderText = getText(userId, 'new_order', {
            name: user.first_name || 'Unknown',
            username: user.username || 'no_username',
            message: text,
            time: new Date().toISOString()
          })
          
          // Send to admin
          if (ADMIN_CHAT_ID) {
            await sendMessage(ADMIN_CHAT_ID, orderText, null, BOT_TOKEN)
          }
          
          // Reply to user
          const replyText = getText(userId, 'order_thanks')
          await sendMessage(chatId, replyText, null, BOT_TOKEN)
        }
      }
      
      // Handle callback queries (button clicks)
      else if (update.callback_query) {
        const query = update.callback_query
        const chatId = query.message.chat.id
        const messageId = query.message.message_id
        const userId = query.from.id
        const callbackData = query.data
        
        // Answer callback query immediately
        await answerCallbackQuery(query.id, BOT_TOKEN)
        
        let response
        
        // Route to appropriate handler
        switch (callbackData) {
          case 'cat_graphic':
            response = handleGraphicDesign(userId)
            break
          case 'cat_ui':
            response = handleUIDesign(userId)
            break
          case 'cat_print':
            response = handlePrint(userId)
            break
          case 'cat_vfx':
            response = handleVFX(userId)
            break
          case 'cat_motion':
            response = handleMotion(userId)
            break
          case 'show_portfolio':
            response = handlePortfolio(userId)
            break
          case 'show_contact':
            response = handleContact(userId)
            break
          case 'show_language':
            response = handleLanguageMenu(userId)
            break
          case 'lang_en':
            setUserLanguage(userId, 'en')
            response = { 
              text: getText(userId, 'menu_title'), 
              keyboard: getMainMenuKeyboard(userId) 
            }
            break
          case 'lang_ru':
            setUserLanguage(userId, 'ru')
            response = { 
              text: getText(userId, 'menu_title'), 
              keyboard: getMainMenuKeyboard(userId) 
            }
            break
          case 'main_menu':
            response = { 
              text: getText(userId, 'menu_title'), 
              keyboard: getMainMenuKeyboard(userId) 
            }
            break
          default:
            if (callbackData.startsWith('ord_')) {
              response = handleOrder(userId, callbackData)
            } else {
              response = { 
                text: getText(userId, 'menu_title'), 
                keyboard: getMainMenuKeyboard(userId) 
              }
            }
        }
        
        // Edit message with response
        if (response) {
          await editMessageText(chatId, messageId, response.text, response.keyboard, BOT_TOKEN)
        }
      }
      
      return new Response('OK', { status: 200 })
      
    } catch (error) {
      console.error('Error processing update:', error)
      console.error('Error stack:', error.stack)
      console.error('Error message:', error.message)
      
      // Return detailed error for debugging
      return new Response(JSON.stringify({
        error: error.message,
        stack: error.stack,
        update: 'Check logs for details'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
  
  return new Response('Method not allowed', { status: 405 })
}
