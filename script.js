// Toggle Mobile Menu
const mobileMenuToggle = document.querySelector(".fa-bars");
const closeMenuToggle = document.querySelector(".fa-circle-xmark");
const navLinks = document.querySelector("nav ul");

mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.add("open");
    mobileMenuToggle.style.display = "none";
    closeMenuToggle.style.display = "block";
});

closeMenuToggle.addEventListener("click", () => {
    navLinks.classList.remove("open");
    mobileMenuToggle.style.display = "block";
    closeMenuToggle.style.display = "none";
});

// Tabs in About Section
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
        tabLinks.forEach(tab => tab.classList.remove("active-link"));
        tabContents.forEach(content => content.classList.remove("active-tab"));
        
        link.classList.add("active-link");
        tabContents[index].classList.add("active-tab");
    });
});

// Smooth Scrolling for Navigation Links
const navItems = document.querySelectorAll("nav ul li a");

navItems.forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        const section = document.querySelector(item.getAttribute("href"));
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwmxlR4x03V9FSA0L6PGFJu9v-rusmw8Nk9ia5T3smLKrAS8tWORrZzsoML8TZKupUq/exec'
      const form = document.forms['submit-to-google-sheet']
      const msg = document.getElementById("msg")
    
      form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
          .then(response => {
            msg.innerHTML="Message sent successully (: "
            setTimeout(function(){
              msg.innerHTML=""
            },5000)
            form.reset()
          })
          .catch(error => console.error('Error!', error.message))
      })