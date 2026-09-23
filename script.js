// ==================================================================
// Ram Pujan Pandit Portfolio - Main Interactive JavaScript
// ==================================================================

// 1. Mobile Navigation Menu & Overlay Toggle
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

// 2. Dynamic Typing Animation Effect for Hero Section
const typingElement = document.querySelector(".typing-text");
const roles = [
  "Software Developer",
  "Backend Engineer (Java & Spring)",
  "Event-Driven Architect (RabbitMQ)",
  "Cloud Infrastructure Specialist",
  "Database & REST API Specialist"
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
    typeSpeed = 2200; // Pause at full text
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 400; // Pause before typing next role
  }

  setTimeout(typeEffect, typeSpeed);
}

// 3. Automatic Dynamic Experience Calculator (Career Start: Jan 2, 2023)
function updateDynamicExperience() {
  const careerStartDate = new Date("2023-01-02");
  const today = new Date();
  
  const diffInMs = today - careerStartDate;
  const totalYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
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

// 4. About Section Tabs Switcher
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    tabLinks.forEach((tab) => tab.classList.remove("active-link"));
    tabContents.forEach((content) => content.classList.remove("active-tab"));

    link.classList.add("active-link");
    const targetTabId = link.getAttribute("data-tab") || (tabContents[index] ? tabContents[index].id : null);
    if (targetTabId) {
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) targetContent.classList.add("active-tab");
    } else if (tabContents[index]) {
      tabContents[index].classList.add("active-tab");
    }
  });
});

// 5. Smooth Scrolling for Internal Navigation Links (Excludes External Resume Link)
const navItems = document.querySelectorAll("nav ul li a");

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const targetId = item.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      event.preventDefault();
      closeMenu();

      const section = document.querySelector(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      closeMenu(); // Close mobile menu when external link like Resume is clicked
    }
  });
});

// 6. Hero Scroll-Down Button Smooth Scroll Handler
const scrollDownBtn = document.querySelector(".scroll-down-btn");
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// 7. Floating Back-to-Top Button Visibility & Smooth Scroll
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

// 8. Contact Form Google Sheets Submission with Loading State
const scriptURL = "https://script.google.com/macros/s/AKfycbwmxlR4x03V9FSA0L6PGFJu9v-rusmw8Nk9ia5T3smLKrAS8tWORrZzsoML8TZKupUq/exec";
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
          msg.style.color = "#61b752";
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
          msg.style.color = "#ff004f";
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

// 9. Portfolio Category Filtering Logic
const filterBtns = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-list .work");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    workCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("hidden-card");
        card.style.display = "flex";
      } else {
        card.classList.add("hidden-card");
        card.style.display = "none";
      }
    });
  });
});

// 10. Architecture Details Data & Modal Interactivity
const archData = {
  hrms: {
    title: "Enterprise HRMS Platform Backend Architecture",
    badge: "Production Backend",
    problem: "Enterprise organizations needed a centralized Human Resource Management System for onboarding, GPS-context attendance tracking, leave regularization, shift rosters, and payroll engines with multi-role client access.",
    solution: "Architected a multi-module Spring Boot backend leveraging Java 17, Spring Security with JWT + Role-Based Access Control (RBAC), standardized DTO responses, Swagger/OpenAPI documentation, and optimized MySQL schemas.",
    keyPoints: [
      "Designed and delivered 100+ secure RESTful API endpoints for employee onboarding, shift scheduling, leave approval matrices, and salary calculation pipelines.",
      "Implemented JWT authentication with granular RBAC permissions for Admin, HR Manager, Employee, and Finance roles.",
      "Integrated location-aware attendance check-in/check-out APIs with shift context and regularization request workflows.",
      "Optimized relational database schema and JPA repository methods to eliminate N+1 queries during bulk payroll processing."
    ],
    tech: ["Java 17", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "MySQL", "Swagger / OpenAPI", "REST APIs"]
  },
  prepaid: {
    title: "Prepaid Card & Multi-Currency Wallet Platform Architecture",
    badge: "Production Backend",
    problem: "Financial operations required asynchronous approval pipelines for prepaid card lot generation, wallet loading, corporate merchant onboarding, and lifecycle management with third-party banking provider integrations.",
    solution: "Engineered an event-driven microservices architecture using Spring Boot and RabbitMQ message queues for asynchronous approvals, bulk lot dispatch pipelines, wallet transaction ledgers, and centralized error handling.",
    keyPoints: [
      "Built asynchronous messaging pipelines with RabbitMQ for event notifications, approval workflows, and transaction state updates.",
      "Designed secure APIs for bulk card lot generation (BIN configuration, lot assignment, dispatch requests, personalized card flows).",
      "Created transactional wallet ledger microservice supporting real-time balance checks, credit/debit entries, and audit logging.",
      "Integrated third-party banking and prepaid card issuer APIs with resilient fallback strategies and centralized exception handling."
    ],
    tech: ["Java 17", "Spring Boot", "RabbitMQ", "MySQL", "Spring Security", "JWT", "Third-Party Banking APIs", "Audit Logging"]
  },
  loans: {
    title: "NBFC Loan Processing & Risk Management APIs Architecture",
    badge: "Production Backend",
    problem: "NBFC loan applicants needed a seamless mobile onboarding flow with OTP verification, instant eligibility calculation, and clear EMI breakdown schedules, alongside an internal admin ops console.",
    solution: "Engineered secure financial loan processing services in Spring Boot with OTP-based session authentication, a flexible credit eligibility evaluation algorithm, and an EMI schedule calculator.",
    keyPoints: [
      "Developed an interactive EMI calculation engine computing principal vs interest breakdown across custom tenor periods.",
      "Built mobile onboarding APIs featuring secure OTP verification and session token management.",
      "Delivered NBFC Admin console APIs with module-level access control for operations teams to monitor loan portfolios.",
      "Integrated MVVM Kotlin Android clients with Spring Boot backend repositories via Retrofit and standardized JSON payloads."
    ],
    tech: ["Java 17", "Spring Boot", "REST APIs", "OTP Auth", "MySQL", "Spring Data JPA", "Android Sync"]
  },
  fleet: {
    title: "Expense & Fleet Management Suite Architecture",
    badge: "Production Backend",
    problem: "Corporate enterprises needed to streamline employee expense reimbursement claims with audit trails, while managing fleet vehicle allocations, fuel cards, and mileage tracking across business units.",
    solution: "Developed modular microservices for corporate expense submission & approval pipelines, fleet card issuance, and mileage logging deployed on Google Cloud Platform (GCP).",
    keyPoints: [
      "Architected multi-tier expense approval engine supporting receipt attachments, audit trail logs, and reimbursement status tracking.",
      "Built fleet management microservices tracking vehicle allocation, mileage logs, and fuel card transaction caps.",
      "Optimized database query performance using SQL indexing and JPA query tuning for high-volume expense transaction tables.",
      "Managed Linux server configurations and GCP Cloud deployments for high-availability backend services."
    ],
    tech: ["Java 17", "Spring Boot Microservices", "GCP", "Linux Admin", "SQL Optimization", "Docker", "REST APIs"]
  }
};

const archModal = document.getElementById("arch-modal");
const modalTitle = document.getElementById("modal-title");
const modalBadge = document.getElementById("modal-badge");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");
const archBtns = document.querySelectorAll(".arch-btn");

function openArchModal(projectId) {
  const data = archData[projectId];
  if (!data || !archModal) return;

  if (modalTitle) modalTitle.textContent = data.title;
  if (modalBadge) modalBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${data.badge}`;

  let bodyHTML = `
    <div class="arch-section">
      <h4><i class="fa-solid fa-circle-exclamation"></i> Problem & Objective</h4>
      <p>${data.problem}</p>
    </div>
    <div class="arch-section">
      <h4><i class="fa-solid fa-lightbulb"></i> Backend Solution</h4>
      <p>${data.solution}</p>
    </div>
    <div class="arch-section">
      <h4><i class="fa-solid fa-list-check"></i> Key Engineering Accomplishments</h4>
      <ul class="arch-bullets">
        ${data.keyPoints.map(pt => `<li><i class="fa-solid fa-check"></i> <span>${pt}</span></li>`).join("")}
      </ul>
    </div>
    <div class="arch-section">
      <h4><i class="fa-solid fa-gears"></i> Core Technologies Used</h4>
      <div class="arch-tech-grid">
        ${data.tech.map(t => `<span>${t}</span>`).join("")}
      </div>
    </div>
  `;

  if (modalBody) modalBody.innerHTML = bodyHTML;

  archModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeArchModal() {
  if (archModal) archModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

archBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const projectId = btn.getAttribute("data-project");
    openArchModal(projectId);
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeArchModal);
}

if (archModal) {
  archModal.addEventListener("click", (e) => {
    if (e.target === archModal) {
      closeArchModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && archModal && archModal.classList.contains("active")) {
    closeArchModal();
  }
});

// 11. 1-Click Copy to Clipboard Handler for Contact Cards (With Fallback)
const copyableCards = document.querySelectorAll(".copyable-card");
const contactMsg = document.getElementById("msg");

copyableCards.forEach((card) => {
  card.addEventListener("click", () => {
    const textToCopy = card.getAttribute("data-copy");
    if (!textToCopy) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showCopyNotification(textToCopy);
      }).catch(err => {
        fallbackCopyTextToClipboard(textToCopy);
      });
    } else {
      fallbackCopyTextToClipboard(textToCopy);
    }
  });
});

function showCopyNotification(textToCopy) {
  if (contactMsg) {
    contactMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> "${textToCopy}" copied to clipboard!`;
    contactMsg.style.color = "#61b752";
    setTimeout(() => {
      contactMsg.innerHTML = "";
    }, 3500);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showCopyNotification(text);
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

// 12. Security & Anti-Copy Protection Suite (Input-Safe)
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("copy", (e) => {
  const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : "";
  if (targetTag !== "input" && targetTag !== "textarea") {
    e.preventDefault();
  }
});

document.addEventListener("cut", (e) => {
  const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : "";
  if (targetTag !== "input" && targetTag !== "textarea") {
    e.preventDefault();
  }
});

document.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : "";
  if (targetTag === "input" || targetTag === "textarea") return;

  if (
    (e.ctrlKey || e.metaKey) &&
    ["c", "u", "s", "p"].includes(e.key.toLowerCase())
  ) {
    e.preventDefault();
  }

  if (
    e.key === "F12" ||
    ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(e.key))
  ) {
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen" || e.keyCode === 44) {
    document.body.style.filter = "blur(20px)";
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 1500);
  }
});
