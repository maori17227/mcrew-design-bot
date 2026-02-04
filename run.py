#!/usr/bin/env python3
"""
Скрипт для запуска бота с проверкой конфигурации
"""

import sys
import os

def check_config():
    """Проверяем наличие .env файла и основных настроек"""
    if not os.path.exists('.env'):
        print("❌ Файл .env не найден!")
        print("📝 Скопируйте .env.example в .env и заполните настройки:")
        print("   cp .env.example .env")
        return False
    
    try:
        from config import BOT_TOKEN, ADMIN_ID
        if not BOT_TOKEN or BOT_TOKEN == 'your_bot_token_here':
            print("❌ BOT_TOKEN не настроен в .env файле")
            return False
        
        if not ADMIN_ID or ADMIN_ID == 'your_telegram_id_here':
            print("❌ ADMIN_ID не настроен в .env файле")
            return False
            
        print("✅ Конфигурация проверена успешно")
        return True
        
    except Exception as e:
        print(f"❌ Ошибка в конфигурации: {e}")
        return False

def main():
    """Главная функция запуска"""
    print("🤖 Запуск MCREW Design Studio Bot...")
    
    if not check_config():
        print("\n📋 Инструкция по настройке:")
        print("1. Создайте бота у @BotFather в Telegram")
        print("2. Скопируйте .env.example в .env")
        print("3. Заполните BOT_TOKEN и ADMIN_ID в .env файле")
        print("4. Запустите бота снова")
        sys.exit(1)
    
    try:
        from bot import main as bot_main
        bot_main()
    except KeyboardInterrupt:
        print("\n👋 Бот остановлен пользователем")
    except Exception as e:
        print(f"❌ Ошибка запуска бота: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()