// Mobile Menu Toggle with Overlay & Scroll Control
const mobileMenuToggle = document.querySelector(".fa-bars");
const closeMenuToggle = document.querySelector(".fa-circle-xmark");
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

if (closeMenuToggle) {
  closeMenuToggle.addEventListener("click", closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

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

// Contact Form Handler
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwmxlR4x03V9FSA0L6PGFJu9v-rusmw8Nk9ia5T3smLKrAS8tWORrZzsoML8TZKupUq/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (msg) {
          msg.innerHTML = "Message sent successfully :)";
          setTimeout(function () {
            msg.innerHTML = "";
          }, 5000);
        }
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });
}
