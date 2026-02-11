
// Sample music data - Replace with your GitHub URLs
const musicData = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Wave",
        duration: "3:45",
        url: "o Mere.mp4",
        cover: "https://via.placeholder.com/300x300/1db954/ffffff?text=MD"
    },
    {
        id: 2,
        title: "Ocean Breeze",
        artist: "Coastal Vibes",
        duration: "4:12",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song2.mp3",
        cover: "https://via.placeholder.com/300x300/4facfe/ffffff?text=OB"
    },
    {
        id: 3,
        title: "City Lights",
        artist: "Urban Echo",
        duration: "3:28",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song3.mp3",
        cover: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=CL"
    },
    {
        id: 4,
        title: "Mountain High",
        artist: "Peak Sounds",
        duration: "5:01",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song4.mp3",
        cover: "https://via.placeholder.com/300x300/a8edea/000000?text=MH"
    },
    {
        id: 5,
        title: "Desert Storm",
        artist: "Sand Waves",
        duration: "4:33",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song5.mp3",
        cover: "https://via.placeholder.com/300x300/fed6e3/000000?text=DS"
    },
    {
        id: 6,
        title: "Neon Nights",
        artist: "Electric Dreams",
        duration: "4:05",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song6.mp3",
        cover: "https://via.placeholder.com/300x300/ee5a6f/ffffff?text=NN"
    },
    {
        id: 7,
        title: "Sunset Boulevard",
        artist: "Golden Hour",
        duration: "3:52",
        url: "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/music/song7.mp3",
        cover: "https://via.placeholder.com/300x300/1ed760/ffffff?text=SB"
    }
];

// State
let currentSongIndex = -1;
let isPlaying = false;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentTab = 'home';
let allSongs = [...musicData];
let filteredSongs = [...musicData];

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const themeToggle = document.getElementById('themeToggle');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchBack = document.getElementById('searchBack');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const musicList = document.getElementById('musicList');
const favoritesList = document.getElementById('favoritesList');
const emptyFavorites = document.getElementById('emptyFavorites');
const recommendedScroll = document.getElementById('recommendedScroll');
const recentlyPlayedScroll = document.getElementById('recentlyPlayedScroll');
const likedCount = document.getElementById('likedCount');
const allCount = document.getElementById('allCount');
const miniPlayer = document.getElementById('miniPlayer');
const miniPlayerContent = document.getElementById('miniPlayerContent');
const miniPlayBtn = document.getElementById('miniPlayBtn');
const miniPlayIcon = document.getElementById('miniPlayIcon');
const miniPauseIcon = document.getElementById('miniPauseIcon');
const miniTrackName = document.getElementById('miniTrackName');
const miniArtistName = document.getElementById('miniArtistName');
const miniAlbumArt = document.getElementById('miniAlbumArt');
const miniProgress = document.getElementById('miniProgress');
const fullPlayer = document.getElementById('fullPlayer');
const closePlayer = document.getElementById('closePlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const fullTrackName = document.getElementById('fullTrackName');
const fullArtistName = document.getElementById('fullArtistName');
const fullAlbumArt = document.getElementById('fullAlbumArt');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const navItems = document.querySelectorAll('.nav-item');
const homeTab = document.getElementById('homeTab');
const favoritesTab = document.getElementById('favoritesTab');
const viewAllTab = document.getElementById('viewAllTab');
const viewAllList = document.getElementById('viewAllList');
const viewAllTitle = document.getElementById('viewAllTitle');
const backFromViewAll = document.getElementById('backFromViewAll');
const appTitle = document.getElementById('appTitle');

// Initialize
function init() {
    loadTheme();
    updateCounts();
    renderRecommended();
    renderRecentlyPlayed();
    renderMusicList();
    renderFavoritesList();
    setupEventListeners();
    setupCategoryCards();
}

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Add animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

// Update counts
function updateCounts() {
    likedCount.textContent = `${favorites.length} songs`;
    allCount.textContent = `${allSongs.length} songs`;
}

// Render recommended section
function renderRecommended() {
    recommendedScroll.innerHTML = '';
    const recommended = allSongs.slice(0, 5);
    
    recommended.forEach(song => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
            <div class="album-cover">
                ${song.cover ? `<img src="${song.cover}" alt="${song.title}">` : song.title.charAt(0)}
            </div>
            <div class="album-name">${song.title}</div>
            <div class="album-artist">${song.artist}</div>
        `;
        card.addEventListener('click', () => {
            const index = allSongs.findIndex(s => s.id === song.id);
            playSong(index);
        });
        recommendedScroll.appendChild(card);
    });
}

// Render recently played section
function renderRecentlyPlayed() {
    recentlyPlayedScroll.innerHTML = '';
    const recent = allSongs.slice(0, 5);
    
    recent.forEach(song => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
            <div class="album-cover">
                ${song.cover ? `<img src="${song.cover}" alt="${song.title}">` : song.title.charAt(0)}
            </div>
            <div class="album-name">${song.title}</div>
            <div class="album-artist">${song.artist}</div>
        `;
        card.addEventListener('click', () => {
            const index = allSongs.findIndex(s => s.id === song.id);
            playSong(index);
        });
        recentlyPlayedScroll.appendChild(card);
    });
}

// Setup category cards
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            if (category === 'liked') {
                switchTab('favorites');
            } else if (category === 'all') {
                // Already on home, scroll to all songs
                const allSongsSection = document.querySelector('#musicList');
                allSongsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Render music list
function renderMusicList() {
    musicList.innerHTML = '';
    const songsToRender = currentTab === 'home' ? filteredSongs : allSongs;
    
    songsToRender.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        musicList.appendChild(songItem);
    });
}

// Render favorites list
function renderFavoritesList() {
    favoritesList.innerHTML = '';
    const favSongs = allSongs.filter(song => favorites.includes(song.id));
    
    if (favSongs.length === 0) {
        emptyFavorites.classList.remove('hidden');
    } else {
        emptyFavorites.classList.add('hidden');
        favSongs.forEach((song, index) => {
            const songItem = createSongItem(song, index, true);
            favoritesList.appendChild(songItem);
        });
    }
}

// Create song item
function createSongItem(song, index, isFavorite = false) {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    if (currentSongIndex === allSongs.findIndex(s => s.id === song.id)) {
        songItem.classList.add('active');
    }
    
    const firstLetter = song.title.charAt(0).toUpperCase();
    const isFav = favorites.includes(song.id);
    
    songItem.innerHTML = `
        <div class="song-thumbnail">
            ${song.cover ? `<img src="${song.cover}" alt="${song.title}">` : firstLetter}
        </div>
        <div class="song-details">
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
        </div>
        <div class="song-actions">
            <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${song.id}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
        </div>
    `;
    
    const songDetails = songItem.querySelector('.song-details');
    songDetails.addEventListener('click', () => {
        const actualIndex = allSongs.findIndex(s => s.id === song.id);
        playSong(actualIndex);
    });
    
    const favoriteBtn = songItem.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(song.id);
    });
    
    return songItem;
}

// Toggle favorite
function toggleFavorite(songId) {
    const index = favorites.indexOf(songId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(songId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateCounts();
    renderMusicList();
    renderFavoritesList();
}

// Play song
function playSong(index) {
    if (index < 0 || index >= allSongs.length) return;
    
    currentSongIndex = index;
    const song = allSongs[index];
    
    audioPlayer.src = song.url;
    audioPlayer.play();
    isPlaying = true;
    
    updatePlayerUI(song);
    updateActiveSong();
    updatePlayButton();
    miniPlayer.classList.add('active');
}

// Update player UI
function updatePlayerUI(song) {
    const firstLetter = song.title.charAt(0).toUpperCase();
    
    miniTrackName.textContent = song.title;
    miniArtistName.textContent = song.artist;
    
    if (song.cover) {
        miniAlbumArt.innerHTML = `<img src="${song.cover}" alt="${song.title}">`;
    } else {
        miniAlbumArt.textContent = firstLetter;
    }
    
    fullTrackName.textContent = song.title;
    fullArtistName.textContent = song.artist;
    
    if (song.cover) {
        fullAlbumArt.querySelector('.album-art-inner').innerHTML = `<img src="${song.cover}" alt="${song.title}">`;
    } else {
        fullAlbumArt.querySelector('.album-art-inner').textContent = firstLetter;
    }
}

// Update active song
function updateActiveSong() {
    document.querySelectorAll('.song-item').forEach((item) => {
        item.classList.remove('active');
    });
    
    const allItems = [...musicList.querySelectorAll('.song-item'), ...favoritesList.querySelectorAll('.song-item')];
    allItems.forEach((item) => {
        const favoriteBtn = item.querySelector('.favorite-btn');
        const songId = parseInt(favoriteBtn.dataset.id);
        const song = allSongs.find(s => s.id === songId);
        const songIndex = allSongs.findIndex(s => s.id === songId);
        
        if (songIndex === currentSongIndex) {
            item.classList.add('active');
        }
    });
}

// Update play button
function updatePlayButton() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        miniPlayIcon.style.display = 'none';
        miniPauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        miniPlayIcon.style.display = 'block';
        miniPauseIcon.style.display = 'none';
    }
}

// Toggle play/pause
function togglePlay() {
    if (currentSongIndex === -1) {
        playSong(0);
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayButton();
}

// Previous song
function playPrevious() {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    } else {
        playSong(allSongs.length - 1);
    }
}

// Next song
function playNext() {
    if (currentSongIndex < allSongs.length - 1) {
        playSong(currentSongIndex + 1);
    } else {
        playSong(0);
    }
}

// Format time
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
        miniProgress.style.setProperty('--progress', `${progressPercent}%`);
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
}

// Seek
function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );
    renderMusicList();
}

// Switch tab
function switchTab(tab) {
    currentTab = tab;
    
    navItems.forEach(item => {
        if (item.dataset.tab === tab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Hide all tabs
    homeTab.classList.remove('active');
    favoritesTab.classList.remove('active');
    viewAllTab.classList.remove('active');
    
    if (tab === 'home') {
        homeTab.classList.add('active');
        appTitle.textContent = 'MusicVerse';
    } else if (tab === 'favorites') {
        favoritesTab.classList.add('active');
        appTitle.textContent = 'Favorites';
    } else if (tab === 'viewAll') {
        viewAllTab.classList.add('active');
        // Title will be set by showViewAll function
    }
}

// Show View All section
function showViewAll(type) {
    let songs = [];
    let title = '';
    
    if (type === 'recommended') {
        songs = allSongs;
        title = 'For You';
    } else if (type === 'recent') {
        songs = allSongs;
        title = 'Recent Plays';
    }
    
    viewAllTitle.textContent = title;
    viewAllList.innerHTML = '';
    
    songs.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        viewAllList.appendChild(songItem);
    });
    
    switchTab('viewAll');
    
    // Scroll to top
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // View All buttons
    const viewAllRecommended = document.getElementById('viewAllRecommended');
    const viewAllRecent = document.getElementById('viewAllRecent');
    
    if (viewAllRecommended) {
        viewAllRecommended.addEventListener('click', () => {
            showViewAll('recommended');
        });
    }
    
    if (viewAllRecent) {
        viewAllRecent.addEventListener('click', () => {
            showViewAll('recent');
        });
    }
    
    // Back from View All
    if (backFromViewAll) {
        backFromViewAll.addEventListener('click', () => {
            switchTab('home');
        });
    }
    
    // Search
    searchToggle.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });
    
    searchBack.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchInput.value = '';
        filteredSongs = [...allSongs];
        renderMusicList();
    });
    
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        filteredSongs = [...allSongs];
        renderMusicList();
    });
    
    searchInput.addEventListener('input', handleSearch);
    
    // Mini player
    miniPlayerContent.addEventListener('click', () => {
        fullPlayer.classList.add('active');
    });
    
    miniPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
    
    // Full player
    closePlayer.addEventListener('click', () => {
        fullPlayer.classList.remove('active');
    });
    
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    
    // Audio events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', playNext);
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
    
    progressBar.addEventListener('click', seek);
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.dataset.tab);
        });
    });
}

// Initialize app
init();

