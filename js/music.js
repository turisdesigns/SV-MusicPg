 
  const videosData = {
    full: [
      { src: "https://your-host.com/videos/full1.mp4", thumb: "https://your-host.com/thumbs/full1.jpg" },
      { src: "https://your-host.com/videos/full2.mp4", thumb: "https://your-host.com/thumbs/full2.jpg" },
      { src: "https://your-host.com/videos/full3.mp4", thumb: "https://your-host.com/thumbs/full3.jpg" },
    ],
    highlights: [
      { src: "https://your-host.com/videos/high1.mp4", thumb: "https://your-host.com/thumbs/high1.jpg" },
      { src: "https://your-host.com/videos/high2.mp4", thumb: "https://your-host.com/thumbs/high2.jpg" },
      { src: "https://your-host.com/videos/high3.mp4", thumb: "https://your-host.com/thumbs/high3.jpg" },
    ],
    reels: [
      { src: "https://your-host.com/videos/reel1.mp4", thumb: "https://your-host.com/thumbs/reel1.jpg" },
      { src: "https://your-host.com/videos/reel2.mp4", thumb: "https://your-host.com/thumbs/reel2.jpg" },
      { src: "https://your-host.com/videos/reel3.mp4", thumb: "https://your-host.com/thumbs/reel3.jpg" },
    ]
  };

  let currentCategory = 'full';
  let currentSlide = 0;

  function changeCategory(category) {
    currentCategory = category;
    currentSlide = 0;
    updateCategoryButtons(category);
    renderVideos();
    updatePaginationDots();
  }

  function updateCategoryButtons(category) {
    document.querySelectorAll('.categories button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.dropdown-option').forEach(opt => {
      opt.classList.remove('active');
    });

    document.querySelector(`.categories button[onclick*="${category}"]`)?.classList.add('active');
    document.querySelector(`.dropdown-option[onclick*="${category}"]`)?.classList.add('active');
  }

  function toggleDropdown() {
    document.getElementById('dropdown-menu').classList.toggle('show');
    document.querySelector('.dropdown-button').classList.toggle('open');
  }

  function selectCategory(category, label) {
    document.getElementById('dropdown-text').innerText = label;
    toggleDropdown();
    changeCategory(category);
  }

  function renderVideos() {
    const container = document.getElementById('videoContainer');
    container.innerHTML = '';
    videosData[currentCategory].forEach((video, index) => {
      const div = document.createElement('div');
      div.classList.add('video-thumb');
      div.innerHTML = `<img src="${video.thumb}" onclick="openLightbox('${video.src}')" alt="Video Thumbnail">`;
      container.appendChild(div);
    });
    updateSlidePosition();
  }

  function updateSlidePosition() {
    const container = document.getElementById('videoContainer');
    const videoThumbs = container.querySelectorAll('.video-thumb');
    const cardWidth = videoThumbs[0]?.offsetWidth || 320;
    const visibleCards = window.innerWidth >= 1024 ? 3 : 1;
    const maxSlide = Math.max(0, videoThumbs.length - visibleCards);
    currentSlide = Math.min(currentSlide, maxSlide);
    container.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlidePosition();
      updatePaginationDots();
    }
  }

  function nextSlide() {
    const visibleCards = window.innerWidth >= 1024 ? 3 : 1;
    const totalCards = videosData[currentCategory].length;
    if (currentSlide < totalCards - visibleCards) {
      currentSlide++;
      updateSlidePosition();
      updatePaginationDots();
    }
  }

  function updatePaginationDots() {
    const dotsContainer = document.getElementById('paginationDots');
    dotsContainer.innerHTML = '';
    const visibleCards = window.innerWidth >= 1024 ? 3 : 1;
    const totalDots = Math.max(1, videosData[currentCategory].length - visibleCards + 1);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.onclick = () => {
        currentSlide = i;
        updateSlidePosition();
        updatePaginationDots();
      };
      dotsContainer.appendChild(dot);
    }
  }

  function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const video = document.getElementById('lightboxVideo');
    video.src = src;
    lightbox.style.display = 'flex';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const video = document.getElementById('lightboxVideo');
    video.pause();
    video.src = '';
    lightbox.style.display = 'none';
  }

  window.addEventListener('resize', () => {
    updateSlidePosition();
    updatePaginationDots();
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderVideos();
    updatePaginationDots();
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
