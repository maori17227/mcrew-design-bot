"""
Скрипт для получения file_id от Telegram
Запусти его один раз, чтобы получить file_id для всех медиа
"""

import requests
import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv('BOT_TOKEN', "8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M")
YOUR_CHAT_ID = input("Введи свой chat_id (узнай у @userinfobot): ")

BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

def send_photo(file_path, caption):
    """Отправить фото и получить file_id"""
    url = f"{BASE_URL}/sendPhoto"
    
    with open(file_path, 'rb') as photo:
        files = {'photo': photo}
        data = {
            'chat_id': YOUR_CHAT_ID,
            'caption': caption
        }
        
        response = requests.post(url, files=files, data=data)
        result = response.json()
        
        if result.get('ok'):
            file_id = result['result']['photo'][-1]['file_id']
            print(f"✅ {caption}")
            print(f"   file_id: {file_id}\n")
            return file_id
        else:
            print(f"❌ Ошибка: {result}")
            return None

def send_video(file_path, caption):
    """Отправить видео и получить file_id"""
    url = f"{BASE_URL}/sendVideo"
    
    with open(file_path, 'rb') as video:
        files = {'video': video}
        data = {
            'chat_id': YOUR_CHAT_ID,
            'caption': caption
        }
        
        response = requests.post(url, files=files, data=data, timeout=120)
        result = response.json()
        
        if result.get('ok'):
            file_id = result['result']['video']['file_id']
            print(f"✅ {caption}")
            print(f"   file_id: {file_id}\n")
            return file_id
        else:
            print(f"❌ Ошибка: {result}")
            return None

print("🚀 Получение file_id для всех медиа...\n")

# Отправляем все файлы
file_ids = {}

print("📸 Отправка фотографий...")
file_ids['logo'] = send_photo('images/mcrew_logo.jpg', 'MↃREW Logo')
file_ids['covers'] = send_photo('images/covers_example.png', 'Covers Example')
file_ids['posters'] = send_photo('images/poster_example.png', 'Posters Example')

print("🎬 Отправка видео (может занять время)...")
file_ids['video'] = send_video('videos/motion_example.mp4', 'Motion Graphics Example')

print("\n" + "="*60)
print("✅ ВСЕ ГОТОВО! Скопируй эти file_id в worker.js:")
print("="*60 + "\n")

print("const MEDIA_FILE_IDS = {")
for key, file_id in file_ids.items():
    if file_id:
        print(f"  {key}: '{file_id}',")
print("}")

print("\n💡 Вставь этот объект в начало worker.js")
