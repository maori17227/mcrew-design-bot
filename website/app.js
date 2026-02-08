// Configuration
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';
const BOT_USERNAME = 'mcrew_bot';
const GITHUB_BASE = 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/miniapp/';

// State
let currentUser = null;
let currentTheme = 'dark';
let currentLang = 'en';
let currentAudio = null;

// Portfolio Data - All 17 tracks
const PORTFOLIO_TRACKS = [
    {
        artist: 'whylovly, iwabi!',
        track: 'эфирный план',
        cover: `${GITHUB_BASE}porftolio/covers/whylovly iwabi! эфирный план.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Эфирный план - iwabi!.wav`
    },
    {
        artist: 'whylovly',
        track: 'любят',
        cover: `${GITHUB_BASE}porftolio/covers/whylovly любят .jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - любят - whylovly.wav`
    },
    {
        artist: 'whylovly',
        track: 'нужен покой',
        cover: `${GITHUB_BASE}porftolio/covers/whylovly lowsignal.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - нужен покой - whylovly.wav`
    },
    {
        artist: 'whylovly',
        track: 'прошу',
        cover: `${GITHUB_BASE}porftolio/covers/whylovly vindictaNots.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - прошу - whylovly.wav`
    },
    {
        artist: 'so brody',
        track: '1TAKE',
        cover: `${GITHUB_BASE}porftolio/covers/so brody 1take.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - 1TAKE - So brody.wav`
    },
    {
        artist: 'so brody',
        track: 'AMERICA2',
        cover: `${GITHUB_BASE}porftolio/covers/so brody amecrica 2 .jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - AMERICA2 - So brody.wav`
    },
    {
        artist: 'lil flash$ ft. Kinderlil',
        track: 'best',
        cover: `${GITHUB_BASE}porftolio/covers/lil flash$ ft. Kinderlil Best.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - best (ft. kinderlil).wav`
    },
    {
        artist: 'angelik',
        track: 'wya',
        cover: `${GITHUB_BASE}porftolio/covers/angelik wya.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - wya - angelik.wav`
    },
    {
        artist: 'HELLOVERCAVI, SODA LUV',
        track: 'СВАГА',
        cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI, SODA LUV СВАГА.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - СВАГА - HELLOVERCAVI.wav`
    },
    {
        artist: 'HELLOVERCAVI',
        track: 'Калыван кляйн',
        cover: `${GITHUB_BASE}porftolio/covers/HELLOVERCAVI Калыван кляйн.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Калыван Кляйн - HELLOVERCAVI.wav`
    },
    {
        artist: 'valeksi',
        track: 'BIRKIN',
        cover: `${GITHUB_BASE}porftolio/covers/valeksi BIRKIN.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - BIRKIN - Valeksi.wav`
    },
    {
        artist: 'valeksi',
        track: 'GEEK0INIGHT',
        cover: `${GITHUB_BASE}porftolio/covers/valeksi GEEK0INIGHT.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - GEEK0lNIGHT - Valeksi.wav`
    },
    {
        artist: 'valeksi',
        track: 'ZAPOMNISH',
        cover: `${GITHUB_BASE}porftolio/covers/valeksi ZAPOMNISH.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - ZAPOMNISH - Valeksi.wav`
    },
    {
        artist: 'valeksi',
        track: 'SELF-LOVER',
        cover: `${GITHUB_BASE}porftolio/covers/valeksi RAGE LOVER-EP.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - valeksi-SELF-LOVER.wav`
    },
    {
        artist: 'valeksi',
        track: 'FILL ME UP',
        cover: `${GITHUB_BASE}porftolio/covers/valeksi LAST CASE.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - FILL ME UP - Valeksi.wav`
    },
    {
        artist: 'fffuckyousway',
        track: 'fff',
        cover: `${GITHUB_BASE}porftolio/covers/fffuckyousway - fff.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - fffuckyousway.wav`
    },
    {
        artist: 'thot$14er',
        track: 'курить',
        cover: `${GITHUB_BASE}porftolio/covers/thot$14er %23курить.jpg`,
        audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - Курить - thot$14er.wav`
    }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initLanguage();
    initNavigation();
    initScrollAnimations();
    initPortfolio();
    initModals();
});

// Preloader
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
        }, 1000);
    });
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

// Language Management
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    currentLang = savedLang;
    updateLanguageUI();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('language', currentLang);
            updateLanguageUI();
        });
    });
}

function updateLanguageUI() {
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-en][data-ru]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.dataset[currentLang];
        } else {
            el.textContent = el.dataset[currentLang];
        }
    });
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu-link, .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Login button
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.setAttribute('data-scroll', '');
        observer.observe(section);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.setAttribute('data-scroll', '');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Portfolio
function initPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    
    PORTFOLIO_TRACKS.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.setAttribute('data-scroll', '');
        item.style.transitionDelay = `${(index % 3) * 0.1}s`;
        
        item.innerHTML = `
            <img src="${track.cover}" alt="${track.artist} - ${track.track}" loading="lazy">
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-title">${track.artist}</div>
                <div class="portfolio-overlay-subtitle">${track.track}</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            showPortfolioModal(track);
        });
        
        grid.appendChild(item);
    });
    
    // Observe portfolio items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.portfolio-item').forEach(item => {
        observer.observe(item);
    });
}

// Modals
function initModals() {
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.closest('.modal').classList.remove('active');
            stopAllAudio();
        });
    });
    
    // Close modals on close button click
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
            stopAllAudio();
        });
    });
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const widgetContainer = document.getElementById('telegram-widget');
    
    // Clear previous widget
    widgetContainer.innerHTML = '';
    
    // Create Telegram Login Widget
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '0');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    
    widgetContainer.appendChild(script);
    modal.classList.add('active');
}

// Telegram auth callback
window.onTelegramAuth = function(user) {
    currentUser = user;
    localStorage.setItem('telegram_user', JSON.stringify(user));
    updateUserUI();
    document.getElementById('login-modal').classList.remove('active');
};

function updateUserUI() {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        
        if (currentUser.photo_url) {
            userAvatar.src = currentUser.photo_url;
        }
        userName.textContent = currentUser.first_name;
        
        userInfo.addEventListener('click', logout);
    } else {
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
    }
}

function logout() {
    if (confirm(currentLang === 'en' ? 'Logout?' : 'Выйти?')) {
        currentUser = null;
        localStorage.removeItem('telegram_user');
        updateUserUI();
    }
}

function showPortfolioModal(track) {
    const modal = document.getElementById('portfolio-modal');
    const content = document.getElementById('portfolio-modal-content');
    
    const playerId = `modal-player-${Date.now()}`;
    
    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
            <div>
                <img src="${track.cover}" alt="${track.artist} - ${track.track}" style="width: 100%; height: auto; display: block;">
            </div>
            <div>
                <h2 style="font-size: 32px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;">${track.artist}</h2>
                <p style="font-size: 18px; color: var(--text-secondary); margin-bottom: 40px;">${track.track}</p>
                
                <div class="modal-audio-player" data-player-id="${playerId}">
                    <audio id="${playerId}" preload="metadata">
                        <source src="${track.audio}" type="audio/wav">
                    </audio>
                    <button class="modal-play-btn" data-audio-id="${playerId}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="modal-player-info">
                        <div class="modal-progress-bar">
                            <div class="modal-progress-fill"></div>
                        </div>
                        <div class="modal-time-display">
                            <span class="modal-current-time">0:00</span>
                            <span class="modal-duration">0:13</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Initialize audio player
    setTimeout(() => {
        initModalAudioPlayer(playerId);
    }, 100);
}

function initModalAudioPlayer(playerId) {
    const audio = document.getElementById(playerId);
    const btn = document.querySelector(`[data-audio-id="${playerId}"]`);
    const player = btn.closest('.modal-audio-player');
    const progressBar = player.querySelector('.modal-progress-bar');
    const progressFill = player.querySelector('.modal-progress-fill');
    const currentTimeEl = player.querySelector('.modal-current-time');
    const durationEl = player.querySelector('.modal-duration');
    
    const TRAILER_DURATION = 13;
    const TARGET_VOLUME = 0.316;
    
    audio.volume = TARGET_VOLUME;
    currentAudio = audio;
    
    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
        } else {
            audio.pause();
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        }
    });
    
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        
        if (currentTime >= TRAILER_DURATION) {
            audio.pause();
            audio.currentTime = 0;
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
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
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
    
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * TRAILER_DURATION;
    });
}

function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Check for saved user on load
const savedUser = localStorage.getItem('telegram_user');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUserUI();
}
