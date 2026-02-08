// Configuration
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';
const BOT_USERNAME = 'mcrew_bot';
const GITHUB_BASE = 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/miniapp/';

// State
let currentUser = null;
let currentTheme = 'dark';
let currentLang = 'en';
let currentScreen = 'home-screen';

// Services Data
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

// Portfolio Data
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
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Эфирный план - iwabi!.wav`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'любят',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly любят .jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - любят - whylovly.wav`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'нужен покой',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly lowsignal.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - нужен покой - whylovly.wav`
            },
            {
                type: 'track',
                artist: 'whylovly',
                track: 'прошу',
                cover: `${GITHUB_BASE}porftolio/covers/whylovly vindictaNots.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - прошу - whylovly.wav`
            },
            {
                type: 'track',
                artist: 'so brody',
                track: '1TAKE',
                cover: `${GITHUB_BASE}porftolio/covers/so brody 1take.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - 1TAKE - So brody.wav`
            },
            {
                type: 'track',
                artist: 'so brody',
                track: 'AMERICA2',
                cover: `${GITHUB_BASE}porftolio/covers/so brody amecrica 2 .jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - AMERICA2 - So brody.wav`
            },
            {
                type: 'track',
                artist: 'lil flash$ ft. Kinderlil',
                track: 'best',
                cover: `${GITHUB_BASE}porftolio/covers/lil flash$ ft. Kinderlil Best.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - best (ft. kinderlil).wav`
            },
            {
                type: 'track',
                artist: 'angelik',
                track: 'wya',
                cover: `${GITHUB_BASE}porftolio/covers/angelik wya.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - wya - angelik.wav`
            },
            {
                type: 'track',
                artist: 'HELLOVERCAVI, SODA LUV',
                track: 'СВАГА',
                cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI, SODA LUV СВАГА.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - СВАГА - HELLOVERCAVI.wav`
            },
            {
                type: 'track',
                artist: 'HELLOVERCAVI',
                track: 'Калыван кляйн',
                cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI Калыван кляйн.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Калыван Кляйн - HELLOVERCAVI.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'BIRKIN',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi BIRKIN.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - BIRKIN - Valeksi.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'GEEK0INIGHT',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi GEEK0INIGHT.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - GEEK0lNIGHT - Valeksi.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'ZAPOMNISH',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi ZAPOMNISH.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - ZAPOMNISH - Valeksi.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'SELF-LOVER',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi RAGE LOVER-EP.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - valeksi-SELF-LOVER.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'FILL ME UP',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi LAST CASE.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - FILL ME UP - Valeksi.wav`
            },
            {
                type: 'track',
                artist: 'fffuckyousway',
                track: 'fff',
                cover: `${GITHUB_BASE}porftolio/covers/fffuckyousway - fff.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - fffuckyousway.wav`
            },
            {
                type: 'track',
                artist: 'thot$14er',
                track: 'курить',
                cover: `${GITHUB_BASE}porftolio/covers/thot$14er %23курить.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Курить - thot$14er.wav`
            }
        ]
    },
    posters: {
        en: { title: 'Posters & Flyers', description: 'Event materials' },
        ru: { title: 'Постеры и афиши', description: 'Материалы для событий' },
        items: [
            {
                type: 'photo',
                file: `${GITHUB_BASE}posters.jpg`,
                title: { en: 'Event Posters', ru: 'Постеры для событий' }
            }
        ]
    },
    motion: {
        en: { title: 'Motion Design', description: 'Animations & visuals' },
        ru: { title: 'Моушн дизайн', description: 'Анимация и визуалы' },
        items: [
            {
                type: 'video',
                file: `${GITHUB_BASE}motion.mp4`,
                title: { en: 'Motion Graphics', ru: 'Моушн графика' }
            }
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initAuth();
    initNavigation();
    initScreens();
    initModals();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Language Management
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    currentLang = savedLang;
    
    const langToggle = document.getElementById('lang-toggle');
    langToggle.checked = currentLang === 'ru';
    
    langToggle.addEventListener('change', (e) => {
        currentLang = e.target.checked ? 'ru' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage();
    });
    
    updateLanguage();
}

function updateLanguage() {
    // Update all elements with data-en and data-ru attributes
    document.querySelectorAll('[data-en][data-ru]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.dataset[currentLang];
        } else {
            el.textContent = el.dataset[currentLang];
        }
    });
}

// Authentication
function initAuth() {
    const savedUser = localStorage.getItem('telegram_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
    
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const container = document.getElementById('telegram-login-container');
    
    container.innerHTML = '';
    
    // Create Telegram Login Widget
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '4');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    
    container.appendChild(script);
    modal.classList.remove('hidden');
}

window.onTelegramAuth = function(user) {
    currentUser = user;
    localStorage.setItem('telegram_user', JSON.stringify(user));
    updateUserUI();
    document.getElementById('login-modal').classList.add('hidden');
    console.log('Logged in as:', user);
};

function updateUserUI() {
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        
        if (currentUser.photo_url) {
            userAvatar.src = currentUser.photo_url;
        }
        userName.textContent = currentUser.first_name;
        
        userMenu.addEventListener('click', logout);
    } else {
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

function logout() {
    if (confirm(currentLang === 'en' ? 'Logout?' : 'Выйти?')) {
        currentUser = null;
        localStorage.removeItem('telegram_user');
        updateUserUI();
    }
}

// Navigation
function initNavigation() {
    // Logo click - go home
    document.querySelector('.nav-logo').addEventListener('click', () => {
        showScreen('home-screen');
    });
    
    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const screen = item.dataset.screen;
            showScreen(screen);
        });
    });
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            goBack();
        });
    });
}

function showScreen(screenId) {
    const currentScreenEl = document.querySelector('.screen.active');
    const newScreenEl = document.getElementById(screenId);
    
    if (currentScreenEl === newScreenEl) return;
    
    // Exit animation
    if (currentScreenEl) {
        currentScreenEl.classList.add('exiting');
        setTimeout(() => {
            currentScreenEl.classList.remove('active', 'exiting');
        }, 400);
    }
    
    // Enter animation
    setTimeout(() => {
        newScreenEl.classList.add('active');
        currentScreen = screenId;
    }, 200);
}

function goBack() {
    // Simple back navigation
    if (currentScreen === 'service-details-screen') {
        showScreen('services-screen');
    } else if (currentScreen === 'portfolio-detail-screen') {
        showScreen('portfolio-screen');
    } else {
        showScreen('home-screen');
    }
}

// Screens
function initScreens() {
    initServicesScreen();
    initPortfolioScreen();
}

function initServicesScreen() {
    // Service categories
    document.querySelectorAll('.service-category').forEach(cat => {
        cat.addEventListener('click', () => {
            const category = cat.dataset.category;
            showServiceDetails(category);
        });
    });
}

function showServiceDetails(category) {
    const service = SERVICES[category][currentLang];
    const titleEl = document.getElementById('service-title');
    const contentEl = document.getElementById('service-content');
    const screen = document.getElementById('service-details-screen');
    
    screen.dataset.category = category;
    titleEl.textContent = service.title;
    
    let html = '<div class="price-list">';
    service.items.forEach((item, index) => {
        html += `
            <div class="price-item">
                <h4>${item.name}</h4>
                <span class="price">${item.price}</span>
            </div>
        `;
    });
    html += '</div>';
    
    contentEl.innerHTML = html;
    showScreen('service-details-screen');
}

function initPortfolioScreen() {
    // Portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            item.addEventListener('mouseenter', () => video.play());
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
        
        item.addEventListener('click', () => {
            const portfolio = item.dataset.portfolio;
            loadPortfolioCategory(portfolio);
        });
    });
}

async function loadPortfolioCategory(category) {
    const portfolioData = PORTFOLIO[category];
    const grid = document.getElementById('portfolio-detail-grid');
    const titleEl = document.getElementById('portfolio-detail-title');
    
    titleEl.textContent = portfolioData[currentLang].title;
    grid.innerHTML = '';
    
    const items = portfolioData.items;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const div = document.createElement('div');
        div.className = 'portfolio-detail-item';
        
        if (item.type === 'track') {
            const playerId = `player-${i}`;
            div.innerHTML = `
                <img src="${item.cover}" alt="${item.artist} - ${item.track}" loading="lazy">
                <div class="track-info">
                    <h4>${item.artist}</h4>
                    <p>${item.track}</p>
                    ${item.audio ? `
                        <div class="custom-player" data-player-id="${playerId}">
                            <audio id="${playerId}" preload="metadata">
                                <source src="${item.audio}" type="audio/wav">
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
                <div class="track-info">
                    <h4>${item.title[currentLang]}</h4>
                </div>
            `;
        } else if (item.type === 'video') {
            div.innerHTML = `
                <video src="${item.file}" controls playsinline style="width: 100%; height: auto;"></video>
                <div class="track-info">
                    <h4>${item.title[currentLang]}</h4>
                </div>
            `;
        }
        
        grid.appendChild(div);
    }
    
    initAudioPlayers();
    showScreen('portfolio-detail-screen');
}

// Audio Players
function initAudioPlayers() {
    document.querySelectorAll('.play-btn').forEach(btn => {
        const audioId = btn.dataset.audioId;
        const audio = document.getElementById(audioId);
        if (!audio) return;
        
        const player = btn.closest('.custom-player');
        const progressBar = player.querySelector('.progress-bar');
        const progressFill = player.querySelector('.progress-fill');
        const currentTimeEl = player.querySelector('.current-time');
        const durationEl = player.querySelector('.duration');
        
        const TRAILER_DURATION = 13;
        const TARGET_VOLUME = 0.316;
        
        audio.volume = TARGET_VOLUME;
        
        btn.addEventListener('click', () => {
            // Pause all other players
            document.querySelectorAll('audio').forEach(a => {
                if (a.id !== audioId && !a.paused) {
                    a.pause();
                    a.currentTime = 0;
                    const otherBtn = document.querySelector(`[data-audio-id="${a.id}"]`);
                    if (otherBtn) {
                        otherBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                    }
                }
            });
            
            if (audio.paused) {
                audio.play();
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
            } else {
                audio.pause();
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            }
        });
        
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(TRAILER_DURATION);
        });
        
        audio.addEventListener('timeupdate', () => {
            const currentTime = audio.currentTime;
            
            if (currentTime >= TRAILER_DURATION) {
                audio.pause();
                audio.currentTime = 0;
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                progressFill.style.width = '0%';
                currentTimeEl.textContent = '0:00';
                return;
            }
            
            const progress = (currentTime / TRAILER_DURATION) * 100;
            progressFill.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(currentTime);
        });
        
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = '0:00';
        });
        
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * TRAILER_DURATION;
        });
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Modals
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
    });
}
