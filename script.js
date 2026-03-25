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

  // Initialize surprise features
  startCarousel();
  startCountdown();
}

function logout() {
  const loginPage = document.getElementById('loginPage');
  const surprisePage = document.getElementById('surprisePage');
  const surpriseContent = document.getElementById('surpriseContent');

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
