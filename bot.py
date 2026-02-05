"""
MↃREW Bot - FINAL WORKING VERSION
✅ All buttons work perfectly
✅ Fast navigation 
✅ Images display correctly
✅ Portfolio integration
✅ Commercial ready
"""

import json
import requests
import time
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration from environment variables
BOT_TOKEN = os.getenv('BOT_TOKEN', "8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M")
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', "mcrewdm")
YOUR_USERNAME = os.getenv('YOUR_USERNAME', "mcrewdm")
PORTFOLIO_CHANNEL = os.getenv('PORTFOLIO_CHANNEL', "@mindescrew")
PORT = int(os.getenv('PORT', 10000))  # Render uses PORT environment variable

BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"
ADMIN_CHAT_ID = None  # Будет определен автоматически

# Language system
user_languages = {}  # Хранение языка для каждого пользователя

# Texts in different languages
TEXTS = {
    'en': {
        'welcome': """🔥 <b>Welcome to MↃREW!</b>

We create:
• Covers, snippets, visuals
• VFX and motion graphics  
• Brand identity and logos
• UI/UX design
• Print materials
• Video editing

<b>Choose what interests you:</b>""",
        'admin_welcome': """👋 <b>Welcome back, Admin!</b>

🔧 <b>Admin Panel Activated:</b>
✅ Order notifications enabled
✅ Error reports active  
✅ Full bot monitoring ON
✅ Chat ID saved: {chat_id}

🎯 <b>Bot Status:</b> READY FOR ORDERS!

{welcome_text}""",
        'test_notification': """🧪 <b>TEST NOTIFICATION</b>

✅ Admin setup complete!
✅ Order notifications will now work correctly
✅ All future orders will be delivered here

🚀 Bot is ready for commercial use!""",
        'menu_title': """🔥 <b>MↃREW</b>

<b>Choose what interests you:</b>""",
        'graphic_design': '🎨 Graphic Design',
        'ui_design': '📱 UI/UX Design', 
        'print': '📄 Print/Publishing',
        'vfx': '🎬 Editing & VFX',
        'motion': '🎭 Motion Design',
        'portfolio': '💼 Portfolio',
        'contact': '📞 Contact',
        'language': '🌐 Language',
        'back': '◀️ Back to Menu',
        'order_thanks': """✅ <b>Thank you for your order!</b>

We received your message and will contact you within 2 hours.

💬 Questions? Write @{username}""",
        'new_order': """🔔 <b>NEW ORDER!</b>

👤 <b>Client:</b> {name} (@{username})

📝 <b>Message:</b>
{message}

⏰ <b>Time:</b> {time}""",
        # Order buttons
        'order_logo': '🎯 Order Logo',
        'order_brand': '🎯 Order Brand Identity',
        'order_book': '🎯 Order Brandbook',
        'order_icon': '🎯 Order Icon',
        'order_illustration': '🎯 Order Illustration',
        'order_landing': '🎯 Order Landing Page',
        'order_website': '🎯 Order Website',
        'order_mobile': '🎯 Order Mobile Screen',
        'order_fullui': '🎯 Order Full Mobile UI',
        'order_card': '🎯 Order Business Card',
        'order_presentation': '🎯 Order Presentation',
        'order_monthly': '🎯 Order Monthly Package',
        'order_short': '🎯 Order Short Video Edit',
        'order_medium': '🎯 Order Medium Video Edit',
        'order_long': '🎯 Order Long Video Edit',
        'order_ccsfx': '🎯 Order CC/SFX',
        'order_logoanim': '🎯 Order Logo Animation',
        'order_2danim': '🎯 Order 2D Animation',
        'order_promo': '🎯 Order Promo Video',
        'order_event': '🎯 Order Event Visuals',
        # Order form
        'order_form': """🛒 <b>ORDER: {service_name}</b>

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

💡 <b>Write all details in your next message!</b>""",
        # Portfolio texts
        'portfolio_title': '💼 OUR PORTFOLIO',
        'portfolio_channel': 'Channel:',
        'portfolio_examples': 'Recent work examples:',
        'portfolio_covers': '• Album covers and artwork',
        'portfolio_brands': '• Brand identities and logos',
        'portfolio_ui': '• UI/UX designs',
        'portfolio_motion': '• Motion graphics and VFX',
        'portfolio_social': '• Social media content',
        'portfolio_print': '• Print materials',
        'portfolio_unique': 'Each project is unique and tailored to your needs!',
        'portfolio_contact_us': 'Contact us to see specific examples for your project type.',
        'view_examples': '🖼️ View Examples',
        'contact_for_more': '📞 Contact for More Examples',
        # Contact texts
        'contact_title': '📞 CONTACT US',
        'contact_telegram': 'Telegram:',
        'contact_portfolio': 'Portfolio:',
        'contact_hours': 'Working hours:',
        'contact_mon_fri': 'Mon-Fri: 10:00 - 20:00 (UTC+3)',
        'contact_sat_sun': 'Sat-Sun: 12:00 - 18:00 (UTC+3)',
        'contact_payment': 'Payment methods:',
        'contact_terms': 'TERMS:',
        'contact_revisions': '• 2 free revisions → afterward €10 per revision',
        'contact_urgent': '• Urgent order (≤ 4 days) → +50% to the price',
        'contact_redesign': '• Redesign of existing work → +30-50% of base cost',
        'contact_rates': 'Exchange rates:',
        # Portfolio examples texts
        'examples_work': 'Our Work Examples',
        'examples_logo': 'Logo Design & Brand Identity',
        'examples_ui': 'UI/UX Design & Mobile Apps',
        'examples_video': 'Video Editing & Motion Graphics',
        'examples_more': 'More examples:',
        'examples_like': 'Like what you see?',
        'examples_full': 'Full portfolio: @mindescrew',
        'examples_ready': 'Ready to order? Contact us!',
        'place_order': '🛒 Place Order',
        'contact_us': '📞 Contact Us'
    },
    'ru': {
        'welcome': """🔥 <b>Добро пожаловать в MↃREW!</b>

Мы создаем:
• Обложки, сниппеты, визуалы
• VFX и моушн графику
• Фирменный стиль и логотипы
• UI/UX дизайн
• Печатные материалы
• Видеомонтаж

<b>Выберите что вас интересует:</b>""",
        'admin_welcome': """👋 <b>С возвращением, Админ!</b>

🔧 <b>Панель администратора активирована:</b>
✅ Уведомления о заказах включены
✅ Отчеты об ошибках активны
✅ Полный мониторинг бота ВКЛЮЧЕН
✅ Chat ID сохранен: {chat_id}

🎯 <b>Статус бота:</b> ГОТОВ К ЗАКАЗАМ!

{welcome_text}""",
        'test_notification': """🧪 <b>ТЕСТОВОЕ УВЕДОМЛЕНИЕ</b>

✅ Настройка админа завершена!
✅ Уведомления о заказах теперь работают корректно
✅ Все будущие заказы будут доставляться сюда

🚀 Бот готов к коммерческому использованию!""",
        'menu_title': """🔥 <b>MↃREW</b>

<b>Выберите что вас интересует:</b>""",
        'graphic_design': '🎨 Графический дизайн',
        'ui_design': '📱 UI/UX дизайн',
        'print': '📄 Печать/Издательство', 
        'vfx': '🎬 Монтаж и VFX',
        'motion': '🎭 Моушн дизайн',
        'portfolio': '💼 Портфолио',
        'contact': '📞 Контакты',
        'language': '🌐 Язык',
        'back': '◀️ Назад в меню',
        'order_thanks': """✅ <b>Спасибо за ваш заказ!</b>

Мы получили ваше сообщение и свяжемся с вами в течение 2 часов.

💬 Вопросы? Пишите @{username}""",
        'new_order': """🔔 <b>НОВЫЙ ЗАКАЗ!</b>

👤 <b>Клиент:</b> {name} (@{username})

📝 <b>Сообщение:</b>
{message}

⏰ <b>Время:</b> {time}""",
        # Order buttons in Russian
        'order_logo': '🎯 Заказать логотип',
        'order_brand': '🎯 Заказать фирменный стиль',
        'order_book': '🎯 Заказать брендбук',
        'order_icon': '🎯 Заказать иконку',
        'order_illustration': '🎯 Заказать иллюстрацию',
        'order_landing': '🎯 Заказать лендинг',
        'order_website': '🎯 Заказать сайт',
        'order_mobile': '🎯 Заказать экран приложения',
        'order_fullui': '🎯 Заказать полный UI',
        'order_card': '🎯 Заказать визитку',
        'order_presentation': '🎯 Заказать презентацию',
        'order_monthly': '🎯 Заказать месячный пакет',
        'order_short': '🎯 Заказать короткий монтаж',
        'order_medium': '🎯 Заказать средний монтаж',
        'order_long': '🎯 Заказать длинный монтаж',
        'order_ccsfx': '🎯 Заказать цветокор/звук',
        'order_logoanim': '🎯 Заказать анимацию лого',
        'order_2danim': '🎯 Заказать 2D анимацию',
        'order_promo': '🎯 Заказать промо видео',
        'order_event': '🎯 Заказать визуалы для событий',
        # Order form in Russian
        'order_form': """🛒 <b>ЗАКАЗ: {service_name}</b>

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

💡 <b>Напишите все детали в следующем сообщении!</b>""",
        # Portfolio texts
        'portfolio_title': '💼 ПОРТФОЛИО',
        'portfolio_channel': 'Канал:',
        'portfolio_examples': 'Примеры наших работ:',
        'portfolio_covers': '• Обложки альбомов и артворки',
        'portfolio_brands': '• Фирменные стили и логотипы',
        'portfolio_ui': '• UI/UX дизайн',
        'portfolio_motion': '• Моушн графика и VFX',
        'portfolio_social': '• Контент для социальных сетей',
        'portfolio_print': '• Печатные материалы',
        'portfolio_unique': 'Каждый проект уникален и создается под ваши потребности!',
        'portfolio_contact_us': 'Свяжитесь с нами, чтобы увидеть конкретные примеры для вашего типа проекта.',
        'view_examples': '🖼️ Посмотреть примеры',
        'contact_for_more': '📞 Связаться для больше примеров',
        # Contact texts
        'contact_title': '📞 СВЯЗАТЬСЯ С НАМИ',
        'contact_telegram': 'Телеграм:',
        'contact_portfolio': 'Портфолио:',
        'contact_hours': 'Рабочие часы:',
        'contact_mon_fri': 'Пн-Пт: 10:00 - 20:00 (UTC+3)',
        'contact_sat_sun': 'Сб-Вс: 12:00 - 18:00 (UTC+3)',
        'contact_payment': 'Способы оплаты:',
        'contact_terms': 'УСЛОВИЯ:',
        'contact_revisions': '• 2 бесплатные правки → далее €10 за правку',
        'contact_urgent': '• Срочный заказ (≤ 4 дня) → +50% к цене',
        'contact_redesign': '• Переделка существующей работы → +30-50% от базовой стоимости',
        'contact_rates': 'Курсы валют:',
        # Portfolio examples texts in Russian
        'examples_work': 'Примеры наших работ',
        'examples_logo': 'Дизайн логотипов и фирменный стиль',
        'examples_ui': 'UI/UX дизайн и мобильные приложения',
        'examples_video': 'Видеомонтаж и моушн графика',
        'examples_more': 'Больше примеров:',
        'examples_like': 'Нравится то, что видите?',
        'examples_full': 'Полное портфолио: @mindescrew',
        'examples_ready': 'Готовы заказать? Свяжитесь с нами!',
        'place_order': '🛒 Сделать заказ',
        'contact_us': '📞 Связаться с нами'
    }
}

# Media paths (images and videos)
IMAGES = {
    'main_photo': 'images/mcrew_logo.jpg',
    'welcome': 'images/welcome.jpg',
    'logo': 'images/mcrew_logo.jpg',
    'graphic_design': 'images/graphic_design_example.jpg',
    'ui_ux': 'images/ui_ux_example.jpg',
    'print': 'images/print_example.jpg',
    'vfx': 'images/vfx_example.jpg',
    'motion': 'images/motion_graphics_example.jpg'
}

# Portfolio examples - photos and videos
PORTFOLIO_EXAMPLES = [
    # Photos
    {'type': 'photo', 'path': 'images/covers_example.jpg'},
    {'type': 'photo', 'path': 'images/poster_example.jpg'},
    
    # Videos
    {'type': 'video', 'path': 'videos/motion_example.mp4'},
]

def send_photo(chat_id, photo_path, caption="", reply_markup=None):
    """Send photo with error handling"""
    url = f"{BASE_URL}/sendPhoto"
    
    try:
        if os.path.exists(photo_path):
            with open(photo_path, 'rb') as photo:
                files = {'photo': photo}
                data = {
                    'chat_id': chat_id,
                    'caption': caption,
                    'parse_mode': 'HTML'
                }
                if reply_markup:
                    data['reply_markup'] = json.dumps(reply_markup)
                
                response = requests.post(url, files=files, data=data, timeout=15)
                return response.json()
        else:
            # Fallback to text message if image not found
            return send_message(chat_id, caption, reply_markup)
    except Exception as e:
        print(f"Error sending photo: {e}")
        # Fallback to text message
        return send_message(chat_id, caption, reply_markup)

def send_video(chat_id, video_path, caption="", reply_markup=None):
    """Send video with error handling"""
    url = f"{BASE_URL}/sendVideo"
    
    try:
        if os.path.exists(video_path):
            with open(video_path, 'rb') as video:
                files = {'video': video}
                data = {
                    'chat_id': chat_id,
                    'caption': caption,
                    'parse_mode': 'HTML'
                }
                if reply_markup:
                    data['reply_markup'] = json.dumps(reply_markup)
                
                response = requests.post(url, files=files, data=data, timeout=60)
                return response.json()
        else:
            return send_message(chat_id, caption, reply_markup)
    except Exception as e:
        print(f"Error sending video: {e}")
        return send_message(chat_id, caption, reply_markup)

def send_message(chat_id, text, reply_markup=None):
    """Send message with error handling"""
    url = f"{BASE_URL}/sendMessage"
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    if reply_markup:
        data['reply_markup'] = json.dumps(reply_markup)
    
    try:
        response = requests.post(url, data=data, timeout=10)
        result = response.json()
        if not result.get('ok'):
            print(f"Send message error: {result}")
        return result
    except Exception as e:
        print(f"Error sending message: {e}")
        return {'ok': False}

def edit_message_with_photo(chat_id, message_id, photo_path, caption="", reply_markup=None):
    """Edit message media (photo) with error handling"""
    url = f"{BASE_URL}/editMessageMedia"
    
    try:
        if os.path.exists(photo_path):
            with open(photo_path, 'rb') as photo:
                files = {'media': photo}
                
                media_data = {
                    'type': 'photo',
                    'media': 'attach://media',
                    'caption': caption,
                    'parse_mode': 'HTML'
                }
                
                data = {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'media': json.dumps(media_data)
                }
                
                if reply_markup:
                    data['reply_markup'] = json.dumps(reply_markup)
                
                response = requests.post(url, files=files, data=data, timeout=15)
                result = response.json()
                
                if result.get('ok'):
                    return result
                else:
                    print(f"Edit media error: {result}")
                    # Fallback to caption edit only
                    return edit_message(chat_id, message_id, caption, reply_markup)
        else:
            # Fallback to text edit if image not found
            return edit_message(chat_id, message_id, caption, reply_markup)
            
    except Exception as e:
        print(f"Error editing message media: {e}")
        # Fallback to text edit
        return edit_message(chat_id, message_id, caption, reply_markup)
def edit_message(chat_id, message_id, text, reply_markup=None):
    """Edit message with error handling"""
    url = f"{BASE_URL}/editMessageText"
    data = {
        'chat_id': chat_id,
        'message_id': message_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    if reply_markup:
        data['reply_markup'] = json.dumps(reply_markup)
    
    try:
        response = requests.post(url, data=data, timeout=10)
        result = response.json()
        if not result.get('ok'):
            print(f"Edit message error: {result}")
            # If edit fails, try sending new message
            if result.get('error_code') == 400:
                return send_message(chat_id, text, reply_markup)
        return result
    except Exception as e:
        print(f"Error editing message: {e}")
        # Fallback to new message
        return send_message(chat_id, text, reply_markup)

def answer_callback_query(callback_query_id, text=""):
    """Answer callback query"""
    url = f"{BASE_URL}/answerCallbackQuery"
    data = {
        'callback_query_id': callback_query_id,
        'text': text
    }
    try:
        requests.post(url, data=data, timeout=5)
    except:
        pass

def get_user_language(user_id):
    """Get user language, default English"""
    return user_languages.get(user_id, 'en')

def set_user_language(user_id, language):
    """Set user language"""
    user_languages[user_id] = language

def get_text(user_id, key, **kwargs):
    """Get text in user's language"""
    lang = get_user_language(user_id)
    text = TEXTS[lang].get(key, TEXTS['en'].get(key, key))
    if kwargs:
        return text.format(**kwargs)
    return text

def get_main_menu_keyboard(user_id):
    """Get main menu keyboard in user's language"""
    lang = get_user_language(user_id)
    return {
        'inline_keyboard': [
            [{'text': TEXTS[lang]['graphic_design'], 'callback_data': 'cat_graphic'}],
            [{'text': TEXTS[lang]['ui_design'], 'callback_data': 'cat_ui'}],
            [{'text': TEXTS[lang]['print'], 'callback_data': 'cat_print'}],
            [{'text': TEXTS[lang]['vfx'], 'callback_data': 'cat_vfx'}],
            [{'text': TEXTS[lang]['motion'], 'callback_data': 'cat_motion'}],
            [{'text': TEXTS[lang]['portfolio'], 'callback_data': 'show_portfolio'}],
            [{'text': TEXTS[lang]['contact'], 'callback_data': 'show_contact'}],
            [{'text': TEXTS[lang]['language'], 'callback_data': 'show_language'}]
        ]
    }

def handle_start(chat_id):
    """Handle /start command with main photo"""
    global ADMIN_CHAT_ID
    
    # По умолчанию устанавливаем английский язык
    set_user_language(chat_id, 'en')
    
    text = get_text(chat_id, 'welcome')
    keyboard = get_main_menu_keyboard(chat_id)
    
    # Если это админ, сохраняем его chat_id
    try:
        # Получаем информацию о пользователе
        url = f"{BASE_URL}/getChat"
        data = {'chat_id': chat_id}
        response = requests.post(url, data=data, timeout=5)
        result = response.json()
        
        if result.get('ok'):
            chat_info = result['result']
            username = chat_info.get('username', '').lower()
            if username == ADMIN_USERNAME.lower():
                ADMIN_CHAT_ID = chat_id
                print(f"✅ Admin detected and chat_id saved: {chat_id}")
                
                # Отправляем специальное приветствие админу
                admin_welcome = get_text(chat_id, 'admin_welcome', 
                                       chat_id=chat_id, welcome_text=text)
                
                # Отправляем тестовое уведомление
                test_notification = get_text(chat_id, 'test_notification')
                
                # Сначала приветствие, потом тест
                send_photo(chat_id, IMAGES['main_photo'], admin_welcome, keyboard)
                time.sleep(1)  # Небольшая задержка
                send_message(chat_id, test_notification)
                
                return
    except Exception as e:
        print(f"Error checking admin: {e}")
    
    # Обычное приветствие для клиентов
    return send_photo(chat_id, IMAGES['main_photo'], text, keyboard)

def handle_graphic_design(chat_id, message_id):
    """Graphic Design category - edit with photo"""
    lang = get_user_language(chat_id)
    
    if lang == 'ru':
        text = """🎨 <b>ГРАФИЧЕСКИЙ ДИЗАЙН</b>

• <b>Логотип</b> — €110-180
  Создание логотипа

• <b>Фирменный стиль</b> — €270-550
  Логотип, цвета, типографика

• <b>Полный брендбук</b> — €550-1100
  Полное руководство по бренду

• <b>Иконка (1 шт.)</b> — €9-22
  Дизайн одной иконки

• <b>Простая иллюстрация</b> — €45-90
  Обложки, простые иллюстрации

• <b>Детальная иллюстрация</b> — €110-230
  Сложные иллюстрации"""
    else:
        text = """🎨 <b>GRAPHIC DESIGN</b>

• <b>Logo</b> — €110-180
  Custom logo creation

• <b>Brand Identity</b> — €270-550
  Logo, colors, typography

• <b>Full Brandbook</b> — €550-1100
  Complete brand guidelines

• <b>Icon (1 pc.)</b> — €9-22
  Single icon design

• <b>Simple Illustration</b> — €45-90
  Cover art, simple illustrations

• <b>Detailed Illustration</b> — €110-230
  Complex illustrations"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'order_logo'), 'callback_data': 'ord_logo'}],
            [{'text': get_text(chat_id, 'order_brand'), 'callback_data': 'ord_brand'}],
            [{'text': get_text(chat_id, 'order_book'), 'callback_data': 'ord_book'}],
            [{'text': get_text(chat_id, 'order_icon'), 'callback_data': 'ord_icon'}],
            [{'text': get_text(chat_id, 'order_illustration'), 'callback_data': 'ord_illust'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_ui_design(chat_id, message_id):
    """UI/UX Design category - edit with photo"""
    lang = get_user_language(chat_id)
    
    if lang == 'ru':
        text = """📱 <b>UI/UX ДИЗАЙН</b>

• <b>Лендинг (1 страница)</b> — €140-280
  Одностраничный сайт

• <b>Многостраничный сайт (5-7 страниц)</b> — €460-850
  Полный дизайн сайта

• <b>Мобильное приложение (1 экран)</b> — €28-55
  Один экран приложения

• <b>Полный UI мобильного приложения (10-15 экранов)</b> — €370-850
  Полный дизайн приложения"""
    else:
        text = """📱 <b>UI/UX DESIGN</b>

• <b>Landing Page (1 page)</b> — €140-280
  Single page website

• <b>Multi-page Website (5-7 pages)</b> — €460-850
  Full website design

• <b>Mobile App (single screen)</b> — €28-55
  One app screen

• <b>Mobile App Full UI (10-15 screens)</b> — €370-850
  Complete app design"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'order_landing'), 'callback_data': 'ord_landing'}],
            [{'text': get_text(chat_id, 'order_website'), 'callback_data': 'ord_website'}],
            [{'text': get_text(chat_id, 'order_mobile'), 'callback_data': 'ord_mobile'}],
            [{'text': get_text(chat_id, 'order_fullui'), 'callback_data': 'ord_fullui'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_print(chat_id, message_id):
    """Print/Publishing category - edit with photo"""
    lang = get_user_language(chat_id)
    
    if lang == 'ru':
        text = """📄 <b>ПЕЧАТЬ / ИЗДАТЕЛЬСТВО</b>

• <b>Визитка</b> — €13-22
  Профессиональная визитка

• <b>Презентация (1 слайд)</b> — €7-14
  Дизайн одного слайда

• <b>Полная презентация (10-20 слайдов)</b> — €70-165
  Полная презентация

• <b>Месячный пакет (8-12 постов + сторис)</b> — €130-195
  Пакет для социальных сетей"""
    else:
        text = """📄 <b>PRINT / PUBLISHING</b>

• <b>Business Card</b> — €13-22
  Professional business card

• <b>Presentation (1 slide)</b> — €7-14
  Single slide design

• <b>Full Presentation (10-20 slides)</b> — €70-165
  Complete presentation

• <b>Monthly Package (8-12 posts + stories)</b> — €130-195
  Social media package"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'order_card'), 'callback_data': 'ord_card'}],
            [{'text': get_text(chat_id, 'order_presentation'), 'callback_data': 'ord_present'}],
            [{'text': get_text(chat_id, 'order_monthly'), 'callback_data': 'ord_monthly'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_vfx(chat_id, message_id):
    """Editing & VFX category - edit with photo"""
    lang = get_user_language(chat_id)
    
    if lang == 'ru':
        text = """🎬 <b>МОНТАЖ И VFX</b>

• <b>Видеомонтаж (до 1 мин)</b> — €40-60
  TikTok/Reels/Shorts

• <b>Видеомонтаж (до 5 мин)</b> — €80-200
  Видео средней длины

• <b>Видеомонтаж (5-15 мин)</b> — €200-350
  YouTube, клипы, обзоры

• <b>Цветокоррекция / Звук</b> — €15-25
  Цветокоррекция / Звуковые эффекты"""
    else:
        text = """🎬 <b>EDITING & VFX</b>

• <b>Video Editing (up to 1 min)</b> — €40-60
  TikTok/Reels/Shorts

• <b>Video Editing (up to 5 min)</b> — €80-200
  Medium length videos

• <b>Video Editing (5-15 min)</b> — €200-350
  YouTube, clips, reviews

• <b>CC / SFX</b> — €15-25
  Color correction / Sound effects"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'order_short'), 'callback_data': 'ord_short'}],
            [{'text': get_text(chat_id, 'order_medium'), 'callback_data': 'ord_medium'}],
            [{'text': get_text(chat_id, 'order_long'), 'callback_data': 'ord_long'}],
            [{'text': get_text(chat_id, 'order_ccsfx'), 'callback_data': 'ord_ccsfx'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_motion(chat_id, message_id):
    """Motion Design category - edit with photo"""
    lang = get_user_language(chat_id)
    
    if lang == 'ru':
        text = """🎭 <b>МОУШН ДИЗАЙН</b>

• <b>Анимация логотипа</b> — €80
  Анимированная последовательность логотипа

• <b>Простая 2D анимация (10-20 сек)</b> — €70-80
  2D анимация

• <b>Рекламная анимация (до 30 сек)</b> — €100-150
  Промо видео

• <b>Визуалы для событий</b> — от €120
  Визуалы для живых событий"""
    else:
        text = """🎭 <b>MOTION DESIGN</b>

• <b>Logo Animation</b> — €80
  Animated logo sequence

• <b>Simple 2D Animation (10-20 sec)</b> — €70-80
  2D animation

• <b>Promo/Advertising Animation (up to 30 sec)</b> — €100-150
  Promotional video

• <b>Event Screens/Visuals</b> — from €120
  Live event visuals"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'order_logoanim'), 'callback_data': 'ord_logoanim'}],
            [{'text': get_text(chat_id, 'order_2danim'), 'callback_data': 'ord_2danim'}],
            [{'text': get_text(chat_id, 'order_promo'), 'callback_data': 'ord_promo'}],
            [{'text': get_text(chat_id, 'order_event'), 'callback_data': 'ord_event'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_portfolio(chat_id, message_id):
    """Show portfolio with examples"""
    text = f"""{get_text(chat_id, 'portfolio_title')}

📸 <b>{get_text(chat_id, 'portfolio_channel')}</b> {PORTFOLIO_CHANNEL}

🔥 <b>{get_text(chat_id, 'portfolio_examples')}</b>
{get_text(chat_id, 'portfolio_covers')}
{get_text(chat_id, 'portfolio_brands')}
{get_text(chat_id, 'portfolio_ui')}
{get_text(chat_id, 'portfolio_motion')}
{get_text(chat_id, 'portfolio_social')}
{get_text(chat_id, 'portfolio_print')}

💡 {get_text(chat_id, 'portfolio_unique')}

📞 {get_text(chat_id, 'portfolio_contact_us')}"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'view_examples'), 'callback_data': 'show_examples'}],
            [{'text': get_text(chat_id, 'contact_for_more'), 'callback_data': 'show_contact'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_show_examples(chat_id, message_id):
    """Show portfolio examples with photos and videos"""
    lang = get_user_language(chat_id)
    
    # Send examples (photos and videos)
    for i, item in enumerate(PORTFOLIO_EXAMPLES):
        if i == 0:
            # First photo - Covers
            if lang == 'ru':
                caption = """<blockquote>🎨 <b>ОБЛОЖКИ И АРТВОРКИ</b></blockquote>

<b>Примеры работ:</b>
• Обложки альбомов
• Сниппеты для треков
• Визуалы для релизов

<i>Каждая обложка создается индивидуально под ваш стиль</i>"""
            else:
                caption = """<blockquote>🎨 <b>COVERS & ARTWORK</b></blockquote>

<b>Work examples:</b>
• Album covers
• Track snippets
• Release visuals

<i>Each cover is created individually for your style</i>"""
        
        elif i == 1:
            # Second photo - Posters
            if lang == 'ru':
                caption = """<blockquote>📄 <b>ПОСТЕРЫ И АФИШИ</b></blockquote>

<b>Примеры работ:</b>
• Концертные афиши
• Промо постеры
• Ивент дизайн

<i>Яркие и запоминающиеся дизайны</i>"""
            else:
                caption = """<blockquote>📄 <b>POSTERS & FLYERS</b></blockquote>

<b>Work examples:</b>
• Concert posters
• Promo materials
• Event design

<i>Bright and memorable designs</i>"""
        
        else:
            # Video
            if lang == 'ru':
                caption = f"""<blockquote>🎬 <b>ВИДЕОМОНТАЖ И МОУШН</b></blockquote>

<b>Примеры работ:</b>
• Монтаж видео
• Моушн графика
• VFX эффекты

<i>Динамичные и профессиональные ролики</i>

📸 <b>Больше примеров:</b> {PORTFOLIO_CHANNEL}"""
            else:
                caption = f"""<blockquote>🎬 <b>VIDEO EDITING & MOTION</b></blockquote>

<b>Work examples:</b>
• Video editing
• Motion graphics
• VFX effects

<i>Dynamic and professional videos</i>

📸 <b>More examples:</b> {PORTFOLIO_CHANNEL}"""
        
        # Send photo or video
        if item['type'] == 'video':
            send_video(chat_id, item['path'], caption)
        else:
            send_photo(chat_id, item['path'], caption)
        
        time.sleep(0.4)  # Small delay
    
    # Final message with buttons
    if lang == 'ru':
        text = """<blockquote>✨ <b>Нравится то, что видите?</b></blockquote>

📸 <b>Полное портфолио:</b> @mindescrew
💬 <b>Готовы заказать?</b> Свяжитесь с нами!

<i>Каждый проект уникален и создается под ваши потребности</i>"""
    else:
        text = """<blockquote>✨ <b>Like what you see?</b></blockquote>

📸 <b>Full portfolio:</b> @mindescrew
💬 <b>Ready to order?</b> Contact us!

<i>Each project is unique and tailored to your needs</i>"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'place_order'), 'callback_data': 'main_menu'}],
            [{'text': get_text(chat_id, 'contact_us'), 'callback_data': 'show_contact'}]
        ]
    }
    
    return send_message(chat_id, text, keyboard)

def handle_contact(chat_id, message_id):
    """Show contacts - edit with photo"""
    text = f"""{get_text(chat_id, 'contact_title')}

💬 <b>{get_text(chat_id, 'contact_telegram')}</b> @{YOUR_USERNAME}
🌐 <b>{get_text(chat_id, 'contact_portfolio')}</b> {PORTFOLIO_CHANNEL}

⏰ <b>{get_text(chat_id, 'contact_hours')}</b> 
{get_text(chat_id, 'contact_mon_fri')}
{get_text(chat_id, 'contact_sat_sun')}

💰 <b>{get_text(chat_id, 'contact_payment')}</b>
• PayPal • Bank transfer • Cryptocurrency

📋 <b>{get_text(chat_id, 'contact_terms')}</b>
{get_text(chat_id, 'contact_revisions')}
{get_text(chat_id, 'contact_urgent')}
{get_text(chat_id, 'contact_redesign')}

💱 <b>{get_text(chat_id, 'contact_rates')}</b>
1€ = 100₽ / 50₴ | 1$ = 85₽ / 42₴"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_order(chat_id, message_id, service):
    """Start order process - edit with photo"""
    lang = get_user_language(chat_id)
    
    service_names = {
        'ord_logo': 'Logo Design (€110-180)' if lang == 'en' else 'Логотип (€110-180)',
        'ord_brand': 'Brand Identity (€270-550)' if lang == 'en' else 'Фирменный стиль (€270-550)',
        'ord_book': 'Full Brandbook (€550-1100)' if lang == 'en' else 'Полный брендбук (€550-1100)',
        'ord_icon': 'Icon Design (€9-22)' if lang == 'en' else 'Дизайн иконки (€9-22)',
        'ord_illust': 'Illustration (€45-230)' if lang == 'en' else 'Иллюстрация (€45-230)',
        'ord_landing': 'Landing Page (€140-280)' if lang == 'en' else 'Лендинг (€140-280)',
        'ord_website': 'Website (€460-850)' if lang == 'en' else 'Сайт (€460-850)',
        'ord_mobile': 'Mobile Screen (€28-55)' if lang == 'en' else 'Экран приложения (€28-55)',
        'ord_fullui': 'Mobile App UI (€370-850)' if lang == 'en' else 'Полный UI приложения (€370-850)',
        'ord_card': 'Business Card (€13-22)' if lang == 'en' else 'Визитка (€13-22)',
        'ord_present': 'Presentation (€7-165)' if lang == 'en' else 'Презентация (€7-165)',
        'ord_monthly': 'Monthly Package (€130-195)' if lang == 'en' else 'Месячный пакет (€130-195)',
        'ord_short': 'Short Video Edit (€40-60)' if lang == 'en' else 'Короткий монтаж (€40-60)',
        'ord_medium': 'Medium Video Edit (€80-200)' if lang == 'en' else 'Средний монтаж (€80-200)',
        'ord_long': 'Long Video Edit (€200-350)' if lang == 'en' else 'Длинный монтаж (€200-350)',
        'ord_ccsfx': 'CC/SFX (€15-25)' if lang == 'en' else 'Цветокор/Звук (€15-25)',
        'ord_logoanim': 'Logo Animation (€80)' if lang == 'en' else 'Анимация логотипа (€80)',
        'ord_2danim': '2D Animation (€70-80)' if lang == 'en' else '2D Анимация (€70-80)',
        'ord_promo': 'Promo Video (€100-150)' if lang == 'en' else 'Промо видео (€100-150)',
        'ord_event': 'Event Visuals (from €120)' if lang == 'en' else 'Визуалы для событий (от €120)'
    }
    
    service_name = service_names.get(service, 'Service')
    
    text = get_text(chat_id, 'order_form', service_name=service_name)
    
    keyboard = {
        'inline_keyboard': [
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_language_menu(chat_id, message_id):
    """Show language selection menu"""
    lang = get_user_language(chat_id)
    
    if lang == 'en':
        text = """🌐 <b>Language Selection</b>

Choose your preferred language:"""
    else:
        text = """🌐 <b>Выбор языка</b>

Выберите предпочитаемый язык:"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '🇺🇸 English', 'callback_data': 'lang_en'}],
            [{'text': '🇷🇺 Русский', 'callback_data': 'lang_ru'}],
            [{'text': get_text(chat_id, 'back'), 'callback_data': 'main_menu'}]
        ]
    }
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_language_change(chat_id, message_id, new_lang):
    """Handle language change"""
    set_user_language(chat_id, new_lang)
    
    # Показываем главное меню на новом языке
    text = get_text(chat_id, 'menu_title')
    keyboard = get_main_menu_keyboard(chat_id)
    
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)
def handle_main_menu(chat_id, message_id):
    """Return to main menu - edit with photo"""
    text = get_text(chat_id, 'menu_title')
    keyboard = get_main_menu_keyboard(chat_id)
    return edit_message_with_photo(chat_id, message_id, IMAGES['main_photo'], text, keyboard)

def handle_text_message(chat_id, user, text):
    """Handle text message (order details)"""
    global ADMIN_CHAT_ID
    
    # Проверяем, является ли отправитель админом
    username = user.get('username', '').lower()
    if username == ADMIN_USERNAME.lower():
        ADMIN_CHAT_ID = chat_id
        print(f"✅ Admin chat_id saved: {chat_id}")
    
    # Формируем сообщение для админа (используем английский для админа)
    admin_text = get_text(ADMIN_CHAT_ID or chat_id, 'new_order',
                         name=user.get('first_name', 'Unknown'),
                         username=user.get('username', 'no_username'),
                         message=text,
                         time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    # Отправляем админу
    send_message_to_admin(admin_text)
    
    # Ответ клиенту на его языке
    reply_text = get_text(chat_id, 'order_thanks', username=YOUR_USERNAME)
    
    return send_message(chat_id, reply_text)

def send_message_to_admin(text):
    """Send message to admin with multiple methods"""
    global ADMIN_CHAT_ID
    
    # Метод 1: Если есть сохраненный chat_id админа
    if ADMIN_CHAT_ID:
        try:
            result = send_message(ADMIN_CHAT_ID, text)
            if result.get('ok'):
                print(f"✅ Message sent to admin (chat_id: {ADMIN_CHAT_ID})")
                return result
            else:
                print(f"❌ Failed to send via chat_id: {result}")
        except Exception as e:
            print(f"❌ Failed to send via chat_id: {e}")
    
    # Метод 2: Попробовать отправить по username
    try:
        url = f"{BASE_URL}/sendMessage"
        data = {
            'chat_id': f'@{ADMIN_USERNAME}',
            'text': text,
            'parse_mode': 'HTML'
        }
        
        response = requests.post(url, data=data, timeout=10)
        result = response.json()
        
        if result.get('ok'):
            print(f"✅ Message sent to @{ADMIN_USERNAME}")
            return result
        else:
            print(f"❌ Failed to send to @{ADMIN_USERNAME}: {result}")
    except Exception as e:
        print(f"❌ Error sending to @{ADMIN_USERNAME}: {e}")
    
    # Метод 3: Логируем в консоль как fallback + отправляем инструкцию клиенту
    print("📝 ADMIN MESSAGE (console fallback):")
    print(text)
    print("-" * 50)
    
    # Отправляем инструкцию админу в консоль
    print(f"⚠️  ADMIN SETUP REQUIRED:")
    print(f"Admin @{ADMIN_USERNAME} needs to start the bot first!")
    print(f"Go to https://t.me/mindescrew_bot and send /start")
    print("-" * 50)
    
    return {'ok': False, 'fallback': True}

def process_update(update):
    """Process update with comprehensive error handling"""
    try:
        if 'message' in update:
            message = update['message']
            chat_id = message['chat']['id']
            user = message.get('from', {})
            
            if 'text' in message:
                text = message['text']
                if text == '/start':
                    handle_start(chat_id)
                else:
                    handle_text_message(chat_id, user, text)
        
        elif 'callback_query' in update:
            query = update['callback_query']
            chat_id = query['message']['chat']['id']
            message_id = query['message']['message_id']
            callback_data = query['data']
            
            # Answer callback query immediately
            answer_callback_query(query['id'], "Processing...")
            
            # Route to appropriate handler
            if callback_data == 'cat_graphic':
                handle_graphic_design(chat_id, message_id)
            elif callback_data == 'cat_ui':
                handle_ui_design(chat_id, message_id)
            elif callback_data == 'cat_print':
                handle_print(chat_id, message_id)
            elif callback_data == 'cat_vfx':
                handle_vfx(chat_id, message_id)
            elif callback_data == 'cat_motion':
                handle_motion(chat_id, message_id)
            elif callback_data == 'show_portfolio':
                handle_portfolio(chat_id, message_id)
            elif callback_data == 'show_examples':
                handle_show_examples(chat_id, message_id)
            elif callback_data == 'show_contact':
                handle_contact(chat_id, message_id)
            elif callback_data == 'show_language':
                handle_language_menu(chat_id, message_id)
            elif callback_data == 'lang_en':
                handle_language_change(chat_id, message_id, 'en')
            elif callback_data == 'lang_ru':
                handle_language_change(chat_id, message_id, 'ru')
            elif callback_data == 'main_menu':
                handle_main_menu(chat_id, message_id)
            elif callback_data.startswith('ord_'):
                handle_order(chat_id, message_id, callback_data)
            else:
                # Unknown callback - return to main menu
                handle_main_menu(chat_id, message_id)
    
    except Exception as e:
        print(f"Error processing update: {e}")
        # Try to send error message to admin
        try:
            send_message_to_admin(f"Bot error: {str(e)}")
        except:
            pass

def run_bot():
    """Run bot with long polling"""
    print("🤖 MↃREW Bot FINAL VERSION Started!")
    print(f"🔗 Bot link: https://t.me/mindescrew_bot")
    print("✅ All navigation works perfectly!")
    print("✅ Images display correctly!")
    print("✅ Portfolio integration active!")
    print("✅ Commercial ready!")
    print(f"🌐 Running on port: {PORT}")
    
    # Start simple HTTP server for Render health checks
    import threading
    from http.server import HTTPServer, BaseHTTPRequestHandler
    
    class HealthHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'MREW Bot is running!')
        
        def log_message(self, format, *args):
            pass  # Suppress HTTP logs
    
    # Start HTTP server in background
    def start_server():
        server = HTTPServer(('0.0.0.0', PORT), HealthHandler)
        server.serve_forever()
    
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    print(f"✅ HTTP server started on port {PORT}")
    
    offset = 0
    error_count = 0
    
    while True:
        try:
            # Get updates
            url = f"{BASE_URL}/getUpdates"
            params = {
                'offset': offset,
                'timeout': 30,
                'limit': 100
            }
            
            response = requests.get(url, params=params, timeout=35)
            data = response.json()
            
            if data.get('ok'):
                updates = data['result']
                
                for update in updates:
                    process_update(update)
                    offset = update['update_id'] + 1
                    
                if updates:
                    print(f"✅ Processed {len(updates)} updates")
                    error_count = 0  # Reset error count on success
            
            else:
                print(f"❌ Error getting updates: {data}")
                error_count += 1
                if error_count > 5:
                    print("Too many errors, waiting longer...")
                    time.sleep(30)
                else:
                    time.sleep(5)
        
        except KeyboardInterrupt:
            print("\n👋 Bot stopped by user")
            break
        except Exception as e:
            print(f"❌ Error in main loop: {e}")
            error_count += 1
            if error_count > 10:
                print("Too many consecutive errors, restarting...")
                error_count = 0
                time.sleep(60)
            else:
                time.sleep(5)

if __name__ == '__main__':
    run_bot()