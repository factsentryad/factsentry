// Fact data sample for demonstration (you can replace or extend)
const facts = [
  "Honey never spoils.",
  "Bananas are berries, but strawberries aren't.",
  "Octopuses have three hearts.",
  "The Eiffel Tower can be 15 cm taller during the summer."
];

let currentFactIndex = 0;

// Initialize EmailJS (optional, you can add later)
if (emailjs) {
  emailjs.init('YOUR_USER_ID'); // Replace YOUR_USER_ID when ready
}

// Navigation logic
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const main = document.getElementById("main");
const exploreBtn = document.getElementById("explore-videos");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");

    // Remove active class from all links and pages
    navLinks.forEach(l => l.classList.remove("active"));
    pages.forEach(p => p.classList.remove("page--active"));

    // Add active class to clicked nav and corresponding page
    link.classList.add("active");
    document.getElementById(target).classList.add("page--active");
  });
});

// Explore videos button navigates to videos page
exploreBtn.addEventListener("click", () => {
  // Activate videos page and nav link
  navLinks.forEach(l => l.classList.remove("active"));
  pages.forEach(p => p.classList.remove("page--active"));
  document.getElementById("videos").classList.add("page--active");
  [...navLinks].find(l => l.getAttribute("data-target") === "videos").classList.add("active");
});

// Facts display
const factText = document.getElementById("fact-text");
const nextFactBtn = document.getElementById("next-fact");
const viewsCount = document.getElementById("views-count");

function showFact(index) {
  factText.textContent = facts[index];
}
showFact(currentFactIndex);

// Next fact button handler
nextFactBtn.addEventListener("click", () => {
  currentFactIndex = (currentFactIndex + 1) % facts.length;
  showFact(currentFactIndex);
});

// Video data sample (replace with your real videos)
const videoGrid = document.getElementById("video-grid");
const videos = [
  { id: "https://youtube.com/shorts/FFRF9iicdgY?feature=share", title: "Short Fact 1", type: "shorts" },
  { id: "https://youtu.be/RPRi6Xgoigw", title: "Full Video 1", type: "full" },
  { id: "https://youtube.com/shorts/MzZZqSffQ-M?feature=share", title: "Short Fact 2", type: "shorts" },
];

// Filter select
const filterSelect = document.getElementById("filter-select");

function loadVideos(filter = "all") {
  videoGrid.innerHTML = "";
  let filteredVideos = videos;
  if (filter !== "all") {
    filteredVideos = videos.filter(v => v.type === filter);
  }

  filteredVideos.forEach(video => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.title = video.title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    videoGrid.appendChild(iframe);
  });
}

filterSelect.addEventListener("change", () => {
  loadVideos(filterSelect.value);
});

// Initial load
loadVideos();

// Theme toggle
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const mailFallbackBtn = document.getElementById("mail-fallback");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending message...";
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
    .then(() => {
      formStatus.textContent = "Message sent! Thank you.";
      contactForm.reset();
    }, (error) => {
      formStatus.textContent = "Failed to send message. Please try again or use the email app button.";
      console.error(error);
    });
});

// Open default mail app fallback
mailFallbackBtn.addEventListener("click", () => {
  const subject = encodeURIComponent("Fact Sentry Query");
  const body = encodeURIComponent("Hi Fact Sentry Team,\n\n");
  window.location.href = `mailto:factsentryad@gmail.com?subject=${subject}&body=${body}`;
});

// Footer year update
document.getElementById("year").textContent = new Date().getFullYear();

// Simple typing effect (home page)
const typeText = document.getElementById("type-text");
const words = ["Facts", "Shorts", "Videos"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  let currentWord = words[wordIndex];
  if (!isDeleting) {
    typeText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typeText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? 100 : 150);
}
type();

