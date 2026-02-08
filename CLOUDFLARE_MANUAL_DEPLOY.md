# Cloudflare Pages Manual Deployment Guide

## Problem
Your website at `mcrew-website.pages.dev` is showing an old version (commit `38f3107a`) instead of the latest code with MC Bank card (commit `d5bc8fa`).

## Why This Happens
Cloudflare Pages automatic deployments from GitHub are not working. You need to manually trigger a deployment.

## Solution: Manual Deployment

### Step 1: Open Cloudflare Dashboard
1. Go to https://dash.cloudflare.com/
2. Login to your account
3. Click on **Workers & Pages** in the left sidebar
4. Find and click on **mcrew-website**

### Step 2: Create New Deployment
1. Click the **"Create deployment"** button (or **"Deploy"** button)
2. In the deployment settings:
   - **Branch**: Select `main`
   - **Build command**: Leave as is (should be empty or default)
   - **Build output directory**: `website` or `/website`
3. Click **"Save and Deploy"**

### Step 3: Wait for Deployment
- Deployment takes 1-2 minutes
- You'll see a progress bar
- When complete, you'll see "Deployment successful"

### Step 4: Verify Changes
1. Open your website: https://mcrew-website.pages.dev
2. Hard refresh: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. You should now see:
   - ✅ MC Bank card with balance display
   - ✅ Balance format: "0.0" instead of "0"
   - ✅ TON rate updates automatically
   - ✅ All latest fixes

## Alternative: Enable Automatic Deployments

To fix automatic deployments for future updates:

1. In Cloudflare Dashboard → **mcrew-website** → **Settings**
2. Go to **Builds & deployments**
3. Check **"Production branch"** is set to `main`
4. Enable **"Automatic deployments"**
5. Make sure GitHub integration is connected

## Current Code Status
- ✅ Latest commit: `d5bc8fa` (already pushed to GitHub)
- ✅ All features implemented:
  - MC Bank card design
  - Balance format: 0.0
  - TON rate auto-updates
  - Normal rounding (Math.round)
  - Order notifications
  - All fixes applied

## Need Help?
If manual deployment doesn't work:
1. Check if you have the correct permissions in Cloudflare
2. Verify the GitHub repository is connected
3. Try disconnecting and reconnecting GitHub integration
