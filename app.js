// Page Navigation
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});

// Shorts & Full Videos
const shortsLinks = [
  "https://www.youtube.com/embed/FFRF9iicdgY",
  "https://www.youtube.com/embed/MzZZqSffQ-M",
  "https://www.youtube.com/embed/TMLG0k50o0A"
];
const fullVideosLinks = [
  "https://www.youtube.com/embed/RPRi6Xgoigw",
  "https://www.youtube.com/embed/KvigEM-Ezvg",
  "https://www.youtube.com/embed/dkmsz1MnrBc"
];

const videoContainer = document.getElementById("videoContainer");

// Render Videos
function renderVideos(type = "all") {
  videoContainer.innerHTML = "";
  if (type === "shorts" || type === "all") {
    shortsLinks.forEach(link => {
      const iframe = document.createElement("iframe");
      iframe.src = link;
      iframe.setAttribute("allowfullscreen", true);
      videoContainer.appendChild(iframe);
    });
  }
  if (type === "full" || type === "all") {
    fullVideosLinks.forEach(link => {
      const iframe = document.createElement("iframe");
      iframe.src = link;
      iframe.setAttribute("allowfullscreen", true);
      videoContainer.appendChild(iframe);
    });
  }
}

// Filter Function
function filterVideos(type) {
  renderVideos(type);
}

// Load default
renderVideos();