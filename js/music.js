const videosByCategory = {
  full: [
      { thumbnail: "./img/burko-full-set-thumbnail.png", src: "https://stream.mux.com/B2sjPWvKK1WGAHAQTYMgyowVwo3kCLLy.m3u8" },
      { thumbnail: "./img/marbs-full-set-thumbnail.png", src: "https://stream.mux.com/aELVKP66fm00yjwzaXiF9meg5fR3IxLkT.m3u8" },
      { thumbnail: "./img/t_sugah-full-set-thumbnail.png", src: "https://stream.mux.com/400802Oi6RVOiJn5p401fsqqznckFq2kKhO.m3u8" }
  ],
  highlights: [
      { thumbnail: "./img/burko-highlight.jpg", src: "https://stream.mux.com/02rWme0102801kqClGHywVzJXnS1KPf6G01DW.m3u8" },
      { thumbnail: "./img/marbs-highlight.jpg", src: "https://stream.mux.com/WpJwbNp01GkyOnnms016QP8v3tSmGBxpNZ.m3u8" },
      { thumbnail: "./img/t&sugah-highlight.jpg", src: "https://stream.mux.com/00sB3dSozF4ZaKgl02MMiHX9D5K1i0015vo.m3u8" },
      { thumbnail: "./img/townshiprebellion-highlight.jpg", src: "https://stream.mux.com/SMKgbJFlevfsAe2iinvi501si8I15a9hi.m3u8" }
  ],
  reels: [
      { thumbnail: "./img/townshiprebellion-reel1.jpg", src: "https://stream.mux.com/gCBrFfvbgY3028VaU3LlD9Ama3o89Zcuz.m3u8" },
      { thumbnail: "./img/townshiprebellion-reel2.jpg", src: "https://stream.mux.com/YpnsqKblQO01rehm3nFatOrenT7DM01dwG.m3u8" },
      { thumbnail: "./img/tsha-reel1.jpg", src: "https://stream.mux.com/1QuvIiozefBhp019HXc1YLHnF3pNSmq004.m3u8" },
      { thumbnail: "./img/tsha-reel2.jpg", src: "https://stream.mux.com/TrTA500WyT8r01CGxpVWpm3fyrMRUhsP3F.m3u8" }
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
    // On desktop, show dots for individual videos (changed from groups of 3)
    const dotCount = videoCount;
    
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
        // Both mobile and desktop now highlight the dot corresponding to the current video
        dot.classList.toggle("active", index === currentSlide);
    });
}

function goToSlide(slideIndex) {
    const videoCount = videosByCategory[currentCategory].length;
    
    // Both mobile and desktop now go directly to the video
    const maxSlide = videoCount - 1;
    currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    
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
        // Desktop logic - now moves one video at a time
        const visibleCount = 3; // Still show 3 videos at once
        const videoWidth = 100 / visibleCount; // Each video takes 33.33% width
        const maxSlide = videoCount - 1;
        currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
        
        // Calculate offset to show the current video and next ones
        const offsetPercent = -(videoWidth * currentSlide);
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
    const maxSlide = videoCount - 1; // Changed: now moves one video at a time for both mobile and desktop
    
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
    isDragging = false; // Start as false, only set to true if we detect a swipe
    
    // Store initial time to detect quick taps vs swipes
    this.touchStartTime = Date.now();
}

function handleTouchMove(e) {
    if (window.innerWidth > 768) return;
    
    currentX = e.touches[0].clientX;
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(e.touches[0].clientY - (e.touches[0].startY || e.touches[0].clientY));
    
    // Only start dragging if horizontal movement is greater than vertical (horizontal swipe)
    // and movement is significant enough
    if (deltaX > 15 && deltaX > deltaY) {
        if (!isDragging) {
            isDragging = true;
            const container = document.getElementById("videoContainer");
            container.style.transition = 'none';
        }
        
        e.preventDefault(); // Prevent scrolling only when we're actually swiping
        
        const container = document.getElementById("videoContainer");
        const swipeDelta = currentX - startX;
        
        // Calculate current position in pixels for mobile
        const videoWidth = window.innerWidth * 0.8 + 15;
        const currentPosition = -(videoWidth * currentSlide);
        const newPosition = currentPosition + swipeDelta;
        
        // Limit dragging beyond boundaries with some resistance
        const videoCount = videosByCategory[currentCategory].length;
        const maxPosition = -(videoWidth * (videoCount - 1));
        
        let limitedPosition;
        if (newPosition > 0) {
            // Resistance when trying to go before first video
            limitedPosition = newPosition * 0.3;
        } else if (newPosition < maxPosition) {
            // Resistance when trying to go past last video
            limitedPosition = maxPosition + (newPosition - maxPosition) * 0.3;
        } else {
            limitedPosition = newPosition;
        }
        
        container.style.transform = `translateX(${limitedPosition}px)`;
    }
}

function handleTouchEnd(e) {
    if (window.innerWidth > 768) return;
    
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - (this.touchStartTime || touchEndTime);
    
    if (isDragging) {
        isDragging = false;
        const container = document.getElementById("videoContainer");
        container.style.transition = 'transform 0.3s ease';
        
        const deltaX = currentX - startX;
        const threshold = 50;
        
        const videoCount = videosByCategory[currentCategory].length;
        const maxSlide = videoCount - 1;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSlide > 0) {
                // Swiped right - go to previous
                currentSlide--;
            } else if (deltaX < 0 && currentSlide < maxSlide) {
                // Swiped left - go to next
                currentSlide++;
            }
        }
        
        // Always return to proper position
        updateSlide();
    }
    
    // Reset touch tracking
    startX = 0;
    currentX = 0;
}

// Add touch event listeners to the carousel container, not the videos
function addTouchListeners() {
    const carousel = document.querySelector(".carousel");
    
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const video = document.getElementById("lightboxVideo");
    
    // Enhanced video loading with better error handling
    video.src = "";  // Clear previous source
    
    // Add event listeners for better video handling
    video.addEventListener('loadstart', function() {
        console.log('Video loading started');
    });
    
    video.addEventListener('canplay', function() {
        console.log('Video can start playing');
    });
    
    video.addEventListener('error', function(e) {
        console.error('Video loading error:', e);
        alert('Error loading video. Please try again.');
    });
    
    // Set the source and show lightbox
    video.src = src;
    video.load(); // Explicitly load the video
    lightbox.style.display = "flex";
    
    // Add fullscreen support
    addFullscreenSupport();
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const video = document.getElementById("lightboxVideo");
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    video.pause();
    video.src = "";
    lightbox.style.display = "none";
    
    // Remove event listeners to prevent memory leaks
    video.removeEventListener('loadstart', function() {});
    video.removeEventListener('canplay', function() {});
    video.removeEventListener('error', function() {});
}

function addFullscreenSupport() {
    const video = document.getElementById("lightboxVideo");
    
    // Add fullscreen button if it doesn't exist
    let fullscreenBtn = document.getElementById("fullscreenBtn");
    if (!fullscreenBtn) {
        fullscreenBtn = document.createElement("button");
        fullscreenBtn.id = "fullscreenBtn";
        fullscreenBtn.innerHTML = "⛶"; // Fullscreen icon
        fullscreenBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 60px;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
            z-index: 1001;
        `;
        
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        document.getElementById("lightbox").appendChild(fullscreenBtn);
    }
}

function toggleFullscreen() {
    const lightbox = document.getElementById("lightbox");
    const video = document.getElementById("lightboxVideo");
    
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (lightbox.requestFullscreen) {
            lightbox.requestFullscreen();
        } else if (lightbox.webkitRequestFullscreen) {
            lightbox.webkitRequestFullscreen();
        } else if (lightbox.msRequestFullscreen) {
            lightbox.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    if (fullscreenBtn) {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = "⛉"; // Exit fullscreen icon
        } else {
            fullscreenBtn.innerHTML = "⛶"; // Enter fullscreen icon
        }
    }
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
