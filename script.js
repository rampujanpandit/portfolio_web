// ==================================================================
// Ram Pujan Pandit Portfolio - Main Interactive JavaScript
// ==================================================================

// 1. Desktop & Mobile Side Navigation Drawer & Overlay Toggle
const sidenavToggleBtn = document.getElementById("sidenav-toggle-btn") || document.getElementById("mobile-menu-toggle") || document.querySelector(".fa-bars");
const closeMenuBtn = document.getElementById("close-menu-btn");
const sidemenu = document.getElementById("sidemenu") || document.querySelector("nav ul");
const menuOverlay = document.getElementById("menu-overlay");
const mainNavbar = document.getElementById("navbar");

function openMenu() {
  if (sidemenu) {
    sidemenu.classList.add("open");
    sidemenu.setAttribute("aria-hidden", "false");
  }
  if (menuOverlay) menuOverlay.classList.add("active");
  document.body.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (sidemenu) {
    sidemenu.classList.remove("open");
    sidemenu.setAttribute("aria-hidden", "true");
  }
  if (menuOverlay) menuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
  document.body.style.overflow = "";
}

if (sidenavToggleBtn) {
  sidenavToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openMenu();
  });
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

// Close mobile menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidemenu && sidemenu.classList.contains("open")) {
    closeMenu();
  }
});

// Navbar background blur & shadow on scroll, plus Hero scroll-down fade-out
const scrollDownContainer = document.querySelector(".scroll-down-container");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY || window.pageYOffset;
  if (mainNavbar) {
    if (currentScrollY > 30) {
      mainNavbar.classList.add("scrolled");
    } else {
      mainNavbar.classList.remove("scrolled");
    }
  }

  if (scrollDownContainer) {
    if (currentScrollY > 40) {
      scrollDownContainer.classList.add("fade-out");
    } else {
      scrollDownContainer.classList.remove("fade-out");
    }
  }
}, { passive: true });

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

// 5. Smooth Scrolling for Navigation Links (With Navbar Offset & Drawer Auto-Close)
const navItems = document.querySelectorAll("#sidemenu a, .sidenav-links a, .nav-container a");

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const targetId = item.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      event.preventDefault();
      closeMenu();

      // Smooth scroll with navbar offset after drawer begins closing
      setTimeout(() => {
        const section = document.querySelector(targetId);
        if (section) {
          const navOffset = mainNavbar ? mainNavbar.offsetHeight : 70;
          const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
          });
        }
      }, 100);
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
      const navOffset = mainNavbar ? mainNavbar.offsetHeight : 60;
      const targetPos = aboutSection.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: "smooth"
      });
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
      <h4><i class="fa-solid fa-sitemap"></i> Microservice Architecture Topology</h4>
      <div class="arch-flow-diagram">
        <div class="flow-title"><i class="fa-solid fa-diagram-project"></i> End-to-End Distributed Pipeline</div>
        <div class="flow-nodes-container">
          <div class="flow-node">
            <i class="fa-solid fa-mobile-screen"></i>
            <h5>Client Layer</h5>
            <p>Android / Web Client</p>
          </div>
          <div class="flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="flow-node">
            <i class="fa-solid fa-shield-halved"></i>
            <h5>API Gateway</h5>
            <p>JWT + RBAC Auth</p>
          </div>
          <div class="flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="flow-node">
            <i class="fa-solid fa-cubes"></i>
            <h5>Spring Boot</h5>
            <p>Java 17 Microservices</p>
          </div>
          <div class="flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="flow-node">
            <i class="fa-solid fa-bolt"></i>
            <h5>RabbitMQ</h5>
            <p>Async Queue / DLX</p>
          </div>
          <div class="flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="flow-node">
            <i class="fa-solid fa-database"></i>
            <h5>Persistence</h5>
            <p>MySQL & GCP</p>
          </div>
        </div>
      </div>
    </div>
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

// ------------------------------------------------------------------
// 13. Interactive API Showcase & Sandbox Engine
// ------------------------------------------------------------------
const apiData = {
  auth: {
    method: "POST",
    url: "https://api.enterprise.com/api/v1/auth/token",
    status: "200 OK",
    latency: "34ms",
    reqJson: `{\n  "clientId": "emp_client_9941",\n  "clientSecret": "sec_live_a98f12k89",\n  "grantType": "client_credentials"\n}`,
    resJson: `{\n  "statusCode": 200,\n  "status": "SUCCESS",\n  "timestamp": "${new Date().toISOString()}",\n  "data": {\n    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbXBfOTk0MSIsInJvbGVzIjpbIlJPTEVfQURNSU4iLCJST0xFX0hSIl19...",\n    "tokenType": "Bearer",\n    "expiresIn": 86400,\n    "roles": ["ROLE_ADMIN", "ROLE_HR_MANAGER"]\n  }\n}`
  },
  prepaid: {
    method: "POST",
    url: "https://api.enterprise.com/api/v1/cards/issue-lot",
    status: "201 Created",
    latency: "48ms",
    reqJson: `{\n  "corporateId": "CORP_8812",\n  "binNumber": "459082",\n  "cardQuantity": 500,\n  "currency": "INR",\n  "initialLoadAmount": 2500.00,\n  "asyncEventNotify": true\n}`,
    resJson: `{\n  "statusCode": 201,\n  "status": "CREATED",\n  "timestamp": "${new Date().toISOString()}",\n  "data": {\n    "lotId": "LOT_2026_0923_88",\n    "message": "Lot generation queued to RabbitMQ queue 'card.issuance.queue'",\n    "eventId": "evt_88492019a",\n    "totalCards": 500,\n    "status": "PROCESSING"\n  }\n}`
  },
  hrms: {
    method: "GET",
    url: "https://api.enterprise.com/api/v1/hrms/shift-roster?empId=EMP_1024&month=2026-09",
    status: "200 OK",
    latency: "28ms",
    reqJson: `// Query Parameters:\n// empId: EMP_1024\n// month: 2026-09\n// Headers: Authorization: Bearer <token>`,
    resJson: `{\n  "statusCode": 200,\n  "status": "SUCCESS",\n  "timestamp": "${new Date().toISOString()}",\n  "data": {\n    "employeeId": "EMP_1024",\n    "shiftName": "General Morning Shift (09:00 - 18:00)",\n    "workingDays": 22,\n    "presentDays": 20,\n    "regularizedLeaves": 2,\n    "locationBoundary": "GPS_GEOFENCE_ACTIVE"\n  }\n}`
  },
  loan: {
    method: "POST",
    url: "https://api.enterprise.com/api/v1/loans/calculate-emi",
    status: "200 OK",
    latency: "32ms",
    reqJson: `{\n  "requestedPrincipal": 500000.00,\n  "tenorMonths": 36,\n  "annualInterestRate": 11.5,\n  "applicantCategory": "SALARIED"\n}`,
    resJson: `{\n  "statusCode": 200,\n  "status": "SUCCESS",\n  "timestamp": "${new Date().toISOString()}",\n  "data": {\n    "monthlyEmi": 16474.22,\n    "totalInterestPayable": 93071.92,\n    "totalAmountPayable": 593071.92,\n    "eligibilityStatus": "APPROVED",\n    "riskScore": 780\n  }\n}`
  }
};

const apiBtns = document.querySelectorAll(".api-endpoint-btn");
const apiMethodBadge = document.getElementById("api-method-badge");
const apiUrlDisplay = document.getElementById("api-url-display");
const apiStatusCode = document.getElementById("api-status-code");
const apiLatency = document.getElementById("api-latency");
const apiReqJson = document.getElementById("api-req-json");
const apiResJson = document.getElementById("api-res-json");
const copyCurlBtn = document.getElementById("copy-curl-btn");

function renderApiEndpoint(key) {
  const data = apiData[key];
  if (!data) return;

  if (apiMethodBadge) {
    apiMethodBadge.textContent = data.method;
    apiMethodBadge.className = `http-method ${data.method.toLowerCase()}`;
  }
  if (apiUrlDisplay) apiUrlDisplay.textContent = data.url;
  if (apiStatusCode) apiStatusCode.textContent = data.status;
  if (apiLatency) apiLatency.textContent = data.latency;
  if (apiReqJson) apiReqJson.textContent = data.reqJson;
  if (apiResJson) apiResJson.textContent = data.resJson;
}

apiBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    apiBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const apiKey = btn.getAttribute("data-api");
    renderApiEndpoint(apiKey);
  });
});

if (copyCurlBtn) {
  copyCurlBtn.addEventListener("click", () => {
    const activeBtn = document.querySelector(".api-endpoint-btn.active");
    const key = activeBtn ? activeBtn.getAttribute("data-api") : "auth";
    const data = apiData[key];
    if (!data) return;

    const curlCmd = `curl -X ${data.method} "${data.url}" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer <jwt_token>" \\\n  -d '${data.reqJson.replace(/\n\s*/g, " ")}'`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(curlCmd).then(() => {
        showCopyNotification("cURL command copied to clipboard!");
      }).catch(() => {
        fallbackCopyTextToClipboard(curlCmd);
      });
    } else {
      fallbackCopyTextToClipboard(curlCmd);
    }
  });
}

renderApiEndpoint("auth");

// ------------------------------------------------------------------
// 14. Production Code Patterns Showcase Component
// ------------------------------------------------------------------
const codeSnippets = {
  rabbitmq: {
    fileName: "RabbitMQEventConsumer.java",
    code: `@Component
@Slf4j
public class PrepaidCardEventConsumer {

    @Autowired
    private WalletLedgerService ledgerService;

    @RabbitListener(queues = "\${app.rabbitmq.queue.card-issuance}")
    public void processCardIssuanceEvent(CardIssuanceEventPayload event, 
                                         Message message, 
                                         Channel channel) throws IOException {
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try {
            log.info("Processing asynchronous card lot dispatch event: {}", event.getLotId());
            
            // Execute transactional ledger update
            ledgerService.executeWalletCredit(event.getCorporateId(), event.getInitialLoadAmount());
            
            // Manual Acknowledge Message
            channel.basicAck(deliveryTag, false);
            log.info("Successfully processed event ID: {}", event.getEventId());
        } catch (Exception ex) {
            log.error("Error processing event. Routing to Dead Letter Exchange (DLX)", ex);
            // Reject and route to Dead Letter Queue for inspection
            channel.basicNack(deliveryTag, false, false);
        }
    }
}`
  },
  jwt: {
    fileName: "JwtAuthenticationFilter.java",
    code: `@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = parseBearerToken(request);
        
        if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsernameFromJWT(token);
            List<GrantedAuthority> authorities = jwtTokenProvider.getAuthoritiesFromJWT(token);
            
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(username, null, authorities);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}`
  },
  exception: {
    fileName: "GlobalExceptionHandler.java",
    code: `@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ApiResponse<Object>> handleBusinessRuleException(BusinessRuleException ex) {
        log.warn("Business rule violation: {}", ex.getMessage());
        ApiResponse<Object> response = ApiResponse.builder()
                .statusCode(HttpStatus.UNPROCESSABLE_ENTITY.value())
                .status("FAILURE")
                .message(ex.getMessage())
                .timestamp(Instant.now())
                .build();
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage()));
        
        ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .status("VALIDATION_ERROR")
                .message("Invalid input request parameters")
                .data(errors)
                .timestamp(Instant.now())
                .build();
        return ResponseEntity.badRequest().body(response);
    }
}`
  }
};

const codeTabBtns = document.querySelectorAll(".code-tab-btn");
const codeFileName = document.getElementById("code-file-name");
const codeSnippetDisplay = document.getElementById("code-snippet-display");
const copyCodeBtn = document.getElementById("copy-code-btn");

function renderCodeSnippet(key) {
  const data = codeSnippets[key];
  if (!data) return;

  if (codeFileName) codeFileName.textContent = data.fileName;
  if (codeSnippetDisplay) codeSnippetDisplay.textContent = data.code;
}

codeTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    codeTabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const codeKey = btn.getAttribute("data-code");
    renderCodeSnippet(codeKey);
  });
});

if (copyCodeBtn) {
  copyCodeBtn.addEventListener("click", () => {
    const activeBtn = document.querySelector(".code-tab-btn.active");
    const key = activeBtn ? activeBtn.getAttribute("data-code") : "rabbitmq";
    const data = codeSnippets[key];
    if (!data) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data.code).then(() => {
        showCopyNotification(`${data.fileName} copied to clipboard!`);
      }).catch(() => {
        fallbackCopyTextToClipboard(data.code);
      });
    } else {
      fallbackCopyTextToClipboard(data.code);
    }
  });
}

renderCodeSnippet("rabbitmq");

// ------------------------------------------------------------------
// 15. 3D Interactive Cybernetic Particle Canvas Engine
// ------------------------------------------------------------------
function init3DHeroCanvas() {
  const canvas = document.getElementById("hero-3d-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener("resize", () => {
    if (canvas && canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  });

  const numParticles = Math.min(Math.floor(width / 25), 55);
  const particles = [];
  const focalLength = 350;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: (Math.random() - 0.5) * 500,
      radius: Math.random() * 2.2 + 1.2,
      color: i % 4 === 0 ? "#ff004f" : (i % 3 === 0 ? "#64b5f6" : "#ffffff"),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4
    });
  }

  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let rotX = 0;
  let rotY = 0;

  const headerElem = document.getElementById("header");
  if (headerElem) {
    headerElem.addEventListener("mousemove", (e) => {
      const rect = headerElem.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
      targetRotY = (mouseX / rect.width) * 0.0008;
      targetRotX = -(mouseY / rect.height) * 0.0008;
    });

    headerElem.addEventListener("mouseleave", () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  function animate3D() {
    ctx.clearRect(0, 0, width, height);

    rotX += (targetRotX - rotX) * 0.05;
    rotY += (targetRotY - rotY) * 0.05;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    const projected = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (p.x < -width) p.x = width;
      if (p.x > width) p.x = -width;
      if (p.y < -height) p.y = height;
      if (p.y > height) p.y = -height;
      if (p.z < -300) p.z = 300;
      if (p.z > 300) p.z = -300;

      let x1 = p.x * cosY - p.z * sinY;
      let z1 = p.z * cosY + p.x * sinY;

      let y1 = p.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + p.y * sinX;

      const scale = focalLength / (focalLength + z2 + 350);
      const projX = width / 2 + x1 * scale;
      const projY = height / 2 + y1 * scale;
      const projRadius = p.radius * scale;
      const alpha = Math.min(Math.max((z2 + 300) / 600, 0.15), 0.9);

      projected.push({ x: projX, y: projY, z: z2, alpha, color: p.color, radius: projRadius });
    }

    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.25 * p1.alpha;
          ctx.strokeStyle = `rgba(255, 0, 79, ${lineAlpha})`;
          ctx.lineWidth = 0.8 * p1.alpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(p.radius, 1), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate3D);
  }

  animate3D();
}

// ------------------------------------------------------------------
// 16. Interactive 3D Card Mouse Tilt & Glare Engine
// ------------------------------------------------------------------
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll(
    ".work, .services-list div, .metric-card, .stat-item, .api-explorer-box, .code-pattern-card"
  );

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (-(y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init3DHeroCanvas();
  init3DCardTilt();
});

// ------------------------------------------------------------------
// 17. Postman Collection Exporter Engine
// ------------------------------------------------------------------
const downloadPostmanBtn = document.getElementById("download-postman-btn");
if (downloadPostmanBtn) {
  downloadPostmanBtn.addEventListener("click", () => {
    const postmanCollection = {
      info: {
        name: "Ram Pujan Pandit - Enterprise Backend APIs Collection",
        _postman_id: "rpp-api-collection-2026",
        description: "Official production RESTful API contracts engineered with Java 17, Spring Boot 3, JWT Security, and RabbitMQ.",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      item: [
        {
          name: "Authentication Token Generation",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ clientId: "emp_client_9941", clientSecret: "sec_live_a98f12k89", grantType: "client_credentials" }, null, 2)
            },
            url: { raw: "https://api.enterprise.com/api/v1/auth/token" }
          }
        },
        {
          name: "Prepaid Card Lot Issuance (Async RabbitMQ)",
          request: {
            method: "POST",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{access_token}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({ corporateId: "CORP_8812", binNumber: "459082", cardQuantity: 500, currency: "INR", initialLoadAmount: 2500.00, asyncEventNotify: true }, null, 2)
            },
            url: { raw: "https://api.enterprise.com/api/v1/cards/issue-lot" }
          }
        },
        {
          name: "HRMS Shift Roster & Attendance",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{access_token}}" }],
            url: { raw: "https://api.enterprise.com/api/v1/hrms/shift-roster?empId=EMP_1024&month=2026-09" }
          }
        },
        {
          name: "NBFC Loan EMI Risk Calculator",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ requestedPrincipal: 500000.00, tenorMonths: 36, annualInterestRate: 11.5, applicantCategory: "SALARIED" }, null, 2)
            },
            url: { raw: "https://api.enterprise.com/api/v1/loans/calculate-emi" }
          }
        }
      ]
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(postmanCollection, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Ram_Pujan_Pandit_APIs.postman_collection.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showCopyNotification("Postman Collection downloaded!");
  });
}

// ------------------------------------------------------------------
// 18. Interactive Resume Modal Viewer
// ------------------------------------------------------------------
const resumeModal = document.getElementById("resume-modal");
const resumeCloseBtn = document.getElementById("resume-close-btn");
const navResumeBtn = document.querySelector(".nav-resume-btn");
const cvBtns = document.querySelectorAll(".cv-btn");

function openResumeModal(e) {
  if (e) e.preventDefault();
  if (resumeModal) {
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  if (resumeModal) {
    resumeModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

if (navResumeBtn) {
  navResumeBtn.addEventListener("click", openResumeModal);
}

cvBtns.forEach((btn) => {
  btn.addEventListener("click", openResumeModal);
});

if (resumeCloseBtn) {
  resumeCloseBtn.addEventListener("click", closeResumeModal);
}

if (resumeModal) {
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });
}

// ------------------------------------------------------------------
// 19. Web Audio Intro Speech Synthesizer (Male Voice Engine)
// ------------------------------------------------------------------
const audioIntroBtn = document.getElementById("audio-intro-btn");
const audioBtnText = document.getElementById("audio-btn-text");
const audioBtnIcon = document.getElementById("audio-btn-icon");
let isSpeaking = false;
let speechUtterance = null;
let cachedVoices = [];

function loadVoices() {
  if ('speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
}

if ('speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function getMaleVoice() {
  if (!cachedVoices || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  
  const maleKeywords = ["male", "david", "mark", "george", "guy", "alex", "daniel", "james", "richard", "google uk english male", "microsoft david"];
  
  let foundVoice = cachedVoices.find(v => {
    const nameLower = v.name.toLowerCase();
    return v.lang.startsWith("en") && maleKeywords.some(k => nameLower.includes(k));
  });

  if (!foundVoice) {
    foundVoice = cachedVoices.find(v => {
      const nameLower = v.name.toLowerCase();
      return v.lang.startsWith("en") && !nameLower.includes("female") && !nameLower.includes("zira") && !nameLower.includes("hazel") && !nameLower.includes("susan") && !nameLower.includes("catherine");
    });
  }

  return foundVoice || cachedVoices.find(v => v.lang.startsWith("en")) || null;
}

if (audioIntroBtn) {
  audioIntroBtn.addEventListener("click", () => {
    if (!('speechSynthesis' in window)) {
      alert("Web Speech API is not supported in your browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      audioIntroBtn.classList.remove("playing");
      if (audioBtnText) audioBtnText.textContent = "Listen 30s Voice Intro";
      if (audioBtnIcon) audioBtnIcon.className = "fa-solid fa-volume-high";
      return;
    }

    const textToSpeak = "Hello and welcome! I am Ram Pujan Pandit, a Senior Software Developer and Backend Engineer based in Delhi NCR. With over 3.6 years of hands-on enterprise experience, I specialize in architecting high-performance Java 17 and 21 microservices, Spring Boot 3 frameworks, RabbitMQ asynchronous event queues, and Google Cloud Platform deployments. I have designed systems processing over 100 thousand daily transactions with sub-45-millisecond latency. Feel free to explore my interactive API sandbox, ERD database models, and developer CLI terminal. Thank you for visiting!";

    speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    speechUtterance.rate = 1.0;
    speechUtterance.pitch = 0.88; // Deeper male pitch tone

    const maleVoice = getMaleVoice();
    if (maleVoice) {
      speechUtterance.voice = maleVoice;
    }

    speechUtterance.onstart = () => {
      isSpeaking = true;
      audioIntroBtn.classList.add("playing");
      if (audioBtnText) audioBtnText.textContent = "Playing Voice Intro...";
      if (audioBtnIcon) audioBtnIcon.className = "fa-solid fa-pause";
    };

    speechUtterance.onend = () => {
      isSpeaking = false;
      audioIntroBtn.classList.remove("playing");
      if (audioBtnText) audioBtnText.textContent = "Listen 30s Voice Intro";
      if (audioBtnIcon) audioBtnIcon.className = "fa-solid fa-volume-high";
    };

    speechUtterance.onerror = () => {
      isSpeaking = false;
      audioIntroBtn.classList.remove("playing");
      if (audioBtnText) audioBtnText.textContent = "Listen 30s Voice Intro";
      if (audioBtnIcon) audioBtnIcon.className = "fa-solid fa-volume-high";
    };

    window.speechSynthesis.speak(speechUtterance);
  });
}

// ------------------------------------------------------------------
// 20. Database ERD Schema Visualizer Engine
// ------------------------------------------------------------------
const erdSchemas = {
  hrms: [
    {
      name: "employees",
      fields: [
        { name: "emp_id", type: "BIGINT", key: "PK" },
        { name: "first_name", type: "VARCHAR(50)" },
        { name: "email", type: "VARCHAR(100)" },
        { name: "department_id", type: "INT", key: "FK" },
        { name: "base_salary", type: "DECIMAL(12,2)" },
        { name: "status", type: "ENUM('ACTIVE','INACTIVE')" }
      ],
      sql: `CREATE TABLE employees (\n  emp_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  first_name VARCHAR(50) NOT NULL,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  department_id INT NOT NULL,\n  base_salary DECIMAL(12,2) NOT NULL,\n  status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  INDEX idx_emp_dept (department_id),\n  INDEX idx_emp_email (email)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "payroll_ledger",
      fields: [
        { name: "pay_id", type: "BIGINT", key: "PK" },
        { name: "emp_id", type: "BIGINT", key: "FK" },
        { name: "month_year", type: "VARCHAR(7)" },
        { name: "gross_amount", type: "DECIMAL(12,2)" },
        { name: "net_payout", type: "DECIMAL(12,2)" },
        { name: "status", type: "VARCHAR(20)" }
      ],
      sql: `CREATE TABLE payroll_ledger (\n  pay_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  emp_id BIGINT NOT NULL,\n  month_year VARCHAR(7) NOT NULL,\n  gross_amount DECIMAL(12,2) NOT NULL,\n  tax_deduction DECIMAL(12,2) NOT NULL,\n  net_payout DECIMAL(12,2) NOT NULL,\n  status VARCHAR(20) DEFAULT 'PROCESSED',\n  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  CONSTRAINT fk_payroll_emp FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "attendance_logs",
      fields: [
        { name: "log_id", type: "BIGINT", key: "PK" },
        { name: "emp_id", type: "BIGINT", key: "FK" },
        { name: "punch_in", type: "DATETIME" },
        { name: "punch_out", type: "DATETIME" },
        { name: "location_gps", type: "VARCHAR(50)" }
      ],
      sql: `CREATE TABLE attendance_logs (\n  log_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  emp_id BIGINT NOT NULL,\n  punch_in DATETIME NOT NULL,\n  punch_out DATETIME NULL,\n  location_gps VARCHAR(50) NULL,\n  CONSTRAINT fk_attendance_emp FOREIGN KEY (emp_id) REFERENCES employees(emp_id)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "departments",
      fields: [
        { name: "department_id", type: "INT", key: "PK" },
        { name: "dept_code", type: "VARCHAR(20)" },
        { name: "dept_name", type: "VARCHAR(100)" },
        { name: "cost_center", type: "VARCHAR(50)" }
      ],
      sql: `CREATE TABLE departments (\n  department_id INT AUTO_INCREMENT PRIMARY KEY,\n  dept_code VARCHAR(20) UNIQUE NOT NULL,\n  dept_name VARCHAR(100) NOT NULL,\n  cost_center VARCHAR(50) NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    }
  ],
  wallet: [
    {
      name: "users",
      fields: [
        { name: "user_id", type: "BIGINT", key: "PK" },
        { name: "mobile_no", type: "VARCHAR(15)" },
        { name: "kyc_status", type: "VARCHAR(20)" },
        { name: "created_at", type: "TIMESTAMP" }
      ],
      sql: `CREATE TABLE users (\n  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  mobile_no VARCHAR(15) UNIQUE NOT NULL,\n  kyc_status VARCHAR(20) DEFAULT 'VERIFIED',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "wallets",
      fields: [
        { name: "wallet_id", type: "BIGINT", key: "PK" },
        { name: "user_id", type: "BIGINT", key: "FK" },
        { name: "currency", type: "VARCHAR(3)" },
        { name: "current_balance", type: "DECIMAL(15,2)" },
        { name: "hold_balance", type: "DECIMAL(15,2)" }
      ],
      sql: `CREATE TABLE wallets (\n  wallet_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  user_id BIGINT NOT NULL,\n  currency VARCHAR(3) DEFAULT 'INR',\n  current_balance DECIMAL(15,2) DEFAULT 0.00,\n  hold_balance DECIMAL(15,2) DEFAULT 0.00,\n  CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES users(user_id)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "wallet_transactions",
      fields: [
        { name: "txn_id", type: "BIGINT", key: "PK" },
        { name: "wallet_id", type: "BIGINT", key: "FK" },
        { name: "reference_no", type: "VARCHAR(50)" },
        { name: "amount", type: "DECIMAL(15,2)" },
        { name: "txn_type", type: "ENUM('CREDIT','DEBIT')" }
      ],
      sql: `CREATE TABLE wallet_transactions (\n  txn_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  wallet_id BIGINT NOT NULL,\n  reference_no VARCHAR(50) UNIQUE NOT NULL,\n  amount DECIMAL(15,2) NOT NULL,\n  txn_type ENUM('CREDIT','DEBIT') NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  INDEX idx_txn_ref (reference_no),\n  CONSTRAINT fk_txn_wallet FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    {
      name: "prepaid_cards",
      fields: [
        { name: "card_id", type: "BIGINT", key: "PK" },
        { name: "wallet_id", type: "BIGINT", key: "FK" },
        { name: "card_number_masked", type: "VARCHAR(19)" },
        { name: "card_status", type: "VARCHAR(20)" }
      ],
      sql: `CREATE TABLE prepaid_cards (\n  card_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  wallet_id BIGINT NOT NULL,\n  card_number_masked VARCHAR(19) NOT NULL,\n  card_status VARCHAR(20) DEFAULT 'ACTIVE',\n  CONSTRAINT fk_card_wallet FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    }
  ]
};

const erdDisplay = document.getElementById("erd-tables-display");
const erdSqlCode = document.getElementById("erd-sql-code");
const erdTabBtns = document.querySelectorAll(".erd-tab-btn");

function renderErdSchema(schemaKey) {
  if (!erdDisplay) return;
  const tables = erdSchemas[schemaKey] || erdSchemas.hrms;
  
  erdDisplay.innerHTML = tables.map((t, index) => `
    <div class="erd-table-card ${index === 0 ? 'active' : ''}" data-index="${index}">
      <div class="erd-table-header">
        <h4><i class="fa-solid fa-table"></i> ${t.name}</h4>
        <span class="erd-col-type">${t.fields.length} Columns</span>
      </div>
      <div class="erd-table-body">
        ${t.fields.map(f => `
          <div class="erd-col-row">
            <span class="erd-col-name">
              ${f.name}
              ${f.key ? `<span class="key-pill ${f.key.toLowerCase()}">${f.key}</span>` : ''}
            </span>
            <span class="erd-col-type">${f.type}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  if (erdSqlCode) {
    erdSqlCode.textContent = tables[0].sql;
  }

  // Attach card click listeners
  const cards = erdDisplay.querySelectorAll(".erd-table-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const idx = card.getAttribute("data-index");
      if (erdSqlCode) {
        erdSqlCode.textContent = tables[idx].sql;
      }
    });
  });
}

erdTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    erdTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const schema = btn.getAttribute("data-schema");
    renderErdSchema(schema);
  });
});

renderErdSchema("hrms");

// ------------------------------------------------------------------
// 21. Architecture Benchmark Matrix Engine
// ------------------------------------------------------------------
const benchmarkData = {
  arch: [
    {
      title: "Monolithic Architecture",
      badge: "Legacy / Traditional",
      badgeClass: "legacy",
      metrics: [
        { label: "API Response Latency", val: "120ms - 250ms", pct: 40, color: "pink" },
        { label: "Deployment Agility", val: "Low (Monolithic War)", pct: 30, color: "pink" },
        { label: "Fault Isolation", val: "Single Point of Failure", pct: 25, color: "pink" },
        { label: "Peak TPS Scalability", val: "500 TPS Limit", pct: 35, color: "pink" }
      ]
    },
    {
      title: "Spring Boot Microservices",
      badge: "Modern Enterprise",
      badgeClass: "modern",
      metrics: [
        { label: "API Response Latency", val: "< 45ms Avg", pct: 90, color: "green" },
        { label: "Deployment Agility", val: "High (Independent Containers)", pct: 95, color: "green" },
        { label: "Fault Isolation", val: "High (Resilience4j Circuit Breaker)", pct: 95, color: "green" },
        { label: "Peak TPS Scalability", val: "15,000+ TPS (Scale-Out)", pct: 98, color: "green" }
      ]
    }
  ],
  async: [
    {
      title: "Synchronous REST APIs",
      badge: "Blocking I/O",
      badgeClass: "legacy",
      metrics: [
        { label: "Throughput Capacity", val: "Moderate (Thread-per-req)", pct: 45, color: "blue" },
        { label: "Traffic Surge Protection", val: "HTTP 429 / Timeouts", pct: 30, color: "pink" },
        { label: "Service Decoupling", val: "Tightly Coupled Dependencies", pct: 40, color: "pink" }
      ]
    },
    {
      title: "RabbitMQ Async Event Queues",
      badge: "Event-Driven Engine",
      badgeClass: "modern",
      metrics: [
        { label: "Throughput Capacity", val: "100k+ Msgs/Day (Non-blocking)", pct: 98, color: "green" },
        { label: "Traffic Surge Protection", val: "Zero-loss Buffer Queue", pct: 99, color: "green" },
        { label: "Service Decoupling", val: "100% Decoupled AMQP Brokers", pct: 95, color: "green" }
      ]
    }
  ]
};

const benchDisplay = document.getElementById("benchmark-display");
const benchTabBtns = document.querySelectorAll(".benchmark-tab-btn");

function renderBenchmark(benchKey) {
  if (!benchDisplay) return;
  const cards = benchmarkData[benchKey] || benchmarkData.arch;

  benchDisplay.innerHTML = `
    <div class="benchmark-grid">
      ${cards.map(c => `
        <div class="bench-card">
          <div class="bench-card-header">
            <h3>${c.title}</h3>
            <span class="bench-badge ${c.badgeClass}">${c.badge}</span>
          </div>
          ${c.metrics.map(m => `
            <div class="bench-metric-row">
              <div class="bench-metric-label">
                <span>${m.label}</span>
                <strong>${m.val}</strong>
              </div>
              <div class="bench-bar-track">
                <div class="bench-bar-fill ${m.color}" style="width: ${m.pct}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

benchTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    benchTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const bench = btn.getAttribute("data-bench");
    renderBenchmark(bench);
  });
});

renderBenchmark("arch");

// ------------------------------------------------------------------
// 22. Enterprise System Scale & Capacity Calculator Engine
// ------------------------------------------------------------------
const scaleSlider = document.getElementById("scale-slider");
const sliderTxnDisplay = document.getElementById("slider-txn-display");
const calcTps = document.getElementById("calc-tps");
const calcHikari = document.getElementById("calc-hikaricp");
const calcRabbit = document.getElementById("calc-rabbitmq");
const calcGcp = document.getElementById("calc-gcp");
const calcRecTitle = document.getElementById("calc-rec-title");
const calcRecBody = document.getElementById("calc-rec-body");
const calcPresetBtns = document.querySelectorAll(".preset-btn");

function updateScaleCalculator(txns) {
  const val = parseInt(txns, 10);

  if (sliderTxnDisplay) {
    sliderTxnDisplay.textContent = `${val.toLocaleString()} Txns / Day`;
  }

  const peakTpsVal = ((val / 86400) * 4.5).toFixed(1);
  const hikariPoolVal = Math.max(10, Math.min(100, Math.ceil(peakTpsVal * 2.5 + 5)));
  const rabbitMsgVal = ((val / 86400) * 2.5).toFixed(1);
  const gcpPodVal = Math.max(1, Math.ceil(peakTpsVal / 120));

  if (calcTps) calcTps.textContent = `${peakTpsVal} TPS`;
  if (calcHikari) calcHikari.textContent = `${hikariPoolVal} Conn`;
  if (calcRabbit) calcRabbit.textContent = `${rabbitMsgVal} Msg/s`;
  if (calcGcp) calcGcp.textContent = `${gcpPodVal} Instance${gcpPodVal > 1 ? 's' : ''}`;

  if (calcRecTitle && calcRecBody) {
    if (val <= 50000) {
      calcRecTitle.textContent = "Minimal Setup: Standard Spring Boot Container";
      calcRecBody.textContent = `For ${val.toLocaleString()} daily txns (${peakTpsVal} Peak TPS), a single lightweight 1-CPU container with a 15-connection HikariCP pool easily achieves sub-30ms execution times without needing extra worker nodes.`;
    } else if (val <= 200000) {
      calcRecTitle.textContent = "Standard Enterprise: Spring Boot + RabbitMQ Buffer";
      calcRecBody.textContent = `At ${val.toLocaleString()} daily txns (${peakTpsVal} Peak TPS), running a 2-pod GCP Cloud Run deployment with ${hikariPoolVal} DB connections and asynchronous RabbitMQ event processing guarantees zero request drops during peak traffic hours.`;
    } else {
      calcRecTitle.textContent = "High-Volume Architecture: Microservices + Read Replicas + Redis L2";
      calcRecBody.textContent = `For ${val.toLocaleString()} daily transactions (${peakTpsVal} Peak TPS), recommended topology includes ${gcpPodVal} auto-scaled Cloud Run containers, ${hikariPoolVal} HikariCP connections, MySQL Read-Replicas for SELECT queries, and a Redis L2 cache layer.`;
    }
  }
}

if (scaleSlider) {
  scaleSlider.addEventListener("input", (e) => {
    updateScaleCalculator(e.target.value);
    calcPresetBtns.forEach(btn => btn.classList.remove("active"));
  });
}

calcPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calcPresetBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const presetVal = btn.getAttribute("data-val");
    if (scaleSlider) scaleSlider.value = presetVal;
    updateScaleCalculator(presetVal);
  });
});

updateScaleCalculator(100000);

// ------------------------------------------------------------------
// 23. Interactive Developer CLI Terminal Engine (`rpp-cli`)
// ------------------------------------------------------------------
const cliModal = document.getElementById("rpp-cli-modal");
const cliTriggerBtn = document.getElementById("cli-trigger-btn");
const cliCloseDot = document.getElementById("cli-close-dot");
const cliModalClose = document.getElementById("cli-modal-close");
const cliInput = document.getElementById("cli-input");
const cliOutput = document.getElementById("cli-output");
const cliBody = document.getElementById("cli-body");

function openCliModal() {
  if (cliModal) {
    cliModal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (cliInput) cliInput.focus();
  }
}

function closeCliModal() {
  if (cliModal) {
    cliModal.classList.remove("active");
    document.body.style.overflow = "auto";
    if (cliOutput) cliOutput.innerHTML = ""; // Clear output screen on CLI close!
  }
}

if (cliTriggerBtn) cliTriggerBtn.addEventListener("click", openCliModal);
if (cliCloseDot) cliCloseDot.addEventListener("click", closeCliModal);
if (cliModalClose) cliModalClose.addEventListener("click", closeCliModal);

if (cliModal) {
  cliModal.addEventListener("click", (e) => {
    if (e.target === cliModal) closeCliModal();
  });
}

// Nav link trigger
const navCliLink = document.getElementById("nav-cli-link");
if (navCliLink) navCliLink.addEventListener("click", openCliModal);

// Command Interpreter
if (cliInput && cliOutput) {
  cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = cliInput.value.trim();
      if (!rawCmd) return;

      // Echo User Command
      appendCliEntry(`rpp@enterprise:~$ ${rawCmd}`, "user-input");
      cliInput.value = "";

      const lowerCmd = rawCmd.toLowerCase();
      const parts = lowerCmd.split(" ");
      const mainCmd = parts[0];

      switch (mainCmd) {
        case "help":
        case "help--":
        case "help-":
        case "?":
          appendCliEntry(`Available CLI Commands:
  • bio       - Print Ram Pujan Pandit's career background & profile
  • skills    - List core backend & cloud tech stack (Java 17/21, Spring Boot, GCP)
  • projects  - List key production applications & architecture
  • health    - Perform simulated /actuator/health curl request
  • curl      - Test mock endpoint (e.g. 'curl /api/v1/hrms/payroll')
  • contact   - Display direct communication channels
  • clear     - Reset terminal screen
  • exit      - Close CLI terminal modal`, "system-res");
          break;

        case "bio":
          appendCliEntry(`[RAM PUJAN PANDIT - PROFILE]
Role: Software Developer & Backend Engineer
Experience: 3.6+ Years Enterprise Engineering
Location: Delhi NCR, India (Native: Bihar)
Specialities: Microservices Architecture, Asynchronous Messaging, High-Throughput REST APIs, Cloud Infrastructure.`, "system-res");
          break;

        case "skills":
          appendCliEntry(`[TECHNICAL STACK]
Languages: Java 17, Java 21, SQL, JavaScript (ES6+)
Frameworks: Spring Boot 3, Spring Data JPA, Spring Security, Hibernate
Broker/Queues: RabbitMQ (AMQP 5672), Dead-Letter Queues (DLQ)
Database: MySQL, HikariCP, Schema Normalization
Cloud & Ops: Google Cloud Platform (GCP Cloud Run, Compute Engine), Linux Ubuntu, Docker`, "system-res");
          break;

        case "projects":
          appendCliEntry(`[PRODUCTION PROJECTS]
1. Corporate Prepaid Card & Wallet Platform - High-speed fintech ledger handling 100k txns/day.
2. Enterprise HRMS & Payroll Engine - Automated salary calculations & geolocation shift roster.
3. Automated Content Engine - GCP Cloud Run event pipeline for social publishing.
4. Real-Time Task Flow System - Decoupled Spring Boot microservice workflow.`, "system-res");
          break;

        case "ls":
        case "dir":
          appendCliEntry("bio.txt   skills.txt   projects.json   health.json   contact.txt", "system-res");
          break;

        case "cat":
          const arg = (parts[1] || "").replace(".txt", "").replace(".json", "");
          if (arg === "bio") {
            appendCliEntry(`[RAM PUJAN PANDIT - PROFILE]\nRole: Software Developer & Backend Engineer\nExperience: 3.6+ Years Enterprise Engineering\nLocation: Delhi NCR, India (Native: Bihar)\nSpecialities: Microservices Architecture, Asynchronous Messaging, High-Throughput REST APIs, Cloud Infrastructure.`, "system-res");
          } else if (arg === "skills") {
            appendCliEntry(`[TECHNICAL STACK]\nLanguages: Java 17, Java 21, SQL, JavaScript (ES6+)\nFrameworks: Spring Boot 3, Spring Data JPA, Spring Security, Hibernate\nBroker/Queues: RabbitMQ (AMQP 5672), Dead-Letter Queues (DLQ)\nDatabase: MySQL, HikariCP, Schema Normalization\nCloud & Ops: Google Cloud Platform (GCP Cloud Run, Compute Engine), Linux Ubuntu, Docker`, "system-res");
          } else if (arg === "projects") {
            appendCliEntry(`[PRODUCTION PROJECTS]\n1. Corporate Prepaid Card & Wallet Platform - High-speed fintech ledger handling 100k txns/day.\n2. Enterprise HRMS & Payroll Engine - Automated salary calculations & geolocation shift roster.\n3. Automated Content Engine - GCP Cloud Run event pipeline for social publishing.\n4. Real-Time Task Flow System - Decoupled Spring Boot microservice workflow.`, "system-res");
          } else if (arg === "contact") {
            appendCliEntry(`[CONTACT DETAILS]\nEmail: rpp1508@gmail.com\nPhone: +91-9113392885\nLinkedIn: https://www.linkedin.com/in/rampujanpandit\nGitHub: https://github.com/rampujanpandit`, "system-res");
          } else {
            appendCliEntry(`cat: ${parts[1] || ''}: No such file. Type 'ls' to see available files or 'help' for commands.`, "error-res");
          }
          break;

        case "whoami":
          appendCliEntry("recruiter@enterprise-node (Guest Visitor)", "system-res");
          break;

        case "health":
          appendCliEntry(`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "UP",
  "components": {
    "db": { "status": "UP", "details": { "database": "MySQL 8.0", "hikariPoolActive": 20 } },
    "rabbitMQ": { "status": "UP", "details": { "version": "3.12.0", "queuesActive": 4 } },
    "diskSpace": { "status": "UP", "details": { "free": "48.2 GB" } }
  }
}`, "system-res");
          break;

        case "curl":
          appendCliEntry(`HTTP/1.1 200 OK
Server: GCP Cloud Run Gateway
X-Latency: 28ms

{ "success": true, "timestamp": "${new Date().toISOString()}", "message": "Mock cURL execution successful via rpp-cli." }`, "system-res");
          break;

        case "contact":
          appendCliEntry(`[CONTACT DETAILS]
Email: rpp1508@gmail.com
Phone: +91-9113392885
LinkedIn: https://www.linkedin.com/in/rampujanpandit
GitHub: https://github.com/rampujanpandit`, "system-res");
          break;

        case "clear":
          cliOutput.innerHTML = "";
          break;

        case "exit":
        case "close":
        case "quit":
          closeCliModal();
          break;

        default:
          appendCliEntry(`Command not found: '${rawCmd}'. Type 'help' to view valid commands.`, "error-res");
          break;
      }

      if (cliBody) cliBody.scrollTop = cliBody.scrollHeight;
    }
  });
}

function appendCliEntry(text, typeClass) {
  if (!cliOutput) return;
  const entry = document.createElement("div");
  entry.className = `cli-log-entry ${typeClass}`;
  entry.textContent = text;
  cliOutput.appendChild(entry);
}

// ==================================================================
// 24. Smart In-Browser AI Chatbot Assistant (100% Free • No API Key)
// ==================================================================
(function initRamAIChatbot() {
  const chatTriggerBtn = document.getElementById("ai-chat-trigger");
  const chatWidget = document.getElementById("ai-chat-widget");
  const chatCloseBtn = document.getElementById("ai-chat-close");
  const chatClearBtn = document.getElementById("ai-chat-clear");
  const chatForm = document.getElementById("ai-chat-form");
  const chatInput = document.getElementById("ai-chat-input");
  const chatMessages = document.getElementById("ai-chat-messages");
  const chatBody = document.getElementById("ai-chat-body");
  const quickChips = document.querySelectorAll(".ai-chip");

  if (!chatTriggerBtn || !chatWidget || !chatMessages) return;

  // Dynamic experience calculation (matching hero section)
  const careerStartDate = new Date("2023-01-02");
  const totalYearsExp = ((new Date() - careerStartDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

  // Ram Pujan Pandit Comprehensive Knowledge Base
  const RAM_PROFILE = {
    name: "Ram Pujan Pandit",
    role: "Software Developer & Backend Engineer",
    company: "Emerald Business Ventures Pvt Ltd",
    experience: `${totalYearsExp}+ years of enterprise backend engineering`,
    noticePeriod: "1 Month (30 Days)",
    location: "Delhi NCR, India (Native: Bihar)",
    email: "rpp1508@gmail.com",
    phone: "+91-9113392885",
    linkedin: "https://www.linkedin.com/in/rampujanpandit",
    github: "https://github.com/rampujanpandit",
    resumeLink: "https://drive.google.com/file/d/1MBYkY-qhFyDPsbzaraZ-mZr42jY9S51U/view?usp=sharing",
    skills: {
      languages: ["Java 17", "Java 21", "SQL", "JavaScript (ES6+)"],
      backend: ["Spring Boot 3", "Microservices Architecture", "RESTful APIs", "Spring Security (JWT, RBAC)", "Spring Data JPA", "Hibernate ORM"],
      messaging: ["RabbitMQ (AMQP 5672)", "Dead-Letter Queues (DLQ)", "Asynchronous Message Handlers"],
      database: ["MySQL 8.0", "HikariCP Connection Pool", "Database Schema Optimization", "Indexing & Transactions"],
      cloud: ["Google Cloud Platform (GCP)", "GCP Cloud Run (Serverless Containers)", "Compute Engine", "Docker", "Linux Ubuntu"]
    },
    projects: [
      {
        name: "Corporate Prepaid Card & Wallet Platform",
        summary: "High-throughput fintech ledger processing 100k+ daily transactions with double-entry bookkeeping, strict idempotent REST APIs, and automated reconciliation.",
        tags: ["Java 17", "Spring Boot", "MySQL", "Fintech Ledger", "Microservices"]
      },
      {
        name: "Enterprise HRMS & Payroll Platform Backend",
        summary: "Multi-tenant HRMS backend featuring GPS-verified attendance geofencing, shift roster automation, 100+ secure REST endpoints, and automated salary calculation pipelines.",
        tags: ["Java 17", "Spring Boot", "JWT / RBAC", "MySQL", "100+ REST APIs"]
      },
      {
        name: "Automated Content & Media Pipeline",
        summary: "Cloud-native event-driven automation engine built with Spring Boot and containerized on GCP Cloud Run for distributed content workflows.",
        tags: ["GCP Cloud Run", "Spring Boot", "Docker", "Cloud APIs"]
      },
      {
        name: "Real-Time Task Flow & Dispatch System",
        summary: "Decoupled asynchronous worker queue system leveraging RabbitMQ message queues to guarantee sub-millisecond job scheduling.",
        tags: ["RabbitMQ", "Spring Boot", "Event-Driven", "DLQ"]
      }
    ]
  };

  // Session Chat History Persistence
  const STORAGE_KEY = "rpp_ai_chat_history_v1";

  // Normalize text for typo-tolerant matching
  function normalizeText(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[?!.,;:()'"`~@#$%^&*_\-+=<>/\\]/g, " ")
      .replace(/\s+/g, " ");
  }

  // Calculate similarity / keyword presence with strict word boundary
  function matchesAny(text, keywords) {
    const clean = " " + normalizeText(text) + " ";
    return keywords.some((kw) => {
      const cleanKw = normalizeText(kw);
      if (!cleanKw) return false;
      return clean.includes(" " + cleanKw + " ");
    });
  }

  // Smart Intent Classifier and Generator
  function generateAIResponse(userQuery) {
    const query = normalizeText(userQuery);

    // 1. NOTICE PERIOD SPECIFIC (1 Month / 30 Days)
    if (
      matchesAny(query, [
        "notice period", "kitna notice period hai", "kitna notice period", "notice period kitna hai",
        "notice period kitna", "notice", "serving notice", "1 month", "1month", "1monnth", "1 mnth",
        "one month", "one mnth", "30 days", "30days", "kab join kar sakte ho", "kab join karoge",
        "joining time", "when can you join", "joining period", "notice time", "availability to join",
        "official notice period", "join immediately", "immediate joiner", "immediately"
      ])
    ) {
      return {
        text: `⏳ **Notice Period: 1 Month (30 Days)**<br><br>
Ram Pujan Pandit's official notice period is **1 Month (30 Days)**.<br><br>
<ul>
  <li>⏱ <strong>Official Notice Period:</strong> 1 Month (30 Days).</li>
  <li>🚀 <strong>Joining Availability:</strong> Actively exploring full-time backend roles & ready to onboard within 30 days (open to early buyout/release if required by the employer).</li>
  <li>📍 <strong>Work Preference:</strong> Open to Hybrid, On-site (Delhi NCR or Pan-India relocation), and Remote roles.</li>
  <li>💼 <strong>Target Positions:</strong> Software Developer, Backend Developer, Java Engineer, Spring Boot Microservices Specialist.</li>
</ul>`,
        actions: [
          { text: "✉️ Email for Interview", url: `mailto:${RAM_PROFILE.email}?subject=Interview%20Discussion%20-%20Backend%20Engineer`, icon: "fa-solid fa-envelope" },
          { text: "📞 Call (+91-9113392885)", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" },
          { text: "📄 Open Full Resume", action: "resume" }
        ]
      };
    }

    // 2. WHY HIRE RAM? / CORE STRENGTHS & VALUE
    if (
      matchesAny(query, [
        "why hire", "why hire ram", "strengths", "why should we hire", "why you",
        "strongest points", "key strengths", "value", "what makes you unique",
        "differentiator", "top skills", "why select you", "standout", "core strengths"
      ])
    ) {
      return {
        text: `🌟 **Why Hire Ram Pujan Pandit? (Core Strengths)**<br><br>
Here is why Ram is a high-impact asset for modern backend engineering teams:
<ul>
  <li>⚡ <strong>Battle-Tested Microservices:</strong> Proven experience architecting and maintaining production Spring Boot microservices handling 100k+ daily fintech transactions.</li>
  <li>🛡 <strong>Zero-Compromise Data Integrity:</strong> Deep expertise in double-entry bookkeeping, ACID compliance, and idempotent REST APIs with MySQL and RabbitMQ.</li>
  <li>☁️ <strong>Cloud & DevOps Ownership:</strong> Hands-on experience containerizing and deploying services on GCP Cloud Run with automated pipelines.</li>
  <li>🚀 <strong>End-to-End Ownership:</strong> From schema design and REST API contracts to deployment, monitoring, and post-production support.</li>
  <li>⏱ <strong>Quick Onboarding:</strong> 1-Month notice period, ready to deliver value from Day 1.</li>
</ul>`,
        actions: [
          { text: "✉️ Schedule an Interview", url: `mailto:${RAM_PROFILE.email}?subject=Interview%20Invitation%20-%20Backend%20Engineer`, icon: "fa-solid fa-calendar-check" },
          { text: "🚀 Key Projects", query: "projects" },
          { text: "📄 Open Resume", action: "resume" }
        ]
      };
    }

    // 3. REASON FOR JOB SWITCH / CAREER GOALS
    if (
      matchesAny(query, [
        "why change", "why switch", "reason for change", "looking for change",
        "why looking", "job change", "switch", "reason for switch", "why leave"
      ])
    ) {
      return {
        text: `🎯 **Career Goals & Reason for Job Change**<br><br>
Ram is actively exploring new career opportunities for the following positive reasons:
<ul>
  <li>📈 <strong>Scale & Distributed Systems:</strong> Eager to work on high-traffic, hyper-scale distributed architectures and mission-critical cloud backends.</li>
  <li>💡 <strong>Impact & Product Ownership:</strong> Looking to join an ambitious engineering team where backend decisions drive substantial business impact.</li>
  <li>🌱 <strong>Continuous Growth:</strong> Deepening technical mastery in reactive programming, advanced cloud architectures, and scalable microservices.</li>
</ul>`,
        actions: [
          { text: "✉️ Connect with Ram", url: `mailto:${RAM_PROFILE.email}`, icon: "fa-solid fa-envelope" },
          { text: "💼 View Experience", query: "experience" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 4. COMPENSATION, CTC & SALARY EXPECTATIONS
    if (
      matchesAny(query, [
        "ctc", "salary", "expected ctc", "current ctc", "compensation", "package",
        "budget", "remuneration", "pay", "salary expectation", "kitni salary",
        "salary requirements", "expected salary", "current salary", "hike"
      ])
    ) {
      return {
        text: `💰 **Compensation & CTC Expectations**<br><br>
Ram's compensation expectations are competitive and aligned with market benchmarks for an experienced **Java 17/21 & Spring Boot Backend Engineer (3.6+ Years)**:<br><br>
<ul>
  <li>💼 <strong>Flexible Approach:</strong> Open and adaptable based on role responsibilities, team scale, technical challenges, and overall benefits package.</li>
  <li>📈 <strong>Market Alignment:</strong> Benchmarked against senior/mid-level software engineering standards in enterprise backend engineering.</li>
  <li>🤝 <strong>HR Discussion:</strong> Ready to share current CTC breakdown and negotiate an offer directly with Talent Acquisition and HR teams.</li>
</ul>`,
        actions: [
          { text: "✉️ Discuss Offer via Email", url: `mailto:${RAM_PROFILE.email}?subject=Compensation%20%26%20Role%20Discussion`, icon: "fa-solid fa-envelope" },
          { text: "📞 Call Ram Directly", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 5. EDUCATION & ACADEMIC BACKGROUND
    if (
      matchesAny(query, [
        "education", "degree", "college", "university", "btech", "b.tech",
        "qualification", "academics", "graduated", "school", "qualification kya hai",
        "padhai", "graduation", "bachelor", "engineering degree", "bcet"
      ])
    ) {
      return {
        text: `🎓 **B.Tech in Information Technology** (2018 &ndash; 2022)<br><br>
<ul>
  <li>🏛 <strong>College:</strong> Bengal College of Engineering and Technology (BCET), Durgapur (WB)</li>
  <li>📚 <strong>Specialization:</strong> Data Structures, Algorithms, Core Java, DBMS & Distributed Systems</li>
  <li>🏫 <strong>Schooling:</strong> Intermediate (Science), RNP College, Madhubani (Bihar)</li>
</ul>`,
        actions: [
          { text: "View Official CV", action: "resume" },
          { text: "Tech Stack", query: "skills", icon: "fa-solid fa-code" },
          { text: "Contact Ram", query: "contact", icon: "fa-solid fa-paper-plane" }
        ]
      };
    }

    // 6. SCALABILITY & HIGH CONCURRENCY
    if (
      matchesAny(query, [
        "scalability", "concurrency", "scale", "high traffic", "high throughput",
        "100k", "race condition", "idempotency", "load", "performance tuning",
        "system scale", "distributed systems"
      ])
    ) {
      return {
        text: `⚡ **Scalability & High Concurrency Engineering**<br><br>
Techniques Ram uses to ensure reliable backend performance under heavy load:
<ul>
  <li><strong>Idempotency:</strong> Unique transaction idempotency keys to prevent duplicate financial deductions during network retries.</li>
  <li><strong>Asynchronous Decoupling:</strong> RabbitMQ queues to offload heavy background tasks, keeping synchronous REST API latencies below 30ms.</li>
  <li><strong>Database Tuning:</strong> HikariCP pool optimization, composite indexing, and pessimistic/optimistic locking for financial balances.</li>
  <li><strong>Autoscaling:</strong> Stateless container instances orchestrated on GCP Cloud Run with autoscaling thresholds.</li>
</ul>`,
        actions: [
          { text: "💳 Fintech Card Platform", query: "prepaid card" },
          { text: "⚡ RabbitMQ Messaging", query: "rabbitmq" },
          { text: "🛠 All Tech Stack", query: "skills" }
        ]
      };
    }

    // 7. TESTING & CODE QUALITY (JUNIT, MOCKITO)
    if (
      matchesAny(query, [
        "testing", "junit", "mockito", "test", "unit tests", "code quality",
        "tdd", "integration testing", "test coverage", "qa", "clean code"
      ])
    ) {
      return {
        text: `🧪 **Testing & Quality Assurance**<br><br>
Ram believes that untested code is incomplete code:
<ul>
  <li><strong>Unit Testing:</strong> Extensive unit tests using <strong>JUnit 5</strong> for business logic validation.</li>
  <li><strong>Mocking:</strong> <strong>Mockito</strong> for isolating database queries, external payment gateways, and third-party APIs.</li>
  <li><strong>Integration Tests:</strong> Testing REST controllers with MockMvc and simulated request payloads.</li>
  <li><strong>Code Standards:</strong> Adherence to SOLID design principles, clean architecture, and standardized exception handling with <code>@ControllerAdvice</code>.</li>
</ul>`,
        actions: [
          { text: "🛠 View Tech Stack", query: "skills" },
          { text: "📄 Open Resume", action: "resume" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 8. REST API DESIGN & POSTMAN SANDBOX
    if (
      matchesAny(query, [
        "api design", "rest api", "swagger", "openapi", "postman", "endpoint",
        "restful", "rest principles", "api documentation", "sandbox"
      ])
    ) {
      return {
        text: `📐 **REST API Design & Standards**<br><br>
How Ram designs enterprise REST APIs:
<ul>
  <li><strong>Standard Conventions:</strong> Resource-oriented URIs, correct HTTP verbs (GET, POST, PUT, PATCH, DELETE), and standard HTTP status codes.</li>
  <li><strong>Stateless Security:</strong> JWT token verification and Role-Based Access Control (RBAC) on protected endpoints.</li>
  <li><strong>Documentation:</strong> Interactive Swagger / OpenAPI 3.0 UI specification.</li>
  <li><strong>Postman Integration:</strong> Download Ram's curated Postman collection directly from this portfolio to test sample APIs.</li>
</ul>`,
        actions: [
          { text: "🚀 Related Projects", query: "projects" },
          { text: "📄 Open Resume", action: "resume" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 9. AGILE METHODOLOGY & COLLABORATION
    if (
      matchesAny(query, [
        "agile", "scrum", "jira", "sprint", "teamwork", "collaboration",
        "git workflow", "code review", "standup", "peer review"
      ])
    ) {
      return {
        text: `🤝 **Agile Methodology & Team Collaboration**<br><br>
<ul>
  <li><strong>Agile / Scrum:</strong> Active participant in 2-week sprints, daily standups, backlog refinement, sprint planning, and retrospective sessions.</li>
  <li><strong>Project Tracking:</strong> Jira for user stories, sub-task estimation, and bug tracking.</li>
  <li><strong>Git & CI/CD:</strong> Git feature-branch workflow, meaningful commit messages, PR peer reviews, and automated deployment checks.</li>
  <li><strong>Cross-Functional:</strong> Seamless collaboration with Frontend developers, QA testers, Product Managers, and DevOps engineers.</li>
</ul>`,
        actions: [
          { text: "💼 View Experience", query: "experience" },
          { text: "📬 Contact Ram", query: "contact" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 10. REDIS & CACHING
    if (matchesAny(query, ["redis", "cache", "caching", "ttl", "in memory"])) {
      return {
        text: `⚡ **Caching Strategies & Redis**<br><br>
<ul>
  <li><strong>Cache-Aside Pattern:</strong> Caching frequently accessed read-heavy datasets to dramatically reduce database IOPS.</li>
  <li><strong>Session & Auth Caching:</strong> Storing temporary verification tokens and blacklisted JWT tokens with automated TTL expirations.</li>
  <li><strong>Performance Boost:</strong> Sub-5ms response times for repeat queries on high-traffic endpoints.</li>
</ul>`,
        actions: [
          { text: "🛠 View Tech Stack", query: "skills" },
          { text: "🚀 View Projects", query: "projects" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 11. LOCATION / RELOCATION / WORK PREFERENCES
    if (
      matchesAny(query, [
        "location", "delhi", "noida", "city", "relocate", "relocation", "remote", "hybrid",
        "kahan rehte ho", "preferences", "bangalore", "hyderabad", "pune", "gurgaon"
      ])
    ) {
      return {
        text: `📍 **Location, Relocation & Work Preferences**<br><br>
<ul>
  <li><strong>Current Base:</strong> Delhi NCR, India (Native: Bihar).</li>
  <li><strong>Notice Period:</strong> 1 Month (30 Days).</li>
  <li><strong>Work Models:</strong> Open to <strong>Hybrid</strong>, <strong>On-site (Delhi NCR or Pan-India relocation)</strong>, and <strong>Remote</strong> engineering roles.</li>
  <li><strong>Target Roles:</strong> Software Developer, Backend Developer, Java Engineer, Spring Boot Microservices Specialist.</li>
</ul>`,
        actions: [
          { text: "✉️ Email Ram", url: `mailto:${RAM_PROFILE.email}`, icon: "fa-solid fa-envelope" },
          { text: "📞 Call Ram", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 2. IDENTITY / BOT CAPABILITIES
    if (
      matchesAny(query, [
        "who are you", "tum kaun ho", "what can you do", "kya kar sakte ho",
        "help", "what is this", "capabilities", "kya feature hai"
      ])
    ) {
      return {
        text: `🤖 I am **Ram Pujan Pandit's Personal In-Browser AI Assistant**.<br><br>
Here is what you can ask me about:
<ul>
  <li>💼 <strong>Experience & Role:</strong> Current position at Emerald Business Ventures & past work.</li>
  <li>🛠 <strong>Technical Skills:</strong> Deep dive into Java, Spring Boot, RabbitMQ, MySQL, and GCP.</li>
  <li>🚀 <strong>Production Projects:</strong> Fintech Card Platform, Enterprise HRMS, and Cloud pipelines.</li>
  <li>📄 <strong>Official Resume:</strong> Open his full CV modal or Google Drive preview.</li>
  <li>📬 <strong>Hire & Contact:</strong> One-click phone call, email, LinkedIn, and GitHub.</li>
  <li>📍 <strong>Notice Period & Location:</strong> Joining availability and work preferences.</li>
</ul>`,
        actions: [
          { text: "💼 View Experience", query: "experience" },
          { text: "🛠 Core Skills", query: "skills" },
          { text: "📄 Open Resume", action: "resume" }
        ]
      };
    }

    // 3. RESUME / CV
    if (
      matchesAny(query, [
        "resume", "cv", "curriculum vitae", "biodata", "profile pdf",
        "download resume", "view resume", "resme", "resum", "c.v"
      ])
    ) {
      return {
        text: `📄 **Official Resume / CV**<br><br>
You can view Ram's latest Curriculum Vitae directly in the interactive fullscreen viewer or open it in Google Drive:`,
        actions: [
          { text: "🔍 Open Fullscreen Viewer", action: "resume" },
          { text: "📥 Open Google Drive", url: RAM_PROFILE.resumeLink, icon: "fa-solid fa-arrow-up-right-from-square" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 4. CONTACT / HIRE / INTERVIEW
    if (
      matchesAny(query, [
        "contact", "email", "phone", "mobile", "number", "call", "hire", "interview",
        "connect", "reach out", "whatsapp", "linkedin", "github", "contect", "cantact",
        "baat karni", "kaise baat kare", "phone no", "mail id"
      ])
    ) {
      return {
        text: `📬 **Let's Connect with Ram Pujan Pandit**<br><br>
Ram is actively open to full-time Backend Developer & Software Engineering opportunities.<br><br>
<ul>
  <li>📧 <strong>Email:</strong> <a href="mailto:${RAM_PROFILE.email}" style="color:#ff004f;text-decoration:underline;">${RAM_PROFILE.email}</a></li>
  <li>📞 <strong>Phone:</strong> <a href="tel:${RAM_PROFILE.phone}" style="color:#ff004f;text-decoration:underline;">${RAM_PROFILE.phone}</a></li>
  <li>📍 <strong>Location:</strong> ${RAM_PROFILE.location}</li>
</ul>`,
        actions: [
          { text: "✉️ Send Email", url: `mailto:${RAM_PROFILE.email}`, icon: "fa-solid fa-envelope" },
          { text: "📞 Call Now", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" },
          { text: "🔗 LinkedIn", url: RAM_PROFILE.linkedin, icon: "fa-brands fa-linkedin" },
          { text: "💻 GitHub", url: RAM_PROFILE.github, icon: "fa-brands fa-github" }
        ]
      };
    }

    // 5. JAVA SPECIFIC EXPERTISE
    if (matchesAny(query, ["java", "java 17", "java 21", "core java", "multithreading", "jvm", "stream", "streams"])) {
      return {
        text: `☕ **Java Expertise (Java 17 & 21)**<br><br>
Ram has strong hands-on experience in modern enterprise Java:
<ul>
  <li><strong>Modern Features:</strong> Java 17 & 21 LTS features, Records, Sealed Classes, Pattern Matching, and Virtual Threads.</li>
  <li><strong>Concurrency:</strong> Multithreading, Thread Pools, CompletableFuture, and high-concurrency throughput.</li>
  <li><strong>Performance:</strong> Memory optimization, JVM garbage collection tuning, and leak analysis.</li>
  <li><strong>Clean Code:</strong> SOLID design principles, clean architecture, and Gang of Four (GoF) patterns.</li>
</ul>`,
        actions: [
          { text: "🛠 Spring Boot Skills", query: "spring boot" },
          { text: "🚀 Related Projects", query: "projects" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 6. SPRING BOOT & MICROSERVICES SPECIFIC
    if (
      matchesAny(query, [
        "spring", "spring boot", "springboot", "sping", "microservice", "microservices",
        "spring security", "jwt", "rbac", "hibernate", "jpa", "spring data"
      ])
    ) {
      return {
        text: `🍃 **Spring Boot & Microservices Expertise**<br><br>
Ram's core engineering strength lies in building production-grade Spring Boot 3 backends:
<ul>
  <li><strong>Architecture:</strong> Distributed Microservices, modular monoliths, and API gateway routing.</li>
  <li><strong>Security:</strong> Spring Security with stateless JWT authentication and granular Role-Based Access Control (RBAC).</li>
  <li><strong>Data Persistence:</strong> Spring Data JPA with Hibernate, HikariCP connection pooling, and optimized JPQL queries.</li>
  <li><strong>API Design:</strong> 100+ standard RESTful endpoints documented via OpenAPI / Swagger.</li>
</ul>`,
        actions: [
          { text: "⚡ RabbitMQ Messaging", query: "rabbitmq" },
          { text: "🚀 HRMS Platform Details", query: "hrms" },
          { text: "📄 Download Resume", action: "resume" }
        ]
      };
    }

    // 7. GCP & CLOUD SPECIFIC
    if (matchesAny(query, ["gcp", "google cloud", "cloud run", "compute engine", "docker", "cloud", "devops", "deploy"])) {
      return {
        text: `☁️ **Google Cloud Platform (GCP) & DevOps Skills**<br><br>
Ram leverages cloud-native architectures for resilience and scalability:
<ul>
  <li><strong>GCP Cloud Run:</strong> Deploying containerized, autoscaling Spring Boot microservices with minimal cold start latency.</li>
  <li><strong>Compute Engine:</strong> Managing Linux (Ubuntu) virtual server instances and production environments.</li>
  <li><strong>Containerization:</strong> Multi-stage Docker builds optimized for minimal image sizes and fast CI/CD builds.</li>
  <li><strong>Cloud APIs & Storage:</strong> GCP Storage buckets, Cloud Logging, and Cloud Monitoring integration.</li>
</ul>`,
        actions: [
          { text: "🛠 All Tech Stack", query: "skills" },
          { text: "🚀 Cloud Projects", query: "automated content pipeline" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 8. RABBITMQ & ASYNC MESSAGING
    if (matchesAny(query, ["rabbitmq", "amqp", "queue", "queues", "message broker", "kafka", "event driven", "async", "dlq"])) {
      return {
        text: `🐰 **RabbitMQ & Asynchronous Messaging**<br><br>
Ram has architected decoupled message pipelines to ensure sub-millisecond API response times:
<ul>
  <li><strong>AMQP Broker:</strong> RabbitMQ cluster setup with Direct, Topic, and Fanout exchanges.</li>
  <li><strong>Fault Tolerance:</strong> Dead-Letter Queues (DLQ) and exponential backoff retry mechanisms to prevent message loss.</li>
  <li><strong>Asynchronous Offloading:</strong> Offloading heavy background computations, email/SMS triggers, and webhook publishing.</li>
</ul>`,
        actions: [
          { text: "💳 Prepaid Card Platform", query: "prepaid card" },
          { text: "🛠 All Tech Stack", query: "skills" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 9. DATABASE & MYSQL
    if (matchesAny(query, ["mysql", "sql", "database", "db", "hikaricp", "indexing", "queries", "acid"])) {
      return {
        text: `🗄 **MySQL & Database Engineering**<br><br>
Ram focuses heavily on data integrity and relational schema efficiency:
<ul>
  <li><strong>Relational Design:</strong> Normalized schemas (3NF) balanced with strategic indexing for sub-10ms query execution.</li>
  <li><strong>Connection Tuning:</strong> High-performance HikariCP connection pool optimization under heavy concurrency.</li>
  <li><strong>ACID Guarantees:</strong> Transaction isolation levels, row-level locking, and idempotent financial ledger tables.</li>
</ul>`,
        actions: [
          { text: "💳 Fintech Ledger Project", query: "card wallet" },
          { text: "🛠 All Tech Stack", query: "skills" }
        ]
      };
    }

    // 10. GENERAL SKILLS / TECH STACK
    if (
      matchesAny(query, [
        "skills", "tech stack", "technologies", "techstack", "kya kya aata",
        "skills kya hai", "what do you know", "languages"
      ])
    ) {
      return {
        text: `🛠 **Ram Pujan Pandit's Core Tech Stack**<br><br>
<span class="ai-tech-tag">Java 17 / 21</span>
<span class="ai-tech-tag">Spring Boot 3</span>
<span class="ai-tech-tag">Microservices</span>
<span class="ai-tech-tag">RESTful APIs</span>
<span class="ai-tech-tag">RabbitMQ</span>
<span class="ai-tech-tag">MySQL 8.0</span>
<span class="ai-tech-tag">GCP Cloud Run</span>
<span class="ai-tech-tag">Docker</span>
<span class="ai-tech-tag">Spring Security</span>
<span class="ai-tech-tag">Hibernate</span>
<span class="ai-tech-tag">Git / GitHub</span><br><br>
Specialized in building high-concurrency enterprise backend systems that scale smoothly under load.`,
        actions: [
          { text: "☕ Java Skills", query: "java" },
          { text: "🍃 Spring Boot", query: "spring boot" },
          { text: "☁️ GCP & Cloud", query: "gcp" },
          { text: "🚀 Key Projects", query: "projects" }
        ]
      };
    }

    // 11. EXPERIENCE & COMPANY
    if (
      matchesAny(query, [
        "experience", "work", "job", "career", "company", "emerald", "current role",
        "past work", "years of exp", "expreince", "exprience", "exprnc", "kitna exp",
        "kahan kaam karta", "kis company me", "experience kitna hai"
      ])
    ) {
      return {
        text: `💼 **Work Experience & Career Background**<br><br>
<strong>🏢 Emerald Business Ventures Pvt Ltd</strong><br>
<em>Role: Software Developer & Backend Engineer</em><br>
<em>Tenure: Jan 2023 &ndash; Present (${RAM_PROFILE.experience})</em><br><br>
Key Impact & Responsibilities:
<ul>
  <li>Architected high-throughput fintech backend microservices serving 100k+ daily transactions.</li>
  <li>Engineered end-to-end Enterprise HRMS backend modules with 100+ secure REST APIs.</li>
  <li>Integrated asynchronous RabbitMQ event queues, cutting API response latency by 45%.</li>
  <li>Orchestrated containerized deployments on Google Cloud Platform (GCP Cloud Run).</li>
</ul>`,
        actions: [
          { text: "🚀 View Projects", query: "projects" },
          { text: "📄 Open Resume", action: "resume" },
          { text: "📬 Contact Ram", query: "contact" }
        ]
      };
    }

    // 12. PROJECTS - SPECIFIC OR GENERAL
    if (
      matchesAny(query, [
        "projects", "project", "work", "portfolio", "kya banaya hai", "kaun se project",
        "projct", "prject", "projets", "card", "wallet", "hrms", "payroll", "content pipeline"
      ])
    ) {
      // Sub-check for specific projects
      if (matchesAny(query, ["card", "wallet", "prepaid", "fintech", "payment"])) {
        return {
          text: `💳 **Corporate Prepaid Card & Wallet Platform**<br><br>
A high-throughput enterprise fintech ledger handling 100k+ daily transactions:
<ul>
  <li>Double-entry bookkeeping engine ensuring zero balance discrepancies.</li>
  <li>Strict idempotent REST APIs to prevent duplicate deductions during network retries.</li>
  <li>Automated end-of-day bank statement reconciliation pipelines.</li>
  <li>Tech Stack: <span class="ai-tech-tag">Java 17</span> <span class="ai-tech-tag">Spring Boot</span> <span class="ai-tech-tag">MySQL</span> <span class="ai-tech-tag">REST APIs</span></li>
</ul>`,
          actions: [
            { text: "🚀 Other Projects", query: "projects" },
            { text: "📄 View Resume", action: "resume" }
          ]
        };
      }

      if (matchesAny(query, ["hrms", "payroll", "salary", "attendance", "leave"])) {
        return {
          text: `👥 **Enterprise HRMS & Payroll Engine**<br><br>
A multi-tenant workforce management backend powering daily employee operations:
<ul>
  <li>Designed 100+ secure REST endpoints with JWT + RBAC security.</li>
  <li>GPS-verified geofencing attendance tracking & shift roster automation.</li>
  <li>Rule-based salary calculation engine with PF, TDS, and tax deductions.</li>
  <li>Tech Stack: <span class="ai-tech-tag">Java 17</span> <span class="ai-tech-tag">Spring Boot 3</span> <span class="ai-tech-tag">MySQL</span> <span class="ai-tech-tag">Spring Security</span></li>
</ul>`,
          actions: [
            { text: "🚀 Other Projects", query: "projects" },
            { text: "📄 View Resume", action: "resume" }
          ]
        };
      }

      // Default projects overview
      return {
        text: `🚀 **Key Production Projects Built by Ram**<br><br>
1. <strong>💳 Corporate Prepaid Card & Wallet Platform:</strong> Fintech microservices handling 100k+ daily transactions with double-entry accounting.
2. <strong>👥 Enterprise HRMS & Payroll Platform:</strong> 100+ REST APIs for attendance geofencing, shift management, and automated salary pipelines.
3. <strong>☁️ Automated Content Engine:</strong> Scalable media workflow pipeline containerized on GCP Cloud Run.
4. <strong>⚡ Real-Time Task Flow System:</strong> Asynchronous message queue system powered by RabbitMQ.`,
        actions: [
          { text: "💳 Card Platform Details", query: "prepaid card" },
          { text: "👥 HRMS Details", query: "hrms" },
          { text: "📄 View Resume", action: "resume" }
        ]
      };
    }

    // 22. GREETINGS & SMALL TALK
    if (
      matchesAny(query, [
        "hi", "hello", "hey", "namaste", "hola", "sup", "greetings",
        "kaise ho", "kya haal", "good morning", "good evening", "good afternoon",
        "ram ram", "start", "restart"
      ])
    ) {
      return {
        text: `Hello! 👋 I'm **Ram's Smart AI Assistant**.<br><br>
I know everything about **Ram Pujan Pandit** &mdash; his ${RAM_PROFILE.experience}, expertise in **Java 17/21**, **Spring Boot**, **Microservices**, **GCP**, and 100k+ TPS production projects.<br><br>
How can I assist your recruitment or technical inquiry today? Choose a popular topic below or type any question!`,
        actions: [
          { text: "💼 Experience", query: "experience" },
          { text: "🛠 Tech Stack", query: "skills" },
          { text: "⏱ 1 Month Notice", query: "notice period" },
          { text: "🌟 Why Hire Ram?", query: "why hire ram" },
          { text: "🚀 Key Projects", query: "projects" },
          { text: "💰 CTC & Salary", query: "salary" },
          { text: "📄 View Resume", action: "resume" },
          { text: "📬 Contact / Hire", query: "contact" }
        ]
      };
    }

    // 14. APPRECIATION / FAREWELL
    if (
      matchesAny(query, [
        "thanks", "thank you", "great", "awesome", "nice", "cool", "super", "perfect",
        "good", "shukriya", "dhanyawad", "badhiya", "bye", "goodbye", "alvida", "see you"
      ])
    ) {
      return {
        text: `You're very welcome! 😊 Glad I could help.<br><br>
Feel free to ask anything else, or connect directly with Ram via email or phone!`,
        actions: [
          { text: "📄 View Resume", action: "resume" },
          { text: "📬 Contact Details", query: "contact" }
        ]
      };
    }

    // 15. SMART FALLBACK
    return {
      isFallback: true,
      text: `Thank you for asking! 🤔<br><br>
As **Ram's AI Assistant**, I have comprehensive data about his **Java/Spring Boot engineering**, **GCP Cloud skills**, **experience at Emerald Business Ventures**, and **projects**.<br><br>
For specific project deep dives, architectural consultations, or scheduling an interview, please connect directly with Ram:`,
      actions: [
        { text: "✉️ Send Email", url: `mailto:${RAM_PROFILE.email}`, icon: "fa-solid fa-envelope" },
        { text: "📞 Call (+91-9113392885)", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" },
        { text: "📄 Open Full Resume", action: "resume" },
        { text: "🛠 View Skills", query: "skills" }
      ]
    };
  }

  // Scroll messages container smoothly
  function scrollToBottom(targetNode) {
    setTimeout(() => {
      if (targetNode && targetNode.classList && targetNode.classList.contains("bot")) {
        // Ensure the top heading of the bot response is directly visible to the visitor
        targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      }
    }, 40);
  }

  // Convert Markdown syntax (**bold**, *italic*, bullet points, linebreaks) to clean HTML
  function formatMarkdown(text) {
    if (!text) return "";
    let formatted = text;

    // Code blocks & inline code
    formatted = formatted.replace(/```([a-z]*)\n([\s\S]*?)```/gi, '<pre class="ai-code-block"><code>$2</code></pre>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');

    // Bold (**text** or __text__)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic (*text* or _text_)
    formatted = formatted.replace(/(^|[^\*])\*([^\*\n]+)\*([^\*]|$)/g, "$1<em>$2</em>$3");

    // Markdown bullet points (* item or - item)
    const lines = formatted.split("\n");
    let inList = false;
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const bulletMatch = line.match(/^(\s*)[*\-]\s+(.*)$/);
      if (bulletMatch) {
        if (!inList) {
          processedLines.push("<ul>");
          inList = true;
        }
        processedLines.push(`<li>${bulletMatch[2]}</li>`);
      } else {
        if (inList) {
          processedLines.push("</ul>");
          inList = false;
        }
        processedLines.push(line);
      }
    }
    if (inList) {
      processedLines.push("</ul>");
    }

    formatted = processedLines.join("\n");

    // Clean extra breaks around lists and paragraphs
    formatted = formatted.replace(/\n\n+/g, "<br><br>");
    formatted = formatted.replace(/\n/g, "<br>");
    formatted = formatted.replace(/<br>\s*<ul>/gi, "<ul>")
                         .replace(/<ul>\s*<br>/gi, "<ul>")
                         .replace(/<br>\s*<\/ul>/gi, "</ul>")
                         .replace(/<\/ul>\s*<br>/gi, "</ul>")
                         .replace(/<br>\s*<li>/gi, "<li>")
                         .replace(/<\/li>\s*<br>/gi, "</li>");

    return formatted;
  }

  // Append a message bubble to the chat
  function appendMessage(sender, contentHtml, options = {}) {
    const msgWrapper = document.createElement("div");
    msgWrapper.className = `ai-msg ${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (sender === "bot") {
      const formattedHtml = formatMarkdown(contentHtml);
      msgWrapper.innerHTML = `
        <img src="logo.png" alt="Ram" class="ai-msg-avatar" />
        <div class="ai-msg-bubble">
          <div class="ai-msg-content">${formattedHtml}</div>
          <span class="ai-msg-time">${timeStr}</span>
        </div>
      `;

      // Append action buttons if provided
      if (options.actions && options.actions.length > 0) {
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "ai-action-buttons";

        options.actions.forEach((btnData) => {
          if (btnData.url) {
            const link = document.createElement("a");
            link.className = "ai-action-btn";
            link.href = btnData.url;
            if (!btnData.url.startsWith("mailto:") && !btnData.url.startsWith("tel:")) {
              link.target = "_blank";
              link.rel = "noopener noreferrer";
            }
            link.innerHTML = `${btnData.icon ? `<i class="${btnData.icon}"></i> ` : ""}${btnData.text}`;
            actionsContainer.appendChild(link);
          } else if (btnData.action === "resume") {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "ai-action-btn";
            // Strip any leading emoji from text to prevent duplicate icons
            const cleanText = btnData.text.replace(/^[^\w\s]+/g, "").trim();
            btn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${cleanText || "View Resume"}`;
            btn.addEventListener("click", () => {
              if (typeof openResumeModal === "function") {
                openResumeModal();
              }
            });
            actionsContainer.appendChild(btn);
          } else if (btnData.query) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "ai-action-btn";
            btn.innerHTML = `${btnData.icon ? `<i class="${btnData.icon}"></i> ` : ""}${btnData.text}`;
            btn.addEventListener("click", () => {
              handleUserSubmit(btnData.query);
            });
            actionsContainer.appendChild(btn);
          }
        });

        const bubble = msgWrapper.querySelector(".ai-msg-bubble");
        bubble.appendChild(actionsContainer);
      }
    } else {
      msgWrapper.innerHTML = `
        <div class="ai-msg-bubble">
          <div class="ai-msg-content">${escapeHtml(contentHtml)}</div>
          <span class="ai-msg-time">${timeStr}</span>
        </div>
      `;
    }

    chatMessages.appendChild(msgWrapper);
    scrollToBottom(msgWrapper);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Show Typing Indicator
  function showTypingIndicator() {
    // 1. Sync header status text
    const chatStatusEl = chatWidget.querySelector(".ai-chat-header-text p");
    if (chatStatusEl) {
      chatStatusEl.className = "ai-status-typing";
      chatStatusEl.innerHTML = `<i class="fa-solid fa-pen-fancy"></i> Ram Pujan is typing...`;
    }

    // 2. Render typing indicator bubble in chat log
    const typingWrapper = document.createElement("div");
    typingWrapper.id = "ai-typing-indicator-node";
    typingWrapper.className = "ai-msg bot";
    typingWrapper.innerHTML = `
      <img src="logo.png" alt="Ram" class="ai-msg-avatar" />
      <div class="ai-typing-indicator">
        <span class="ai-typing-label"><i class="fa-solid fa-pen-nib"></i> Ram Pujan is typing</span>
        <div class="ai-typing-dots">
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingWrapper);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    // 1. Restore header status text
    const chatStatusEl = chatWidget.querySelector(".ai-chat-header-text p");
    if (chatStatusEl) {
      chatStatusEl.className = "";
      chatStatusEl.innerHTML = `<i class="fa-solid fa-circle ai-dot-indicator"></i> Active &bull; Ready to help`;
    }

    // 2. Remove indicator bubble
    const indicator = document.getElementById("ai-typing-indicator-node");
    if (indicator) indicator.remove();
  }

  // ------------------------------------------------------------------
  // Google Gemini AI Hybrid Engine Configuration
  // ------------------------------------------------------------------
  const GEMINI_API_KEY = "AQ.Ab8RN6Kl9CG2vQgwOLGmjSNJ28jkhOlLbdtTErpO3KwSDwDZtw";
  const GEMINI_PRIMARY_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`;
  const GEMINI_BACKUP_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const RAM_AI_SYSTEM_PROMPT = `You are the official AI representative & Career Assistant for Ram Pujan Pandit on his portfolio website.
Candidate Profile:
- Full Name: Ram Pujan Pandit
- Current Title: Software Developer & Backend Engineer at Emerald Business Ventures Pvt Ltd
- Experience: 3.6+ years in high-performance enterprise backend development and microservices
- Notice Period: Strictly 1 Month (30 Days) official notice period, open to early buyout / negotiable release
- Current CTC: 7.5 LPA | Expected CTC: Open to competitive industry standards based on role and scope
- Tech Stack: Java 17, Java 21, Spring Boot 3, Spring Cloud, REST APIs, Microservices, Spring Security, JWT, RabbitMQ, MySQL, GCP (Cloud Run, Cloud SQL, Secret Manager, Cloud Build), Docker, Git, CI/CD, HikariCP, Redis
- Major Production Projects:
  1. Corporate Prepaid Card & Multi-Wallet Platform: 100k+ daily transactions, double-entry ledger bookkeeping, idempotent REST APIs, automated end-of-day bank reconciliation.
  2. Enterprise HRMS & Payroll Management Engine: 100+ secure REST APIs, GPS geofencing attendance, dynamic shift management, automated salary, PF & TDS calculations.
  3. Cloud Media & Content Pipeline: Automated processing on GCP Cloud Run.
  4. Real-Time Task Flow & Alert System: Asynchronous event queue architecture with RabbitMQ.
- Location: Delhi NCR (Noida, Gurugram, Delhi). Native: Bihar. Open to Remote, Hybrid, or On-site roles across India & globally.
- Education: Bachelor of Technology (B.Tech) in Computer Science & Engineering.
- Contact: Email: rpp1508@gmail.com, Phone: +91-9113392885, LinkedIn & GitHub available on portfolio.

Instructions:
1. Always answer in English.
2. Be polite, confident, professional, and concise (2 to 3 short paragraphs or clean bullet points).
3. If asked about Ram's technical capabilities, explain with reference to his actual stack (Java, Spring Boot, Microservices, GCP, RabbitMQ, etc.).
4. If asked about notice period, confirm clearly: "1 Month (30 Days)".
5. If asked non-tech general questions, answer briefly and professionally, then guide the user back to Ram's portfolio or interview opportunities.`;

  async function fetchGeminiAIResponse(userQuery) {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `${RAM_AI_SYSTEM_PROMPT}\n\nVisitor Question: ${userQuery}\n\nProvide a direct, recruiter-friendly answer on behalf of Ram:`
            }
          ]
        }
      ]
    };

    // Helper for timeout-safe fetch
    const callApi = async (url) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);
      try {
        const resp = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const data = await resp.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) return reply.trim();
        }
      } catch (err) {
        clearTimeout(timeoutId);
      }
      return null;
    };

    // Try primary endpoint (gemini-flash-lite-latest)
    let result = await callApi(GEMINI_PRIMARY_URL);
    if (result) return result;

    // Fallback to secondary endpoint (gemini-flash-latest)
    result = await callApi(GEMINI_BACKUP_URL);
    return result;
  }

  // Handle user query submission (Hybrid: Predefined FAQs first, Google Gemini fallback)
  async function handleUserSubmit(query) {
    if (!query || !query.trim()) return;
    const cleanInput = query.trim();

    // 1. Render User Message
    appendMessage("user", cleanInput);
    if (chatInput) chatInput.value = "";

    // 2. Show realistic typing indicator
    showTypingIndicator();

    // 3. Check predefined local responses first
    const predefinedResponse = generateAIResponse(cleanInput);

    if (!predefinedResponse.isFallback) {
      // PREDEFINED MATCH: Fast, instant, 100% reliable local FAQ
      const delay = Math.min(1000 + cleanInput.length * 12, 1400);
      setTimeout(() => {
        hideTypingIndicator();
        appendMessage("bot", predefinedResponse.text, { actions: predefinedResponse.actions });
      }, delay);
      return;
    }

    // NON-PREDEFINED: Call Google Gemini AI Live!
    try {
      const geminiText = await fetchGeminiAIResponse(cleanInput);
      hideTypingIndicator();

      if (geminiText) {
        appendMessage("bot", geminiText, {
          actions: [
            { text: "📄 View Resume", action: "resume" },
            { text: "✉️ Email Ram", url: `mailto:${RAM_PROFILE.email}`, icon: "fa-solid fa-envelope" },
            { text: "📞 Call Ram", url: `tel:${RAM_PROFILE.phone}`, icon: "fa-solid fa-phone" }
          ]
        });
      } else {
        // Gemini API unavailable/network error -> Fallback gracefully
        appendMessage("bot", predefinedResponse.text, { actions: predefinedResponse.actions });
      }
    } catch (err) {
      hideTypingIndicator();
      appendMessage("bot", predefinedResponse.text, { actions: predefinedResponse.actions });
    }
  }

  // Initial welcome message
  function renderWelcomeMessage() {
    chatMessages.innerHTML = "";
    const welcomeText = `Hi there! 👋 I am <strong>Ram's Smart AI Assistant</strong>.<br><br>
Ask me anything about Ram Pujan Pandit's <strong>Java 17/21</strong> & <strong>Spring Boot</strong> microservices, <strong>GCP Cloud</strong> experience, 100k+ TPS projects, or hiring logistics!`;
    appendMessage("bot", welcomeText, {
      actions: [
        { text: "💼 Experience", query: "experience" },
        { text: "🛠 Tech Stack", query: "skills" },
        { text: "⏱ 1 Month Notice", query: "notice period" },
        { text: "🌟 Why Hire Ram?", query: "why hire ram" },
        { text: "🚀 Key Projects", query: "projects" },
        { text: "💰 CTC & Salary", query: "salary" },
        { text: "🎓 Education", query: "education" },
        { text: "📄 Resume", action: "resume" },
        { text: "📬 Contact", query: "contact" }
      ]
    });
  }

  // Open / Close Chatbot Widget
  function openChatWidget() {
    chatWidget.classList.add("active");
    chatTriggerBtn.classList.add("active");
    chatWidget.setAttribute("aria-hidden", "false");

    if (window.innerWidth <= 600) {
      document.body.style.overflow = "hidden";
      const cliBtn = document.querySelector(".cli-floating-btn");
      const topBtn = document.getElementById("back-to-top");
      if (cliBtn) cliBtn.style.display = "none";
      if (topBtn) topBtn.style.display = "none";
    }

    if (chatMessages.children.length === 0) {
      renderWelcomeMessage();
    } else {
      scrollToBottom();
    }

    // Auto-focus input on desktop
    if (window.innerWidth > 600 && chatInput) {
      setTimeout(() => chatInput.focus(), 250);
    }
  }

  function closeChatWidget() {
    chatWidget.classList.remove("active");
    chatTriggerBtn.classList.remove("active");
    chatWidget.setAttribute("aria-hidden", "true");

    if (window.innerWidth <= 600) {
      document.body.style.overflow = "auto";
      const cliBtn = document.querySelector(".cli-floating-btn");
      const topBtn = document.getElementById("back-to-top");
      if (cliBtn) cliBtn.style.display = "";
      if (topBtn) topBtn.style.display = "";
    }
  }

  function toggleChatWidget() {
    if (chatWidget.classList.contains("active")) {
      closeChatWidget();
    } else {
      openChatWidget();
    }
  }

  // Event Listeners
  chatTriggerBtn.addEventListener("click", toggleChatWidget);
  chatCloseBtn.addEventListener("click", closeChatWidget);

  chatClearBtn.addEventListener("click", () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    renderWelcomeMessage();
  });

  // Form submit
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (chatInput) {
      handleUserSubmit(chatInput.value);
    }
  });

  // Quick Chips Click Handler
  quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query") || chip.textContent.trim();
      if (query === "resume" && typeof openResumeModal === "function") {
        openResumeModal();
      } else {
        handleUserSubmit(query);
      }
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWidget.classList.contains("active")) {
      closeChatWidget();
    }
  });

  // Always reset chatbot to clean fresh welcome state on every page load/refresh
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  renderWelcomeMessage();
})();


