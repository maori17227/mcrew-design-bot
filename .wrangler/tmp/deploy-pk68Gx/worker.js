var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var ADMIN_USER_ID = 8017281019;
var worker_default = {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};
var userLanguages = /* @__PURE__ */ new Map();
var TEXTS = {
  en: {
    welcome: `\u{1F525} <b>Welcome to MCREW!</b>

We create:
\u2022 Covers, snippets, visuals
\u2022 VFX and motion graphics  
\u2022 Brand identity and logos
\u2022 UI/UX design
\u2022 Print materials
\u2022 Video editing

<b>Choose what interests you:</b>`,
    menu_title: `\u{1F525} <b>MCREW</b>

<b>Choose what interests you:</b>`,
    graphic_design: "\u{1F3A8} Graphic Design",
    ui_design: "\u{1F4F1} UI/UX Design",
    print: "\u{1F4C4} Print/Publishing",
    vfx: "\u{1F3AC} Editing & VFX",
    motion: "\u{1F3AD} Motion Design",
    portfolio: "\u{1F4BC} Portfolio",
    contact: "\u{1F4DE} Contact",
    language: "\u{1F310} Language",
    back: "\u25C0\uFE0F Back to Menu",
    order_thanks: `\u2705 <b>Thank you for your order!</b>

We received your message and will contact you within 2 hours.

\u{1F4AC} Questions? Write @mcrewdm`,
    new_order: `\u{1F514} <b>NEW ORDER!</b>

\u{1F464} <b>Client:</b> {name} (@{username})

\u{1F4DD} <b>Message:</b>
{message}

\u23F0 <b>Time:</b> {time}`,
    order_logo: "\u{1F3AF} Order Logo",
    order_brand: "\u{1F3AF} Order Brand Identity",
    order_book: "\u{1F3AF} Order Brandbook",
    order_icon: "\u{1F3AF} Order Icon",
    order_illustration: "\u{1F3AF} Order Illustration",
    order_landing: "\u{1F3AF} Order Landing Page",
    order_website: "\u{1F3AF} Order Website",
    order_mobile: "\u{1F3AF} Order Mobile Screen",
    order_fullui: "\u{1F3AF} Order Full Mobile UI",
    order_card: "\u{1F3AF} Order Business Card",
    order_presentation: "\u{1F3AF} Order Presentation",
    order_monthly: "\u{1F3AF} Order Monthly Package",
    order_short: "\u{1F3AF} Order Short Video Edit",
    order_medium: "\u{1F3AF} Order Medium Video Edit",
    order_long: "\u{1F3AF} Order Long Video Edit",
    order_ccsfx: "\u{1F3AF} Order CC/SFX",
    order_logoanim: "\u{1F3AF} Order Logo Animation",
    order_2danim: "\u{1F3AF} Order 2D Animation",
    order_promo: "\u{1F3AF} Order Promo Video",
    order_event: "\u{1F3AF} Order Event Visuals",
    order_form: `\u{1F6D2} <b>ORDER: {service_name}</b>

To create the perfect design, please provide:

\u{1F4DD} <b>PROJECT DETAILS:</b>
\u2022 What exactly do you need?
\u2022 Purpose/goal of the design

\u{1F3A8} <b>STYLE & COLORS:</b>
\u2022 Preferred style (minimal, dark, colorful, etc.)
\u2022 Main colors you want
\u2022 Colors to avoid

\u{1F4CF} <b>REQUIREMENTS:</b>
\u2022 Format/size needed
\u2022 Where will it be used?
\u2022 Any text/brand name to include

\u23F0 <b>TIMELINE & BUDGET:</b>
\u2022 When do you need it?
\u2022 Your budget range
\u2022 Urgent? (+50% for \u22644 days)

\u{1F4CE} <b>REFERENCES:</b>
\u2022 Send inspiration images/links
\u2022 Any specific requirements

\u{1F4A1} <b>Write all details in your next message!</b>`
  },
  ru: {
    welcome: `\u{1F525} <b>\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 MCREW!</b>

\u041C\u044B \u0441\u043E\u0437\u0434\u0430\u0435\u043C:
\u2022 \u041E\u0431\u043B\u043E\u0436\u043A\u0438, \u0441\u043D\u0438\u043F\u043F\u0435\u0442\u044B, \u0432\u0438\u0437\u0443\u0430\u043B\u044B
\u2022 VFX \u0438 \u043C\u043E\u0443\u0448\u043D \u0433\u0440\u0430\u0444\u0438\u043A\u0443
\u2022 \u0424\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0438 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u044B
\u2022 UI/UX \u0434\u0438\u0437\u0430\u0439\u043D
\u2022 \u041F\u0435\u0447\u0430\u0442\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B
\u2022 \u0412\u0438\u0434\u0435\u043E\u043C\u043E\u043D\u0442\u0430\u0436

<b>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0442\u043E \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442:</b>`,
    menu_title: `\u{1F525} <b>MCREW</b>

<b>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0442\u043E \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442:</b>`,
    graphic_design: "\u{1F3A8} \u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0434\u0438\u0437\u0430\u0439\u043D",
    ui_design: "\u{1F4F1} UI/UX \u0434\u0438\u0437\u0430\u0439\u043D",
    print: "\u{1F4C4} \u041F\u0435\u0447\u0430\u0442\u044C/\u0418\u0437\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E",
    vfx: "\u{1F3AC} \u041C\u043E\u043D\u0442\u0430\u0436 \u0438 VFX",
    motion: "\u{1F3AD} \u041C\u043E\u0443\u0448\u043D \u0434\u0438\u0437\u0430\u0439\u043D",
    portfolio: "\u{1F4BC} \u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E",
    contact: "\u{1F4DE} \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    language: "\u{1F310} \u042F\u0437\u044B\u043A",
    back: "\u25C0\uFE0F \u041D\u0430\u0437\u0430\u0434 \u0432 \u043C\u0435\u043D\u044E",
    order_thanks: `\u2705 <b>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437!</b>

\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432.

\u{1F4AC} \u0412\u043E\u043F\u0440\u043E\u0441\u044B? \u041F\u0438\u0448\u0438\u0442\u0435 @mcrewdm`,
    new_order: `\u{1F514} <b>\u041D\u041E\u0412\u042B\u0419 \u0417\u0410\u041A\u0410\u0417!</b>

\u{1F464} <b>\u041A\u043B\u0438\u0435\u043D\u0442:</b> {name} (@{username})

\u{1F4DD} <b>\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:</b>
{message}

\u23F0 <b>\u0412\u0440\u0435\u043C\u044F:</b> {time}`,
    order_logo: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u043E\u0433\u043E\u0442\u0438\u043F",
    order_brand: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C",
    order_book: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u0440\u0435\u043D\u0434\u0431\u0443\u043A",
    order_icon: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043A\u043E\u043D\u043A\u0443",
    order_illustration: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u044E",
    order_landing: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0435\u043D\u0434\u0438\u043D\u0433",
    order_website: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0430\u0439\u0442",
    order_mobile: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u044D\u043A\u0440\u0430\u043D \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
    order_fullui: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u044B\u0439 UI",
    order_card: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0438\u0437\u0438\u0442\u043A\u0443",
    order_presentation: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E",
    order_monthly: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442",
    order_short: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u043E\u043D\u0442\u0430\u0436",
    order_medium: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u043C\u043E\u043D\u0442\u0430\u0436",
    order_long: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u043C\u043E\u043D\u0442\u0430\u0436",
    order_ccsfx: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0446\u0432\u0435\u0442\u043E\u043A\u043E\u0440/\u0437\u0432\u0443\u043A",
    order_logoanim: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044E \u043B\u043E\u0433\u043E",
    order_2danim: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C 2D \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044E",
    order_promo: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u043C\u043E \u0432\u0438\u0434\u0435\u043E",
    order_event: "\u{1F3AF} \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0438\u0437\u0443\u0430\u043B\u044B \u0434\u043B\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u0439",
    order_form: `\u{1F6D2} <b>\u0417\u0410\u041A\u0410\u0417: {service_name}</b>

\u0427\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u0438\u0437\u0430\u0439\u043D, \u0443\u043A\u0430\u0436\u0438\u0442\u0435:

\u{1F4DD} <b>\u0414\u0415\u0422\u0410\u041B\u0418 \u041F\u0420\u041E\u0415\u041A\u0422\u0410:</b>
\u2022 \u0427\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E?
\u2022 \u0426\u0435\u043B\u044C/\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u0438\u0437\u0430\u0439\u043D\u0430

\u{1F3A8} <b>\u0421\u0422\u0418\u041B\u042C \u0418 \u0426\u0412\u0415\u0422\u0410:</b>
\u2022 \u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u0441\u0442\u0438\u043B\u044C (\u043C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0437\u043C, \u0442\u0435\u043C\u043D\u044B\u0439, \u044F\u0440\u043A\u0438\u0439 \u0438 \u0442.\u0434.)
\u2022 \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430
\u2022 \u0426\u0432\u0435\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C

\u{1F4CF} <b>\u0422\u0420\u0415\u0411\u041E\u0412\u0410\u041D\u0418\u042F:</b>
\u2022 \u041D\u0443\u0436\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442/\u0440\u0430\u0437\u043C\u0435\u0440
\u2022 \u0413\u0434\u0435 \u0431\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F?
\u2022 \u0422\u0435\u043A\u0441\u0442/\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0440\u0435\u043D\u0434\u0430 \u0434\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F

\u23F0 <b>\u0421\u0420\u041E\u041A\u0418 \u0418 \u0411\u042E\u0414\u0416\u0415\u0422:</b>
\u2022 \u041A\u043E\u0433\u0434\u0430 \u043D\u0443\u0436\u043D\u043E \u0433\u043E\u0442\u043E\u0432\u043E?
\u2022 \u0412\u0430\u0448 \u0431\u044E\u0434\u0436\u0435\u0442
\u2022 \u0421\u0440\u043E\u0447\u043D\u043E? (+50% \u0437\u0430 \u22644 \u0434\u043D\u044F)

\u{1F4CE} <b>\u0420\u0415\u0424\u0415\u0420\u0415\u041D\u0421\u042B:</b>
\u2022 \u041F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B/\u0441\u0441\u044B\u043B\u043A\u0438 \u0434\u043B\u044F \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u044F
\u2022 \u041E\u0441\u043E\u0431\u044B\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F

\u{1F4A1} <b>\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0441\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438!</b>`
  }
};
function getUserLanguage(userId) {
  return userLanguages.get(userId) || "en";
}
__name(getUserLanguage, "getUserLanguage");
function setUserLanguage(userId, lang) {
  userLanguages.set(userId, lang);
}
__name(setUserLanguage, "setUserLanguage");
function getText(userId, key, params = {}) {
  const lang = getUserLanguage(userId);
  let text = TEXTS[lang]?.[key] || TEXTS.en[key] || key;
  Object.keys(params).forEach((k) => {
    text = text.replace(`{${k}}`, params[k]);
  });
  return text;
}
__name(getText, "getText");
async function sendPhoto(chatId, photoUrl, caption = "", replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/sendPhoto`;
  const body = {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    parse_mode: "HTML"
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await response.json();
}
__name(sendPhoto, "sendPhoto");
async function sendVideo(chatId, videoUrl, caption = "", replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/sendVideo`;
  const body = {
    chat_id: chatId,
    video: videoUrl,
    caption,
    parse_mode: "HTML"
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await response.json();
}
__name(sendVideo, "sendVideo");
async function deleteMessage(chatId, messageId, token) {
  const url = `https://api.telegram.org/bot${token}/deleteMessage`;
  const body = {
    chat_id: chatId,
    message_id: messageId
  };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}
__name(deleteMessage, "deleteMessage");
async function editMessageMedia(chatId, messageId, photoFileId, caption, replyMarkup, token) {
  const url = `https://api.telegram.org/bot${token}/editMessageMedia`;
  const body = {
    chat_id: chatId,
    message_id: messageId,
    media: {
      type: "photo",
      media: photoFileId,
      caption,
      parse_mode: "HTML"
    }
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await response.json();
}
__name(editMessageMedia, "editMessageMedia");
async function sendMessage(chatId, text, replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = {
    chat_id: chatId,
    text,
    parse_mode: "HTML"
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await response.json();
}
__name(sendMessage, "sendMessage");
async function editMessageText(chatId, messageId, text, replyMarkup = null, token) {
  const url = `https://api.telegram.org/bot${token}/editMessageText`;
  const body = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML"
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await response.json();
}
__name(editMessageText, "editMessageText");
async function answerCallbackQuery(callbackQueryId, token) {
  const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId })
  });
}
__name(answerCallbackQuery, "answerCallbackQuery");
function getMainMenuKeyboard(userId) {
  const lang = getUserLanguage(userId);
  return {
    inline_keyboard: [
      [{ text: TEXTS[lang].graphic_design, callback_data: "cat_graphic" }],
      [{ text: TEXTS[lang].ui_design, callback_data: "cat_ui" }],
      [{ text: TEXTS[lang].print, callback_data: "cat_print" }],
      [{ text: TEXTS[lang].vfx, callback_data: "cat_vfx" }],
      [{ text: TEXTS[lang].motion, callback_data: "cat_motion" }],
      [{ text: TEXTS[lang].portfolio, callback_data: "show_portfolio" }],
      [{ text: TEXTS[lang].contact, callback_data: "show_contact" }],
      [{ text: TEXTS[lang].language, callback_data: "show_language" }]
    ]
  };
}
__name(getMainMenuKeyboard, "getMainMenuKeyboard");
function handleGraphicDesign(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F3A8} <b>\u0413\u0420\u0410\u0424\u0418\u0427\u0415\u0421\u041A\u0418\u0419 \u0414\u0418\u0417\u0410\u0419\u041D</b>

<b>\u041B\u043E\u0433\u043E\u0442\u0438\u043F</b> \u2014 \u20AC110-180
<b>\u0424\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C</b> (\u043B\u043E\u0433\u043E\u0442\u0438\u043F, \u0446\u0432\u0435\u0442\u0430, \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0430) \u2014 \u20AC270-550
<b>\u041F\u043E\u043B\u043D\u044B\u0439 \u0431\u0440\u0435\u043D\u0434\u0431\u0443\u043A</b> \u2014 \u20AC550-1100
<b>\u0418\u043A\u043E\u043D\u043A\u0430</b> (1 \u0448\u0442.) \u2014 \u20AC9-22
<b>\u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u044F</b> (\u043E\u0431\u043B\u043E\u0436\u043A\u0438 \u0438 \u0442.\u0434.) \u2014 \u20AC45-90
<b>\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u044F</b> (\u043E\u0431\u043B\u043E\u0436\u043A\u0438 \u0438 \u0442.\u0434.) \u2014 \u20AC110-230

<i>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430</i>` : `\u{1F3A8} <b>GRAPHIC DESIGN</b>

<b>Logo</b> \u2014 \u20AC110-180
<b>Brand identity</b> (logo, colors, typography) \u2014 \u20AC270-550
<b>Full brandbook</b> \u2014 \u20AC550-1100
<b>Icon</b> (1 pc.) \u2014 \u20AC9-22
<b>Simple illustration</b> (cover art, etc.) \u2014 \u20AC45-90
<b>Detailed illustration</b> (cover art, etc.) \u2014 \u20AC110-230

<i>Choose a service to place an order</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "order_logo"), callback_data: "ord_logo" }],
      [{ text: getText(userId, "order_brand"), callback_data: "ord_brand" }],
      [{ text: getText(userId, "order_book"), callback_data: "ord_book" }],
      [{ text: getText(userId, "order_icon"), callback_data: "ord_icon" }],
      [{ text: getText(userId, "order_illustration"), callback_data: "ord_illust" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handleGraphicDesign, "handleGraphicDesign");
function handleUIDesign(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F4F1} <b>UI/UX \u0414\u0418\u0417\u0410\u0419\u041D</b>

<b>\u041B\u0435\u043D\u0434\u0438\u043D\u0433</b> (1 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430) \u2014 \u20AC140-280
<b>\u041C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442</b> (5-7 \u0441\u0442\u0440\u0430\u043D\u0438\u0446) \u2014 \u20AC460-850

<b>\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435</b> (1 \u044D\u043A\u0440\u0430\u043D) \u2014 \u20AC28-55
<b>\u041F\u043E\u043B\u043D\u044B\u0439 UI \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F</b> (10-15 \u044D\u043A\u0440\u0430\u043D\u043E\u0432) \u2014 \u20AC370-850

<i>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430</i>` : `\u{1F4F1} <b>UI/UX DESIGN</b>

<b>Landing page</b> (1 page) \u2014 \u20AC140-280
<b>Multi-page website</b> (5-7 pages) \u2014 \u20AC460-850

<b>Mobile app</b> (single screen) \u2014 \u20AC28-55
<b>Mobile app full UI</b> (10-15 screens) \u2014 \u20AC370-850

<i>Choose a service to place an order</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "order_landing"), callback_data: "ord_landing" }],
      [{ text: getText(userId, "order_website"), callback_data: "ord_website" }],
      [{ text: getText(userId, "order_mobile"), callback_data: "ord_mobile" }],
      [{ text: getText(userId, "order_fullui"), callback_data: "ord_fullui" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handleUIDesign, "handleUIDesign");
function handlePrint(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F4C4} <b>\u041F\u0415\u0427\u0410\u0422\u042C / \u0418\u0417\u0414\u0410\u0422\u0415\u041B\u042C\u0421\u0422\u0412\u041E</b>

<b>\u0412\u0438\u0437\u0438\u0442\u043A\u0430</b> \u2014 \u20AC13-22
<b>\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F</b> (1 \u0441\u043B\u0430\u0439\u0434) \u2014 \u20AC7-14
<b>\u041F\u043E\u043B\u043D\u0430\u044F \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F</b> (10-20 \u0441\u043B\u0430\u0439\u0434\u043E\u0432) \u2014 \u20AC70-165
<b>\u041C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442</b> (8-12 \u043F\u043E\u0441\u0442\u043E\u0432 + \u0441\u0442\u043E\u0440\u0438\u0441) \u2014 \u20AC130-195

<i>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430</i>` : `\u{1F4C4} <b>PRINT / PUBLISHING</b>

<b>Business card</b> \u2014 \u20AC13-22
<b>Presentation</b> (1 slide) \u2014 \u20AC7-14
<b>Full presentation</b> (10-20 slides) \u2014 \u20AC70-165
<b>Monthly package</b> (8-12 posts + stories) \u2014 \u20AC130-195

<i>Choose a service to place an order</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "order_card"), callback_data: "ord_card" }],
      [{ text: getText(userId, "order_presentation"), callback_data: "ord_present" }],
      [{ text: getText(userId, "order_monthly"), callback_data: "ord_monthly" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handlePrint, "handlePrint");
function handleVFX(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F3AC} <b>\u041C\u041E\u041D\u0422\u0410\u0416 \u0418 VFX</b>

<b>\u0412\u0438\u0434\u0435\u043E\u043C\u043E\u043D\u0442\u0430\u0436</b> (\u0434\u043E 1 \u043C\u0438\u043D) \u2014 \u20AC40-60
<b>\u0412\u0438\u0434\u0435\u043E\u043C\u043E\u043D\u0442\u0430\u0436</b> (\u0434\u043E 5 \u043C\u0438\u043D) \u2014 \u20AC80-200
<b>\u0412\u0438\u0434\u0435\u043E\u043C\u043E\u043D\u0442\u0430\u0436</b> (5-15 \u043C\u0438\u043D) \u2014 \u20AC200-350
<b>\u0426\u0432\u0435\u0442\u043E\u043A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F / \u0417\u0432\u0443\u043A</b> \u2014 \u20AC15-25

<i>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430</i>` : `\u{1F3AC} <b>EDITING & VFX</b>

<b>Video editing</b> (up to 1 min) \u2014 \u20AC40-60
<b>Video editing</b> (up to 5 min) \u2014 \u20AC80-200
<b>Video editing</b> (5-15 min) \u2014 \u20AC200-350
<b>CC / SFX</b> \u2014 \u20AC15-25

<i>Choose a service to place an order</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "order_short"), callback_data: "ord_short" }],
      [{ text: getText(userId, "order_medium"), callback_data: "ord_medium" }],
      [{ text: getText(userId, "order_long"), callback_data: "ord_long" }],
      [{ text: getText(userId, "order_ccsfx"), callback_data: "ord_ccsfx" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handleVFX, "handleVFX");
function handleMotion(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F3AD} <b>\u041C\u041E\u0423\u0428\u041D \u0414\u0418\u0417\u0410\u0419\u041D</b>

<b>\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430</b> \u2014 \u20AC80
<b>\u041F\u0440\u043E\u0441\u0442\u0430\u044F 2D \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F</b> (10-20 \u0441\u0435\u043A) \u2014 \u20AC70-80
<b>\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u0430\u044F \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F</b> (\u0434\u043E 30 \u0441\u0435\u043A) \u2014 \u20AC100-150
<b>\u0412\u0438\u0437\u0443\u0430\u043B\u044B \u0434\u043B\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u0439</b> \u2014 \u043E\u0442 \u20AC120

<i>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430</i>` : `\u{1F3AD} <b>MOTION DESIGN</b>

<b>Logo animation</b> \u2014 \u20AC80
<b>Simple 2D animation</b> (10-20 sec) \u2014 \u20AC70-80
<b>Promo/advertising animation</b> (up to 30 sec) \u2014 \u20AC100-150
<b>Event screens/visuals</b> \u2014 from \u20AC120

<i>Choose a service to place an order</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "order_logoanim"), callback_data: "ord_logoanim" }],
      [{ text: getText(userId, "order_2danim"), callback_data: "ord_2danim" }],
      [{ text: getText(userId, "order_promo"), callback_data: "ord_promo" }],
      [{ text: getText(userId, "order_event"), callback_data: "ord_event" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handleMotion, "handleMotion");
function handlePortfolio(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F4BC} <b>\u041F\u041E\u0420\u0422\u0424\u041E\u041B\u0418\u041E</b>

\u{1F4F8} <b>\u041A\u0430\u043D\u0430\u043B:</b> @mindescrew

\u{1F525} <b>\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043D\u0430\u0448\u0438\u0445 \u0440\u0430\u0431\u043E\u0442:</b>
\u2022 \u041E\u0431\u043B\u043E\u0436\u043A\u0438 \u0430\u043B\u044C\u0431\u043E\u043C\u043E\u0432 \u0438 \u0430\u0440\u0442\u0432\u043E\u0440\u043A\u0438
\u2022 \u0424\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u0438\u043B\u0438 \u0438 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u044B
\u2022 UI/UX \u0434\u0438\u0437\u0430\u0439\u043D
\u2022 \u041C\u043E\u0443\u0448\u043D \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0438 VFX
\u2022 \u041A\u043E\u043D\u0442\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0439
\u2022 \u041F\u0435\u0447\u0430\u0442\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B

\u{1F4A1} \u041A\u0430\u0436\u0434\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u0443\u043D\u0438\u043A\u0430\u043B\u0435\u043D \u0438 \u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u0432\u0430\u0448\u0438 \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438!

\u{1F4DE} \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0442\u0438\u043F\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0430.` : `\u{1F4BC} <b>OUR PORTFOLIO</b>

\u{1F4F8} <b>Channel:</b> @mindescrew

\u{1F525} <b>Recent work examples:</b>
\u2022 Album covers and artwork
\u2022 Brand identities and logos
\u2022 UI/UX designs
\u2022 Motion graphics and VFX
\u2022 Social media content
\u2022 Print materials

\u{1F4A1} Each project is unique and tailored to your needs!

\u{1F4DE} Contact us to see specific examples for your project type.`;
  const keyboard = {
    inline_keyboard: [
      [{ text: lang === "ru" ? "\u{1F5BC}\uFE0F \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u044B" : "\u{1F5BC}\uFE0F View Examples", callback_data: "show_examples" }],
      [{ text: lang === "ru" ? "\u{1F4DE} \u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u043E\u0432" : "\u{1F4DE} Contact for More Examples", callback_data: "show_contact" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.logo };
}
__name(handlePortfolio, "handlePortfolio");
function handleContact(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F4DE} <b>\u0421\u0412\u042F\u0417\u0410\u0422\u042C\u0421\u042F \u0421 \u041D\u0410\u041C\u0418</b>

\u{1F4AC} <b>\u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C:</b> @mcrewdm
\u{1F310} <b>\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E:</b> @mindescrew

\u23F0 <b>\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B:</b> 
\u041F\u043D-\u041F\u0442: 10:00 - 20:00 (UTC+3)
\u0421\u0431-\u0412\u0441: 12:00 - 18:00 (UTC+3)

\u{1F4B0} <b>\u0421\u043F\u043E\u0441\u043E\u0431\u044B \u043E\u043F\u043B\u0430\u0442\u044B:</b>
\u2022 PayPal \u2022 Bank transfer \u2022 Cryptocurrency

\u{1F4CB} <b>\u0423\u0421\u041B\u041E\u0412\u0418\u042F:</b>
\u2022 2 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u043A\u0438 \u2192 \u0434\u0430\u043B\u0435\u0435 \u20AC10 \u0437\u0430 \u043F\u0440\u0430\u0432\u043A\u0443
\u2022 \u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437 (\u2264 4 \u0434\u043D\u044F) \u2192 +50% \u043A \u0446\u0435\u043D\u0435
\u2022 \u041F\u0435\u0440\u0435\u0434\u0435\u043B\u043A\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u044B \u2192 +30-50% \u043E\u0442 \u0431\u0430\u0437\u043E\u0432\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438

\u{1F4B1} <b>\u041A\u0443\u0440\u0441\u044B \u0432\u0430\u043B\u044E\u0442:</b>
1\u20AC = 100\u20BD / 50\u20B4 | 1$ = 85\u20BD / 42\u20B4` : `\u{1F4DE} <b>CONTACT US</b>

\u{1F4AC} <b>Telegram:</b> @mcrewdm
\u{1F310} <b>Portfolio:</b> @mindescrew

\u23F0 <b>Working hours:</b>
Mon-Fri: 10:00 - 20:00 (UTC+3)
Sat-Sun: 12:00 - 18:00 (UTC+3)

\u{1F4B0} <b>Payment methods:</b>
\u2022 PayPal \u2022 Bank transfer \u2022 Cryptocurrency

\u{1F4CB} <b>TERMS:</b>
\u2022 2 free revisions \u2192 afterward \u20AC10 per revision
\u2022 Urgent order (\u2264 4 days) \u2192 +50% to the price
\u2022 Redesign of existing work \u2192 +30-50% of base cost

\u{1F4B1} <b>Exchange rates:</b>
1\u20AC = 100\u20BD / 50\u20B4 | 1$ = 85\u20BD / 42\u20B4`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.logo };
}
__name(handleContact, "handleContact");
function handleLanguageMenu(userId) {
  const lang = getUserLanguage(userId);
  const text = lang === "ru" ? `\u{1F310} <b>\u0412\u044B\u0431\u043E\u0440 \u044F\u0437\u044B\u043A\u0430</b>

\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u044F\u0437\u044B\u043A:` : `\u{1F310} <b>Language Selection</b>

Choose your preferred language:`;
  const keyboard = {
    inline_keyboard: [
      [{ text: "\u{1F1FA}\u{1F1F8} English", callback_data: "lang_en" }],
      [{ text: "\u{1F1F7}\u{1F1FA} \u0420\u0443\u0441\u0441\u043A\u0438\u0439", callback_data: "lang_ru" }],
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.logo };
}
__name(handleLanguageMenu, "handleLanguageMenu");
function handleOrder(userId, service) {
  const lang = getUserLanguage(userId);
  const serviceNames = {
    ord_logo: lang === "en" ? "Logo Design (\u20AC110-180)" : "\u041B\u043E\u0433\u043E\u0442\u0438\u043F (\u20AC110-180)",
    ord_brand: lang === "en" ? "Brand Identity (\u20AC270-550)" : "\u0424\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C (\u20AC270-550)",
    ord_book: lang === "en" ? "Full Brandbook (\u20AC550-1100)" : "\u041F\u043E\u043B\u043D\u044B\u0439 \u0431\u0440\u0435\u043D\u0434\u0431\u0443\u043A (\u20AC550-1100)",
    ord_icon: lang === "en" ? "Icon Design (\u20AC9-22)" : "\u0414\u0438\u0437\u0430\u0439\u043D \u0438\u043A\u043E\u043D\u043A\u0438 (\u20AC9-22)",
    ord_illust: lang === "en" ? "Illustration (\u20AC45-230)" : "\u0418\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u044F (\u20AC45-230)",
    ord_landing: lang === "en" ? "Landing Page (\u20AC140-280)" : "\u041B\u0435\u043D\u0434\u0438\u043D\u0433 (\u20AC140-280)",
    ord_website: lang === "en" ? "Website (\u20AC460-850)" : "\u0421\u0430\u0439\u0442 (\u20AC460-850)",
    ord_mobile: lang === "en" ? "Mobile Screen (\u20AC28-55)" : "\u042D\u043A\u0440\u0430\u043D \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F (\u20AC28-55)",
    ord_fullui: lang === "en" ? "Mobile App UI (\u20AC370-850)" : "\u041F\u043E\u043B\u043D\u044B\u0439 UI \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F (\u20AC370-850)",
    ord_card: lang === "en" ? "Business Card (\u20AC13-22)" : "\u0412\u0438\u0437\u0438\u0442\u043A\u0430 (\u20AC13-22)",
    ord_present: lang === "en" ? "Presentation (\u20AC7-165)" : "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F (\u20AC7-165)",
    ord_monthly: lang === "en" ? "Monthly Package (\u20AC130-195)" : "\u041C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442 (\u20AC130-195)",
    ord_short: lang === "en" ? "Short Video Edit (\u20AC40-60)" : "\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u043E\u043D\u0442\u0430\u0436 (\u20AC40-60)",
    ord_medium: lang === "en" ? "Medium Video Edit (\u20AC80-200)" : "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u043C\u043E\u043D\u0442\u0430\u0436 (\u20AC80-200)",
    ord_long: lang === "en" ? "Long Video Edit (\u20AC200-350)" : "\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043C\u043E\u043D\u0442\u0430\u0436 (\u20AC200-350)",
    ord_ccsfx: lang === "en" ? "CC/SFX (\u20AC15-25)" : "\u0426\u0432\u0435\u0442\u043E\u043A\u043E\u0440/\u0417\u0432\u0443\u043A (\u20AC15-25)",
    ord_logoanim: lang === "en" ? "Logo Animation (\u20AC80)" : "\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430 (\u20AC80)",
    ord_2danim: lang === "en" ? "2D Animation (\u20AC70-80)" : "2D \u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F (\u20AC70-80)",
    ord_promo: lang === "en" ? "Promo Video (\u20AC100-150)" : "\u041F\u0440\u043E\u043C\u043E \u0432\u0438\u0434\u0435\u043E (\u20AC100-150)",
    ord_event: lang === "en" ? "Event Visuals (from \u20AC120)" : "\u0412\u0438\u0437\u0443\u0430\u043B\u044B \u0434\u043B\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u0439 (\u043E\u0442 \u20AC120)"
  };
  const serviceName = serviceNames[service] || "Service";
  const text = getText(userId, "order_form", { service_name: serviceName });
  const categoryMap = {
    ord_logo: "cat_graphic",
    ord_brand: "cat_graphic",
    ord_book: "cat_graphic",
    ord_icon: "cat_graphic",
    ord_illust: "cat_graphic",
    ord_landing: "cat_ui",
    ord_website: "cat_ui",
    ord_mobile: "cat_ui",
    ord_fullui: "cat_ui",
    ord_card: "cat_print",
    ord_present: "cat_print",
    ord_monthly: "cat_print",
    ord_short: "cat_vfx",
    ord_medium: "cat_vfx",
    ord_long: "cat_vfx",
    ord_ccsfx: "cat_vfx",
    ord_logoanim: "cat_motion",
    ord_2danim: "cat_motion",
    ord_promo: "cat_motion",
    ord_event: "cat_motion"
  };
  const backCategory = categoryMap[service] || "main_menu";
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "back"), callback_data: backCategory }]
    ]
  };
  return { text, keyboard, photo: MEDIA_FILE_IDS.pricelist };
}
__name(handleOrder, "handleOrder");
var MEDIA_FILE_IDS = {
  logo: "AgACAgIAAxkDAAN1aYO_kiHKSkVSM7Yy3avMyLIi0S8AAicWaxuDVhhIhD0t8uGw-P0BAAMCAAN4AAM4BA",
  pricelist: "AgACAgIAAxkDAAIBmGmF0cAwGwwPIQjBUL9gAxk1Lw6iAALfDmsbr9gxSKiiObd_5U_KAQADAgADeQADOAQ",
  covers: "AgACAgIAAxkDAAO8aYUIGz5J7UVpOauIT5KcvjXivGMAAvgTaxuz9ilIU2cMkhILjcMBAAMCAAN5AAM4BA",
  posters: "AgACAgIAAxkDAAO9aYUIHaym1b3ubLUGzPEFpytkyYkAAvkTaxuz9ilIhLgYx1Zmy7QBAAMCAAN5AAM4BA",
  video: "BAACAgIAAxkDAAIBTWmFy5jzcZDsBQXiHwrcWzwE1gABqgAC9ocAArP2MUgIFpUzdZd27TgE"
};
var PORTFOLIO_MEDIA = {
  covers: MEDIA_FILE_IDS.covers,
  posters: MEDIA_FILE_IDS.posters,
  video: MEDIA_FILE_IDS.video
};
async function handleShowExamples(chatId, userId, token) {
  const lang = getUserLanguage(userId);
  const coverCaption = lang === "ru" ? `\u{1F3A8} <b>\u041E\u0411\u041B\u041E\u0416\u041A\u0418 \u0418 \u0410\u0420\u0422\u0412\u041E\u0420\u041A\u0418</b>

<b>\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442:</b>
\u2022 \u041E\u0431\u043B\u043E\u0436\u043A\u0438 \u0430\u043B\u044C\u0431\u043E\u043C\u043E\u0432
\u2022 \u0421\u043D\u0438\u043F\u043F\u0435\u0442\u044B \u0434\u043B\u044F \u0442\u0440\u0435\u043A\u043E\u0432
\u2022 \u0412\u0438\u0437\u0443\u0430\u043B\u044B \u0434\u043B\u044F \u0440\u0435\u043B\u0438\u0437\u043E\u0432

<i>\u041A\u0430\u0436\u0434\u0430\u044F \u043E\u0431\u043B\u043E\u0436\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434 \u0432\u0430\u0448 \u0441\u0442\u0438\u043B\u044C</i>` : `\u{1F3A8} <b>COVERS & ARTWORK</b>

<b>Work examples:</b>
\u2022 Album covers
\u2022 Track snippets
\u2022 Release visuals

<i>Each cover is created individually for your style</i>`;
  await sendPhoto(chatId, PORTFOLIO_MEDIA.covers, coverCaption, null, token);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const posterCaption = lang === "ru" ? `\u{1F4C4} <b>\u041F\u041E\u0421\u0422\u0415\u0420\u042B \u0418 \u0410\u0424\u0418\u0428\u0418</b>

<b>\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442:</b>
\u2022 \u041A\u043E\u043D\u0446\u0435\u0440\u0442\u043D\u044B\u0435 \u0430\u0444\u0438\u0448\u0438
\u2022 \u041F\u0440\u043E\u043C\u043E \u043F\u043E\u0441\u0442\u0435\u0440\u044B
\u2022 \u0418\u0432\u0435\u043D\u0442 \u0434\u0438\u0437\u0430\u0439\u043D

<i>\u042F\u0440\u043A\u0438\u0435 \u0438 \u0437\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u044E\u0449\u0438\u0435\u0441\u044F \u0434\u0438\u0437\u0430\u0439\u043D\u044B</i>` : `\u{1F4C4} <b>POSTERS & FLYERS</b>

<b>Work examples:</b>
\u2022 Concert posters
\u2022 Promo materials
\u2022 Event design

<i>Bright and memorable designs</i>`;
  await sendPhoto(chatId, PORTFOLIO_MEDIA.posters, posterCaption, null, token);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const videoCaption = lang === "ru" ? `\u{1F3AC} <b>\u0412\u0418\u0414\u0415\u041E\u041C\u041E\u041D\u0422\u0410\u0416 \u0418 \u041C\u041E\u0423\u0428\u041D</b>

<b>\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442:</b>
\u2022 \u041C\u043E\u043D\u0442\u0430\u0436 \u0432\u0438\u0434\u0435\u043E
\u2022 \u041C\u043E\u0443\u0448\u043D \u0433\u0440\u0430\u0444\u0438\u043A\u0430
\u2022 VFX \u044D\u0444\u0444\u0435\u043A\u0442\u044B

<i>\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u043D\u044B\u0435 \u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u043E\u043B\u0438\u043A\u0438</i>` : `\u{1F3AC} <b>VIDEO EDITING & MOTION</b>

<b>Work examples:</b>
\u2022 Video editing
\u2022 Motion graphics
\u2022 VFX effects

<i>Dynamic and professional videos</i>`;
  await sendVideo(chatId, PORTFOLIO_MEDIA.video, videoCaption, null, token);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const finalText = lang === "ru" ? `\u2728 <b>\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0442\u043E, \u0447\u0442\u043E \u0432\u0438\u0434\u0438\u0442\u0435?</b>

\u{1F4F8} <b>\u041F\u043E\u043B\u043D\u043E\u0435 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E:</b> @mindescrew
\u{1F4AC} <b>\u0413\u043E\u0442\u043E\u0432\u044B \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C?</b> \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438!

<i>\u041A\u0430\u0436\u0434\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u0443\u043D\u0438\u043A\u0430\u043B\u0435\u043D \u0438 \u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u0432\u0430\u0448\u0438 \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438</i>` : `\u2728 <b>Like what you see?</b>

\u{1F4F8} <b>Full portfolio:</b> @mindescrew
\u{1F4AC} <b>Ready to order?</b> Contact us!

<i>Each project is unique and tailored to your needs</i>`;
  const keyboard = {
    inline_keyboard: [
      [{ text: getText(userId, "back"), callback_data: "main_menu" }]
    ]
  };
  await sendMessage(chatId, finalText, keyboard, token);
}
__name(handleShowExamples, "handleShowExamples");
async function handleAdminAPI(request, env, url) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-ID"
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const userId = request.headers.get("X-User-ID");
  if (!userId || parseInt(userId) !== ADMIN_USER_ID) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
  const path = url.pathname;
  try {
    if (path === "/api/portfolio" && request.method === "GET") {
      const category = url.searchParams.get("category");
      if (!category) {
        return new Response(JSON.stringify({ error: "Category required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const key = `portfolio_${category}`;
      const data = await env.PORTFOLIO_KV.get(key, "json");
      return new Response(JSON.stringify({ items: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (path === "/api/portfolio" && request.method === "POST") {
      const body = await request.json();
      const { category, item } = body;
      if (!category || !item) {
        return new Response(JSON.stringify({ error: "Category and item required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const key = `portfolio_${category}`;
      const data = await env.PORTFOLIO_KV.get(key, "json") || [];
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      data.push(newItem);
      await env.PORTFOLIO_KV.put(key, JSON.stringify(data));
      return new Response(JSON.stringify({ success: true, item: newItem }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (path === "/api/portfolio" && request.method === "DELETE") {
      const category = url.searchParams.get("category");
      const itemId = url.searchParams.get("id");
      if (!category || !itemId) {
        return new Response(JSON.stringify({ error: "Category and ID required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const key = `portfolio_${category}`;
      const data = await env.PORTFOLIO_KV.get(key, "json") || [];
      const filtered = data.filter((item) => item.id !== itemId);
      await env.PORTFOLIO_KV.put(key, JSON.stringify(filtered));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
__name(handleAdminAPI, "handleAdminAPI");
async function handleRequest(request, env) {
  if (!env || !env.BOT_TOKEN) {
    return new Response("\u274C BOT_TOKEN not configured. Add it in Workers Settings \u2192 Variables", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  const BOT_TOKEN = env.BOT_TOKEN;
  const ADMIN_CHAT_ID = env.ADMIN_CHAT_ID || null;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) {
    return handleAdminAPI(request, env, url);
  }
  if (request.method === "GET") {
    return new Response("\u{1F916} MCREW Bot is running on Cloudflare Workers!", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  if (request.method === "POST") {
    try {
      const update = await request.json();
      if (update.message) {
        const chatId = update.message.chat.id;
        const userId = update.message.from.id;
        const text = update.message.text || "";
        const user = update.message.from;
        if (text === "/start") {
          setUserLanguage(userId, "en");
          const welcomeText = getText(userId, "welcome");
          const keyboard = getMainMenuKeyboard(userId);
          await sendPhoto(chatId, MEDIA_FILE_IDS.logo, welcomeText, keyboard, BOT_TOKEN);
        } else if (text) {
          const orderText = getText(userId, "new_order", {
            name: user.first_name || "Unknown",
            username: user.username || "no_username",
            message: text,
            time: (/* @__PURE__ */ new Date()).toISOString()
          });
          if (ADMIN_CHAT_ID) {
            await sendMessage(ADMIN_CHAT_ID, orderText, null, BOT_TOKEN);
          }
          const replyText = getText(userId, "order_thanks");
          await sendMessage(chatId, replyText, null, BOT_TOKEN);
        }
      } else if (update.callback_query) {
        const query = update.callback_query;
        const chatId = query.message.chat.id;
        const messageId = query.message.message_id;
        const userId = query.from.id;
        const callbackData = query.data;
        await answerCallbackQuery(query.id, BOT_TOKEN);
        let response;
        switch (callbackData) {
          case "cat_graphic":
            response = handleGraphicDesign(userId);
            break;
          case "cat_ui":
            response = handleUIDesign(userId);
            break;
          case "cat_print":
            response = handlePrint(userId);
            break;
          case "cat_vfx":
            response = handleVFX(userId);
            break;
          case "cat_motion":
            response = handleMotion(userId);
            break;
          case "show_portfolio":
            response = handlePortfolio(userId);
            break;
          case "show_examples":
            await deleteMessage(chatId, messageId, BOT_TOKEN);
            await handleShowExamples(chatId, userId, BOT_TOKEN);
            response = null;
            break;
          case "show_contact":
            response = handleContact(userId);
            break;
          case "show_language":
            response = handleLanguageMenu(userId);
            break;
          case "lang_en":
            setUserLanguage(userId, "en");
            response = {
              text: getText(userId, "menu_title"),
              keyboard: getMainMenuKeyboard(userId),
              photo: MEDIA_FILE_IDS.logo
            };
            break;
          case "lang_ru":
            setUserLanguage(userId, "ru");
            response = {
              text: getText(userId, "menu_title"),
              keyboard: getMainMenuKeyboard(userId),
              photo: MEDIA_FILE_IDS.logo
            };
            break;
          case "main_menu":
            response = {
              text: getText(userId, "menu_title"),
              keyboard: getMainMenuKeyboard(userId),
              photo: MEDIA_FILE_IDS.logo
            };
            break;
          default:
            if (callbackData.startsWith("ord_")) {
              response = handleOrder(userId, callbackData);
            } else {
              response = {
                text: getText(userId, "menu_title"),
                keyboard: getMainMenuKeyboard(userId),
                photo: MEDIA_FILE_IDS.logo
              };
            }
        }
        if (response) {
          if (response.photo) {
            await editMessageMedia(chatId, messageId, response.photo, response.text, response.keyboard, BOT_TOKEN);
          } else {
            await editMessageText(chatId, messageId, response.text, response.keyboard, BOT_TOKEN);
          }
        }
      } else if (update.message && update.message.web_app_data) {
        const chatId = update.message.chat.id;
        const userId = update.message.from.id;
        const user = update.message.from;
        const webAppData = JSON.parse(update.message.web_app_data.data);
        const orderText = `\u{1F514} <b>NEW ORDER from Mini App!</b>

\u{1F464} <b>Client:</b> ${user.first_name || "Unknown"} ${user.last_name || ""} (@${user.username || "no_username"})
\u{1F194} <b>User ID:</b> ${userId}

\u{1F4CB} <b>Service:</b> ${webAppData.service}

\u{1F4DD} <b>Details:</b>
${webAppData.details}

\u{1F3A8} <b>Style & Colors:</b>
${webAppData.style || "Not specified"}

\u{1F4D0} <b>Requirements:</b>
${webAppData.requirements || "Not specified"}

\u23F0 <b>Deadline & Budget:</b>
${webAppData.deadlineBudget}

\u{1F517} <b>References:</b>
${webAppData.references || "Not specified"}

\u{1F4DE} <b>Contact:</b> ${webAppData.contact}

\u23F1 <b>Time:</b> ${(/* @__PURE__ */ new Date()).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;
        if (ADMIN_CHAT_ID) {
          await sendMessage(ADMIN_CHAT_ID, orderText, null, BOT_TOKEN);
        }
        const lang = getUserLanguage(userId);
        const replyText = lang === "ru" ? "\u2705 <b>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437!</b>\n\n\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432.\n\n\u{1F4AC} \u0412\u043E\u043F\u0440\u043E\u0441\u044B? \u041F\u0438\u0448\u0438\u0442\u0435 @mcrewdm" : "\u2705 <b>Thank you for your order!</b>\n\nWe received your message and will contact you within 2 hours.\n\n\u{1F4AC} Questions? Write @mcrewdm";
        await sendMessage(chatId, replyText, null, BOT_TOKEN);
      }
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Error processing update:", error);
      console.error("Error stack:", error.stack);
      console.error("Error message:", error.message);
      return new Response(JSON.stringify({
        error: error.message,
        stack: error.stack,
        update: "Check logs for details"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  return new Response("Method not allowed", { status: 405 });
}
__name(handleRequest, "handleRequest");
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
