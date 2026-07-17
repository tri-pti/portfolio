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
  color: 0x0d9488,
  size: 0.5,
  transparent: true,
  opacity: 0.35
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

/* Nav active-link highlighting */
const navLinks = document.querySelectorAll("nav a[href^='#']");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

sections.forEach(section => {
  if (section.id) navObserver.observe(section);
});

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


// ===== Sorting Algorithm Visualization =====

const container = document.getElementById("sortContainer");

if (container) {
  const BAR_COUNT = 40;
  const algoSelect = document.getElementById("algo-select");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const speedButtons = document.querySelectorAll(".speed-buttons button");
  const statComparisons = document.getElementById("stat-comparisons");
  const statSwaps = document.getElementById("stat-swaps");
  const statTime = document.getElementById("stat-time");
  const sortStatus = document.getElementById("sort-status");

  let values = [];
  let bars = [];
  let delay = 70;
  let comparisons = 0;
  let swaps = 0;
  let runId = 0; // bumped on every new run so stale async loops stop themselves

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function updateStats() {
    statComparisons.textContent = comparisons;
    statSwaps.textContent = swaps;
  }

  function generateBars() {
    container.innerHTML = "";
    values = [];
    comparisons = 0;
    swaps = 0;
    sortStatus.textContent = "";
    updateStats();

    for (let i = 0; i < BAR_COUNT; i++) {
      const value = Math.floor(Math.random() * 200) + 20;
      values.push(value);

      const bar = document.createElement("div");
      bar.classList.add("sort-bar");
      bar.style.height = `${value}px`;
      container.appendChild(bar);
    }
    bars = document.querySelectorAll(".sort-bar");
  }

  async function markCompare(i, j) {
    comparisons++;
    updateStats();
    bars[i].classList.add("active");
    bars[j].classList.add("active");
    await sleep(delay);
    bars[i].classList.remove("active");
    bars[j].classList.remove("active");
  }

  function swapValues(i, j) {
    swaps++;
    [values[i], values[j]] = [values[j], values[i]];
    bars[i].style.height = `${values[i]}px`;
    bars[j].style.height = `${values[j]}px`;
    updateStats();
  }

  async function bubbleSort(id) {
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length - i - 1; j++) {
        await markCompare(j, j + 1);
        if (id !== runId) return;
        if (values[j] > values[j + 1]) swapValues(j, j + 1);
      }
      bars[values.length - i - 1].classList.add("sorted");
    }
  }

  async function selectionSort(id) {
    for (let i = 0; i < values.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < values.length; j++) {
        await markCompare(minIdx, j);
        if (id !== runId) return;
        if (values[j] < values[minIdx]) minIdx = j;
      }
      if (minIdx !== i) swapValues(i, minIdx);
      bars[i].classList.add("sorted");
    }
  }

  async function insertionSort(id) {
    for (let i = 1; i < values.length; i++) {
      let j = i;
      while (j > 0) {
        await markCompare(j - 1, j);
        if (id !== runId) return;
        if (values[j - 1] > values[j]) {
          swapValues(j - 1, j);
          j--;
        } else {
          break;
        }
      }
    }
    bars.forEach(bar => bar.classList.add("sorted"));
  }

  async function quickSort(id, lo = 0, hi = values.length - 1) {
    if (lo > hi) return;
    if (lo === hi) {
      bars[lo].classList.add("sorted");
      return;
    }

    const pivot = values[hi];
    let p = lo;
    for (let k = lo; k < hi; k++) {
      await markCompare(k, hi);
      if (id !== runId) return;
      if (values[k] < pivot) {
        if (k !== p) swapValues(k, p);
        p++;
      }
    }
    swapValues(p, hi);
    bars[p].classList.add("sorted");

    await quickSort(id, lo, p - 1);
    if (id !== runId) return;
    await quickSort(id, p + 1, hi);
  }

  async function runSort() {
    const id = ++runId;
    generateBars();
    await sleep(150); // let the fresh bars render before sorting kicks in
    const start = performance.now();

    const algo = algoSelect.value;
    if (algo === "bubble") await bubbleSort(id);
    else if (algo === "selection") await selectionSort(id);
    else if (algo === "insertion") await insertionSort(id);
    else if (algo === "quick") await quickSort(id);

    if (id !== runId) return;
    const elapsed = ((performance.now() - start) / 1000).toFixed(2);
    statTime.textContent = `${elapsed}s`;
    sortStatus.textContent = `🎉 Sorted in ${comparisons} comparisons and ${swaps} swaps — ${elapsed}s`;
  }

  algoSelect.addEventListener("change", runSort);
  shuffleBtn.addEventListener("click", runSort);
  speedButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      speedButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      delay = Number(btn.dataset.speed);
    });
  });

  // Init
  runSort();
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