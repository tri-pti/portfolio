/* ===== 3D ANIMATED BACKGROUND (THREE.JS) ===== */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

/* Particles */
const geometry = new THREE.BufferGeometry();
const particleCount = 1200;

const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 200;
}

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x38bdf8,
  size: 0.6
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

/* ===== MOUSE MOVE PARALLAX EFFECT ===== */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

/* Animation Loop */
function animateBackground() {
  requestAnimationFrame(animateBackground);

  // Smooth parallax movement
  camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;

  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0005;

  renderer.render(scene, camera);
}


animateBackground();

/* Responsive */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


/* Scroll Reveal */
const sections = document.querySelectorAll("section");
const skillBars = document.querySelectorAll(".bar div");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

/* Skill Bar Animation */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => skillObserver.observe(bar));

/* Typing Effect */
const text = "Software Developer | AI Enthusiast";
let index = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}

typeEffect();

const resumeBtn = document.querySelector(".btn-outline");

setInterval(() => {
  resumeBtn.style.transform = "scale(1.05)";
  setTimeout(() => {
    resumeBtn.style.transform = "scale(1)";
  }, 300);
}, 3000);


const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

/* ===== MOBILE SWIPE SUPPORT ===== */

let startX = 0;
let endX = 0;

const carousel = document.querySelector(".carousel");

// Touch start
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

// Touch move
carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

// Touch end
carousel.addEventListener("touchend", () => {
  const swipeDistance = endX - startX;

  // Minimum swipe distance to trigger slide
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0) {
      nextSlide(); // swipe left
    } else {
      prevSlide(); // swipe right
    }
  }

  // Reset values
  startX = 0;
  endX = 0;
});

(function () {
  emailjs.init("Y4cY7squwR7yp-80SC"); // replace
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_gcn319c",   // replace
    "template_uawfq1q",  // replace
    this
  ).then(() => {
    document.getElementById("form-status").innerText =
      "✅ Message sent successfully!";
    this.reset();
  }, () => {
    document.getElementById("form-status").innerText =
      "❌ Failed to send message. Try again.";
  });
});


// ===== Sorting Algorithm Visualization (Bubble Sort) =====

const container = document.getElementById("sortContainer");

if (container) {
  const BAR_COUNT = 40;
  let values = [];

  function generateBars() {
    container.innerHTML = "";
    values = [];

    for (let i = 0; i < BAR_COUNT; i++) {
      const value = Math.floor(Math.random() * 200) + 20;
      values.push(value);

      const bar = document.createElement("div");
      bar.classList.add("sort-bar");
      bar.style.height = `${value}px`;
      container.appendChild(bar);
    }
  }

  async function bubbleSort() {
    const bars = document.querySelectorAll(".sort-bar");

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length - i - 1; j++) {
        bars[j].classList.add("active");
        bars[j + 1].classList.add("active");

        await sleep(80);

        if (values[j] > values[j + 1]) {
          [values[j], values[j + 1]] = [values[j + 1], values[j]];

          bars[j].style.height = `${values[j]}px`;
          bars[j + 1].style.height = `${values[j + 1]}px`;
        }

        bars[j].classList.remove("active");
        bars[j + 1].classList.remove("active");
      }

      bars[values.length - i - 1].classList.add("sorted");
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Init
  generateBars();
  bubbleSort();
}

// Lightbox Modal Functions
function openModal(imageSrc, caption) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('modal-caption');
  
  if (modal && modalImg && captionText) {
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    captionText.textContent = caption;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Modal elements not found!');
  }
}

function closeModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Debug: Log when modal is clicked
console.log('Modal loaded:', document.getElementById('cert-modal'));