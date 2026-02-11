# MusicFlow - Modern Music Streaming Web App

Ek modern aur responsive music streaming website jo Android apps mein embed karne ke liye perfect hai.

## Features

- 🎵 Clean aur modern UI design
- 📱 Fully responsive (mobile-first)
- 🎨 Unique design (Spotify jaisa nahi)
- 🔍 Search functionality
- ⏯️ Play, pause, next, previous controls
- 📊 Progress bar with seek functionality
- 🎧 GitHub se music streaming

## Setup Instructions

### 1. Music Files GitHub pe upload karein

Apne GitHub repository mein ek `music` folder banayein aur apni MP3 files upload karein.

### 2. URLs update karein

`script.js` file mein `musicData` array mein apne actual GitHub URLs dalein:

```javascript
url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song1.mp3"
```

### 3. Songs add karein

`musicData` array mein aur songs add kar sakte hain:

```javascript
{
    id: 6,
    title: "Your Song Name",
    artist: "Artist Name",
    duration: "3:45",
    url: "your-github-raw-url"
}
```

## Android App mein Embed karna

WebView mein is website ko load karein:

```java
WebView webView = findViewById(R.id.webview);
webView.getSettings().setJavaScriptEnabled(true);
webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
webView.loadUrl("file:///android_asset/index.html");
```

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling aur animations
- `script.js` - Music player functionality
- `README.md` - Documentation

## Color Scheme

- Primary: Indigo (#6366f1)
- Accent: Pink (#ec4899)
- Background: Dark gradient
- Modern aur eye-friendly colors

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Android WebView

Enjoy your music! 🎵
