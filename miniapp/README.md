# MↃREW Telegram Mini App

Dark-themed design studio mini app with bilingual support (EN/RU).

## Features

- 🎨 Dark theme with red accents (#ff0000)
- 🌐 Bilingual: English & Russian
- 📱 Responsive design
- 🖼️ Portfolio with photos and videos loaded via Telegram Bot API
- 💼 5 service categories with pricing
- 📞 Contact information
- ⚡ Fast and smooth animations
- 🎯 3-click principle: any info within 3 taps

## Design

- Background: #0a0a0a (dark black)
- Accent: #ff0000 (red)
- Clean, minimal interface
- No emoji icons
- Logo: MↃREW (no tagline)

## Services

1. **Graphic Design** - Logos, brand identity, illustrations
2. **UI/UX Design** - Landing pages, websites, mobile apps
3. **Print/Publishing** - Business cards, presentations, social media
4. **Editing & VFX** - Video editing, color correction, sound
5. **Motion Design** - Logo animation, 2D animation, promo videos

## Portfolio

Media loaded dynamically via Telegram Bot API:
- Album covers & artwork
- Posters & flyers
- Motion graphics & VFX videos

## Setup & Deployment

### 1. Deploy to GitHub Pages

```bash
# Create a new repository on GitHub
# Upload miniapp folder contents to repository
# Enable GitHub Pages in repository settings
# Your URL will be: https://username.github.io/repo-name/
```

### 2. Create Mini App in BotFather

1. Send `/newapp` to @BotFather
2. Choose your bot
3. Enter app name: **MↃREW**
4. Enter description: **Design Studio - Covers, Logos, UI/UX, Motion Graphics**
5. Upload app icon (512x512 PNG)
6. Enter Web App URL: `https://your-github-pages-url/`
7. Done! BotFather will give you the Mini App link

### 3. Add Mini App to Bot Menu

1. Send `/mybots` to @BotFather
2. Choose your bot
3. Select "Bot Settings" → "Menu Button"
4. Choose "Configure menu button"
5. Enter button text: **Open App**
6. Enter Web App URL: `https://your-github-pages-url/`

### 4. Test the Mini App

1. Open your bot in Telegram
2. Click the menu button (bottom left)
3. Mini App should open in Telegram

## Bot Tokens

- **Test bot**: `8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs`
- **Main bot**: `8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M`

Update `BOT_TOKEN` in `app.js` to switch between bots.

## Media File IDs

Current file IDs in use:
```javascript
covers: 'AgACAgIAAxkDAAO8aYUIGz5J7UVpOauIT5KcvjXivGMAAvgTaxuz9ilIU2cMkhILjcMBAAMCAAN5AAM4BA'
posters: 'AgACAgIAAxkDAAO9aYUIHaym1b3ubLUGzPEFpytkyYkAAvkTaxuz9ilIhLgYx1Zmy7QBAAMCAAN5AAM4BA'
video: 'BAACAgIAAxkDAAIBTWmFy5jzcZDsBQXiHwrcWzwE1gABqgAC9ocAArP2MUgIFpUzdZd27TgE'
```

## Files

- `index.html` - Main structure
- `styles.css` - Dark theme styling  
- `app.js` - App logic and media loading via Telegram Bot API

## Troubleshooting

**Media not loading?**
- Check bot token is correct
- Verify file_id values are valid
- Check browser console for errors
- Test with different bot token

**Mini App not opening?**
- Verify GitHub Pages URL is correct
- Check HTTPS is enabled
- Test URL in browser first
- Make sure all files are uploaded

**Language not switching?**
- Check browser console for errors
- Verify all data-en and data-ru attributes are present
- Test in Telegram app (not web version)

## 3-Click Principle

### Path 1: Order Service
1. Home → Services
2. Services → Graphic Design
3. Graphic Design → Place Order ✅

### Path 2: View Portfolio
1. Home → Portfolio
2. Portfolio → (view works)
3. Portfolio → Contact ✅

### Path 3: Contact
1. Home → Contact
2. Contact → Contact Us ✅

## Telegram WebApp API

Used functions:
```javascript
tg.expand()              // Expand to full screen
tg.ready()               // Signal ready
tg.BackButton.show()     // Show back button
tg.BackButton.hide()     // Hide back button
tg.setHeaderColor()      // Set header color
tg.setBackgroundColor()  // Set background color
tg.openTelegramLink()    // Open Telegram link
```

## Ready! 🎉

Your Mini App has:
- ⚡ Fast navigation (3-click principle)
- 🎨 Stylish design (dark + red)
- 🌐 Two languages (EN/RU)
- 📱 Telegram integration
- 💼 Portfolio with photos and videos
