# Admin Panel Setup Guide

## Overview
Admin panel allows the administrator (ID: 8017281019) to manage portfolio items directly from the Mini App.

## Features
- ✅ Add new portfolio items (Track Covers, Posters, Motion Graphics)
- ✅ Delete existing items
- ✅ Support for tracks with audio, photos, and videos
- ✅ Stored in Cloudflare KV for fast access

## Setup Steps

### 1. Create KV Namespace

Run this command in your terminal:

```bash
npx wrangler kv:namespace create "PORTFOLIO_KV"
```

This will output something like:
```
🌀 Creating namespace with title "mcrew-bot-PORTFOLIO_KV"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "PORTFOLIO_KV", id = "abc123..." }
```

### 2. Update wrangler.toml

Copy the `id` from the output and replace `YOUR_KV_NAMESPACE_ID` in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "abc123..."  # Replace with your actual ID
```

### 3. Deploy to Cloudflare

```bash
npx wrangler deploy
```

### 4. Test Admin Panel

1. Open the Mini App as the admin user (ID: 8017281019)
2. You should see an "⚙️ Admin Panel" button on the home screen
3. Click it to access the admin panel
4. Try adding a new portfolio item

## API Endpoints

The worker now exposes these endpoints:

- `GET /api/portfolio?category=covers` - Get all items in a category
- `POST /api/portfolio` - Add new item
  ```json
  {
    "category": "covers",
    "item": {
      "type": "track",
      "artist": "Artist Name",
      "track": "Track Name",
      "cover": "https://...",
      "audio": "https://..."
    }
  }
  ```
- `DELETE /api/portfolio?category=covers&id=123` - Delete item

## Security

- Only user with ID `8017281019` can access admin endpoints
- Authorization checked via `X-User-ID` header
- CORS enabled for Mini App access

## Portfolio Data Structure

### Track Item
```json
{
  "type": "track",
  "artist": "Artist Name",
  "track": "Track Name",
  "cover": "https://url-to-cover.jpg",
  "audio": "https://url-to-audio.mp3",
  "id": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Photo Item
```json
{
  "type": "photo",
  "file": "https://url-to-photo.jpg",
  "title": { "en": "Title", "ru": "Название" },
  "description": { "en": "Description", "ru": "Описание" },
  "id": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Video Item
```json
{
  "type": "video",
  "file": "https://url-to-video.mp4",
  "title": { "en": "Title", "ru": "Название" },
  "description": { "en": "Description", "ru": "Описание" },
  "id": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### "Unauthorized" error
- Make sure you're logged in as the admin user (ID: 8017281019)
- Check that the worker is deployed with the latest code

### Items not loading
- Check that KV namespace is created and bound correctly
- Verify the API_BASE URL in `miniapp/app.js` matches your worker URL
- Check browser console for errors

### Can't add items
- Verify all required fields are filled
- Check that URLs are valid and accessible
- Look at worker logs in Cloudflare dashboard

## Next Steps

1. Create the KV namespace
2. Update wrangler.toml with the namespace ID
3. Deploy the worker
4. Test the admin panel
5. Start adding portfolio items!
