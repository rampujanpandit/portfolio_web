// Mobile Menu Toggle with Overlay & Scroll Control
const mobileMenuToggle = document.querySelector(".fa-bars");
const closeMenuToggles = document.querySelectorAll(".fa-xmark, .fa-circle-xmark");
const navLinks = document.querySelector("nav ul");
const menuOverlay = document.getElementById("menu-overlay");

function openMenu() {
  if (navLinks) navLinks.classList.add("open");
  if (menuOverlay) menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (navLinks) navLinks.classList.remove("open");
  if (menuOverlay) menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", openMenu);
}

closeMenuToggles.forEach((btn) => {
  btn.addEventListener("click", closeMenu);
});

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

// Dynamic Typing Animation Effect for Hero Section
const typingElement = document.querySelector(".typing-text");
const roles = [
  "Software Developer",
  "Backend Engineer (Java & Spring)",
  "Cloud Infrastructure Specialist",
  "Database & API Specialist"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at full text
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 400; // Pause before typing next role
  }

  setTimeout(typeEffect, typeSpeed);
}

// Automatic Dynamic Experience Calculator (Career Start: Jan 2, 2023)
function updateDynamicExperience() {
  const careerStartDate = new Date("2023-01-02");
  const today = new Date();
  
  // Calculate difference in years
  const diffInMs = today - careerStartDate;
  const totalYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  
  // Format to 1 decimal place (e.g. 3.6+ Years)
  const formattedExp = totalYears.toFixed(1);

  const expStatElement = document.getElementById("dynamic-exp-stat");
  const expBioElement = document.getElementById("dynamic-exp-bio");

  if (expStatElement) {
    expStatElement.textContent = `${formattedExp}+ Years`;
  }
  if (expBioElement) {
    expBioElement.textContent = `${formattedExp}+ years of enterprise experience`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) typeEffect();
  updateDynamicExperience();
});

// Tabs in About Section
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    tabLinks.forEach((tab) => tab.classList.remove("active-link"));
    tabContents.forEach((content) => content.classList.remove("active-tab"));

    link.classList.add("active-link");
    if (tabContents[index]) {
      tabContents[index].classList.add("active-tab");
    }
  });
});

// Smooth Scrolling for Navigation Links & Close Menu on Click
const navItems = document.querySelectorAll("nav ul li a");

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();

    const targetId = item.getAttribute("href");
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Back-to-Top Floating Button Visibility & Smooth Scroll
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (backToTopBtn) {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Contact Form Handler with Loading State
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwmxlR4x03V9FSA0L6PGFJu9v-rusmw8Nk9ia5T3smLKrAS8tWORrZzsoML8TZKupUq/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submit-btn");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let originalBtnText = "";
    if (submitBtn) {
      originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
    }

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (msg) {
          msg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message sent successfully! I'll get back to you soon.`;
          setTimeout(function () {
            msg.innerHTML = "";
          }, 5000);
        }
        form.reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        if (msg) {
          msg.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Error sending message. Please try again or email directly.`;
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }
      });
  });
}
