// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Bot token for loading media
const BOT_TOKEN = '8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs';

// Current language and theme
let currentLang = 'en';
let currentTheme = 'light';

// Initialize theme from Telegram or system preference
function initTheme() {
    // Check Telegram color scheme
    if (tg.colorScheme === 'dark') {
        currentTheme = 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
    }
    
    applyTheme(currentTheme);
}

// Apply theme
function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    // Update Telegram theme colors
    const bgColor = theme === 'dark' ? '#0a0a0a' : '#f5f5f5';
    const headerColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    
    tg.setBackgroundColor(bgColor);
    tg.setHeaderColor(headerColor);
}

// Toggle theme
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Media files - using GitHub raw URLs for reliable loading
const GITHUB_USER = 'maori17227';
const GITHUB_REPO = 'mcrew-design-bot';
const GITHUB_BRANCH = 'main';
const GITHUB_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/miniapp/`;

const MEDIA_FILES = {
    covers: GITHUB_BASE + 'covers.jpg',
    posters: GITHUB_BASE + 'posters.jpg',
    video: GITHUB_BASE + 'motion.mp4',
    logo: GITHUB_BASE + 'logo.jpg',
    pricelist: GITHUB_BASE + 'pricelist.jpg'
};

// Services data - ALL categories from bot
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
    ui: {
        en: {
            title: 'UI/UX Design',
            items: [
                { name: 'Landing Page (1 page)', price: '€140-280' },
                { name: 'Multi-page Website (5-7 pages)', price: '€460-850' },
                { name: 'Mobile App (single screen)', price: '€28-55' },
                { name: 'Mobile App Full UI (10-15 screens)', price: '€370-850' }
            ]
        },
        ru: {
            title: 'UI/UX дизайн',
            items: [
                { name: 'Лендинг (1 страница)', price: '€140-280' },
                { name: 'Многостраничный сайт (5-7 страниц)', price: '€460-850' },
                { name: 'Мобильное приложение (1 экран)', price: '€28-55' },
                { name: 'Полный UI приложения (10-15 экранов)', price: '€370-850' }
            ]
        }
    },
    print: {
        en: {
            title: 'Print/Publishing',
            items: [
                { name: 'Business Card', price: '€13-22' },
                { name: 'Presentation (1 slide)', price: '€7-14' },
                { name: 'Full Presentation (10-20 slides)', price: '€70-165' },
                { name: 'Monthly Package (8-12 posts + stories)', price: '€130-195' }
            ]
        },
        ru: {
            title: 'Печать/Издательство',
            items: [
                { name: 'Визитка', price: '€13-22' },
                { name: 'Презентация (1 слайд)', price: '€7-14' },
                { name: 'Полная презентация (10-20 слайдов)', price: '€70-165' },
                { name: 'Месячный пакет (8-12 постов + сторис)', price: '€130-195' }
            ]
        }
    },
    video: {
        en: {
            title: 'Editing & VFX',
            items: [
                { name: 'Video Editing (up to 1 min)', price: '€40-60' },
                { name: 'Video Editing (up to 5 min)', price: '€80-200' },
                { name: 'Video Editing (5-15 min)', price: '€200-350' },
                { name: 'CC / SFX', price: '€15-25' }
            ]
        },
        ru: {
            title: 'Монтаж и VFX',
            items: [
                { name: 'Видеомонтаж (до 1 мин)', price: '€40-60' },
                { name: 'Видеомонтаж (до 5 мин)', price: '€80-200' },
                { name: 'Видеомонтаж (5-15 мин)', price: '€200-350' },
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
                { name: 'Promo/Advertising Animation (up to 30 sec)', price: '€100-150' },
                { name: 'Event Screens/Visuals', price: 'from €120' }
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
        type: 'photo',
        file: MEDIA_FILES.covers,
        title: { en: 'Track Covers & Artwork', ru: 'Обложки треков и артворки' },
        description: { en: 'Cover art, snippets, visuals', ru: 'Обложки, сниппеты, визуалы' }
    },
    {
        type: 'photo',
        file: MEDIA_FILES.posters,
        title: { en: 'Posters & Flyers', ru: 'Постеры и афиши' },
        description: { en: 'Event & promo materials', ru: 'Афиши и промо материалы' }
    },
    {
        type: 'video',
        file: MEDIA_FILES.video,
        title: { en: 'Motion Graphics & VFX', ru: 'Моушн графика и VFX' },
        description: { en: 'Video editing, motion design', ru: 'Видеомонтаж, моушн дизайн' }
    }
];

// Get file URL from Telegram
async function getFileUrl(fileId) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
        const data = await response.json();
        if (data.ok) {
            return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`;
        } else {
            console.error('Telegram API error:', data);
        }
    } catch (error) {
        console.error('Error getting file:', error);
    }
    return null;
}

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
    
    // Update language toggle
    const langToggle = document.getElementById('lang-toggle');
    langToggle.checked = (lang === 'ru');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en][data-ru]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // Update placeholder
            const placeholderKey = `data-placeholder-${lang}`;
            if (el.hasAttribute(placeholderKey)) {
                el.placeholder = el.getAttribute(placeholderKey);
            } else if (el.dataset.en && el.dataset.ru) {
                el.placeholder = el.dataset[lang];
            }
        } else {
            el.textContent = el.dataset[lang];
        }
    });
    
    // Update portfolio if loaded
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid && portfolioGrid.children.length > 0 && !portfolioGrid.querySelector('.loading')) {
        portfolioGrid.querySelectorAll('.portfolio-caption').forEach((caption, index) => {
            const item = PORTFOLIO[index];
            if (item) {
                caption.querySelector('h4').textContent = item.title[lang];
                caption.querySelector('p').textContent = item.description[lang];
            }
        });
    }
    
    // Update service details if visible
    const serviceDetailsScreen = document.getElementById('service-details-screen');
    if (serviceDetailsScreen.classList.contains('active')) {
        const currentCategory = serviceDetailsScreen.dataset.category;
        if (currentCategory) {
            showServiceDetails(currentCategory);
        }
    }
}

// Show service details
function showServiceDetails(category) {
    const service = SERVICES[category][currentLang];
    const titleEl = document.getElementById('service-title');
    const contentEl = document.getElementById('service-content');
    const screen = document.getElementById('service-details-screen');
    
    // Store category for language switching and order
    screen.dataset.category = category;
    
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

// Show order form
function showOrderForm(category, serviceIndex = null) {
    const service = SERVICES[category][currentLang];
    const titleEl = document.getElementById('order-title');
    const screen = document.getElementById('order-screen');
    
    // Store category for language switching
    screen.dataset.category = category;
    screen.dataset.serviceIndex = serviceIndex;
    
    let serviceName = service.title;
    if (serviceIndex !== null) {
        const selectedService = service.items[serviceIndex];
        serviceName = `${selectedService.name} (${selectedService.price})`;
    }
    
    titleEl.textContent = currentLang === 'en' ? `Order: ${serviceName}` : `Заказ: ${serviceName}`;
    
    // Clear form
    document.getElementById('order-form').reset();
    
    // Update placeholders
    updateLanguage(currentLang);
    
    showScreen('order');
}

// Show service selection for order
function showServiceSelection(category) {
    const service = SERVICES[category][currentLang];
    const contentEl = document.getElementById('selection-content');
    const screen = document.getElementById('service-selection-screen');
    
    // Store category for language switching
    screen.dataset.category = category;
    
    let html = '<div class="price-list">';
    service.items.forEach((item, index) => {
        html += `
            <div class="price-item clickable" data-category="${category}" data-index="${index}">
                <h4>${item.name}</h4>
                <span class="price">${item.price}</span>
            </div>
        `;
    });
    html += '</div>';
    
    contentEl.innerHTML = html;
    
    // Add click handlers
    setTimeout(() => {
        document.querySelectorAll('.price-item.clickable').forEach(item => {
            item.addEventListener('click', () => {
                const cat = item.dataset.category;
                const idx = item.dataset.index;
                showOrderForm(cat, idx);
            });
        });
    }, 100);
    
    showScreen('service-selection');
}

// Load portfolio - instant loading from local files
async function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';
    
    for (const item of PORTFOLIO) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        
        if (item.type === 'photo') {
            div.innerHTML = `
                <img src="${item.file}" alt="${item.title[currentLang]}" loading="lazy">
                <div class="portfolio-caption">
                    <h4>${item.title[currentLang]}</h4>
                    <p>${item.description[currentLang]}</p>
                </div>
            `;
        } else if (item.type === 'video') {
            div.innerHTML = `
                <video src="${item.file}" controls playsinline></video>
                <div class="portfolio-caption">
                    <h4>${item.title[currentLang]}</h4>
                    <p>${item.description[currentLang]}</p>
                </div>
            `;
        }
        
        grid.appendChild(div);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Theme button
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        toggleTheme();
    });
    
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('change', () => {
        const newLang = langToggle.checked ? 'ru' : 'en';
        updateLanguage(newLang);
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
    
    // Order button - show service selection
    document.getElementById('order-btn').addEventListener('click', () => {
        const category = document.getElementById('service-details-screen').dataset.category;
        showServiceSelection(category);
    });
    
    // Telegram back button
    tg.BackButton.onClick(goBack);
    
    // Order form submit
    document.getElementById('order-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            service: document.getElementById('order-title').textContent,
            details: document.getElementById('order-details').value,
            style: document.getElementById('order-style').value,
            deadline: document.getElementById('order-deadline').value,
            budget: document.getElementById('order-budget').value,
            contact: document.getElementById('order-contact').value
        };
        
        // Format message
        const message = currentLang === 'en' 
            ? `🔔 NEW ORDER from Mini App!\n\n📋 Service: ${formData.service}\n\n📝 Details:\n${formData.details}\n\n🎨 Style:\n${formData.style}\n\n⏰ Deadline: ${formData.deadline}\n💰 Budget: ${formData.budget}\n📞 Contact: ${formData.contact}`
            : `🔔 НОВЫЙ ЗАКАЗ из Mini App!\n\n📋 Услуга: ${formData.service}\n\n📝 Детали:\n${formData.details}\n\n🎨 Стиль:\n${formData.style}\n\n⏰ Срок: ${formData.deadline}\n💰 Бюджет: ${formData.budget}\n📞 Контакт: ${formData.contact}`;
        
        // Send via Telegram
        tg.sendData(JSON.stringify(formData));
        
        // Show success message
        alert(currentLang === 'en' 
            ? '✅ Order sent! We will contact you within 2 hours.' 
            : '✅ Заказ отправлен! Мы свяжемся с вами в течение 2 часов.');
        
        // Go back to home
        showScreen('home');
    });
    
    // Set theme colors
    applyTheme(currentTheme);
});
