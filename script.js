// ========== LOGIN FUNCTIONALITY ==========
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();

  // Demo credentials (customize these!)
  const validUsername = 'bro';
  const validPassword = '2026';

  if (username === validUsername && password === validPassword) {
    // Successfully logged in
    transitionToSurprise();
  } else {
    // Failed login
    alert('❌ Oops! Wrong answer!\n\nTip: Think of his nickname and something special! 😄');
    document.getElementById('loginForm').reset();
  }
}

function transitionToSurprise() {
  const loginPage = document.getElementById('loginPage');
  const surprisePage = document.getElementById('surprisePage');

  loginPage.classList.remove('active');
  loginPage.classList.add('hidden');

  surprisePage.classList.remove('hidden');
  surprisePage.classList.add('active');

  // Play background music
  playBackgroundMusic();

  // Initialize surprise features
  startCarousel();
  startCountdown();
}

function logout() {
  const loginPage = document.getElementById('loginPage');
  const surprisePage = document.getElementById('surprisePage');
  const surpriseContent = document.getElementById('surpriseContent');

  // Stop music
  stopBackgroundMusic();

  // Reset surprise content
  surpriseContent.classList.add('hidden');
  document.getElementById('trailerSection').style.display = 'flex';

  // Reset pages
  surprisePage.classList.remove('active');
  surprisePage.classList.add('hidden');

  loginPage.classList.remove('hidden');
  loginPage.classList.add('active');

  // Clear form
  document.getElementById('loginForm').reset();

  // Stop carousel
  stopCarousel();
}

// ========== CAROUSEL FUNCTIONALITY ==========
let carouselInterval;
let currentMessageIndex = 0;

function startCarousel() {
  showMessage(0);
  carouselInterval = setInterval(() => {
    currentMessageIndex = (currentMessageIndex + 1) % 4;
    showMessage(currentMessageIndex);
  }, 5000); // Change message every 5 seconds
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

function showMessage(index) {
  const messages = document.querySelectorAll('.message-card');
  messages.forEach((msg, i) => {
    if (i === index) {
      msg.classList.add('active');
    } else {
      msg.classList.remove('active');
    }
  });
}

// ========== SURPRISE REVEAL ==========
function showSurprise() {
  const trailerSection = document.getElementById('trailerSection');
  const surpriseContent = document.getElementById('surpriseContent');

  trailerSection.style.display = 'none';
  surpriseContent.classList.remove('hidden');

  // Play celebration sound
  playCelebrationSound();

  // Trigger confetti effect
  triggerConfetti();
}

function triggerConfetti() {
  // Simple confetti effect using CSS
  const confettiPieces = [];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';

    const colors = ['#ff1744', '#ffd700', '#ff5983', '#667eea', '#764ba2'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `fall ${2 + Math.random() * 2}s linear`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

// Add fall animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== COUNTDOWN TIMER ==========
function startCountdown() {
  // Set wedding date (adjust this to the actual wedding date)
  const weddingDate = new Date('2026-05-10T10:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;

    if (distance < 0) {
      clearInterval(countdownInterval);
      if (daysEl) daysEl.textContent = '0';
      if (hoursEl) hoursEl.textContent = '0';
      if (minutesEl) minutesEl.textContent = '0';
      if (secondsEl) secondsEl.textContent = '0';
    }
  }

  // Update immediately
  updateCountdown();

  // Update every second
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// ========== ADDITIONAL FUNCTIONS ==========
function shareJoy() {
  playClickSound();

  const message = "🎉 My brother is getting married! Check out this awesome surprise website! 🎊";

  if (navigator.share) {
    navigator.share({
      title: "Brother's Wedding Surprise!",
      text: message,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback for browsers that don't support native sharing
    alert(`📱 Share this joy!\n\n${message}\n\nURL: ${window.location.href}`);
  }
}

function galleryMode() {
  playClickSound();

  const gallerySection = document.querySelector('.gallery-section');
  gallerySection.scrollIntoView({ behavior: 'smooth' });

  // Add special effect to gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.style.animation = 'none';
    setTimeout(() => {
      item.style.animation = 'pulse 0.6s ease-out';
    }, 10);
  });
}

// ========== PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Add click sound to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', playClickSound);
  });

  // Setup music toggle button
  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMusicPlaying) {
        stopBackgroundMusic();
      } else {
        playBackgroundMusic();
      }
    });
  }

  // Add keyboard support for login
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('loginPage').classList.contains('active')) {
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        handleLogin(new Event('submit'));
      }
    }
  });

  console.log('🎉 Wedding Surprise Website Loaded!');
  console.log('Demo Login - Username: bro | Password: 2026');
});

// ========== AUDIO FUNCTIONS ==========
let isMusicPlaying = false;
let audioContext = null;

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playBackgroundMusic() {
  isMusicPlaying = true;
  updateMusicToggleButton();

  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.loop = true;
    bgMusic.play().catch(err => {
      console.log('HTML Audio failed, using Web Audio API');
      playWeddingMusic();
    });
  } else {
    playWeddingMusic();
  }
}

function stopBackgroundMusic() {
  isMusicPlaying = false;
  updateMusicToggleButton();

  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
}

// Web Audio API - Generate wedding celebration music
function playWeddingMusic() {
  try {
    initAudioContext();
    const now = audioContext.currentTime;
    
    // Create a joyful melody pattern
    const notes = [
      { freq: 330, time: 0.2 },    // E
      { freq: 392, time: 0.2 },    // G
      { freq: 440, time: 0.2 },    // A
      { freq: 494, time: 0.2 },    // B
      { freq: 523, time: 0.3 },    // C
    ];

    notes.forEach(note => {
      playTone(note.freq, note.time, 0.1);
    });

    // Loop the music
    setTimeout(() => {
      if (isMusicPlaying) {
        playWeddingMusic();
      }
    }, 1500);
  } catch (e) {
    console.log('Web Audio API not available');
  }
}

function playTone(frequency, duration, volume) {
  try {
    initAudioContext();
    const now = audioContext.currentTime;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (e) {
    console.log('Tone error:', e);
  }
}

function playClickSound() {
  try {
    initAudioContext();
    const now = audioContext.currentTime;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } catch (e) {
    console.log('Click sound error:', e);
  }
}

function playCelebrationSound() {
  try {
    initAudioContext();
    const now = audioContext.currentTime;
    
    // Play a celebratory chord
    playTone(440, 0.2, 0.2);  // A
    playTone(554, 0.2, 0.2);  // C#
    playTone(659, 0.3, 0.2);  // E
  } catch (e) {
    console.log('Celebration sound error:', e);
  }
}

function updateMusicToggleButton() {
  const btn = document.getElementById('musicToggle');
  if (btn) {
    if (isMusicPlaying) {
      btn.textContent = '🔊 Music ON';
      btn.classList.remove('off');
    } else {
      btn.textContent = '🔇 Music OFF';
      btn.classList.add('off');
    }
  }
}
