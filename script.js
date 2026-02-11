// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
let isDarkMode = true;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        const icon = themeToggle.querySelector('i');
        
        if (isDarkMode) {
            // Dark mode
            root.style.setProperty('--bg-primary', '#0a0e27');
            root.style.setProperty('--bg-secondary', '#151932');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#b3b3b3');
            root.style.setProperty('--bg-glass', 'rgba(255, 255, 255, 0.05)');
            document.body.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)';
            document.querySelector('.sidebar').style.background = 'rgba(255, 255, 255, 0.05)';
            document.querySelector('.player').style.background = 'rgba(255, 255, 255, 0.05)';
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            showNotification('🌙 Dark mode activated');
        } else {
            // Light mode
            root.style.setProperty('--bg-primary', '#f5f5f5');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-primary', '#1a1a1a');
            root.style.setProperty('--text-secondary', '#666666');
            root.style.setProperty('--bg-glass', 'rgba(0, 0, 0, 0.05)');
            document.body.style.background = 'linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 100%)';
            document.querySelector('.sidebar').style.background = 'rgba(0, 0, 0, 0.05)';
            document.querySelector('.player').style.background = 'rgba(0, 0, 0, 0.05)';
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            showNotification('☀️ Light mode activated');
        }
        
        // Save preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' && themeToggle) {
        themeToggle.click();
    }
});

// Player functionality
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.querySelector('.btn-play');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');
const volumeBar = document.querySelector('.volume-bar');
const volumeFilled = document.querySelector('.volume-filled');
const volumeIcon = document.querySelector('.player-right .fa-volume-up');
const shuffleBtn = document.querySelector('.fa-random');
const repeatBtn = document.querySelector('.fa-redo');
const prevBtn = document.querySelector('.fa-step-backward');
const nextBtn = document.querySelector('.fa-step-forward');

let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentVolume = 70;

// Set initial volume
audioPlayer.volume = currentVolume / 100;

// Play/Pause toggle
playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector('i');
    
    if (isPlaying) {
        audioPlayer.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
});

// Update progress bar as song plays
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFilled.style.width = percent + '%';
        updateTime();
    }
});

// Song ended
audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextTrack();
    }
});

function updateTime() {
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
    
    document.querySelector('.time:first-of-type').textContent = 
        `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    document.querySelectorAll('.time')[1].textContent = 
        `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}

// Progress bar click
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Volume bar click
if (volumeBar) {
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        currentVolume = percent;
        audioPlayer.volume = percent / 100;
        volumeFilled.style.width = percent + '%';
        updateVolumeIcon(percent);
    });
}

// Volume icon toggle
if (volumeIcon) {
    volumeIcon.parentElement.addEventListener('click', () => {
        if (currentVolume > 0) {
            volumeFilled.style.width = '0%';
            audioPlayer.volume = 0;
            volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down');
            volumeIcon.classList.add('fa-volume-mute');
            currentVolume = 0;
        } else {
            volumeFilled.style.width = '70%';
            audioPlayer.volume = 0.7;
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
            currentVolume = 70;
        }
    });
}

function updateVolumeIcon(volume) {
    if (volumeIcon) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-mute');
        if (volume === 0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if (volume < 50) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }
}

// Shuffle toggle
shuffleBtn.parentElement.addEventListener('click', () => {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffleBtn.style.color = '#667eea';
    } else {
        shuffleBtn.style.color = '';
    }
});

// Repeat toggle
repeatBtn.parentElement.addEventListener('click', () => {
    isRepeat = !isRepeat;
    if (isRepeat) {
        repeatBtn.style.color = '#667eea';
    } else {
        repeatBtn.style.color = '';
    }
});

// Previous track
prevBtn.parentElement.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    if (isPlaying) {
        audioPlayer.play();
    }
});

// Next track
nextBtn.parentElement.addEventListener('click', () => {
    nextTrack();
});

function nextTrack() {
    const musicCards = document.querySelectorAll('.music-card');
    const randomCard = musicCards[Math.floor(Math.random() * musicCards.length)];
    
    const title = randomCard.querySelector('h3').textContent;
    const artist = randomCard.querySelector('p').textContent;
    const songSrc = randomCard.dataset.song;
    const poster = randomCard.dataset.poster;
    
    if (songSrc) {
        loadSong(songSrc, title, artist, poster);
    } else {
        // For demo cards without actual songs
        const cardImage = randomCard.querySelector('.card-image');
        const gradient = cardImage.style.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        updateNowPlaying(title, artist, gradient, null);
    }
}

// Load and play song
function loadSong(src, title, artist, poster) {
    audioPlayer.src = src;
    audioPlayer.load();
    
    if (poster) {
        updateNowPlaying(title, artist, null, poster);
    } else {
        updateNowPlaying(title, artist, 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', null);
    }
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

// All play buttons
const allPlayBtns = document.querySelectorAll('.play-btn');
allPlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const card = btn.closest('.music-card');
        if (card) {
            const title = card.querySelector('h3').textContent;
            const artist = card.querySelector('p').textContent;
            const songSrc = card.dataset.song;
            const poster = card.dataset.poster;
            
            if (songSrc) {
                loadSong(songSrc, title, artist, poster);
                if (!isPlaying) {
                    playBtn.click();
                }
            } else {
                // Demo cards
                const gradient = card.querySelector('.card-image').style.background;
                updateNowPlaying(title, artist, gradient, null);
                if (!isPlaying) {
                    playBtn.click();
                }
            }
        }
    });
});

// Quick cards click
const quickCards = document.querySelectorAll('.quick-card');
quickCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('span').textContent;
        const songSrc = card.dataset.song;
        const poster = card.dataset.poster;
        const artist = card.dataset.artist || 'Playlist';
        
        if (songSrc) {
            loadSong(songSrc, title, artist, poster);
            if (!isPlaying) {
                playBtn.click();
            }
        } else {
            const gradient = card.querySelector('.card-img').style.background;
            updateNowPlaying(title, artist, gradient, null);
            if (!isPlaying) {
                playBtn.click();
            }
        }
    });
});

function updateNowPlaying(title, artist, gradient, poster) {
    document.querySelector('.now-playing-info h4').textContent = title;
    document.querySelector('.now-playing-info p').textContent = artist;
    
    const nowPlayingImg = document.querySelector('.now-playing-img');
    nowPlayingImg.innerHTML = '';
    
    if (poster) {
        const img = document.createElement('img');
        img.src = poster;
        img.alt = title;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
        nowPlayingImg.appendChild(img);
    } else {
        nowPlayingImg.style.background = gradient;
        const icon = document.createElement('i');
        icon.className = 'fas fa-music';
        nowPlayingImg.appendChild(icon);
    }
}

// Heart button toggle
const heartBtn = document.querySelector('.player-left .fa-heart');
if (heartBtn) {
    heartBtn.parentElement.addEventListener('click', (e) => {
        e.stopPropagation();
        if (heartBtn.classList.contains('far')) {
            heartBtn.classList.remove('far');
            heartBtn.classList.add('fas');
            heartBtn.style.color = '#f5576c';
        } else {
            heartBtn.classList.remove('fas');
            heartBtn.classList.add('far');
            heartBtn.style.color = '';
        }
    });
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const musicCards = document.querySelectorAll('.music-card');
        const sections = document.querySelectorAll('.section');
        
        if (searchTerm === '') {
            // Show all
            musicCards.forEach(card => card.style.display = 'block');
            sections.forEach(section => section.style.display = 'block');
        } else {
            // Filter
            let hasResults = false;
            musicCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const artist = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Hide empty sections
            sections.forEach(section => {
                const visibleCards = section.querySelectorAll('.music-card[style="display: block;"]');
                section.style.display = visibleCards.length > 0 ? 'block' : 'none';
            });
        }
    }, 300);
});

// Navigation active state
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Scroll to top
        document.querySelector('.main-content').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Playlist items click
const playlistItems = document.querySelectorAll('.playlist-item');
playlistItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('span').textContent;
        updateNowPlaying(title, 'Your Playlist', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        
        if (!isPlaying) {
            playBtn.click();
        }
    });
});

// Music card click (play on card click)
const musicCards = document.querySelectorAll('.music-card');
musicCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.play-btn')) {
            const playButton = card.querySelector('.play-btn');
            if (playButton) {
                playButton.click();
            }
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space - Play/Pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        playBtn.click();
    }
    
    // Arrow Right - Forward 5 seconds
    if (e.code === 'ArrowRight') {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
    }
    
    // Arrow Left - Backward 5 seconds
    if (e.code === 'ArrowLeft') {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
    }
    
    // Arrow Up - Volume up
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        currentVolume = Math.min(100, currentVolume + 10);
        audioPlayer.volume = currentVolume / 100;
        if (volumeFilled) {
            volumeFilled.style.width = currentVolume + '%';
            updateVolumeIcon(currentVolume);
        }
    }
    
    // Arrow Down - Volume down
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        currentVolume = Math.max(0, currentVolume - 10);
        audioPlayer.volume = currentVolume / 100;
        if (volumeFilled) {
            volumeFilled.style.width = currentVolume + '%';
            updateVolumeIcon(currentVolume);
        }
    }
    
    // M - Mute/Unmute
    if (e.code === 'KeyM') {
        if (volumeIcon) {
            volumeIcon.parentElement.click();
        }
    }
    
    // S - Shuffle
    if (e.code === 'KeyS') {
        shuffleBtn.parentElement.click();
    }
    
    // R - Repeat
    if (e.code === 'KeyR') {
        repeatBtn.parentElement.click();
    }
    
    // N - Next track
    if (e.code === 'KeyN') {
        nextBtn.parentElement.click();
    }
    
    // P - Previous track
    if (e.code === 'KeyP') {
        prevBtn.parentElement.click();
    }
});

// Add visual feedback for touch
if ('ontouchstart' in window) {
    document.querySelectorAll('.music-card, .quick-card, .btn-icon, .nav-item').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        el.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

console.log('🎵 Vibes Music Player Loaded!');
console.log('Keyboard Shortcuts:');
console.log('Space - Play/Pause');
console.log('Arrow Keys - Navigate/Volume');
console.log('M - Mute, S - Shuffle, R - Repeat');
console.log('N - Next, P - Previous');


// User Avatar Click
const userAvatar = document.querySelector('.user-avatar');
if (userAvatar) {
    userAvatar.addEventListener('click', () => {
        alert('👤 Profile Settings\n\nFeatures:\n• Account Settings\n• Preferences\n• Logout\n\n(Demo Mode)');
    });
}

// Upgrade Button Click
const upgradeBtn = document.querySelector('.btn-upgrade');
if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
        alert('👑 Upgrade to Premium\n\n✓ Ad-free listening\n✓ Offline downloads\n✓ High quality audio\n✓ Unlimited skips\n\n(Demo Mode)');
    });
}

// See All Links
const seeAllLinks = document.querySelectorAll('.see-all');
seeAllLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.closest('.section');
        const sectionTitle = section.querySelector('h2').textContent;
        
        // Show notification
        showNotification(`Showing all ${sectionTitle}...`);
        
        // Scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification when song plays
const originalUpdateNowPlaying = updateNowPlaying;
updateNowPlaying = function(title, artist, gradient, poster) {
    originalUpdateNowPlaying(title, artist, gradient, poster);
    showNotification(`🎵 Now Playing: ${title}`);
};
