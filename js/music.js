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

function renderVideos() {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";
  videosByCategory[currentCategory].forEach(video => {
    const div = document.createElement("div");
    div.className = "video-thumb";
    div.innerHTML = `<img src="${video.thumbnail}" alt="" onclick="openLightbox('${video.src}')">`;
    container.appendChild(div);
  });
  updateSlide();
}

function changeCategory(category) {
  currentCategory = category;
  currentSlide = 0;
  document.querySelectorAll(".categories button").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.toLowerCase().includes(category));
  });
  renderVideos();
}

function updateSlide() {
  const videoCount = videosByCategory[currentCategory].length;
  const isMobile = window.innerWidth <= 768;
  const visibleCount = isMobile ? 1 : 3;
  const maxSlide = Math.ceil(videoCount / visibleCount) - 1;
  const offsetPercent = -(100 / visibleCount) * currentSlide;

  document.getElementById("videoContainer").style.transform = `translateX(${offsetPercent}%)`;

  // Hide or show arrows depending on slide position
  const arrows = document.querySelectorAll('.arrow');
  arrows[0].style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
  arrows[1].style.visibility = currentSlide >= maxSlide ? 'hidden' : 'visible';
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
renderVideos();




//who we are carousel functionality
let cardIndex = 0;
const carousel = document.getElementById("whoWeAreCarousel");
const cardGap = 24;

function updateCarousel() {
if (window.innerWidth < 768) {
carousel.style.transform = "none";
return;
}

const card = carousel.querySelector(".who-we-are-card");
const cardWidth = card.offsetWidth + cardGap;
const cardsPerView = 2;
const totalCards = carousel.children.length;
const maxIndex = totalCards - cardsPerView;

if (cardIndex < 0) cardIndex = 0;
if (cardIndex > maxIndex) cardIndex = maxIndex;

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

window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);





// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
navLinks.classList.toggle('open');
});
