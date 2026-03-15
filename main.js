document.addEventListener("DOMContentLoaded", () => {
  /* ===== Mobile nav toggle ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ===== Scroll reveal ===== */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ===== Animated counters ===== */
  const counters = document.querySelectorAll("[data-counter]");
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-counter")) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${value}${el.dataset.suffix || ""}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (counters.length) {
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((c) => counterObs.observe(c));
  }

  /* ===== Simple slider (Gallery) ===== */
  const slider = document.querySelector(".slider");
  if (slider) {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector("[data-slider-prev]");
    const nextBtn = slider.querySelector("[data-slider-next]");
    const dotsContainer = slider.querySelector(".slider-dots");

    let index = 0;

    const update = () => {
      if (!track) return;
      const width = slider.clientWidth;
      track.style.transform = `translateX(-${index * width}px)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll(".slider-dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }
    };

    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = `slider-dot${i === 0 ? " active" : ""}`;
        dot.addEventListener("click", () => {
          index = i;
          update();
        });
        dotsContainer.appendChild(dot);
      });
    }

    prevBtn?.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
    nextBtn?.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      update();
    });

    window.addEventListener("resize", () => {
      update();
    });
  }
});



const track = document.querySelector('.testimonial-slider .slider-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('[data-slider-prev]');
const nextBtn = document.querySelector('[data-slider-next]');

let index = 0;
let visible = 3; // Number of visible slides

function showSlide(i){
  // Calculate width per slide + gap
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // 16px gap
  track.style.transform = `translateX(-${i * slideWidth}px)`;
}

// Next
nextBtn.addEventListener('click', () => {
  index++;
  if(index > slides.length - visible) index = 0;
  showSlide(index);
});

// Previous
prevBtn.addEventListener('click', () => {
  index--;
  if(index < 0) index = slides.length - visible;
  showSlide(index);
});

// Auto-slide
setInterval(() => {
  index++;
  if(index > slides.length - visible) index = 0;
  showSlide(index);
}, 5000);

// Initialize
showSlide(index);
