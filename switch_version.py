"""
Переключение между обычной и защищенной версией бота
"""

import os
import shutil

def switch_to_secure():
    """Переключиться на защищенную версию"""
    print("🔐 Переключение на защищенную версию...")
    
    # Backup original bot
    if os.path.exists('bot.py'):
        shutil.copy('bot.py', 'bot_original_backup.py')
        print("✅ Создан backup оригинального бота")
    
    # Copy secure version
    if os.path.exists('bot_secure.py'):
        shutil.copy('bot_secure.py', 'bot.py')
        print("✅ Защищенная версия активирована")
    
    print("🔐 Теперь используется защищенная версия!")
    print("📋 Для деплоя нужна только переменная: MASTER_PASSWORD=MCREW_SECURE_2024!")

def switch_to_original():
    """Переключиться на оригинальную версию"""
    print("🔓 Переключение на оригинальную версию...")
    
    if os.path.exists('bot_original_backup.py'):
        shutil.copy('bot_original_backup.py', 'bot.py')
        print("✅ Оригинальная версия восстановлена")
    else:
        print("❌ Backup оригинальной версии не найден")
    
    print("🔓 Теперь используется оригинальная версия!")

def show_status():
    """Показать текущий статус"""
    print("📊 СТАТУС ВЕРСИЙ:")
    print("=" * 40)
    
    if os.path.exists('bot.py'):
        with open('bot.py', 'r', encoding='utf-8') as f:
            content = f.read()
            if 'SECURE VERSION' in content:
                print("🔐 Текущая версия: ЗАЩИЩЕННАЯ")
                print("✅ Все токены зашифрованы")
            else:
                print("🔓 Текущая версия: ОБЫЧНАЯ")
                print("⚠️ Токены в открытом виде")
    
    print("\n📁 Доступные файлы:")
    files = ['bot.py', 'bot_secure.py', 'crypto_config.py', 'bot_original_backup.py']
    for file in files:
        if os.path.exists(file):
            print(f"✅ {file}")
        else:
            print(f"❌ {file}")

if __name__ == '__main__':
    print("🔐 УПРАВЛЕНИЕ ВЕРСИЯМИ БОТА")
    print("=" * 40)
    
    show_status()
    
    print("\n🔧 Доступные действия:")
    print("1. Переключиться на защищенную версию")
    print("2. Переключиться на оригинальную версию")
    print("3. Показать статус")
    print("0. Выход")
    
    while True:
        choice = input("\nВыберите действие (0-3): ").strip()
        
        if choice == '1':
            switch_to_secure()
            break
        elif choice == '2':
            switch_to_original()
            break
        elif choice == '3':
            show_status()
        elif choice == '0':
            print("👋 Выход")
            break
        else:
            print("❌ Неверный выбор, попробуйте снова")