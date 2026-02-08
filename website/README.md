# MCREW Website

Minimalist design studio website inspired by YSL and Yohji Yamamoto aesthetics.

## Live Site

🌐 **https://maori17227.github.io/mcrew-design-bot/**

## Features

### Design
- ✨ Minimalist, elegant design inspired by luxury fashion brands
- 🎨 Clean typography with Helvetica Neue
- 🌓 Dark/Light theme toggle
- 🌍 EN/RU language switching
- 📱 Fully responsive (desktop + mobile)
- 🎭 Smooth scroll animations
- 🎬 Hover effects and transitions

### Content
- 🎵 **17 Track Covers** with audio previews (13-second trailers)
- 🎨 **Services** section with pricing
- 📧 **Contact** section with Telegram link
- 🔐 **Telegram Authentication** (login with Telegram)

### Technical
- 🚀 Pure Vanilla JavaScript (no frameworks)
- 💅 Custom CSS with CSS variables for theming
- 🎵 Custom audio player with progress bar
- 📊 Intersection Observer for scroll animations
- 🔒 Telegram Login Widget integration

## Local Development

### Start Local Server

```bash
cd website
python -m http.server 8000
```

Then open: http://localhost:8000

### File Structure

```
website/
├── index.html      # Main HTML structure
├── styles.css      # All styles (YSL-inspired design)
├── app.js          # JavaScript logic
└── README.md       # This file
```

## Deployment

The website is automatically deployed to GitHub Pages from the `gh-pages` branch.

### Manual Deploy

```bash
# Switch to gh-pages branch
git checkout gh-pages

# Copy files
copy website\index.html index.html
copy website\styles.css styles.css
copy website\app.js app.js

# Commit and push
git add index.html styles.css app.js
git commit -m "Update website"
git push origin gh-pages

# Switch back to main
git checkout main
```

## Telegram Auth Setup

To enable Telegram authentication:

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/setdomain`
3. Select `@mcrew_bot`
4. Enter: `maori17227.github.io`

See [WEBSITE_TELEGRAM_AUTH_SETUP.md](../WEBSITE_TELEGRAM_AUTH_SETUP.md) for detailed instructions.

## Portfolio Data

All 17 tracks are loaded from GitHub:
- Artist names and track titles
- Cover images (JPG)
- Audio trailers (WAV, 13 seconds)

Audio settings:
- Volume: 0.316 (-10dB)
- Duration: 13 seconds (auto-stop)
- Format: WAV

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ⚡ Lazy loading for images
- 🎵 Audio preload="metadata"
- 🎨 CSS animations (GPU-accelerated)
- 📦 No external dependencies

## Design Inspiration

- **YSL** (www.ysl.com) - Minimalist navigation, clean layout
- **Yohji Yamamoto** (www.yohjiyamamoto.co.jp) - Typography, spacing, elegance

## Color Palette

### Dark Theme
- Background: `#000000`
- Text: `#ffffff`
- Secondary: `#999999`
- Accent: `#ff0000`

### Light Theme
- Background: `#ffffff`
- Text: `#000000`
- Secondary: `#666666`
- Accent: `#ff0000`

## Typography

- **Font:** Helvetica Neue, Arial (system fonts)
- **Headings:** 300-400 weight, uppercase, letter-spacing
- **Body:** 400 weight, normal case

## Animations

- Preloader fade out (1s)
- Hero logo float (6s loop)
- Scroll indicator (2s loop)
- Section fade-in on scroll
- Service card hover effects
- Portfolio image zoom on hover
- Modal slide-up animation

## Contact

- **Telegram:** [@mcrewdm](https://t.me/mcrewdm)
- **Bot:** [@mcrew_bot](https://t.me/mcrew_bot)
- **GitHub:** [maori17227/mcrew-design-bot](https://github.com/maori17227/mcrew-design-bot)

---

Made with ❤️ by MCREW Design Studio
