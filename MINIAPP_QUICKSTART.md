# MↃREW Mini App - Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Upload to GitHub (2 min)

1. Go to https://github.com/new
2. Name: `mcrew-miniapp`
3. Public repository
4. Create repository
5. Upload files from `miniapp/` folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
6. Commit files

### Step 2: Enable GitHub Pages (1 min)

1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Source: "Deploy from a branch"
4. Branch: `main` → `/root`
5. Click "Save"
6. Wait 2-3 minutes
7. Your URL: `https://your-username.github.io/mcrew-miniapp/`

### Step 3: Create Mini App (1 min)

1. Open Telegram → @BotFather
2. Send: `/newapp`
3. Choose: Your bot
4. Title: `MↃREW`
5. Description: `Design Studio - Covers, Logos, UI/UX, Motion Graphics`
6. Photo: Upload 640x360 image
7. URL: `https://your-username.github.io/mcrew-miniapp/`
8. Done!

### Step 4: Add Menu Button (1 min)

1. Send: `/mybots` to @BotFather
2. Choose your bot
3. "Bot Settings" → "Menu Button"
4. "Configure menu button"
5. Text: `Open App`
6. URL: `https://your-username.github.io/mcrew-miniapp/`
7. Done!

### Step 5: Test (30 sec)

1. Open your bot in Telegram
2. Click menu button (bottom left)
3. Mini App opens!
4. Test navigation and features

## ✅ What You Get

- 🎨 Dark theme with red accents
- 🌐 English & Russian languages
- 💼 5 service categories with prices
- 🖼️ Portfolio with photos and videos
- 📞 Contact information
- ⚡ Fast, smooth navigation

## 🔧 Configuration

### Change Bot Token

Edit `app.js` line 6:
```javascript
const BOT_TOKEN = 'YOUR-BOT-TOKEN-HERE';
```

**Test bot**: `8205357964:AAFdXcc0Ma_gtqJ0BRP8q-qOowKXdrrRNBs`  
**Main bot**: `8363446053:AAGfig_At866R3bVU9rNrY4AOuJQxnz_t2M`

### Update Portfolio Media

Edit `app.js` MEDIA_FILE_IDS:
```javascript
const MEDIA_FILE_IDS = {
    covers: 'your-file-id',
    posters: 'your-file-id',
    video: 'your-file-id'
};
```

## 🐛 Troubleshooting

**Mini App doesn't open?**
- Wait 5-10 minutes for GitHub Pages to deploy
- Check URL is correct (no typos)
- Try opening URL in browser first

**Media not loading?**
- Check bot token is correct
- Verify file_id values are valid
- Open browser console (F12) for errors

**Language not switching?**
- Clear browser cache
- Test in Telegram app (not web)

## 📚 Full Documentation

- `MINIAPP_STATUS.md` - Current status and features
- `MINIAPP_DEPLOYMENT.md` - Detailed deployment guide
- `miniapp/README.md` - Technical documentation

## 🎉 Done!

Your Mini App is live! Share your bot with clients and start getting orders.

**Bot Features:**
- Professional design
- Easy navigation
- Multiple languages
- Portfolio showcase
- Direct contact

Enjoy! 🚀
