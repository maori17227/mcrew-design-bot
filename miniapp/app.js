// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Current language
let currentLang = 'en';

// Media file IDs from your bot
const MEDIA = {
    covers: 'AgACAgIAAxkDAAO8aYUIGz5J7UVpOauIT5KcvjXivGMAAvgTaxuz9ilIU2cMkhILjcMBAAMCAAN5AAM4BA',
    posters: 'AgACAgIAAxkDAAO9aYUIHaym1b3ubLUGzPEFpytkyYkAAvkTaxuz9ilIhLgYx1Zmy7QBAAMCAAN5AAM4BA',
    video: 'BAACAgIAAxkDAAIBTWmFy5jzcZDsBQXiHwrcWzwE1gABqgAC9ocAArP2MUgIFpUzdZd27TgE'
};

// Services data
const SERVICES = {
    graphic: {
        en: {
            title: 'Graphic Design',
            items: [
                { name: 'Logo', price: '€110-180' },
                { name: 'Brand Identity', price: '€270-550' },
                { name: 'Full Brandbook', price: '€550-1100' },
                { name: 'Icon (1 pc.)', price: '€9-22' },
                { name: 'Simple Illustration', price: '€45-90' },
                { name: 'Detailed Illustration', price: '€110-230' }
            ]
        },
        ru: {
            title: 'Графический дизайн',
            items: [
                { name: 'Логотип', price: '€110-180' },
                { name: 'Фирменный стиль', price: '€270-550' },
                { name: 'Полный брендбук', price: '€550-1100' },
                { name: 'Иконка (1 шт.)', price: '€9-22' },
                { name: 'Простая иллюстрация', price: '€45-90' },
                { name: 'Детальная иллюстрация', price: '€110-230' }
            ]
        }
    },
    video: {
        en: {
            title: 'Video Editing',
            items: [
                { name: 'Short Video (up to 1 min)', price: '€40-60' },
                { name: 'Medium Video (up to 5 min)', price: '€80-200' },
                { name: 'Long Video (5-15 min)', price: '€200-350' },
                { name: 'Color Correction / Sound', price: '€15-25' }
            ]
        },
        ru: {
            title: 'Видеомонтаж',
            items: [
                { name: 'Короткое видео (до 1 мин)', price: '€40-60' },
                { name: 'Среднее видео (до 5 мин)', price: '€80-200' },
                { name: 'Длинное видео (5-15 мин)', price: '€200-350' },
                { name: 'Цветокоррекция / Звук', price: '€15-25' }
            ]
        }
    },
    motion: {
        en: {
            title: 'Motion Design',
            items: [
                { name: 'Logo Animation', price: '€80' },
                { name: 'Simple 2D Animation (10-20 sec)', price: '€70-80' },
                { name: 'Promo Animation (up to 30 sec)', price: '€100-150' },
                { name: 'Event Visuals', price: 'from €120' }
            ]
        },
        ru: {
            title: 'Моушн дизайн',
            items: [
                { name: 'Анимация логотипа', price: '€80' },
                { name: 'Простая 2D анимация (10-20 сек)', price: '€70-80' },
                { name: 'Рекламная анимация (до 30 сек)', price: '€100-150' },
                { name: 'Визуалы для событий', price: 'от €120' }
            ]
        }
    }
};

// Portfolio data
const PORTFOLIO = [
    {
        type: 'image',
        url: 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/images/covers_example.jpg',
        title: { en: 'Album Covers', ru: 'Обложки альбомов' },
        description: { en: 'Cover art & artwork', ru: 'Обложки и артворки' }
    },
    {
        type: 'image',
        url: 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/images/poster_example.jpg',
        title: { en: 'Posters', ru: 'Постеры' },
        description: { en: 'Event & promo posters', ru: 'Афиши и промо' }
    },
    {
        type: 'video',
        url: 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/videos/motion_example.mp4',
        title: { en: 'Motion Graphics', ru: 'Моушн графика' },
        description: { en: 'Video editing & VFX', ru: 'Видеомонтаж и VFX' }
    }
];

// Navigation
let currentScreen = 'home';
let previousScreen = [];

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`${screenId}-screen`).classList.add('active');
    
    if (currentScreen !== screenId) {
        previousScreen.push(currentScreen);
        currentScreen = screenId;
    }
    
    // Update Telegram back button
    if (screenId === 'home') {
        tg.BackButton.hide();
    } else {
        tg.BackButton.show();
    }
}

function goBack() {
    if (previousScreen.length > 0) {
        const prev = previousScreen.pop();
        currentScreen = prev;
        showScreen(prev);
    }
}

// Language switching
function updateLanguage(lang) {
    currentLang = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
}

// Show service details
function showServiceDetails(category) {
    const service = SERVICES[category][currentLang];
    const titleEl = document.getElementById('service-title');
    const contentEl = document.getElementById('service-content');
    
    titleEl.textContent = service.title;
    
    let html = '<div class="price-list">';
    service.items.forEach(item => {
        html += `
            <div class="price-item">
                <h4>${item.name}</h4>
                <span class="price">${item.price}</span>
            </div>
        `;
    });
    html += '</div>';
    
    contentEl.innerHTML = html;
    showScreen('service-details');
}

// Load portfolio
function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';
    
    PORTFOLIO.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        
        if (item.type === 'image') {
            div.innerHTML = `
                <img src="${item.url}" alt="${item.title[currentLang]}" loading="lazy">
                <div class="portfolio-caption">
                    <h4>${item.title[currentLang]}</h4>
                    <p>${item.description[currentLang]}</p>
                </div>
            `;
        } else if (item.type === 'video') {
            div.innerHTML = `
                <video src="${item.url}" controls playsinline></video>
                <div class="portfolio-caption">
                    <h4>${item.title[currentLang]}</h4>
                    <p>${item.description[currentLang]}</p>
                </div>
            `;
        }
        
        grid.appendChild(div);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.dataset.lang);
        });
    });
    
    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page === 'portfolio') {
                loadPortfolio();
            }
            showScreen(page);
        });
    });
    
    // Service categories
    document.querySelectorAll('.service-category').forEach(item => {
        item.addEventListener('click', () => {
            showServiceDetails(item.dataset.category);
        });
    });
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', goBack);
    });
    
    // Order button
    document.getElementById('order-btn').addEventListener('click', () => {
        tg.openTelegramLink('https://t.me/mcrewdm');
    });
    
    // Telegram back button
    tg.BackButton.onClick(goBack);
    
    // Set theme colors
    tg.setHeaderColor('#0a0a0a');
    tg.setBackgroundColor('#0a0a0a');
});
