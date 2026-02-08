// Configuration
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';
const BOT_USERNAME = 'mcrew_bot';
const GITHUB_BASE = 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/miniapp/';

// State
let currentUser = null;
let currentTheme = 'dark';
let currentPortfolioTab = 'covers';

// Portfolio Data (same as miniapp)
const PORTFOLIO = {
    covers: {
        title: 'Track Covers',
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
                artist: 'so brody',
                track: '1TAKE',
                cover: `${GITHUB_BASE}porftolio/covers/so brody 1take.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - 1TAKE - So brody.wav`
            },
            {
                type: 'track',
                artist: 'valeksi',
                track: 'BIRKIN',
                cover: `${GITHUB_BASE}porftolio/covers/valeksi BIRKIN.jpg`,
                audio: `${GITHUB_BASE}porftolio/covers/trailers/трейлеры - BIRKIN - Valeksi.wav`
            }
        ]
    },
    posters: {
        title: 'Posters & Flyers',
        items: [
            {
                type: 'photo',
                file: `${GITHUB_BASE}posters.jpg`,
                title: 'Event Posters'
            }
        ]
    },
    motion: {
        title: 'Motion Design',
        items: [
            {
                type: 'video',
                file: `${GITHUB_BASE}motion.mp4`,
                title: 'Motion Graphics'
            }
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initAuth();
    loadPortfolio();
    initModals();
    initForms();
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

// Navigation
function initNavigation() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Authentication
function initAuth() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('telegram_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
    
    // Login button
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const container = document.getElementById('telegram-login-container');
    
    // Clear previous widget
    container.innerHTML = '';
    
    // Create Telegram Login Widget
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '0');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    
    container.appendChild(script);
    modal.classList.remove('hidden');
}

// Telegram auth callback (must be global)
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
        
        // Add logout functionality
        userMenu.addEventListener('click', logout);
    } else {
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('telegram_user');
        updateUserUI();
    }
}

// Portfolio
function loadPortfolio() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentPortfolioTab = tab.dataset.tab;
            renderPortfolio();
        });
    });
    
    renderPortfolio();
}

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    const data = PORTFOLIO[currentPortfolioTab];
    
    grid.innerHTML = '';
    
    data.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        
        if (item.type === 'track') {
            div.innerHTML = `
                <img src="${item.cover}" alt="${item.artist} - ${item.track}" loading="lazy">
                <div class="portfolio-caption">
                    <h4>${item.artist}</h4>
                    <p>${item.track}</p>
                </div>
            `;
            
            div.addEventListener('click', () => showAudioModal(item));
        } else if (item.type === 'photo') {
            div.innerHTML = `
                <img src="${item.file}" alt="${item.title}" loading="lazy">
                <div class="portfolio-caption">
                    <h4>${item.title}</h4>
                </div>
            `;
        } else if (item.type === 'video') {
            div.innerHTML = `
                <video src="${item.file}" controls playsinline></video>
                <div class="portfolio-caption">
                    <h4>${item.title}</h4>
                </div>
            `;
        }
        
        grid.appendChild(div);
    });
}

// Audio Modal
function showAudioModal(track) {
    const modal = document.getElementById('audio-modal');
    const cover = document.getElementById('modal-cover');
    const artist = document.getElementById('modal-artist');
    const trackName = document.getElementById('modal-track');
    const audio = document.getElementById('modal-audio');
    const playBtn = document.getElementById('modal-play-btn');
    
    cover.src = track.cover;
    artist.textContent = track.artist;
    trackName.textContent = track.track;
    audio.src = track.audio;
    
    modal.classList.remove('hidden');
    
    initAudioPlayer(audio, playBtn);
}

function initAudioPlayer(audio, playBtn) {
    const progressBar = document.querySelector('#audio-modal .progress-bar');
    const progressFill = document.querySelector('#audio-modal .progress-fill');
    const currentTimeEl = document.querySelector('#audio-modal .current-time');
    const durationEl = document.querySelector('#audio-modal .duration');
    
    const TRAILER_DURATION = 13;
    const TARGET_VOLUME = 0.316;
    
    audio.volume = TARGET_VOLUME;
    
    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        }
    });
    
    // Update duration
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(TRAILER_DURATION);
    });
    
    // Update progress
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        
        if (currentTime >= TRAILER_DURATION) {
            audio.pause();
            audio.currentTime = 0;
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            return;
        }
        
        const progress = (currentTime / TRAILER_DURATION) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(currentTime);
    });
    
    // Seek
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * TRAILER_DURATION;
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
        
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            
            // Stop audio if audio modal
            if (modal.id === 'audio-modal') {
                const audio = document.getElementById('modal-audio');
                audio.pause();
                audio.currentTime = 0;
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                
                if (modal.id === 'audio-modal') {
                    const audio = document.getElementById('modal-audio');
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    });
}

// Forms
function initForms() {
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData);
        
        // Here you can send to your API
        console.log('Order submitted:', data);
        
        alert('Thank you! We will contact you soon.');
        orderForm.reset();
    });
}
