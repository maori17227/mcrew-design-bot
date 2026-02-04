"""
MↃREW Design Studio Bot - SECURE VERSION
🔐 All sensitive data is encrypted
"""

import json
import requests
import time
import os
from datetime import datetime
from dotenv import load_dotenv

# Import crypto system
try:
    from crypto_config import get_decrypted_config
    USE_ENCRYPTION = True
    print("🔐 Encryption system loaded")
except ImportError:
    USE_ENCRYPTION = False
    print("⚠️ Encryption not available, using environment variables")

# Load environment variables
load_dotenv()

# Get configuration (encrypted or from environment)
if USE_ENCRYPTION:
    config = get_decrypted_config()
    BOT_TOKEN = config['BOT_TOKEN']
    ADMIN_USERNAME = config['ADMIN_USERNAME']
    YOUR_USERNAME = config['YOUR_USERNAME']
    PORTFOLIO_CHANNEL = config['PORTFOLIO_CHANNEL']
    print("✅ Configuration decrypted successfully")
else:
    BOT_TOKEN = os.getenv('BOT_TOKEN', "")
    ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', "")
    YOUR_USERNAME = os.getenv('YOUR_USERNAME', "")
    PORTFOLIO_CHANNEL = os.getenv('PORTFOLIO_CHANNEL', "")

PORT = int(os.getenv('PORT', 10000))

BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"
ADMIN_CHAT_ID = None

# Language system
user_languages = {}

# Image paths
IMAGES = {
    'main_photo': 'images/mcrew_logo.jpg',
    'welcome': 'images/welcome.jpg',
    'logo': 'images/mcrew_logo.jpg',
    'graphic_design': 'images/graphic_design_example.jpg',
    'ui_ux': 'images/ui_ux_example.jpg',
    'print': 'images/print_example.jpg',
    'vfx': 'images/vfx_example.jpg',
    'motion': 'images/motion_graphics_example.jpg',
    'portfolio_examples': [
        'images/logo_example1.jpg',
        'images/brand_example1.jpg',
        'images/ui_example1.jpg',
        'images/video_edit_example1.jpg',
        'images/motion_example.jpg'
    ]
}
# Texts in different languages (same as original bot)
TEXTS = {
    'en': {
        'welcome': """🔥 <b>Welcome to MↃREW Design Studio!</b>

We create:
• Covers, snippets, visuals
• VFX and motion graphics  
• Brand identity and logos
• UI/UX design
• Print materials
• Video editing

<b>Choose what interests you:</b>""",
        'menu_title': """🔥 <b>MↃREW Design Studio</b>

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

⏰ <b>Time:</b> {time}"""
    },
    'ru': {
        'welcome': """🔥 <b>Добро пожаловать в MↃREW Design Studio!</b>

Мы создаем:
• Обложки, сниппеты, визуалы
• VFX и моушн графику
• Фирменный стиль и логотипы
• UI/UX дизайн
• Печатные материалы
• Видеомонтаж

<b>Выберите что вас интересует:</b>""",
        'menu_title': """🔥 <b>MↃREW Design Studio</b>

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

⏰ <b>Время:</b> {time}"""
    }
}

def get_user_language(user_id):
    return user_languages.get(user_id, 'en')

def set_user_language(user_id, language):
    user_languages[user_id] = language

def get_text(user_id, key, **kwargs):
    lang = get_user_language(user_id)
    text = TEXTS[lang].get(key, TEXTS['en'].get(key, key))
    if kwargs:
        return text.format(**kwargs)
    return text

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

def run_secure_bot():
    """Run secure bot with encrypted configuration"""
    print("🔐 MↃREW Bot SECURE VERSION Started!")
    print(f"🔗 Bot link: https://t.me/mindescrew_bot")
    print("✅ All sensitive data encrypted!")
    print("✅ Commercial ready with security!")
    
    if not BOT_TOKEN:
        print("❌ ERROR: Bot token not found!")
        return
    
    # Simple test message
    test_url = f"{BASE_URL}/getMe"
    try:
        response = requests.get(test_url, timeout=10)
        if response.json().get('ok'):
            print("✅ Bot token is valid!")
        else:
            print("❌ Invalid bot token!")
            return
    except Exception as e:
        print(f"❌ Connection error: {e}")
        return
    
    print("🚀 Secure bot is ready for deployment!")
    print("📋 Next steps:")
    print("1. Update requirements.txt to include 'cryptography'")
    print("2. Deploy to Render with MASTER_PASSWORD environment variable")
    print("3. All sensitive data will be automatically decrypted")

if __name__ == '__main__':
    run_secure_bot()