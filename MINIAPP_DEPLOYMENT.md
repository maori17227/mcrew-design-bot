# MↃREW Mini App - Deployment Guide

Complete step-by-step guide to deploy your Telegram Mini App.

## Current Status

✅ Mini App created with:
- Dark theme (#0a0a0a background, #ff0000 red accents)
- Bilingual support (EN/RU)
- 5 service categories
- Portfolio with media loading via Telegram Bot API
- Contact information
- 3-click navigation principle
- No emoji icons
- Clean "MↃREW" logo (no tagline)

## Files Ready

```
miniapp/
├── index.html      # Main HTML structure
├── styles.css      # Dark theme styling
├── app.js          # App logic with Telegram Bot API integration
└── README.md       # Documentation
```

## Step 1: Deploy to GitHub Pages

### Option A: New Repository

1. Go to https://github.com/new
2. Create repository name: `mcrew-miniapp` (or any name)
3. Make it Public
4. Don't initialize with README
5. Click "Create repository"

6. Upload files:
   - Click "uploading an existing file"
   - Drag and drop all files from `miniapp/` folder
   - Commit changes

7. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Click Save

8. Your URL will be: `https://your-username.github.io/mcrew-miniapp/`

### Option B: Existing Repository

1. Create `miniapp` folder in your repo
2. Upload all files to that folder
3. Go to Settings → Pages
4. Source: Deploy from a branch
5. Branch: `main` → `/miniapp`
6. Your URL: `https://your-username.github.io/repo-name/miniapp/`

## Step 2: Create Mini App in BotFather

1. Open Telegram and find @BotFather
2. Send: `/newapp`
3. Choose your bot (test bot or main bot)
4. Enter title: `MↃREW`
5. Enter description: `Design Studio - Covers, Logos, UI/UX, Motion Graphics, VFX`
6. Upload photo (640x360 PNG):
   - Use your logo or cover image
   - Must be exactly 640x360 pixels
7. Upload GIF demo (optional):
   - Short demo of your app
   - Max 5 seconds
8. Enter Web App URL: `https://your-github-pages-url/`
9. Done! BotFather will confirm creation

## Step 3: Add Menu Button to Bot

### Method 1: Via BotFather

1. Send: `/mybots` to @BotFather
2. Choose your bot
3. Select "Bot Settings"
4. Select "Menu Button"
5. Choose "Configure menu button"
6. Enter button text: `Open App` or `🚀 Open App`
7. Enter Web App URL: `https://your-github-pages-url/`
8. Done!

### Method 2: Via Bot Code (Optional)

Add to your bot's main menu keyboard in `worker.js`:

```javascript
function getMainMenuKeyboard(userId) {
  const lang = getUserLanguage(userId)
  return {
    inline_keyboard: [
      [{ 
        text: '🚀 Open Mini App', 
        web_app: { url: 'https://your-github-pages-url/' } 
      }],
      [{ text: TEXTS[lang].graphic_design, callback_data: 'cat_graphic' }],
      // ... rest of buttons
    ]
  }
}
```

## Step 4: Test the Mini App

### Test in Telegram

1. Open your bot in Telegram
2. Look for menu button (bottom left, next to message input)
3. Click the button
4. Mini App should open inside Telegram

### Test in Browser (for debugging)

1. Open your GitHub Pages URL in browser
2. Check browser console (F12) for errors
3. Test language switching
4. Test navigation between screens
5. Check if portfolio loads (may not work outside Telegram)

## Step 5: Verify Everything Works

### Checklist

- [ ] Mini App opens in Telegram
- [ ] Dark theme displays correctly
- [ ] Language switcher works (EN/RU)
- [ ] All 5 service categories show
- [ ] Prices display correctly
- [ ] Portfolio section loads
- [ ] Photos load from Telegram Bot API
- [ ] Video loads from Telegram Bot API
- [ ] Contact information shows
- [ ] "Contact Us" button opens Telegram chat
- [ ] Back button works
- [ ] Navigation is smooth

## Troubleshooting

### Mini App doesn't open

**Problem**: Button doesn't work or shows error

**Solutions**:
1. Check URL is HTTPS (GitHub Pages is HTTPS by default)
2. Verify URL is correct (no typos)
3. Make sure files are uploaded correctly
4. Wait 5-10 minutes for GitHub Pages to deploy
5. Try opening URL in browser first

### Media not loading

**Problem**: Photos/videos don't show in portfolio

**Solutions**:
1. Check bot token in `app.js` is correct
2. Verify file_id values are valid
3. Open browser console (F12) and check for errors
4. Test with test bot token first: `8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs`
5. Make sure bot has access to files (send them to bot first)

### Language not switching

**Problem**: Text doesn't change when switching language

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify all elements have `data-en` and `data-ru` attributes
3. Clear browser cache
4. Test in Telegram app (not web version)

### Design looks wrong

**Problem**: Colors or layout broken

**Solutions**:
1. Check `styles.css` uploaded correctly
2. Verify no CSS conflicts
3. Test in different browsers
4. Check Telegram app version is up to date

## Bot Tokens

### Test Bot
```
Token: 8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs
Use for: Testing Mini App before going live
```

### Main Bot
```
Token: 8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M
Use for: Production after testing is complete
```

To switch tokens, edit `app.js`:
```javascript
const BOT_TOKEN = '8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs'; // Change this
```

## Media File IDs

Current file IDs used in portfolio:

```javascript
covers: 'AgACAgIAAxkDAAO8aYUIGz5J7UVpOauIT5KcvjXivGMAAvgTaxuz9ilIU2cMkhILjcMBAAMCAAN5AAM4BA'
posters: 'AgACAgIAAxkDAAO9aYUIHaym1b3ubLUGzPEFpytkyYkAAvkTaxuz9ilIhLgYx1Zmy7QBAAMCAAN5AAM4BA'
video: 'BAACAgIAAxkDAAIBTWmFy5jzcZDsBQXiHwrcWzwE1gABqgAC9ocAArP2MUgIFpUzdZd27TgE'
```

These are loaded via Telegram Bot API for instant display.

## Next Steps

1. **Deploy to GitHub Pages** (Step 1)
2. **Create Mini App** in BotFather (Step 2)
3. **Add menu button** (Step 3)
4. **Test thoroughly** (Step 4)
5. **Verify everything** (Step 5)

Once testing is complete with test bot:
- Switch to main bot token
- Update BotFather with main bot
- Go live! 🚀

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all files uploaded correctly
3. Test URL in browser first
4. Check Telegram app is updated
5. Review this guide again

## Success! 🎉

Your Mini App is now live with:
- ⚡ Fast, smooth navigation
- 🎨 Professional dark design
- 🌐 Bilingual support
- 📱 Full Telegram integration
- 💼 Dynamic portfolio loading
- 🎯 3-click principle

Enjoy your new Mini App!
