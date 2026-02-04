"""
Получить обновления от бота для тестирования
"""

import requests
import json

BOT_TOKEN = "8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M"
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

def get_updates():
    """Получить обновления"""
    url = f"{BASE_URL}/getUpdates"
    response = requests.get(url)
    return response.json()

def get_me():
    """Информация о боте"""
    url = f"{BASE_URL}/getMe"
    response = requests.get(url)
    return response.json()

if __name__ == '__main__':
    print("🤖 Checking bot status...")
    
    # Проверяем бота
    bot_info = get_me()
    if bot_info.get('ok'):
        print(f"✅ Bot is active: @{bot_info['result']['username']}")
        print(f"Bot name: {bot_info['result']['first_name']}")
    else:
        print(f"❌ Bot error: {bot_info}")
        exit(1)
    
    # Получаем обновления
    print("\n📨 Getting recent messages...")
    updates = get_updates()
    
    if updates.get('ok'):
        messages = updates['result']
        print(f"Found {len(messages)} messages")
        
        if messages:
            print("\n📝 Recent messages:")
            for msg in messages[-5:]:  # Последние 5 сообщений
                if 'message' in msg:
                    m = msg['message']
                    user = m.get('from', {})
                    chat = m.get('chat', {})
                    print(f"- From: {user.get('first_name', 'Unknown')} (@{user.get('username', 'no_username')})")
                    print(f"  Chat ID: {chat.get('id')}")
                    print(f"  Text: {m.get('text', 'No text')[:50]}...")
                    print()
        else:
            print("No messages found. Send /start to your bot first!")
            print(f"Bot link: https://t.me/{bot_info['result']['username']}")
    else:
        print(f"❌ Updates error: {updates}")
    
    print("\n🚀 To test the bot:")
    print(f"1. Go to https://t.me/{bot_info['result']['username']}")
    print("2. Send /start")
    print("3. Test all menus and functions")
    print("4. Bot is ready for commercial use!")