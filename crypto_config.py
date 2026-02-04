"""
Система шифрования для защиты чувствительных данных бота
"""

import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class BotCrypto:
    def __init__(self, master_password=None):
        """Инициализация системы шифрования"""
        self.master_password = master_password or os.getenv('MASTER_PASSWORD', 'MCREW_SECURE_2024!')
        self.key = self._generate_key()
        self.cipher = Fernet(self.key)
    
    def _generate_key(self):
        """Генерация ключа шифрования из мастер-пароля"""
        password = self.master_password.encode()
        salt = b'mcrew_design_studio_salt_2024'  # Фиксированная соль для воспроизводимости
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password))
        return key
    
    def encrypt(self, data):
        """Шифрование данных"""
        if isinstance(data, str):
            data = data.encode()
        encrypted = self.cipher.encrypt(data)
        return base64.urlsafe_b64encode(encrypted).decode()
    
    def decrypt(self, encrypted_data):
        """Расшифровка данных"""
        try:
            encrypted_bytes = base64.urlsafe_b64decode(encrypted_data.encode())
            decrypted = self.cipher.decrypt(encrypted_bytes)
            return decrypted.decode()
        except Exception as e:
            raise ValueError(f"Ошибка расшифровки: {e}")

# Зашифрованные данные (используй эти вместо открытых)
ENCRYPTED_DATA = {
    # Зашифрованный токен бота
    'BOT_TOKEN': 'Z0FBQUFBQnBnOFNkaVkyelREZWtjVEdhRUppeUNYbmhHV3VUZEJMckctd0VBS0dUQWxzN1d4eTh0bUZIeWlXaXRHaGpwZS1qYVdiWm1COEpjdmNiaHVBVzF1ZFNkc1BKS096dTdZSldlSm5VR0U0aU1GNjdaYUdUYTJRY0lFX011b29hVU9ZQmV3eks=',
    
    # Зашифрованный username админа
    'ADMIN_USERNAME': 'Z0FBQUFBQnBnOFNkV0lIY1J0UXRESm15Tno5d2FJS2xJSXQ0ak1tZGExOGxOeFRLaDZtcDhwOXFJZlpZQnVLOEE2MHA0Sl9TNXhTVkNvQ0p4R3h0M1BRUlR0VFpuRGhZY1E9PQ==',
    
    # Зашифрованный username студии
    'YOUR_USERNAME': 'Z0FBQUFBQnBnOFNkQTBsaWotNnRKay1BWXVRaktseW5jSGYzcFNpU2FyY1N0dGh1ODNQMndGSW5Ddk5pMlN4WnV5czJveW41dzl1cVp1V0FCZzlNLVpKWmFqTVpveTJxWnc9PQ==',
    
    # Зашифрованный канал портфолио
    'PORTFOLIO_CHANNEL': 'Z0FBQUFBQnBnOFNkbkZoQUkyVzhndVZaTHFjTWNRazlFSmJpNENGVzdlSjRLVUR6dFhBT2xVdFNOSWNpbksx SGRFZFQ3SDAwR1lTeE5BcVZoMVlSZnZyM3Jscy15WmlWZWc9PQ=='
}

def encrypt_bot_data():
    """Функция для шифрования реальных данных бота"""
    crypto = BotCrypto()
    
    # Реальные данные для шифрования
    real_data = {
        'BOT_TOKEN': '8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M',
        'ADMIN_USERNAME': 'mcrewdm',
        'YOUR_USERNAME': 'mcrewdm',
        'PORTFOLIO_CHANNEL': '@mindescrew'
    }
    
    # Шифруем данные
    encrypted = {}
    for key, value in real_data.items():
        encrypted[key] = crypto.encrypt(value)
        print(f"{key}: {encrypted[key]}")
    
    return encrypted

def get_decrypted_config():
    """Получение расшифрованной конфигурации"""
    crypto = BotCrypto()
    
    try:
        # Расшифровываем данные
        config = {}
        for key, encrypted_value in ENCRYPTED_DATA.items():
            config[key] = crypto.decrypt(encrypted_value)
        
        return config
    except Exception as e:
        print(f"Ошибка расшифровки конфигурации: {e}")
        # Fallback к переменным окружения
        return {
            'BOT_TOKEN': os.getenv('BOT_TOKEN', ''),
            'ADMIN_USERNAME': os.getenv('ADMIN_USERNAME', ''),
            'YOUR_USERNAME': os.getenv('YOUR_USERNAME', ''),
            'PORTFOLIO_CHANNEL': os.getenv('PORTFOLIO_CHANNEL', '')
        }

if __name__ == '__main__':
    # Запуск для генерации зашифрованных данных
    print("🔐 Генерация зашифрованных данных...")
    encrypt_bot_data()