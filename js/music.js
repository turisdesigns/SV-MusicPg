//Video gallery functionality and lightbox
const videosByCategory = {
  full: [
      { thumbnail: "./img/burko-full-set-thumbnail.png", src: "/video/Burko-FullSet.mp4" },
      { thumbnail: "./img/marbs-full-set-thumbnail.png", src: "/video/MARBS-FullSet.mp4" },
      { thumbnail: "./img/t_sugah-full-set-thumbnail.png", src: "/video/T&Sugah-FullSet.mp4" }
  ],
  highlights: [
      { thumbnail: "./img/burko-highlight.jpg", src: "/video/Burko-Highlight.mp4" },
      { thumbnail: "./img/marbs-highlight.jpg", src: "/video/MARBS-Highlight.mp4" },
      { thumbnail: "./img/t&sugah-highlight.jpg", src: "/video/t&sugah-Highlight.mp4" },
      { thumbnail: "./img/townshiprebellion-highlight.jpg", src: "/video/TownshipRebellion-Highlight.mp4" }
  ],
  reels: [
      { thumbnail: "./img/townshiprebellion-reel1.jpg", src: "/video/TownshipRebellion-Reel1.mp4" },
      { thumbnail: "./img/townshiprebellion-reel2.jpg", src: "/video/TownshipRebellion-Reel2.mp4" },
      { thumbnail: "./img/tsha-reel1.jpg", src: "/video/TSHA-Reel1.mp4" },
      { thumbnail: "./img/tsha-reel2.jpg", src: "/video/TSHA-Reel2.mp4" }
  ]
};

let currentCategory = 'full';
let currentSlide = 0;

// Touch/Swipe variables
let startX = 0;
let startY = 0;
let currentX = 0;
let isDragging = false;
let hasMoved = false;

function renderVideos() {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";
  
  console.log('Rendering videos for category:', currentCategory);
  
  videosByCategory[currentCategory].forEach((video, index) => {
      const div = document.createElement("div");
      div.className = "video-thumb";
      div.innerHTML = `<img src="${video.thumbnail}" alt="Video ${index + 1}" data-src="${video.src}" onerror="console.error('Image failed to load:', '${video.thumbnail}'); this.style.backgroundColor='#666'; this.style.color='white'; this.innerHTML='<div style=&quot;padding:20px;text-align:center;&quot;>Image not found<br>${video.thumbnail}</div>';">`;
      container.appendChild(div);
  });
  
  // Reset slide position
  currentSlide = 0;
  updateSlide();
}

function changeCategory(category) {
  currentCategory = category;
  currentSlide = 0;
  
  // Update desktop buttons
  document.querySelectorAll(".categories button").forEach(btn => {
      btn.classList.toggle("active", btn.textContent.toLowerCase().includes(category));
  });
  
  renderVideos();
}

// Dropdown functionality
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-menu');
  const button = document.querySelector('.dropdown-button');
  
  dropdown.classList.toggle('show');
  button.classList.toggle('open');
}

function selectCategory(category, displayName) {
  console.log('Selecting category:', category, displayName);
  
  document.getElementById('dropdown-text').textContent = displayName;
  
  // Update dropdown options
  document.querySelectorAll('.dropdown-option').forEach(opt => {
      opt.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Close dropdown
  document.getElementById('dropdown-menu').classList.remove('show');
  document.querySelector('.dropdown-button').classList.remove('open');
  
  // Change category
  currentCategory = category;
  currentSlide = 0;
  
  renderVideos();
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown-container');
  if (!dropdown.contains(event.target)) {
      document.getElementById('dropdown-menu').classList.remove('show');
      document.querySelector('.dropdown-button').classList.remove('open');
  }
});

function updateSlide() {
  const videoCount = videosByCategory[currentCategory].length;
  const isMobile = window.innerWidth <= 768;
  const container = document.getElementById("videoContainer");
  
  if (isMobile) {
      // Mobile: Calculate position based on video width + margin
      currentSlide = Math.max(0, Math.min(currentSlide, videoCount - 1));
      const videoWidth = window.innerWidth * 0.8 + 20; // 80vw + 20px margin
      const offsetPx = -(videoWidth * currentSlide);
      
      container.style.transform = `translateX(${offsetPx}px)`;
  } else {
      // Desktop logic
      const visibleCount = 3;
      const maxSlide = Math.max(0, Math.ceil(videoCount / visibleCount) - 1);
      currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
      const offsetPercent = -(100 / visibleCount) * currentSlide;
      container.style.transform = `translateX(${offsetPercent}%)`;
      
      // Show/hide arrows on desktop
      const arrows = document.querySelectorAll('.arrow');
      if (arrows.length > 0) {
          arrows[0].style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
          arrows[1].style.visibility = currentSlide >= maxSlide ? 'hidden' : 'visible';
      }
  }
}

function nextSlide() {
  const videoCount = videosByCategory[currentCategory].length;
  const visibleCount = window.innerWidth <= 768 ? 1 : 3;
  const maxSlide = window.innerWidth <= 768 ? videoCount - 1 : Math.ceil(videoCount / visibleCount) - 1;
  
  if (currentSlide < maxSlide) {
      currentSlide++;
      updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
  }
}

// Touch/Swipe functionality
function handleTouchStart(e) {
  if (window.innerWidth > 768) return;
  
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  currentX = startX;
  isDragging = true;
  hasMoved = false;
  
  const container = document.getElementById("videoContainer");
  container.style.transition = 'none';
}

function handleTouchMove(e) {
  if (!isDragging || window.innerWidth > 768) return;
  
  currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  // Check if this is primarily a horizontal swipe
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
      hasMoved = true;
      
      const container = document.getElementById("videoContainer");
      const videoWidth = window.innerWidth * 0.8 + 20;
      const currentPosition = -(videoWidth * currentSlide);
      const newPosition = currentPosition + deltaX;
      
      // Add some resistance at the edges
      const videoCount = videosByCategory[currentCategory].length;
      const maxPosition = -(videoWidth * (videoCount - 1));
      
      let limitedPosition;
      if (newPosition > 0) {
          limitedPosition = newPosition * 0.3; // Resistance at start
      } else if (newPosition < maxPosition) {
          limitedPosition = maxPosition + (newPosition - maxPosition) * 0.3; // Resistance at end
      } else {
          limitedPosition = newPosition;
      }
      
      container.style.transform = `translateX(${limitedPosition}px)`;
  }
}

function handleTouchEnd(e) {
  if (!isDragging || window.innerWidth > 768) return;
  
  isDragging = false;
  const container = document.getElementById("videoContainer");
  container.style.transition = 'transform 0.3s ease';
  
  const deltaX = currentX - startX;
  const threshold = 50;
  
  const videoCount = videosByCategory[currentCategory].length;
  const maxSlide = videoCount - 1;
  
  // Only change slide if we moved enough horizontally
  if (hasMoved && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentSlide > 0) {
          currentSlide--;
      } else if (deltaX < 0 && currentSlide < maxSlide) {
          currentSlide++;
      }
  }
  
  updateSlide();
}

// Handle click to open lightbox (only if no swipe occurred)
function handleContainerClick(e) {
  if (hasMoved) return; // Don't open lightbox if we just swiped
  
  const thumb = e.target.closest('.video-thumb');
  if (thumb) {
      const img = thumb.querySelector('img');
      if (img && img.dataset.src) {
          openLightbox(img.dataset.src);
      }
  }
}

// Add touch event listeners
function addTouchListeners() {
  const container = document.getElementById("videoContainer");
  
  container.addEventListener('touchstart', handleTouchStart, { passive: false });
  container.addEventListener('touchmove', handleTouchMove, { passive: false });
  container.addEventListener('touchend', handleTouchEnd, { passive: false });
  container.addEventListener('click', handleContainerClick);
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const video = document.getElementById("lightboxVideo");
  video.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const video = document.getElementById("lightboxVideo");
  video.pause();
  video.src = "";
  lightbox.style.display = "none";
}

// Initialize on load and resize
window.addEventListener("resize", updateSlide);
window.addEventListener("load", function() {
  console.log('Page loaded - initializing...');
  renderVideos();
  addTouchListeners();
});











//who we are carousel functionality
let cardIndex = 0;
const carousel = document.getElementById("whoWeAreCarousel");

function updateCarousel() {
  if (window.innerWidth < 768) {
    carousel.style.transform = "none";
    return;
  }

  const card = carousel.querySelector(".who-we-are-card");
  const cardWidth = card.offsetWidth; // No gap needed since cards are full width
  const cardsPerView = 1; // Show one card at a time
  const totalCards = carousel.children.length;
  const maxIndex = totalCards - cardsPerView;

  // Keep index within bounds
  if (cardIndex < 0) cardIndex = maxIndex; // Loop to last card
  if (cardIndex > maxIndex) cardIndex = 0; // Loop to first card

  const offset = -(cardIndex * cardWidth);
  carousel.style.transform = `translateX(${offset}px)`;
}

function nextCard() {
  cardIndex++;
  updateCarousel();
}

function prevCard() {
  cardIndex--;
  updateCarousel();
}

// Initialize carousel on page load
window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);



// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
navLinks.classList.toggle('open');
});
