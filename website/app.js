// Configuration
const API_BASE = 'https://mcrew-bot.141avatar141.workers.dev';
const BOT_USERNAME = 'mindescrew_bot';
const GITHUB_BASE = 'https://raw.githubusercontent.com/maori17227/mcrew-design-bot/main/miniapp/';

// State
let currentUser = null;
let currentTheme = 'dark';
let currentLang = 'en';
let currentAudio = null;
let currentCategory = null;
let clickedElement = null;
let userBalance = {
    mtv: 0,
    mini: 0
};

// Portfolio Data - Static fallback
const PORTFOLIO_DATA = {
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
                file: `${GITHUB_BASE}posters.png`,
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initLanguage();
    initNavigation();
    initScrollAnimations();
    initPortfolioCategories();
    initModals();
});

// Preloader with logo animation
function initPreloader() {
    // Hide preloader after max 2 seconds or when page loads
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
    };
    
    // Set timeout as fallback
    const timeout = setTimeout(hidePreloader, 2000);
    
    // Hide when page fully loads
    window.addEventListener('load', () => {
        clearTimeout(timeout);
        setTimeout(hidePreloader, 1500);
    });
    
    // Hide if taking too long (fallback)
    setTimeout(hidePreloader, 3000);
}

// Theme - WITH VIEW TRANSITIONS
function initTheme() {
    currentTheme = 'dark';
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    applyTheme(currentTheme);
    
    // Check saved
    const saved = localStorage.getItem('theme');
    if (saved) {
        currentTheme = saved;
        applyTheme(saved);
    }
}

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update logo colors
    updateLogoColors(theme);
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Check if View Transitions API is supported
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            applyTheme(newTheme);
        });
    } else {
        // Fallback for browsers without View Transitions
        applyTheme(newTheme);
    }
}

function updateLogoColors(theme) {
    const logos = document.querySelectorAll('.nav-logo, .hero-logo, .footer-logo, .preloader-logo img');
    
    logos.forEach(logo => {
        if (theme === 'light') {
            // Black logo on white background
            logo.style.filter = 'brightness(0)';
        } else {
            // White logo on black background
            logo.style.filter = 'brightness(0) invert(1)';
        }
    });
}

function setTheme(theme) {
    applyTheme(theme);
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
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.mobile-menu-link, .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Handle portfolio link - БЕЗ ЗАДЕРЖКИ
            if (link.getAttribute('href') === '#portfolio') {
                e.preventDefault();
                const portfolioSection = document.getElementById('portfolio');
                const detailSection = document.getElementById('portfolio-detail');
                
                // Если уже на главной странице портфолио, просто скроллим
                if (!portfolioSection.classList.contains('hidden')) {
                    portfolioSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Если в детальной странице, возвращаемся назад
                    showPortfolioMain();
                }
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#portfolio') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showLoginModal();
        });
    }
    
    // Back to portfolio button
    const backBtn = document.getElementById('back-to-portfolio');
    backBtn.addEventListener('click', () => {
        showPortfolioMain();
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
    
    document.querySelectorAll('section').forEach(section => {
        section.setAttribute('data-scroll', '');
        observer.observe(section);
    });
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.setAttribute('data-scroll-scale', '');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Observe portfolio categories - ВСЕГДА АНИМИРОВАТЬ
    document.querySelectorAll('.portfolio-category').forEach((cat, index) => {
        cat.setAttribute('data-scroll-scale', '');
        cat.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(cat);
    });
}

// Portfolio Categories
function initPortfolioCategories() {
    document.querySelectorAll('.portfolio-category').forEach(category => {
        const video = category.querySelector('video');
        if (video) {
            // Make video loop
            video.loop = true;
            video.muted = true;
            video.preload = 'auto';
            video.playsInline = true;
            video.autoplay = true;
            
            // Add multiple event listeners to ensure loading
            video.addEventListener('loadeddata', () => {
                console.log('Video loaded successfully');
                video.play().catch(e => console.log('Autoplay prevented:', e));
            });
            
            video.addEventListener('canplay', () => {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            });
            
            // Force load video immediately
            video.load();
            
            // Try to play after a short delay
            setTimeout(() => {
                if (video.paused) {
                    video.play().catch(e => {
                        console.log('Initial autoplay prevented, will play on interaction');
                        // Try again on any user interaction
                        const playOnInteraction = () => {
                            video.play().catch(() => {});
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('scroll', playOnInteraction);
                        };
                        document.addEventListener('click', playOnInteraction, { once: true });
                        document.addEventListener('scroll', playOnInteraction, { once: true });
                    });
                }
            }, 200);
            
            // Autoplay when visible - БЕЗ ОСТАНОВКИ ПРИ НАВЕДЕНИИ
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Autoplay prevented'));
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(category);
            
            // Ensure video is visible
            video.style.display = 'block';
            video.style.width = '100%';
            video.style.height = '100%';
        }
        
        category.addEventListener('click', () => {
            category.classList.add('active');
            setTimeout(() => {
                category.classList.remove('active');
            }, 300);
            
            const cat = category.dataset.category;
            loadPortfolioCategory(cat);
        });
    });
}

function showPortfolioMain() {
    const portfolioSection = document.getElementById('portfolio');
    const detailSection = document.getElementById('portfolio-detail');
    
    // Плавное исчезновение детальной страницы
    detailSection.style.transition = 'opacity 0.4s ease';
    detailSection.style.opacity = '0';
    
    setTimeout(() => {
        detailSection.classList.add('hidden');
        detailSection.style.opacity = '';
        portfolioSection.classList.remove('hidden');
        
        // Scroll to portfolio section
        portfolioSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // ОЧЕНЬ ПЛАВНАЯ анимация для всех 3 категорий
        const categories = document.querySelectorAll('.portfolio-category');
        
        // Убираем visible класс чтобы анимация сработала заново
        categories.forEach(cat => {
            cat.classList.remove('visible');
            cat.style.opacity = '0';
            cat.style.transform = 'translateY(30px)';
            cat.style.transition = 'none';
        });
        
        // Force reflow
        portfolioSection.offsetHeight;
        
        // Плавное появление с задержкой
        categories.forEach((cat, index) => {
            setTimeout(() => {
                cat.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                cat.style.opacity = '1';
                cat.style.transform = 'translateY(0)';
                cat.classList.add('visible');
            }, 100 + (index * 150));
        });
    }, 400);
}

async function loadPortfolioCategory(category) {
    currentCategory = category;
    const portfolioSection = document.getElementById('portfolio');
    const detailSection = document.getElementById('portfolio-detail');
    const grid = document.getElementById('portfolio-detail-grid');
    const titleEl = document.getElementById('portfolio-detail-title');
    
    // Hide main portfolio, show detail
    portfolioSection.classList.add('hidden');
    detailSection.classList.remove('hidden');
    
    // Set title
    const categoryData = PORTFOLIO_DATA[category];
    titleEl.textContent = categoryData[currentLang].title;
    
    // Clear grid completely
    grid.innerHTML = '';
    
    // ALWAYS use static data - no API calls to prevent duplicates
    const items = [...categoryData.items];
    
    // Load items
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.setAttribute('data-scroll-scale', '');
        div.style.transitionDelay = `${(index % 3) * 0.1}s`;
        
        if (item.type === 'track') {
            div.innerHTML = `
                <img src="${item.cover}" alt="${item.artist} - ${item.track}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-title">${item.artist}</div>
                    <div class="portfolio-overlay-subtitle">${item.track}</div>
                </div>
            `;
            
            div.addEventListener('click', () => {
                console.log('Track clicked:', item.artist, item.track);
                showPortfolioModal(item, div);
            });
        } else if (item.type === 'photo') {
            div.innerHTML = `
                <img src="${item.file}" alt="${item.title[currentLang]}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-title">${item.title[currentLang]}</div>
                </div>
            `;
            
            div.addEventListener('click', () => {
                showImageModal(item.file, div);
            });
        } else if (item.type === 'video') {
            div.innerHTML = `
                <video muted loop playsinline preload="auto">
                    <source src="${item.file}" type="video/mp4">
                </video>
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-title">${item.title[currentLang]}</div>
                </div>
            `;
            
            const video = div.querySelector('video');
            
            // Force load video
            video.load();
            
            // Try to play immediately
            setTimeout(() => {
                video.play().catch(e => console.log('Video autoplay prevented'));
            }, 100);
            
            // Autoplay when in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Video autoplay prevented'));
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            videoObserver.observe(div);
            
            // Show in modal on click - СИНХРОНИЗАЦИЯ ВРЕМЕНИ
            div.addEventListener('click', () => {
                const currentTime = video.currentTime;
                showVideoModal(item.file, div, currentTime);
            });
        }
        
        grid.appendChild(div);
    });
    
    // Scroll to top of detail section
    detailSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Observe new items with proper animation
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden-back');
                } else {
                    if (entry.boundingClientRect.top > window.innerHeight / 2) {
                        entry.target.classList.remove('visible');
                        entry.target.classList.add('hidden-back');
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.portfolio-item').forEach(item => {
            observer.observe(item);
        });
    }, 100);
}

// Modals
function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeModal(overlay.closest('.modal'));
        });
    });
    
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal'));
        });
    });
}

function closeModal(modal) {
    // Add closing class for animation
    modal.classList.add('closing');
    
    // Wait for animation to complete
    setTimeout(() => {
        modal.classList.remove('active');
        modal.classList.remove('closing');
        stopAllMedia();
    }, 300);
}

function stopAllMedia() {
    // Stop all audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    // Stop all videos in modals
    document.querySelectorAll('.modal video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const widgetContainer = document.getElementById('telegram-widget');
    
    widgetContainer.innerHTML = '';
    
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
    const profileSection = document.getElementById('profile');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        
        if (currentUser.photo_url) {
            userAvatar.src = currentUser.photo_url;
        }
        userName.textContent = currentUser.first_name;
        
        userInfo.addEventListener('click', () => {
            // Scroll to profile
            profileSection.classList.remove('hidden');
            profileSection.scrollIntoView({ behavior: 'smooth' });
            updateProfileDisplay();
        });
        
        // Show profile section
        profileSection.classList.remove('hidden');
        
        // Load balance
        loadUserBalance();
        
        // Update contact username in order form
        const contactUsernameDisplay = document.getElementById('contact-username-display');
        if (contactUsernameDisplay && currentUser.username) {
            contactUsernameDisplay.textContent = '@' + currentUser.username;
        }
    } else {
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
        profileSection.classList.add('hidden');
    }
}

// Load user balance
async function loadUserBalance() {
    try {
        // Try to load from API
        const response = await fetch(`${API_BASE}/api/user/${currentUser.id}/balance`);
        if (response.ok) {
            const data = await response.json();
            userBalance = data.balance || { mtv: 0, mini: 0 };
        } else {
            // Load from localStorage
            const saved = localStorage.getItem('mcrew_balance_' + currentUser.id);
            if (saved) {
                userBalance = JSON.parse(saved);
            }
        }
    } catch (error) {
        console.log('Failed to load balance from API, using localStorage');
        const saved = localStorage.getItem('mcrew_balance_' + currentUser.id);
        if (saved) {
            userBalance = JSON.parse(saved);
        }
    }
    
    // Save to localStorage
    localStorage.setItem('mcrew_balance_' + currentUser.id, JSON.stringify(userBalance));
    
    // Update profile display
    updateProfileDisplay();
}

// Update profile display
function updateProfileDisplay() {
    if (!currentUser) return;
    
    const profileAvatar = document.getElementById('profile-avatar-img');
    const profileName = document.getElementById('profile-name-display');
    const profileUsername = document.getElementById('profile-username-display');
    const balanceMtv = document.getElementById('profile-balance-mtv');
    const balanceMini = document.getElementById('profile-balance-mini');
    
    if (profileName) {
        profileName.textContent = currentUser.first_name + (currentUser.last_name ? ' ' + currentUser.last_name : '');
    }
    
    if (profileUsername && currentUser.username) {
        profileUsername.textContent = '@' + currentUser.username;
    } else if (profileUsername) {
        profileUsername.textContent = 'ID: ' + currentUser.id;
    }
    
    if (profileAvatar && currentUser.photo_url) {
        profileAvatar.src = currentUser.photo_url;
        profileAvatar.classList.add('loaded');
    }
    
    if (balanceMtv) {
        const mtv = Math.floor(userBalance.mini / 100);
        const mini = userBalance.mini % 100;
        balanceMtv.textContent = mtv + '.' + mini.toString().padStart(2, '0');
    }
    
    if (balanceMini) {
        balanceMini.textContent = userBalance.mini;
    }
}

// Format MTV amount
function formatMTV(mini) {
    const mtv = Math.floor(mini / 100);
    const miniPart = mini % 100;
    return `${mtv}.${miniPart.toString().padStart(2, '0')}`;
}

function logout() {
    if (confirm(currentLang === 'en' ? 'Logout?' : 'Выйти?')) {
        currentUser = null;
        localStorage.removeItem('telegram_user');
        updateUserUI();
    }
}

// Extract dominant color from image
function getDominantColor(imageSrc, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;
    
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let r = 0, g = 0, b = 0;
        const pixelCount = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }
        
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);
        
        callback(`rgb(${r}, ${g}, ${b})`);
    };
    
    img.onerror = function() {
        callback('rgb(20, 20, 20)');
    };
}

function showPortfolioModal(track, sourceElement) {
    console.log('showPortfolioModal called with:', track);
    const modal = document.getElementById('portfolio-modal');
    const content = document.getElementById('portfolio-modal-content');
    
    if (!modal) {
        console.error('Portfolio modal not found!');
        return;
    }
    
    if (!content) {
        console.error('Portfolio modal content not found!');
        return;
    }
    
    const playerId = `modal-player-${Date.now()}`;
    
    // Get dominant color from cover
    getDominantColor(track.cover, (color) => {
        console.log('Dominant color:', color);
        content.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; background: linear-gradient(135deg, ${color} 0%, rgba(0,0,0,0.95) 100%); padding: 60px; border-radius: 24px;">
                <div class="modal-track-cover">
                    <img src="${track.cover}" alt="${track.artist} - ${track.track}" style="width: 100%; height: auto; display: block; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border-radius: 16px;">
                </div>
                <div class="modal-track-info">
                    <h2 class="modal-track-artist">${track.artist}</h2>
                    <p class="modal-track-title">${track.track}</p>
                    
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
        
        console.log('Adding active class to modal');
        modal.classList.add('active');
        
        setTimeout(() => {
            initModalAudioPlayer(playerId);
        }, 100);
    });
}

function showImageModal(imageSrc, sourceElement) {
    const modal = document.getElementById('portfolio-modal');
    const content = document.getElementById('portfolio-modal-content');
    
    content.innerHTML = `
        <div class="modal-image-container">
            <img src="${imageSrc}" alt="Portfolio" style="width: 100%; height: auto; display: block; border-radius: 12px;">
        </div>
    `;
    
    modal.classList.add('active');
}

function showVideoModal(videoSrc, sourceElement, startTime = 0) {
    const modal = document.getElementById('portfolio-modal');
    const content = document.getElementById('portfolio-modal-content');
    
    content.innerHTML = `
        <div class="modal-video-container">
            <video controls playsinline style="width: 100%; height: auto; display: block; background: #000; border-radius: 16px;">
                <source src="${videoSrc}" type="video/mp4">
            </video>
        </div>
    `;
    
    const video = content.querySelector('video');
    
    // Load and set start time
    video.load();
    
    // Set current time and play when ready
    video.addEventListener('canplay', () => {
        video.currentTime = startTime;
        video.play().catch(e => {
            console.log('Autoplay blocked, user needs to click play');
        });
    }, { once: true });
    
    modal.classList.add('active');
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


// Service Order Form
function initServiceOrders() {
    document.querySelectorAll('.service-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.service-card');
            const service = card.dataset.service;
            showPricingModal(service);
        });
    });
}

// Pricing data matching miniapp structure
const PRICING_DATA = {
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
    }
};

function showPricingModal(service) {
    const modal = document.getElementById('pricing-modal');
    const content = document.getElementById('pricing-modal-content');
    const pricing = PRICING_DATA[service][currentLang];
    
    let html = `
        <div class="pricing-modal-container">
            <h2 class="pricing-modal-title">${pricing.title}</h2>
            <div class="pricing-list">
    `;
    
    pricing.items.forEach((item, index) => {
        html += `
            <div class="pricing-item" data-service="${service}" data-index="${index}">
                <div class="pricing-item-info">
                    <h4 class="pricing-item-name">${item.name}</h4>
                    <span class="pricing-item-price">${item.price}</span>
                </div>
                <button class="pricing-order-btn" data-en="Order" data-ru="Заказать">${currentLang === 'en' ? 'Order' : 'Заказать'}</button>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    modal.classList.add('active');
    
    // Add click handlers
    setTimeout(() => {
        document.querySelectorAll('.pricing-order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = btn.closest('.pricing-item');
                const serviceType = item.dataset.service;
                const index = item.dataset.index;
                modal.classList.remove('active');
                setTimeout(() => {
                    showOrderModal(serviceType, index);
                }, 300);
            });
        });
    }, 100);
}

function showOrderModal(service, itemIndex) {
    const modal = document.getElementById('order-modal');
    const modalTitle = document.getElementById('order-modal-title');
    const pricing = PRICING_DATA[service][currentLang];
    const item = pricing.items[itemIndex];
    
    modalTitle.textContent = `${currentLang === 'en' ? 'Order' : 'Заказать'}: ${item.name} (${item.price})`;
    modal.dataset.service = service;
    modal.dataset.itemIndex = itemIndex;
    modal.classList.add('active');
}

// Order Form Submit
function initOrderForm() {
    const form = document.getElementById('order-form');
    const contactRadios = document.querySelectorAll('input[name="contact-type"]');
    const contactInput = document.getElementById('order-contact');
    const contactUsernameDisplay = document.getElementById('contact-username-display');
    
    // Update username display when user logs in
    function updateContactUsername() {
        if (currentUser && currentUser.username) {
            contactUsernameDisplay.textContent = '@' + currentUser.username;
        } else {
            contactUsernameDisplay.textContent = '@username';
        }
    }
    
    updateContactUsername();
    
    // Show/hide custom contact input
    contactRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'custom') {
                contactInput.style.display = 'block';
                contactInput.required = true;
            } else {
                contactInput.style.display = 'none';
                contactInput.required = false;
            }
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const modal = document.getElementById('order-modal');
        const service = modal.dataset.service;
        const serviceTitle = document.getElementById('order-modal-title').textContent;
        
        // Get contact
        const contactType = document.querySelector('input[name="contact-type"]:checked').value;
        let contact;
        if (contactType === 'username') {
            if (currentUser && currentUser.username) {
                contact = '@' + currentUser.username;
            } else {
                alert(currentLang === 'en' 
                    ? 'Please login with Telegram or select "Enter different contact"' 
                    : 'Пожалуйста, войдите через Telegram или выберите "Ввести другой контакт"');
                return;
            }
        } else {
            contact = contactInput.value;
            if (!contact) {
                alert(currentLang === 'en' ? 'Please enter contact' : 'Пожалуйста, введите контакт');
                return;
            }
        }
        
        const orderData = {
            service: serviceTitle,
            details: document.getElementById('order-details').value,
            style: document.getElementById('order-style').value,
            requirements: document.getElementById('order-requirements').value,
            deadline_budget: document.getElementById('order-deadline-budget').value,
            references: document.getElementById('order-references').value,
            contact: contact,
            user: currentUser ? {
                id: currentUser.id,
                first_name: currentUser.first_name,
                username: currentUser.username
            } : null,
            timestamp: new Date().toISOString()
        };
        
        // Format message for Telegram
        const message = `
🆕 NEW ORDER FROM WEBSITE

📦 Service: ${orderData.service}

📝 PROJECT DETAILS:
${orderData.details || 'Not specified'}

🎨 STYLE & COLORS:
${orderData.style || 'Not specified'}

📐 REQUIREMENTS:
${orderData.requirements || 'Not specified'}

⏰ DEADLINE & BUDGET:
${orderData.deadline_budget || 'Not specified'}

🔗 REFERENCES:
${orderData.references || 'Not specified'}

📞 CONTACT: ${orderData.contact}

${orderData.user ? `👤 User: ${orderData.user.first_name} (@${orderData.user.username || 'no username'})` : ''}

🕐 ${new Date().toLocaleString()}
        `.trim();
        
        try {
            // Send to API with correct structure
            const response = await fetch(`${API_BASE}/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: serviceTitle,
                    details: orderData.details,
                    style: orderData.style,
                    requirements: orderData.requirements,
                    deadlineBudget: orderData.deadline_budget,
                    references: orderData.references,
                    contact: orderData.contact,
                    userId: currentUser ? currentUser.id : null,
                    userName: currentUser ? currentUser.first_name : 'Guest',
                    userUsername: currentUser ? currentUser.username : 'no_username',
                    source: 'website'
                })
            });
            
            if (response.ok) {
                alert(currentLang === 'en' 
                    ? '✅ Order sent! We will contact you soon.' 
                    : '✅ Заказ отправлен! Мы свяжемся с вами в ближайшее время.');
                form.reset();
                modal.classList.remove('active');
                // Reset radio to username
                document.querySelector('input[name="contact-type"][value="username"]').checked = true;
                contactInput.style.display = 'none';
            } else {
                throw new Error('Failed to send order');
            }
        } catch (error) {
            console.error('Error sending order:', error);
            alert(currentLang === 'en' 
                ? '❌ Error sending order. Please try again or contact @mcrewdm directly.' 
                : '❌ Ошибка отправки заказа. Попробуйте снова или напишите @mcrewdm напрямую.');
        }
    });
}

// Enhanced Scroll Animations with proper reverse
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden-back');
            } else {
                // Only hide if scrolling up (element is below viewport)
                if (entry.boundingClientRect.top > window.innerHeight / 2) {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('hidden-back');
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('[data-scroll], [data-scroll-scale]').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Navigation with Animation
function enhanceNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#portfolio') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Add smooth animation
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initLanguage();
    initNavigation();
    initScrollAnimations();
    initEnhancedScrollAnimations();
    initPortfolioCategories();
    initServiceOrders();
    initOrderForm();
    initModals();
    enhanceNavigation();
    
    // Apply theme immediately
    applyTheme(currentTheme);
    
    // Buy MTV button
    const buyMtvButton = document.getElementById('buy-mtv-button');
    if (buyMtvButton) {
        buyMtvButton.addEventListener('click', () => {
            alert(currentLang === 'en' 
                ? '💳 MTV Purchase\n\nComing soon! You will be able to buy MTV using Telegram Stars.\n\n1 ⭐ = 10 ɱ\n\nStay tuned!' 
                : '💳 Покупка MTV\n\nСкоро! Вы сможете купить MTV используя Telegram Stars.\n\n1 ⭐ = 10 ɱ\n\nОставайтесь на связи!');
        });
    }
});


// ============================================
// CRYPTO PAYMENT SYSTEM & PROFILE
// ============================================

// TON Connect initialization
let tonConnectUI = null;
let tonWallet = null;

function initTONConnect() {
    try {
        tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://mcrew-website.pages.dev/tonconnect-manifest.json',
            buttonRootId: 'ton-connect-button'
        });
        
        tonConnectUI.onStatusChange(wallet => {
            if (wallet) {
                tonWallet = wallet;
                updateTONWalletUI();
            } else {
                tonWallet = null;
                updateTONWalletUI();
            }
        });
    } catch (error) {
        console.log('TON Connect not available:', error);
    }
}

function updateTONWalletUI() {
    const walletInfo = document.getElementById('ton-wallet-info');
    const walletAddress = document.getElementById('ton-wallet-address');
    const connectBtn = document.getElementById('ton-connect-btn');
    
    if (tonWallet) {
        const address = tonWallet.account.address;
        const shortAddress = address.slice(0, 6) + '...' + address.slice(-4);
        walletAddress.textContent = shortAddress;
        walletInfo.classList.remove('hidden');
        connectBtn.classList.add('hidden');
    } else {
        walletInfo.classList.add('hidden');
        connectBtn.classList.remove('hidden');
    }
}

// Profile Navigation
function showProfile() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    const profileSection = document.getElementById('profile');
    const otherSections = document.querySelectorAll('section:not(#profile)');
    const nav = document.getElementById('nav');
    
    // Hide all other sections
    otherSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show profile
    profileSection.classList.remove('hidden');
    profileSection.style.display = 'block';
    
    // Hide nav
    nav.style.display = 'none';
    
    // Update profile data
    updateProfileDisplay();
    loadUserTransactions();
    loadUserOrders();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideProfile() {
    const profileSection = document.getElementById('profile');
    const otherSections = document.querySelectorAll('section:not(#profile)');
    const nav = document.getElementById('nav');
    
    // Show all other sections
    otherSections.forEach(section => {
        section.style.display = '';
    });
    
    // Hide profile
    profileSection.classList.add('hidden');
    profileSection.style.display = 'none';
    
    // Show nav
    nav.style.display = '';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load user transactions
async function loadUserTransactions() {
    if (!currentUser) return;
    
    const transactionsList = document.getElementById('transactions-list');
    
    try {
        const response = await fetch(`${API_BASE}/api/user/${currentUser.id}/transactions`);
        if (response.ok) {
            const data = await response.json();
            const transactions = data.transactions || [];
            
            if (transactions.length === 0) {
                transactionsList.innerHTML = `<div class="transactions-empty" data-en="No transactions yet" data-ru="Пока нет транзакций">${currentLang === 'en' ? 'No transactions yet' : 'Пока нет транзакций'}</div>`;
                return;
            }
            
            transactionsList.innerHTML = '';
            transactions.forEach(tx => {
                const txEl = createTransactionElement(tx);
                transactionsList.appendChild(txEl);
            });
        } else {
            transactionsList.innerHTML = `<div class="transactions-empty" data-en="No transactions yet" data-ru="Пока нет транзакций">${currentLang === 'en' ? 'No transactions yet' : 'Пока нет транзакций'}</div>`;
        }
    } catch (error) {
        console.error('Error loading transactions:', error);
        transactionsList.innerHTML = `<div class="transactions-empty" data-en="No transactions yet" data-ru="Пока нет транзакций">${currentLang === 'en' ? 'No transactions yet' : 'Пока нет транзакций'}</div>`;
    }
}

function createTransactionElement(tx) {
    const div = document.createElement('div');
    div.className = 'transaction-item';
    
    const typeIcon = tx.type === 'deposit' ? '↓' : '↑';
    const typeClass = tx.type === 'deposit' ? 'tx-deposit' : 'tx-withdraw';
    const typeText = tx.type === 'deposit' ? 
        (currentLang === 'en' ? 'Deposit' : 'Пополнение') : 
        (currentLang === 'en' ? 'Withdraw' : 'Вывод');
    
    const date = new Date(tx.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ru-RU');
    
    div.innerHTML = `
        <div class="tx-icon ${typeClass}">${typeIcon}</div>
        <div class="tx-info">
            <div class="tx-type">${typeText}</div>
            <div class="tx-date">${date}</div>
        </div>
        <div class="tx-amount ${typeClass}">${tx.type === 'deposit' ? '+' : '-'}${formatMTV(tx.amount)} ɱ</div>
    `;
    
    return div;
}

// Load user orders
async function loadUserOrders() {
    if (!currentUser) return;
    
    const ordersList = document.getElementById('orders-history-list');
    const ordersCount = document.getElementById('profile-orders-count');
    
    try {
        const response = await fetch(`${API_BASE}/api/user/${currentUser.id}/orders`);
        if (response.ok) {
            const data = await response.json();
            const orders = data.orders || [];
            
            ordersCount.textContent = orders.length;
            
            if (orders.length === 0) {
                ordersList.innerHTML = `<div class="orders-empty" data-en="No orders yet" data-ru="Пока нет заказов">${currentLang === 'en' ? 'No orders yet' : 'Пока нет заказов'}</div>`;
                return;
            }
            
            ordersList.innerHTML = '';
            orders.slice(0, 5).forEach(order => {
                const orderEl = createOrderHistoryElement(order);
                ordersList.appendChild(orderEl);
            });
        } else {
            ordersList.innerHTML = `<div class="orders-empty" data-en="No orders yet" data-ru="Пока нет заказов">${currentLang === 'en' ? 'No orders yet' : 'Пока нет заказов'}</div>`;
            ordersCount.textContent = '0';
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersList.innerHTML = `<div class="orders-empty" data-en="No orders yet" data-ru="Пока нет заказов">${currentLang === 'en' ? 'No orders yet' : 'Пока нет заказов'}</div>`;
        ordersCount.textContent = '0';
    }
}

function createOrderHistoryElement(order) {
    const div = document.createElement('div');
    div.className = 'order-history-item';
    
    const statusClass = order.status === 'completed' ? 'order-completed' : 
                       order.status === 'in-progress' ? 'order-in-progress' : 'order-pending';
    const statusText = order.status === 'completed' ? 
        (currentLang === 'en' ? 'Completed' : 'Завершен') :
        order.status === 'in-progress' ? 
        (currentLang === 'en' ? 'In Progress' : 'В работе') :
        (currentLang === 'en' ? 'Pending' : 'Ожидает');
    
    const date = new Date(order.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ru-RU');
    
    div.innerHTML = `
        <div class="order-history-info">
            <div class="order-history-service">${order.service}</div>
            <div class="order-history-date">${date}</div>
        </div>
        <div class="order-history-status ${statusClass}">${statusText}</div>
    `;
    
    return div;
}

// Crypto deposit modal
function showCryptoDepositModal() {
    const modal = document.getElementById('crypto-deposit-modal');
    modal.classList.add('active');
}

function showCryptoWithdrawModal() {
    const modal = document.getElementById('crypto-withdraw-modal');
    modal.classList.add('active');
}

// Crypto method switching
document.querySelectorAll('.crypto-method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const method = btn.dataset.method;
        
        // Update buttons
        document.querySelectorAll('.crypto-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        document.querySelectorAll('.crypto-method-content').forEach(c => c.classList.remove('active'));
        document.querySelector(`.crypto-method-content[data-method="${method}"]`).classList.add('active');
    });
});

// TON amount calculation
const tonAmountInput = document.getElementById('ton-amount');
if (tonAmountInput) {
    tonAmountInput.addEventListener('input', (e) => {
        const tonAmount = parseFloat(e.target.value) || 0;
        const mtvAmount = Math.floor(tonAmount * 100);
        document.getElementById('ton-amount-mtv').textContent = mtvAmount;
    });
}

// USDT amount calculation
const usdtAmountInput = document.getElementById('usdt-amount');
if (usdtAmountInput) {
    usdtAmountInput.addEventListener('input', (e) => {
        const usdtAmount = parseFloat(e.target.value) || 0;
        const mtvAmount = Math.floor(usdtAmount * 1);
        document.getElementById('usdt-amount-mtv').textContent = mtvAmount;
    });
}

// Withdraw amount calculation
const withdrawAmountInput = document.getElementById('withdraw-amount');
if (withdrawAmountInput) {
    withdrawAmountInput.addEventListener('input', (e) => {
        const mtvAmount = parseFloat(e.target.value) || 0;
        const tonAmount = (mtvAmount / 100).toFixed(2);
        document.getElementById('withdraw-amount-crypto').textContent = tonAmount;
    });
}

// TON Connect button
const tonConnectBtn = document.getElementById('ton-connect-btn');
if (tonConnectBtn) {
    tonConnectBtn.addEventListener('click', async () => {
        if (tonConnectUI) {
            try {
                await tonConnectUI.openModal();
            } catch (error) {
                console.error('Error connecting TON wallet:', error);
                alert(currentLang === 'en' ? 
                    'Error connecting wallet. Please try again.' : 
                    'Ошибка подключения кошелька. Попробуйте снова.');
            }
        } else {
            alert(currentLang === 'en' ? 
                'TON Connect not available. Please use Telegram Mini App.' : 
                'TON Connect недоступен. Используйте Telegram Mini App.');
        }
    });
}

// TON Deposit button
const tonDepositBtn = document.getElementById('ton-deposit-btn');
if (tonDepositBtn) {
    tonDepositBtn.addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('ton-amount').value);
        
        if (!amount || amount < 0.1) {
            alert(currentLang === 'en' ? 
                'Minimum deposit: 0.1 TON' : 
                'Минимальное пополнение: 0.1 TON');
            return;
        }
        
        if (!tonWallet) {
            alert(currentLang === 'en' ? 
                'Please connect your wallet first' : 
                'Сначала подключите кошелек');
            return;
        }
        
        try {
            // Send TON transaction
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        address: 'UQBtzC02MspGw-2_st7E-wVW2wUxd-dp9Hn5BNlH10DGkY4S', // Your TON wallet address
                        amount: (amount * 1000000000).toString(), // Convert to nanotons
                        payload: btoa(JSON.stringify({
                            userId: currentUser.id,
                            type: 'deposit'
                        }))
                    }
                ]
            };
            
            const result = await tonConnectUI.sendTransaction(transaction);
            
            // Save transaction to backend
            await saveTransaction({
                userId: currentUser.id,
                type: 'deposit',
                amount: Math.floor(amount * 100),
                currency: 'TON',
                txHash: result.boc
            });
            
            // Update balance
            userBalance.mini += Math.floor(amount * 100);
            localStorage.setItem('mcrew_balance_' + currentUser.id, JSON.stringify(userBalance));
            updateProfileDisplay();
            
            alert(currentLang === 'en' ? 
                '✅ Deposit successful!' : 
                '✅ Пополнение успешно!');
            
            document.getElementById('crypto-deposit-modal').classList.remove('active');
            
        } catch (error) {
            console.error('Error sending TON:', error);
            alert(currentLang === 'en' ? 
                'Error processing transaction. Please try again.' : 
                'Ошибка обработки транзакции. Попробуйте снова.');
        }
    });
}

// USDT Confirm button
const usdtConfirmBtn = document.getElementById('usdt-confirm-btn');
if (usdtConfirmBtn) {
    usdtConfirmBtn.addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('usdt-amount').value);
        
        if (!amount || amount < 1) {
            alert(currentLang === 'en' ? 
                'Minimum deposit: 1 USDT' : 
                'Минимальное пополнение: 1 USDT');
            return;
        }
        
        // In real implementation, verify transaction on blockchain
        const confirmed = confirm(currentLang === 'en' ? 
            `Confirm USDT deposit of ${amount} USDT?\n\nPlease make sure you've sent the funds to the address shown.` :
            `Подтвердить пополнение ${amount} USDT?\n\nУбедитесь, что вы отправили средства на указанный адрес.`);
        
        if (!confirmed) return;
        
        try {
            // Save pending transaction
            await saveTransaction({
                userId: currentUser.id,
                type: 'deposit',
                amount: Math.floor(amount * 1),
                currency: 'USDT',
                status: 'pending'
            });
            
            alert(currentLang === 'en' ? 
                '✅ Deposit request received!\n\nYour balance will be updated after confirmation (usually within 10-30 minutes).' :
                '✅ Запрос на пополнение получен!\n\nВаш баланс будет обновлен после подтверждения (обычно 10-30 минут).');
            
            document.getElementById('crypto-deposit-modal').classList.remove('active');
            
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert(currentLang === 'en' ? 
                'Error processing request. Please try again.' : 
                'Ошибка обработки запроса. Попробуйте снова.');
        }
    });
}

// Withdraw button
const withdrawSubmitBtn = document.getElementById('withdraw-submit-btn');
if (withdrawSubmitBtn) {
    withdrawSubmitBtn.addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        const address = document.getElementById('withdraw-address').value.trim();
        
        if (!amount || amount < 10) {
            alert(currentLang === 'en' ? 
                'Minimum withdrawal: 10 ɱ' : 
                'Минимальный вывод: 10 ɱ');
            return;
        }
        
        if (!address) {
            alert(currentLang === 'en' ? 
                'Please enter wallet address' : 
                'Введите адрес кошелька');
            return;
        }
        
        if (userBalance.mini < amount) {
            alert(currentLang === 'en' ? 
                'Insufficient balance' : 
                'Недостаточно средств');
            return;
        }
        
        const confirmed = confirm(currentLang === 'en' ? 
            `Confirm withdrawal of ${formatMTV(amount)} ɱ to ${address}?` :
            `Подтвердить вывод ${formatMTV(amount)} ɱ на ${address}?`);
        
        if (!confirmed) return;
        
        try {
            // Save withdrawal request
            await saveTransaction({
                userId: currentUser.id,
                type: 'withdraw',
                amount: amount,
                currency: 'TON',
                address: address,
                status: 'pending'
            });
            
            // Deduct from balance
            userBalance.mini -= amount;
            localStorage.setItem('mcrew_balance_' + currentUser.id, JSON.stringify(userBalance));
            updateProfileDisplay();
            
            alert(currentLang === 'en' ? 
                '✅ Withdrawal request submitted!\n\nFunds will be sent within 24 hours.' :
                '✅ Запрос на вывод отправлен!\n\nСредства будут отправлены в течение 24 часов.');
            
            document.getElementById('crypto-withdraw-modal').classList.remove('active');
            
        } catch (error) {
            console.error('Error processing withdrawal:', error);
            alert(currentLang === 'en' ? 
                'Error processing request. Please try again.' : 
                'Ошибка обработки запроса. Попробуйте снова.');
        }
    });
}

// Save transaction to backend
async function saveTransaction(transaction) {
    try {
        const response = await fetch(`${API_BASE}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save transaction');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error saving transaction:', error);
        throw error;
    }
}

// Copy address helper
function copyAddress(type) {
    const address = document.getElementById(`${type}-address`).textContent;
    navigator.clipboard.writeText(address).then(() => {
        alert(currentLang === 'en' ? 
            '✅ Address copied!' : 
            '✅ Адрес скопирован!');
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize TON Connect
    initTONConnect();
    
    // Profile link
    const profileLink = document.getElementById('profile-link');
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            showProfile();
        });
    }
    
    // Profile back button
    const profileBackBtn = document.getElementById('profile-back-btn');
    if (profileBackBtn) {
        profileBackBtn.addEventListener('click', () => {
            hideProfile();
        });
    }
    
    // Deposit button
    const depositBtn = document.getElementById('deposit-crypto-btn');
    if (depositBtn) {
        depositBtn.addEventListener('click', () => {
            showCryptoDepositModal();
        });
    }
    
    // Withdraw button
    const withdrawBtn = document.getElementById('withdraw-crypto-btn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', () => {
            showCryptoWithdrawModal();
        });
    }
});
