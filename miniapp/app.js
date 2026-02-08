// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Hide main button
tg.MainButton.hide();

// Handle app closing - play close sound
tg.onEvent('viewportChanged', function() {
    if (!tg.isExpanded) {
        // App is being closed/minimized
        playSound('close');
    }
});

// Alternative: handle when user tries to close
window.addEventListener('beforeunload', function() {
    playSound('close');
});

// Admin user ID
const ADMIN_USER_ID = 8017281019;
const isAdmin = tg.initDataUnsafe?.user?.id === ADMIN_USER_ID;

// API base URL (your Cloudflare Worker URL)
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';

// Bot token for loading media
const BOT_TOKEN = '8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs';

// Current language and theme
let currentLang = 'en';
let currentTheme = 'light';

// Sound effects
const sounds = {
    startup: null,
    select: null,
    close: null
};

// Initialize sounds
function initSounds() {
    sounds.startup = document.getElementById('sound-startup');
    sounds.select = document.getElementById('sound-select');
    sounds.close = document.getElementById('sound-close');
    
    // Set volume
    if (sounds.startup) sounds.startup.volume = 0.5;
    if (sounds.select) sounds.select.volume = 0.5;
    if (sounds.close) sounds.close.volume = 0.5;
}

// Play sound
function playSound(soundName) {
    try {
        const sound = sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Sound play failed:', e));
        }
    } catch (e) {
        console.log('Sound error:', e);
    }
}

// Initialize theme from Telegram or system preference
function initTheme() {
    // Default to dark theme
    currentTheme = 'dark';
    
    // Check Telegram color scheme
    if (tg.colorScheme === 'light') {
        currentTheme = 'light';
    }
    
    applyTheme(currentTheme);
}

// Apply theme
function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeBtn = document.getElementById('theme-btn');
    // Update button appearance based on theme
    if (theme === 'dark') {
        themeBtn.style.backgroundColor = '#ffffff';
    } else {
        themeBtn.style.backgroundColor = '#000000';
    }
    
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
const PORTFOLIO = {
    covers: {
        en: { title: 'Track Covers', description: 'Cover art & visuals' },
        ru: { title: 'Обложки треков', description: 'Обложки и визуалы' },
        items: [
            {
                type: 'track',
                artist: 'whylovly, iwabi!',
                track: 'эфирный план',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly iwabi! эфирный план.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/Эфирный план - iwabi!.mp3`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'любят',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly любят .jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/любят - whylovly.mp3`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'нужен покой',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly lowsignal.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/нужен покой - whylovly.mp3`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'прошу',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly vindictaNots.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/прошу - whylovly.mp3`
            },
            {
                type: 'track',
                artist: 'so brody',
                track: '1TAKE',
                cover: `${GITHUB_BASE}porftolio/covers/so brody 1take.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/1TAKE - So brody.mp3`
            },
            {
                type: 'track',
                artist: 'so brody',
                track: 'AMERICA2',
                cover: `${GITHUB_BASE}porftolio/covers/so brody amecrica 2 .jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/AMERICA2 - So brody.mp3`
            },
            {
                type: 'track',
                artist: 'lil flash$ ft. Kinderlil',
                track: 'best',
                cover: `${GITHUB_BASE}porftolio/covers/lil flash$ ft. Kinderlil Best.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/best (ft. kinderlil).mp3`
            },
            {
                type: 'track',
                artist: 'angelik',
                track: 'wya',
                cover: `${GITHUB_BASE}porftolio/covers/angelik wya.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/wya - angelik.mp3`
            },
            {
                type: 'track',
                artist: 'HELLOVERCAVI, SODA LUV',
                track: 'СВАГА',
                cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI, SODA LUV СВАГА.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/СВАГА - HELLOVERCAVI.mp3`
            },
            {
                type: 'track',
                artist: 'HELLOVERCAVI',
                track: 'Калыван кляйн',
                cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI Калыван кляйн.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/Калыван Кляйн - HELLOVERCAVI.mp3`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'BIRKIN',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi BIRKIN.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/BIRKIN - Valeksi.mp3`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'GEEK0INIGHT',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi GEEK0INIGHT.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/GEEK0lNIGHT - Valeksi.mp3`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'ZAPOMNISH',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi ZAPOMNISH.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/ZAPOMNISH - Valeksi.mp3`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'SELF-LOVER',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi RAGE LOVER-EP.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/SELF-LOVER - Valeksi.mp3`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'FILL ME UP',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi LAST CASE.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/FILL ME UP - Valeksi.mp3`
            },
            {
                type: 'track',
                artist: 'fffuckyousway',
                track: 'fff',
                cover: `${GITHUB_BASE}porftolio/covers/fffuckyousway - fff.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/fffuckyousway.mp3`
            },
            {
                type: 'track',
                artist: 'thot$14er',
                track: 'курить',
                cover: `${GITHUB_BASE}porftolio/covers/thot$14er %23курить.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/Курить - thot$14er.mp3`
            }
        ]
    },
    posters: {
        en: { title: 'Posters & Flyers', description: 'Event materials' },
        ru: { title: 'Постеры и афиши', description: 'Материалы для событий' },
        items: [
            {
                type: 'photo',
                file: MEDIA_FILES.posters,
                title: { en: 'Posters & Flyers', ru: 'Постеры и афиши' },
                description: { en: 'Event & promo materials', ru: 'Афиши и промо материалы' }
            }
        ]
    },
    motion: {
        en: { title: 'Motion Graphics & VFX', description: 'Video & animation' },
        ru: { title: 'Моушн графика и VFX', description: 'Видео и анимация' },
        items: [
            {
                type: 'video',
                file: MEDIA_FILES.video,
                title: { en: 'Motion Graphics & VFX', ru: 'Моушн графика и VFX' },
                description: { en: 'Video editing, motion design', ru: 'Видеомонтаж, моушн дизайн' }
            }
        ]
    }
};

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
    
    // Pause all videos and audio when leaving portfolio detail
    if (screenId !== 'portfolio-detail') {
        document.querySelectorAll('#portfolio-detail-grid video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        document.querySelectorAll('#portfolio-detail-grid audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
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
            // Skip - placeholders are handled separately
        } else {
            el.textContent = el.dataset[lang];
        }
    });
    
    // Update form placeholders if order screen is visible
    const orderScreen = document.getElementById('order-screen');
    if (orderScreen.classList.contains('active')) {
        setFormPlaceholders(lang);
        
        // Update order title
        const currentCategory = orderScreen.dataset.category;
        const serviceIndex = orderScreen.dataset.serviceIndex;
        if (currentCategory) {
            const service = SERVICES[currentCategory][lang];
            let serviceName = service.title;
            if (serviceIndex !== null) {
                const selectedService = service.items[serviceIndex];
                serviceName = `${selectedService.name} (${selectedService.price})`;
            }
            document.getElementById('order-title').textContent = lang === 'en' ? `Order: ${serviceName}` : `Заказ: ${serviceName}`;
        }
    }
    
    // Update portfolio if loaded
    const portfolioDetailGrid = document.getElementById('portfolio-detail-grid');
    const portfolioDetailScreen = document.getElementById('portfolio-detail-screen');
    if (portfolioDetailScreen.classList.contains('active') && portfolioDetailGrid.children.length > 0) {
        // Find which category is currently shown by checking the title
        const currentTitle = document.getElementById('portfolio-detail-title').textContent;
        let currentCategory = null;
        
        for (const [key, value] of Object.entries(PORTFOLIO)) {
            if (value.en.title === currentTitle || value.ru.title === currentTitle) {
                currentCategory = key;
                break;
            }
        }
        
        if (currentCategory) {
            loadPortfolioCategory(currentCategory);
        }
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
    
    // Add click handlers to go directly to order form
    setTimeout(() => {
        document.querySelectorAll('#service-details-screen .price-item.clickable').forEach(item => {
            item.addEventListener('click', () => {
                const cat = item.dataset.category;
                const idx = item.dataset.index;
                showOrderForm(cat, idx);
            });
        });
    }, 100);
    
    showScreen('service-details');
}

// Show order form
function showOrderForm(category, serviceIndex = null) {
    // Play select sound when user chooses a service to order
    playSound('select');
    
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
    
    // Set placeholders based on current language
    setFormPlaceholders(currentLang);
    
    showScreen('order');
}

// Set form placeholders
function setFormPlaceholders(lang) {
    const detailsField = document.getElementById('order-details');
    const styleField = document.getElementById('order-style');
    const requirementsField = document.getElementById('order-requirements');
    const deadlineBudgetField = document.getElementById('order-deadline-budget');
    const referencesField = document.getElementById('order-references');
    const contactField = document.getElementById('order-contact');
    
    if (lang === 'en') {
        detailsField.placeholder = '• What exactly do you need?\n• Purpose/goal of the design';
        styleField.placeholder = '• Preferred style (minimalism, dark, bright, etc.)\n• Main colors\n• Colors to avoid';
        requirementsField.placeholder = '• Required format/size\n• Where will it be used?\n• Text/brand name to include';
        deadlineBudgetField.placeholder = '• When do you need it ready?\n• Your budget\n• Urgent? (+50% for ≤4 days)';
        referencesField.placeholder = '• Send examples/links for inspiration\n• Special requirements';
        contactField.placeholder = '@username or email';
    } else {
        detailsField.placeholder = '• Что именно вам нужно?\n• Цель/назначение дизайна';
        styleField.placeholder = '• Предпочитаемый стиль (минимализм, темный, яркий и т.д.)\n• Основные цвета\n• Цвета, которых следует избегать';
        requirementsField.placeholder = '• Нужный формат/размер\n• Где будет использоваться?\n• Текст/название бренда для включения';
        deadlineBudgetField.placeholder = '• Когда нужно готово?\n• Ваш бюджет\n• Срочно? (+50% за ≤4 дня)';
        referencesField.placeholder = '• Пришлите примеры/ссылки для вдохновения\n• Особые требования';
        contactField.placeholder = '@username или email';
    }
}

// Load portfolio category
async function loadPortfolioCategory(category) {
    const portfolioData = PORTFOLIO[category];
    const grid = document.getElementById('portfolio-detail-grid');
    const titleEl = document.getElementById('portfolio-detail-title');
    
    // Set title
    titleEl.textContent = portfolioData[currentLang].title;
    
    // Clear grid
    grid.innerHTML = '';
    
    // For admin, try to load from KV first, fallback to static data
    let items = portfolioData.items;
    
    if (isAdmin) {
        try {
            const response = await fetch(`${API_BASE}/api/portfolio?category=${category}`, {
                headers: {
                    'X-User-ID': tg.initDataUnsafe?.user?.id || ''
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    items = data.items;
                }
            }
        } catch (error) {
            console.log('Using static portfolio data');
        }
    }
    
    // Load items
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        
        if (item.type === 'track') {
            // Track cover with custom audio player
            const playerId = `player-${i}`;
            div.innerHTML = `
                <img src="${item.cover}" alt="${item.artist} - ${item.track}" loading="lazy" class="track-cover">
                <div class="portfolio-caption">
                    <h4>${item.artist}</h4>
                    <p>${item.track}</p>
                    ${item.audio ? `
                        <div class="custom-player" data-player-id="${playerId}">
                            <audio id="${playerId}" preload="metadata">
                                <source src="${item.audio}" type="audio/mpeg">
                            </audio>
                            <button class="play-btn" data-audio-id="${playerId}">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </button>
                            <div class="player-info">
                                <div class="time-display">
                                    <span class="current-time">0:00</span>
                                    <span class="duration">0:00</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        } else if (item.type === 'photo') {
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
    
    // Initialize custom audio players
    initAudioPlayers();
    
    showScreen('portfolio-detail');
}

// Initialize custom audio players
function initAudioPlayers() {
    // Create audio context for volume normalization
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    document.querySelectorAll('.play-btn').forEach(btn => {
        const audioId = btn.dataset.audioId;
        const audio = document.getElementById(audioId);
        const player = btn.closest('.custom-player');
        const progressBar = player.querySelector('.progress-bar');
        const progressFill = player.querySelector('.progress-fill');
        const currentTimeEl = player.querySelector('.current-time');
        const durationEl = player.querySelector('.duration');
        
        const TRAILER_DURATION = 15; // 15 seconds trailer
        const FADE_START = 13; // Start fade at 13 seconds
        const TARGET_VOLUME = 0.316; // Target normalized volume (-10dB)
        let fadeInterval = null;
        let gainNode = null;
        let sourceNode = null;
        let isAudioContextSetup = false;
        
        // Setup Web Audio API for volume normalization
        function setupAudioContext() {
            if (isAudioContextSetup) return;
            
            try {
                // Resume audio context if suspended (required by some browsers)
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                
                // Create audio nodes
                sourceNode = audioContext.createMediaElementSource(audio);
                gainNode = audioContext.createGain();
                
                // Create compressor for dynamic range control
                const compressor = audioContext.createDynamicsCompressor();
                compressor.threshold.value = -24; // Start compressing at -24dB
                compressor.knee.value = 30; // Smooth compression curve
                compressor.ratio.value = 12; // Compression ratio
                compressor.attack.value = 0.003; // Fast attack (3ms)
                compressor.release.value = 0.25; // Medium release (250ms)
                
                // Connect nodes: source -> gain -> compressor -> destination
                sourceNode.connect(gainNode);
                gainNode.connect(compressor);
                compressor.connect(audioContext.destination);
                
                // Set initial gain for normalization
                gainNode.gain.value = 1.0;
                
                isAudioContextSetup = true;
                console.log('Audio normalization enabled for', audioId);
            } catch (error) {
                console.warn('Could not setup audio normalization:', error);
                // Fallback to regular volume control
                audio.volume = TARGET_VOLUME;
            }
        }
        
        // Set initial volume
        audio.volume = TARGET_VOLUME;
        
        // Play/Pause button
        btn.addEventListener('click', () => {
            // Setup audio context on first interaction (required by browsers)
            if (!isAudioContextSetup) {
                setupAudioContext();
            }
            
            // Pause all other players
            document.querySelectorAll('audio').forEach(a => {
                if (a.id !== audioId && !a.paused) {
                    a.pause();
                    a.currentTime = 0;
                    if (gainNode) {
                        gainNode.gain.value = 1.0;
                    } else {
                        a.volume = TARGET_VOLUME;
                    }
                    const otherBtn = document.querySelector(`[data-audio-id="${a.id}"]`);
                    otherBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                }
            });
            
            if (audio.paused) {
                if (gainNode) {
                    gainNode.gain.value = 1.0;
                } else {
                    audio.volume = TARGET_VOLUME;
                }
                audio.play();
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
            } else {
                audio.pause();
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                if (fadeInterval) {
                    clearInterval(fadeInterval);
                    fadeInterval = null;
                }
            }
        });
        
        // Update duration when loaded (show 15 seconds max)
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(TRAILER_DURATION);
        });
        
        // Update progress and handle 15 second limit with fade
        audio.addEventListener('timeupdate', () => {
            const currentTime = audio.currentTime;
            
            // Stop at 15 seconds
            if (currentTime >= TRAILER_DURATION) {
                audio.pause();
                audio.currentTime = 0;
                if (gainNode) {
                    gainNode.gain.value = 1.0;
                } else {
                    audio.volume = TARGET_VOLUME;
                }
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                progressFill.style.width = '0%';
                currentTimeEl.textContent = '0:00';
                if (fadeInterval) {
                    clearInterval(fadeInterval);
                    fadeInterval = null;
                }
                return;
            }
            
            // Smooth fade out from 13 to 15 seconds (2 second fade)
            if (currentTime >= FADE_START) {
                if (!fadeInterval) {
                    // Start smooth fade out
                    fadeInterval = setInterval(() => {
                        const fadeProgress = (audio.currentTime - FADE_START) / (TRAILER_DURATION - FADE_START);
                        const targetGain = 1.0 * (1 - fadeProgress);
                        
                        if (gainNode) {
                            // Use gain node for smoother fade
                            gainNode.gain.value = Math.max(0, targetGain);
                        } else {
                            // Fallback to volume control
                            audio.volume = Math.max(0, TARGET_VOLUME * (1 - fadeProgress));
                        }
                    }, 50); // Update every 50ms for smoother fade
                }
            }
            
            const progress = (currentTime / TRAILER_DURATION) * 100;
            progressFill.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(currentTime);
        });
        
        // Reset on end
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            if (gainNode) {
                gainNode.gain.value = 1.0;
            } else {
                audio.volume = TARGET_VOLUME;
            }
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            if (fadeInterval) {
                clearInterval(fadeInterval);
                fadeInterval = null;
            }
        });
        
        // Seek functionality (within 15 seconds)
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * TRAILER_DURATION;
            if (gainNode) {
                gainNode.gain.value = 1.0;
            } else {
                audio.volume = TARGET_VOLUME;
            }
            if (fadeInterval) {
                clearInterval(fadeInterval);
                fadeInterval = null;
            }
        });
    });
}

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Admin API functions
let currentAdminCategory = 'covers';
let currentEditItem = null;

async function loadAdminPortfolio(category) {
    const listEl = document.getElementById('admin-items-list');
    listEl.innerHTML = '<div class="loading">Loading...</div>';
    
    console.log('Loading admin portfolio for category:', category);
    console.log('API Base:', API_BASE);
    console.log('User ID:', tg.initDataUnsafe?.user?.id);
    
    try {
        const url = `${API_BASE}/api/portfolio?category=${category}`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url, {
            headers: {
                'X-User-ID': tg.initDataUnsafe?.user?.id || ''
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', errorText);
            throw new Error('Failed to load');
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        const items = data.items || [];
        console.log('Items count:', items.length);
        console.log('Items:', items);
        
        if (items.length === 0) {
            listEl.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 40px 20px;">${currentLang === 'en' ? 'No items yet. Upload via bot!' : 'Пока нет элементов. Загрузите через бота!'}</p>`;
            return;
        }
        
        listEl.innerHTML = '';
        items.forEach(item => {
            console.log('Processing item:', item);
            
            const card = document.createElement('div');
            card.className = 'admin-item-card';
            
            // Get preview URL
            let previewUrl = '';
            let previewType = 'image';
            
            if (item.type === 'track') {
                previewUrl = item.cover || '';
            } else if (item.type === 'video') {
                previewUrl = item.file || '';
                previewType = 'video';
            } else {
                previewUrl = item.file || '';
            }
            
            console.log('Preview URL:', previewUrl);
            console.log('Preview type:', previewType);
            
            // Get title
            let title = '';
            if (item.type === 'track') {
                title = `${item.artist} - ${item.track}`;
            } else {
                title = item.title?.[currentLang] || item.title?.en || 'Item';
            }
            
            // Get metadata
            const date = new Date(item.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US');
            const typeLabel = item.type === 'track' ? '🎵 Track' : (item.type === 'video' ? '🎬 Video' : '🖼️ Photo');
            
            // Build card HTML
            card.innerHTML = `
                ${previewType === 'video' 
                    ? `<video class="admin-item-preview" src="${previewUrl}" muted loop playsinline></video>`
                    : `<img class="admin-item-preview" src="${previewUrl}" alt="${title}" onerror="this.style.display='none'; console.error('Failed to load image:', '${previewUrl}')">`
                }
                <div class="admin-item-content">
                    <div class="admin-item-title">${title}</div>
                    <div class="admin-item-meta">${typeLabel} • ${date}</div>
                    <div class="admin-item-actions">
                        ${item.type === 'track' 
                            ? `<button class="admin-item-edit" data-id="${item.id}">
                                <span data-en="✏️ Edit" data-ru="✏️ Изменить">✏️ Edit</span>
                               </button>`
                            : ''
                        }
                        <button class="admin-item-delete" data-id="${item.id}">
                            <span data-en="🗑️ Delete" data-ru="🗑️ Удалить">🗑️ Delete</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Play video on hover (desktop) or tap (mobile)
            if (previewType === 'video') {
                const video = card.querySelector('video');
                card.addEventListener('mouseenter', () => video.play());
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
                card.addEventListener('touchstart', () => {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }
            
            listEl.appendChild(card);
        });
        
        // Update language for new elements
        updateLanguage(currentLang);
        
        // Add edit handlers
        document.querySelectorAll('.admin-item-edit').forEach(btn => {
            btn.addEventListener('click', async () => {
                const itemId = btn.dataset.id;
                const item = items.find(i => i.id === itemId);
                if (item) {
                    showEditModal(item, category);
                }
            });
        });
        
        // Add delete handlers
        document.querySelectorAll('.admin-item-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const itemId = btn.dataset.id;
                const confirmMsg = currentLang === 'en' ? 'Delete this item?' : 'Удалить этот элемент?';
                if (confirm(confirmMsg)) {
                    await deleteAdminItem(currentAdminCategory, itemId);
                }
            });
        });
        
    } catch (error) {
        console.error('Error loading admin portfolio:', error);
        console.error('Error stack:', error.stack);
        listEl.innerHTML = `<p style="text-align: center; color: var(--accent-red); padding: 40px 20px;">${currentLang === 'en' ? 'Error loading items' : 'Ошибка загрузки'}<br><small>${error.message}</small></p>`;
    }
}

function showEditModal(item, category) {
    currentEditItem = { ...item, category };
    
    const modal = document.getElementById('admin-edit-modal');
    const artistInput = document.getElementById('edit-artist');
    const trackInput = document.getElementById('edit-track');
    
    // Fill form
    artistInput.value = item.artist || '';
    trackInput.value = item.track || '';
    
    // Show modal
    modal.classList.add('active');
}

function hideEditModal() {
    const modal = document.getElementById('admin-edit-modal');
    modal.classList.remove('active');
    currentEditItem = null;
}

async function saveEditItem() {
    if (!currentEditItem) return;
    
    const artistInput = document.getElementById('edit-artist');
    const trackInput = document.getElementById('edit-track');
    
    const updatedItem = {
        ...currentEditItem,
        artist: artistInput.value.trim(),
        track: trackInput.value.trim()
    };
    
    try {
        // Get current items
        const response = await fetch(`${API_BASE}/api/portfolio?category=${currentEditItem.category}`, {
            headers: {
                'X-User-ID': tg.initDataUnsafe?.user?.id || ''
            }
        });
        
        if (!response.ok) throw new Error('Failed to load');
        
        const data = await response.json();
        const items = data.items || [];
        
        // Update item
        const index = items.findIndex(i => i.id === currentEditItem.id);
        if (index !== -1) {
            items[index] = updatedItem;
            
            // Save back to KV via API
            const saveResponse = await fetch(`${API_BASE}/api/portfolio/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-ID': tg.initDataUnsafe?.user?.id || ''
                },
                body: JSON.stringify({ 
                    category: currentEditItem.category, 
                    items: items 
                })
            });
            
            if (!saveResponse.ok) throw new Error('Failed to save');
            
            alert(currentLang === 'en' ? '✅ Item updated!' : '✅ Элемент обновлен!');
            hideEditModal();
            await loadAdminPortfolio(currentEditItem.category);
        }
        
    } catch (error) {
        console.error('Error saving item:', error);
        alert(currentLang === 'en' ? '❌ Error saving item' : '❌ Ошибка сохранения');
    }
}

async function addAdminItem(category, item) {
    try {
        const response = await fetch(`${API_BASE}/api/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': tg.initDataUnsafe?.user?.id || ''
            },
            body: JSON.stringify({ category, item })
        });
        
        if (!response.ok) throw new Error('Failed to add');
        
        alert(currentLang === 'en' ? '✅ Item added!' : '✅ Элемент добавлен!');
        await loadAdminPortfolio(category);
        
    } catch (error) {
        console.error('Error adding item:', error);
        alert(currentLang === 'en' ? '❌ Error adding item' : '❌ Ошибка добавления');
    }
}

async function deleteAdminItem(category, itemId) {
    try {
        const response = await fetch(`${API_BASE}/api/portfolio?category=${category}&id=${itemId}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': tg.initDataUnsafe?.user?.id || ''
            }
        });
        
        if (!response.ok) throw new Error('Failed to delete');
        
        alert(currentLang === 'en' ? '✅ Item deleted!' : '✅ Элемент удален!');
        await loadAdminPortfolio(category);
        
    } catch (error) {
        console.error('Error deleting item:', error);
        alert(currentLang === 'en' ? '❌ Error deleting item' : '❌ Ошибка удаления');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize sounds
    initSounds();
    
    // Don't play startup sound on load - it will play after swipe animation
    
    // Splash screen swipe up
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    let touchStartY = 0;
    let touchEndY = 0;
    let isTransitioning = false;
    let isDragging = false;
    
    // Define exact positions
    const LOGO_START_Y = window.innerHeight / 2; // Center of screen
    const LOGO_END_Y = 20 + 30; // 20px padding + 30px (half of 60px logo) = 50px from top
    const LOGO_START_SIZE = 320; // 320px
    const LOGO_END_SIZE = 60; // 60px
    
    // Touch events
    splashScreen.addEventListener('touchstart', (e) => {
        if (isTransitioning) return;
        touchStartY = e.touches[0].clientY;
    });
    
    splashScreen.addEventListener('touchmove', (e) => {
        if (isTransitioning) return;
        touchEndY = e.touches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;
        
        // Transform logo during swipe
        if (swipeDistance > 0) {
            const progress = Math.min(swipeDistance / 300, 1); // 300px swipe for full animation
            
            // Calculate scale: from 1.0 (320px) to 0.1875 (60px)
            const scale = 1 - (progress * (1 - LOGO_END_SIZE / LOGO_START_SIZE));
            
            // Calculate position: from center to top
            const currentY = LOGO_START_Y - (progress * (LOGO_START_Y - LOGO_END_Y));
            const translateY = currentY - LOGO_START_Y;
            
            splashLogo.classList.add('shrinking');
            splashLogo.style.transform = `translateY(${translateY}px) scale(${scale})`;
            splashLogo.style.opacity = 1;
        }
    });
    
    splashScreen.addEventListener('touchend', () => {
        if (isTransitioning) return;
        const swipeDistance = touchStartY - touchEndY;
        
        // If swiped up more than 100px
        if (swipeDistance > 100) {
            hideSplashScreen();
        } else {
            // Reset logo smoothly
            splashLogo.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            splashLogo.style.transform = '';
            splashLogo.style.opacity = '';
            setTimeout(() => {
                splashLogo.style.transition = '';
                splashLogo.classList.remove('shrinking');
            }, 300);
        }
    });
    
    // Mouse events for desktop
    splashScreen.addEventListener('mousedown', (e) => {
        if (isTransitioning) return;
        isDragging = true;
        touchStartY = e.clientY;
        splashScreen.style.cursor = 'grabbing';
    });
    
    splashScreen.addEventListener('mousemove', (e) => {
        if (!isDragging || isTransitioning) return;
        touchEndY = e.clientY;
        const swipeDistance = touchStartY - touchEndY;
        
        // Transform logo during swipe
        if (swipeDistance > 0) {
            const progress = Math.min(swipeDistance / 300, 1);
            
            // Calculate scale
            const scale = 1 - (progress * (1 - LOGO_END_SIZE / LOGO_START_SIZE));
            
            // Calculate position
            const currentY = LOGO_START_Y - (progress * (LOGO_START_Y - LOGO_END_Y));
            const translateY = currentY - LOGO_START_Y;
            
            splashLogo.classList.add('shrinking');
            splashLogo.style.transform = `translateY(${translateY}px) scale(${scale})`;
            splashLogo.style.opacity = 1;
        }
    });
    
    splashScreen.addEventListener('mouseup', () => {
        if (!isDragging || isTransitioning) return;
        isDragging = false;
        splashScreen.style.cursor = 'grab';
        
        const swipeDistance = touchStartY - touchEndY;
        
        // If swiped up more than 100px
        if (swipeDistance > 100) {
            hideSplashScreen();
        } else {
            // Reset logo smoothly
            splashLogo.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            splashLogo.style.transform = '';
            splashLogo.style.opacity = '';
            setTimeout(() => {
                splashLogo.style.transition = '';
                splashLogo.classList.remove('shrinking');
            }, 300);
        }
    });
    
    splashScreen.addEventListener('mouseleave', () => {
        if (!isDragging || isTransitioning) return;
        isDragging = false;
        splashScreen.style.cursor = 'grab';
        
        // Reset logo if mouse leaves
        splashLogo.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        splashLogo.style.transform = '';
        splashLogo.style.opacity = '';
        setTimeout(() => {
            splashLogo.style.transition = '';
            splashLogo.classList.remove('shrinking');
        }, 300);
    });
    
    // Set initial cursor
    splashScreen.style.cursor = 'grab';
    
    function hideSplashScreen() {
        isTransitioning = true;
        splashScreen.classList.add('transitioning');
        
        // Calculate final position
        const finalTranslateY = LOGO_END_Y - LOGO_START_Y;
        const finalScale = LOGO_END_SIZE / LOGO_START_SIZE;
        
        // Get main screen elements
        const homeScreen = document.getElementById('home-screen');
        const hero = homeScreen.querySelector('.hero');
        const menuGrid = homeScreen.querySelector('.menu-grid');
        const menuItems = menuGrid.querySelectorAll('.menu-item');
        
        // Prepare main screen (hidden, positioned below)
        homeScreen.style.opacity = '1';
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(0)';
        menuGrid.style.opacity = '1';
        
        // Hide all menu items initially
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(60px)';
        });
        
        // Phase 1: Logo moves to top and shrinks (0-600ms) - FASTER
        splashLogo.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        splashLogo.style.transform = `translateY(${finalTranslateY}px) scale(${finalScale})`;
        splashLogo.style.opacity = '1';
        
        // Phase 2: Splash fades out (300-700ms) - FASTER
        setTimeout(() => {
            splashScreen.style.transition = 'opacity 0.4s ease';
            splashScreen.style.opacity = '0';
        }, 300);
        
        // Phase 3: Show hero with logo (500ms) - FASTER
        setTimeout(() => {
            hero.style.transition = 'opacity 0.3s ease';
            hero.style.opacity = '1';
        }, 500);
        
        // Phase 4: Play startup sound RIGHT when hero appears (500ms)
        setTimeout(() => {
            playSound('startup');
        }, 500);
        
        // Phase 5: Menu items slide up one by one starting RIGHT after sound (550ms start)
        setTimeout(() => {
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 180); // 180ms delay between each button for smooth wave effect
            });
        }, 550);
        
        // Cleanup (900ms) - FASTER
        setTimeout(() => {
            splashScreen.classList.remove('active');
            splashScreen.style.opacity = '';
            splashScreen.style.transition = '';
            splashLogo.style.transform = '';
            splashLogo.style.transition = '';
            splashLogo.style.opacity = '';
            splashLogo.classList.remove('shrinking');
            isTransitioning = false;
        }, 900);
    }
    
    // Swipe down on home screen to show splash again
    const homeScreen = document.getElementById('home-screen');
    let homeSwipeStartY = 0;
    let homeSwipeEndY = 0;
    
    homeScreen.addEventListener('touchstart', (e) => {
        // Only if on home screen and not clicking on buttons
        if (!e.target.closest('.menu-item')) {
            homeSwipeStartY = e.touches[0].clientY;
        }
    });
    
    homeScreen.addEventListener('touchmove', (e) => {
        if (!e.target.closest('.menu-item') && homeSwipeStartY > 0) {
            homeSwipeEndY = e.touches[0].clientY;
        }
    });
    
    homeScreen.addEventListener('touchend', () => {
        if (!isTransitioning && homeSwipeStartY > 0) {
            const swipeDistance = homeSwipeEndY - homeSwipeStartY;
            
            // If swiped down more than 100px from top area
            if (swipeDistance > 100 && homeSwipeStartY < 200) {
                showSplashScreen();
            }
            
            homeSwipeStartY = 0;
            homeSwipeEndY = 0;
        }
    });
    
    function showSplashScreen() {
        isTransitioning = true;
        
        // Show splash screen without animations
        splashLogo.style.animation = 'none';
        splashScreen.classList.add('active');
        splashScreen.style.opacity = '1';
        
        setTimeout(() => {
            isTransitioning = false;
        }, 100);
    }
    
    // Close keyboard when clicking outside input fields
    document.addEventListener('click', (e) => {
        if (!e.target.matches('input, textarea')) {
            // Remove focus from any active input
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                document.activeElement.blur();
            }
        }
    });
    
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
            playSound('select');
            
            const page = item.dataset.page;
            const portfolio = item.dataset.portfolio;
            
            if (page) {
                showScreen(page);
            } else if (portfolio) {
                loadPortfolioCategory(portfolio);
            }
        });
    });
    
    // Service categories
    document.querySelectorAll('.service-category').forEach(item => {
        item.addEventListener('click', () => {
            playSound('select');
            showServiceDetails(item.dataset.category);
        });
    });
    
    // Telegram back button
    tg.BackButton.onClick(() => {
        playSound('select');
        goBack();
    });
    
    // Order form submit
    document.getElementById('order-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            service: document.getElementById('order-title').textContent,
            details: document.getElementById('order-details').value,
            style: document.getElementById('order-style').value,
            requirements: document.getElementById('order-requirements').value,
            deadlineBudget: document.getElementById('order-deadline-budget').value,
            references: document.getElementById('order-references').value,
            contact: document.getElementById('order-contact').value,
            userId: tg.initDataUnsafe?.user?.id || 'unknown',
            userName: tg.initDataUnsafe?.user?.first_name || 'Unknown',
            userUsername: tg.initDataUnsafe?.user?.username || 'no_username'
        };
        
        // Send order to worker API
        try {
            console.log('Sending order to API...', formData);
            
            const response = await fetch(`${API_BASE}/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', response.status);
            
            const result = await response.json();
            console.log('Response data:', result);
            
            if (!response.ok || !result.success) {
                throw new Error('Failed to send order');
            }
            
            // Show success message
            alert(currentLang === 'en' 
                ? '✅ Order sent! We will contact you within 2 hours.' 
                : '✅ Заказ отправлен! Мы свяжемся с вами в течение 2 часов.');
            
            // Go back to home
            showScreen('home');
            
        } catch (error) {
            console.error('Error sending order:', error);
            
            // Show error message
            alert(currentLang === 'en' 
                ? '❌ Error sending order. Please try again or contact @mcrewdm' 
                : '❌ Ошибка отправки заказа. Попробуйте снова или напишите @mcrewdm');
            
            // Go back to home
            showScreen('home');
        }
    });
    
    // Set theme colors
    applyTheme(currentTheme);
    
    // Show admin button if user is admin
    if (isAdmin) {
        document.querySelector('.admin-only').style.display = 'block';
    }
    
    // Admin panel handlers
    if (isAdmin) {
        // Tab switching
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentAdminCategory = tab.dataset.category;
                loadAdminPortfolio(currentAdminCategory);
            });
        });
        
        // Refresh button
        const refreshBtn = document.getElementById('admin-refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                playSound('select');
                loadAdminPortfolio(currentAdminCategory);
            });
        }
        
        // Edit modal handlers
        const editModal = document.getElementById('admin-edit-modal');
        const editForm = document.getElementById('admin-edit-form');
        const editCancelBtn = document.getElementById('admin-edit-cancel');
        
        if (editForm) {
            editForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await saveEditItem();
            });
        }
        
        if (editCancelBtn) {
            editCancelBtn.addEventListener('click', () => {
                hideEditModal();
            });
        }
        
        // Close modal on background click
        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) {
                    hideEditModal();
                }
            });
        }
        
        // Load initial portfolio when admin screen is shown
        const adminScreen = document.getElementById('admin-screen');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    loadAdminPortfolio(currentAdminCategory);
                }
            });
        });
        observer.observe(adminScreen, { attributes: true, attributeFilter: ['class'] });
    }
});
