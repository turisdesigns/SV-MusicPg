 //Video gallery functionality and lightbox
 const videosByCategory = {
  full: [
      { thumbnail: "./img/burko-full-set-thumbnail.png", src: "./video/Burko-FullSet.mp4" },
      { thumbnail: "./img/marbs-full-set-thumbnail.png", src: "./video/MARBS-FullSet.mp4" },
      { thumbnail: "./img/t_sugah-full-set-thumbnail.png", src: "./video/T&Sugah-FullSet.mp4" }
  ],
  highlights: [
      { thumbnail: "./img/burko-highlight.jpg", src: "./video/Burko-Highlight.mp4" },
      { thumbnail: "./img/marbs-highlight.jpg", src: "./video/MARBS-Highlight.mp4" },
      { thumbnail: "./img/t&sugah-highlight.jpg", src: "./video/t&sugah-Highlight.mp4" },
      { thumbnail: "./img/townshiprebellion-highlight.jpg", src: "./video/TownshipRebellion-Highlight.mp4" }
  ],
  reels: [
      { thumbnail: "./img/townshiprebellion-reel1.jpg", src: "./video/TownshipRebellion-Reel1.mp4" },
      { thumbnail: "./img/townshiprebellion-reel2.jpg", src: "./video/TownshipRebellion-Reel2.mp4" },
      { thumbnail: "./img/tsha-reel1.jpg", src: "./video/TSHA-Reel1.mp4" },
      { thumbnail: "./img/tsha-reel2.jpg", src: "./video/TSHA-Reel2.mp4" }
  ]
};

let currentCategory = 'full';
let currentSlide = 0;

// Touch/Swipe variables
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTransform = 0;

function renderVideos() {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";
  
  console.log('Rendering videos for category:', currentCategory);
  console.log('Videos in category:', videosByCategory[currentCategory]);
  
  videosByCategory[currentCategory].forEach((video, index) => {
      const div = document.createElement("div");
      div.className = "video-thumb";
      div.innerHTML = `<img src="${video.thumbnail}" alt="Video ${index + 1}" onclick="openLightbox('${video.src}')" onerror="this.style.backgroundColor='#333'; this.alt='Image not found'">`;
      container.appendChild(div);
      console.log('Added video:', index + 1, video.thumbnail);
  });
  
  console.log('Total videos rendered:', container.children.length);
  renderPaginationDots();
  updateSlide();
}

function renderPaginationDots() {
  const dotsContainer = document.getElementById("paginationDots");
  dotsContainer.innerHTML = "";
  
  const videoCount = videosByCategory[currentCategory].length;
  const isMobile = window.innerWidth <= 768;
  
  // On mobile, show dots for individual videos
  // On desktop, show dots for groups of 3 videos
  const dotCount = isMobile ? videoCount : Math.ceil(videoCount / 3);
  
  for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
  }
  
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  const isMobile = window.innerWidth <= 768;
  
  dots.forEach((dot, index) => {
      if (isMobile) {
          // On mobile, highlight the dot corresponding to the current video
          dot.classList.toggle("active", index === currentSlide);
      } else {
          // On desktop, highlight the dot corresponding to the current group
          dot.classList.toggle("active", index === currentSlide);
      }
  });
}

function goToSlide(slideIndex) {
  const videoCount = videosByCategory[currentCategory].length;
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
      // On mobile, go directly to the video
      const maxSlide = videoCount - 1;
      currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
  } else {
      // On desktop, go to the group of videos
      const maxSlide = Math.ceil(videoCount / 3) - 1;
      currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
  }
  
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
  
  console.log('About to render videos for:', currentCategory);
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
  
  console.log('UpdateSlide - Mobile:', isMobile, 'VideoCount:', videoCount, 'CurrentSlide:', currentSlide);
  
  if (isMobile) {
      // On mobile, translate by the width of each video (80vw + 15px margin)
      const videoWidth = window.innerWidth * 0.8 + 15; // 80vw + 15px margin
      const maxSlide = videoCount - 1;
      currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
      const offsetPx = -(videoWidth * currentSlide);
      console.log('Mobile offset:', offsetPx + 'px');
      document.getElementById("videoContainer").style.transform = `translateX(${offsetPx}px)`;
  } else {
      // Desktop logic remains the same
      const visibleCount = 3;
      const maxSlide = Math.ceil(videoCount / visibleCount) - 1;
      currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
      const offsetPercent = -(100 / visibleCount) * currentSlide;
      document.getElementById("videoContainer").style.transform = `translateX(${offsetPercent}%)`;
      
      // Show/hide arrows on desktop
      const arrows = document.querySelectorAll('.arrow');
      if (arrows.length > 0) {
          arrows[0].style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
          arrows[1].style.visibility = currentSlide >= maxSlide ? 'hidden' : 'visible';
      }
  }
  
  updateDots();
}

function nextSlide() {
  const videoCount = videosByCategory[currentCategory].length;
  const visibleCount = window.innerWidth <= 768 ? 1 : 3;
  const maxSlide = Math.ceil(videoCount / visibleCount) - 1;
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
  if (window.innerWidth > 768) return; // Only on mobile
  
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
  
  const container = document.getElementById("videoContainer");
  container.style.transition = 'none';
}

function handleTouchMove(e) {
  if (!isDragging || window.innerWidth > 768) return;
  
  e.preventDefault();
  currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;
  const container = document.getElementById("videoContainer");
  
  // Calculate current position in pixels for mobile
  const videoWidth = window.innerWidth * 0.9 + 20; // 90vw + 20px margin
  const currentPosition = -(videoWidth * currentSlide);
  const newPosition = currentPosition + deltaX;
  
  // Limit dragging beyond boundaries
  const videoCount = videosByCategory[currentCategory].length;
  const maxPosition = -(videoWidth * (videoCount - 1));
  const limitedPosition = Math.max(maxPosition, Math.min(0, newPosition));
  
  container.style.transform = `translateX(${limitedPosition}px)`;
}

function handleTouchEnd(e) {
  if (!isDragging || window.innerWidth > 768) return;
  
  isDragging = false;
  const container = document.getElementById("videoContainer");
  container.style.transition = 'transform 0.3s ease';
  
  const deltaX = currentX - startX;
  const threshold = 50; // Fixed pixel threshold instead of percentage
  
  const videoCount = videosByCategory[currentCategory].length;
  const maxSlide = videoCount - 1;
  
  if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentSlide > 0) {
          // Swiped right - go to previous (only if not at first)
          currentSlide--;
      } else if (deltaX < 0 && currentSlide < maxSlide) {
          // Swiped left - go to next (only if not at last)
          currentSlide++;
      }
  }
  
  // Always update to proper position
  updateSlide();
}

// Add touch event listeners
function addTouchListeners() {
  const container = document.getElementById("videoContainer");
  
  container.addEventListener('touchstart', handleTouchStart, { passive: false });
  container.addEventListener('touchmove', handleTouchMove, { passive: false });
  container.addEventListener('touchend', handleTouchEnd, { passive: false });
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

// Handle window resize to update dots
function handleResize() {
  renderPaginationDots();
  updateSlide();
}

// Initialize on load and resize
window.addEventListener("resize", handleResize);
window.addEventListener("load", function() {
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
