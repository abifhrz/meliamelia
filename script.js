const typedEl = document.getElementById("typed-text");
const text = typedEl.textContent.trim();
const cursorEl = document.getElementById("cursor");
const btnStart = document.getElementById("btn-start");
const letterOverlay = document.getElementById("letter-overlay");
const btnClose = document.getElementById("btn-close");
const musicBtn = document.getElementById("music-btn");
const musicAudio = document.getElementById("music-audio");
const page = document.querySelector(".page");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const RESUME_EVENTS = ["pointerdown", "keydown", "click"];

let musicStarted = false;

function stopResumeListeners() {
  for (const evt of RESUME_EVENTS) {
    window.removeEventListener(evt, resumeMusic);
  }
}

async function tryPlayMusic() {
  try {
    await musicAudio.play();
    musicStarted = true;
    stopResumeListeners();
    return true;
  } catch (err) {
    return false;
  }
}

function resumeMusic(event) {
  if (musicStarted) return;
  if (event && musicBtn.contains(event.target)) return;
  tryPlayMusic();
}

for (const evt of RESUME_EVENTS) {
  window.addEventListener(evt, resumeMusic, { passive: true });
}

musicAudio.addEventListener("play", () => {
  musicBtn.classList.add("playing");
  musicBtn.setAttribute("aria-pressed", "true");
});

musicAudio.addEventListener("pause", () => {
  musicBtn.classList.remove("playing");
  musicBtn.setAttribute("aria-pressed", "false");
});

musicBtn.addEventListener("click", () => {
  if (musicAudio.paused) {
    tryPlayMusic();
  } else {
    musicAudio.pause();
  }
});

let index = 0;

function typeText() {
  if (prefersReducedMotion) {
    typedEl.textContent = text;
    cursorEl.style.display = "none";
    btnStart.disabled = false;
    btnStart.classList.add("visible");
    return;
  }

  if (index < text.length) {
    typedEl.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 120);
  } else {
    cursorEl.style.display = "none";
    btnStart.disabled = false;
    btnStart.classList.add("visible");
  }
}

typedEl.textContent = "";
typeText();

let letterTrigger = null;

function setBackgroundInert(state) {
  page.inert = state;
  musicBtn.inert = state;
}

function openLetter() {
  letterTrigger = document.activeElement === document.body ? btnStart : document.activeElement;
  letterOverlay.inert = false;
  letterOverlay.classList.add("open");
  letterOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setBackgroundInert(true);
  btnClose.focus();
}

function closeLetter() {
  if (!letterOverlay.classList.contains("open")) return;
  letterOverlay.classList.remove("open");
  letterOverlay.inert = true;
  letterOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  setBackgroundInert(false);
  if (letterTrigger && typeof letterTrigger.focus === "function") {
    letterTrigger.focus();
  }
  letterTrigger = null;
}

btnStart.addEventListener("click", openLetter);
btnClose.addEventListener("click", closeLetter);
letterOverlay.addEventListener("click", (event) => {
  if (event.target === letterOverlay) closeLetter();
});

const FISH_IMAGES = [
  "fish/peixinhos1.png",
  "fish/peixinhos2.png",
  "fish/peixinhos3.png",
  "fish/peixinhos4.png",
  "fish/peixinhos5.png",
  "fish/peixinhos6.png",
  "fish/peixinhos7.png",
  "fish/peixinhos8.png"
];

const FISH_COUNT = prefersReducedMotion ? 0 : 100;
const fishLayer = document.getElementById("fish-layer");

function seaBounds() {
  const docH = document.documentElement.scrollHeight;
  return {
    top: window.innerHeight + window.innerHeight * 0.05,
    bottom: docH - window.innerHeight * 0.11
  };
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFish() {
  const img = document.createElement("img");
  img.src = FISH_IMAGES[Math.floor(Math.random() * FISH_IMAGES.length)];
  img.classList.add("fish");

  const dir = Math.random() < 0.5 ? 1 : -1;
  img.style.width = random(24, 64) + "px";

  fishLayer.appendChild(img);

  const bounds = seaBounds();

  return {
    el: img,
    x: random(0, window.innerWidth),
    y: random(bounds.top, bounds.bottom),
    speed: random(40, 110),
    dir: dir
  };
}

const fish = [];
for (let i = 0; i < FISH_COUNT; i++) {
  fish.push(createFish());
}

function swimFrame(t) {
  const w = window.innerWidth;
  const margin = 80;

  for (const f of fish) {
    f.x += (f.speed * f.dir) / 60;

    if (f.dir === 1 && f.x > w + margin) {
      f.x = -margin;
    } else if (f.dir === -1 && f.x < -margin) {
      f.x = w + margin;
    }

    f.el.style.transform = `translate(${f.x}px, ${f.y}px) scaleX(${f.dir})`;
  }

  requestAnimationFrame(swimFrame);
}

window.addEventListener("resize", () => {
  const bounds = seaBounds();
  for (const f of fish) {
    f.y = Math.min(Math.max(f.y, bounds.top), bounds.bottom);
  }
});

const bubbleLayer = document.getElementById("bubble-layer");
const MAX_BUBBLES = 20;
let bubbleCount = 0;

function spawnBubble() {
  if (bubbleCount >= MAX_BUBBLES) return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = random(10, 22);
  const startX = random(0, window.innerWidth - 20);
  const riseDuration = random(5, 9);
  const sway = Math.round(random(30, 90));

  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = startX + "px";
  bubble.style.setProperty("--sway", sway + "px");
  bubble.style.animationDuration = riseDuration + "s";

  bubbleLayer.appendChild(bubble);
  bubbleCount++;

  setTimeout(() => {
    bubble.remove();
    bubbleCount--;
  }, riseDuration * 1000);
}

let lastSpawn = 0;

if (!prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const now = Date.now();
      if (now - lastSpawn < 120) return;
      lastSpawn = now;
      const count = Math.floor(random(1, 3));
      for (let i = 0; i < count; i++) {
        spawnBubble();
      }
    },
    { passive: true }
  );
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let lightboxTrigger = null;

function openLightbox(src, trigger) {
  lightboxTrigger = trigger || null;
  lightboxImg.src = src;
  lightbox.inert = false;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setBackgroundInert(true);
  stopCarousel();
  lightbox.focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains("open")) return;
  lightbox.classList.remove("open");
  lightbox.inert = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.removeAttribute("src");
  document.body.classList.remove("no-scroll");
  setBackgroundInert(false);
  if (lightboxTrigger && typeof lightboxTrigger.focus === "function") {
    lightboxTrigger.focus();
  }
  lightboxTrigger = null;
  startCarousel();
}

function preparePhotoTrigger(item, label) {
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", label);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.click();
    }
  });
}

document.querySelectorAll(".polaroid").forEach((item) => {
  const caption = item.querySelector("figcaption");
  preparePhotoTrigger(item, caption ? caption.textContent.trim() : "Foto kenangan");
  item.addEventListener("click", () => openLightbox(item.dataset.src, item));
});

lightbox.addEventListener("click", closeLightbox);

const carouselSlides = Array.from(document.querySelectorAll(".carousel-slide"));
const carousel = document.querySelector(".carousel");
const carouselDots = document.querySelector(".carousel-dots");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");
let carouselIndex = 0;
let carouselTimer = null;
let carouselHovered = false;
let carouselFocused = false;

carouselSlides.forEach((slide, i) => {
  const slideImg = slide.querySelector("img");
  preparePhotoTrigger(slide, slideImg ? slideImg.alt : "Foto kenangan");
  slide.addEventListener("click", () => openLightbox(slide.dataset.src, slide));

  const dot = document.createElement("button");
  dot.setAttribute("aria-label", "Momen " + (i + 1));
  dot.addEventListener("click", () => {
    goToSlide(i);
    restartCarousel();
  });
  carouselDots.appendChild(dot);
});

function goToSlide(i) {
  carouselIndex = (i + carouselSlides.length) % carouselSlides.length;
  carouselSlides.forEach((slide, idx) => {
    const isActive = idx === carouselIndex;
    slide.classList.toggle("active", isActive);
    slide.tabIndex = isActive ? 0 : -1;
    if (isActive) {
      slide.removeAttribute("aria-hidden");
    } else {
      slide.setAttribute("aria-hidden", "true");
    }
  });
  Array.from(carouselDots.children).forEach((dot, idx) => {
    const isActive = idx === carouselIndex;
    dot.classList.toggle("active", isActive);
    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

function nextSlide() {
  goToSlide(carouselIndex + 1);
}

function prevSlide() {
  goToSlide(carouselIndex - 1);
}

function canAutoPlay() {
  return (
    !prefersReducedMotion &&
    !carouselHovered &&
    !carouselFocused &&
    !document.hidden &&
    !lightbox.classList.contains("open")
  );
}

function startCarousel() {
  if (!canAutoPlay() || carouselTimer) return;
  carouselTimer = setInterval(nextSlide, 3500);
}

function stopCarousel() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function restartCarousel() {
  stopCarousel();
  startCarousel();
}

carousel.addEventListener("mouseenter", () => {
  carouselHovered = true;
  stopCarousel();
});

carousel.addEventListener("mouseleave", () => {
  carouselHovered = false;
  startCarousel();
});

function isCarouselFocus(target) {
  return carousel.contains(target) || carouselDots.contains(target);
}

function handleCarouselFocusIn() {
  carouselFocused = true;
  stopCarousel();
}

function handleCarouselFocusOut(event) {
  if (!isCarouselFocus(event.relatedTarget)) {
    carouselFocused = false;
    startCarousel();
  }
}

function handleCarouselKeydown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
    restartCarousel();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    nextSlide();
    restartCarousel();
  }
}

for (const region of [carousel, carouselDots]) {
  region.addEventListener("focusin", handleCarouselFocusIn);
  region.addEventListener("focusout", handleCarouselFocusOut);
  region.addEventListener("keydown", handleCarouselKeydown);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCarousel();
  } else {
    startCarousel();
  }
});

carouselPrev.addEventListener("click", () => {
  prevSlide();
  restartCarousel();
});

carouselNext.addEventListener("click", () => {
  nextSlide();
  restartCarousel();
});

goToSlide(0);
restartCarousel();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section .container").forEach((el) => {
  sectionObserver.observe(el);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (lightbox.classList.contains("open")) {
    closeLightbox();
  } else if (letterOverlay.classList.contains("open")) {
    closeLetter();
  }
});

if (FISH_COUNT > 0) {
  requestAnimationFrame(swimFrame);
}