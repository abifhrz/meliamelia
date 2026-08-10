const text = "Hiii, Amel Cheesecake";
const typedEl = document.getElementById("typed-text");
const cursorEl = document.getElementById("cursor");
const btnStart = document.getElementById("btn-start");
const section1 = document.getElementById("section-1");
const letterOverlay = document.getElementById("letter-overlay");
const btnClose = document.getElementById("btn-close");
const musicBtn = document.getElementById("music-btn");
const musicAudio = document.getElementById("music-audio");

const RESUME_EVENTS = ["pointerdown", "touchstart", "keydown", "click", "wheel"];

let musicStarted = false;

async function tryPlayMusic() {
  try {
    await musicAudio.play();
    musicStarted = true;
    musicBtn.classList.add("playing");
  } catch (err) {
    return false;
  }
  return true;
}

function resumeMusic() {
  if (!musicStarted && tryPlayMusic()) {
    for (const evt of RESUME_EVENTS) {
      window.removeEventListener(evt, resumeMusic);
    }
  }
}

tryPlayMusic();
for (const evt of RESUME_EVENTS) {
  window.addEventListener(evt, resumeMusic, { passive: true });
}

musicBtn.addEventListener("click", () => {
  if (musicAudio.paused) {
    tryPlayMusic();
  } else {
    musicAudio.pause();
    musicBtn.classList.remove("playing");
  }
});

let index = 0;

function typeText() {
  if (index < text.length) {
    typedEl.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 120);
  } else {
    cursorEl.style.display = "none";
    btnStart.classList.add("visible");
  }
}

typeText();

btnStart.addEventListener("click", () => {
  letterOverlay.classList.add("open");
  letterOverlay.setAttribute("aria-hidden", "false");
});

btnClose.addEventListener("click", () => {
  letterOverlay.classList.remove("open");
  letterOverlay.setAttribute("aria-hidden", "true");
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

const FISH_COUNT = 100;
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

    f.el.style.transform = `scaleX(${f.dir}) translate(${f.x}px, ${f.y}px)`;
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

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".polaroid").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
});

const carouselSlides = Array.from(document.querySelectorAll(".carousel-slide"));
const carouselDots = document.querySelector(".carousel-dots");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");
let carouselIndex = 0;
let carouselTimer = null;

carouselSlides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    lightboxImg.src = slide.dataset.src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
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
    slide.classList.toggle("active", idx === carouselIndex);
  });
  Array.from(carouselDots.children).forEach((dot, idx) => {
    dot.classList.toggle("active", idx === carouselIndex);
  });
}

function nextSlide() {
  goToSlide(carouselIndex + 1);
}

function prevSlide() {
  goToSlide(carouselIndex - 1);
}

function restartCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 3500);
}

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

requestAnimationFrame(swimFrame);