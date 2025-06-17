
  const videosData = {
    full: [
      { src: "https://stream.mux.com/B2sjPWvKK1WGAHAQTYMgyowVwo3kCLLy.m3u8", thumb: "./img/burko-full-set-thumbnail.png" },
      { src: "https://stream.mux.com/aELVKP66fm00yjwzaXiF9meg5fR3IxLkT.m3u8", thumb: "./img/marbs-full-set-thumbnail.png" },
      { src: "https://stream.mux.com/400802Oi6RVOiJn5p401fsqqznckFq2kKhO.m3u8", thumb: "./img/t_sugah-full-set-thumbnail.png" },
    ],
    highlights: [
      { src: "https://stream.mux.com/02rWme0102801kqClGHywVzJXnS1KPf6G01DW.m3u8", thumb: "./img/burko-highlight.jpg" },
      { src: "https://stream.mux.com/WpJwbNp01GkyOnnms016QP8v3tSmGBxpNZ.m3u8", thumb: "./img/marbs-highlight.jpg" },
      { src: "https://stream.mux.com/00sB3dSozF4ZaKgl02MMiHX9D5K1i0015vo.m3u8", thumb: "./img/t&sugah-highlight.jpg" }, 
      { src: "https://stream.mux.com/SMKgbJFlevfsAe2iinvi501si8I15a9hi.m3u8", thumb: "./img/townshiprebellion-highlight.jpg" },
    ],
    reels: [
      { src: "https://stream.mux.com/gCBrFfvbgY3028VaU3LlD9Ama3o89Zcuz.m3u8", thumb: "./img/townshiprebellion-reel1.jpg" },
      { src: "https://stream.mux.com/YpnsqKblQO01rehm3nFatOrenT7DM01dwG.m3u8", thumb: "./img/townshiprebellion-reel2.jpg" },
      { src: "https://stream.mux.com/1QuvIiozefBhp019HXc1YLHnF3pNSmq004.m3u8", thumb: "./img/tsha-reel1.jpg" },
      { src: "https://stream.mux.com/TrTA500WyT8r01CGxpVWpm3fyrMRUhsP3F.m3u8", thumb: "./img/tsha-reel2.jpg" },
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
