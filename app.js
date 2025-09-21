/* app.js - Final cleaned & lint-friendly
   Works with the matching index.html already provided.
   - Replace EMAILJS_* values to enable real contact send.
*/

/* =========================
   Data: Shorts and videos (from user)
   ========================= */
const SHORTS_URLS = [
  "https://youtube.com/shorts/FFRF9iicdgY?feature=share",
  "https://youtube.com/shorts/MzZZqSffQ-M?feature=share",
  "https://youtube.com/shorts/TMLG0k50o0A?feature=share",
  "https://youtube.com/shorts/8-AZm3t5E7A?feature=share",
  "https://youtube.com/shorts/BWNhEFNxo8Q?feature=share",
  "https://youtube.com/shorts/UU2lAq6UPKM?feature=share",
  "https://youtube.com/shorts/JCnyN5hZ_6c?feature=share",
  "https://youtube.com/shorts/rJBZMvwWRKo?feature=share",
  "https://youtube.com/shorts/TLL3HTNRmYc?feature=share",
  "https://youtube.com/shorts/_IYvYj1g86s?feature=share",
  "https://youtube.com/shorts/XsHWWf-DsdA?feature=share",
  "https://youtube.com/shorts/0657sz5l-9s?feature=share",
  "https://youtube.com/shorts/pwgGSqzOL5o?feature=share",
  "https://youtube.com/shorts/srB2y0asZMg?feature=share",
  "https://youtube.com/shorts/Az5_dq--Hos?feature=share",
  "https://youtube.com/shorts/-AZ3vVMnpz0?feature=share",
  "https://youtube.com/shorts/yBYuzG1993U?feature=share",
  "https://youtube.com/shorts/XE33ULpFfKs?feature=share",
  "https://youtube.com/shorts/XI473T_Pqzs?feature=share",
  "https://youtube.com/shorts/n8h_Cf7LN4o?feature=share",
  "https://youtube.com/shorts/ZcZe_7vaSqw?feature=share",
  "https://youtube.com/shorts/JAmMIzRywB4?feature=share",
  "https://youtube.com/shorts/TDo9xmcBaUg?feature=share",
  "https://youtube.com/shorts/YaCgxAeOaQA?feature=share",
  "https://youtube.com/shorts/h-RTgobeqX0?feature=share",
  "https://youtube.com/shorts/klAtWtG86Ow?feature=share",
  "https://youtube.com/shorts/6cryBxI_obE?feature=share",
  "https://youtube.com/shorts/8KaVhV6kfYA?feature=share",
  "https://youtube.com/shorts/4VbmKPeLLKI?feature=share",
  "https://youtube.com/shorts/ah7rV-ACy6M?feature=share",
  "https://youtube.com/shorts/dNXzu8J6X64?feature=share",
  "https://youtube.com/shorts/CbGM8w77D48?feature=share",
  "https://youtube.com/shorts/Eq84jZnAhNg?feature=share",
  "https://youtube.com/shorts/53Dxztyn_vU?feature=share",
  "https://youtube.com/shorts/lTm3-h7YR94?feature=share",
  "https://youtube.com/shorts/AlVR81Q2Z0s?feature=share",
  "https://youtube.com/shorts/d_OA53plfqA?feature=share",
  "https://youtube.com/shorts/rLUt-STYtW0?feature=share",
  "https://youtube.com/shorts/fncAKN_Ep-E?feature=share"
];

const VIDEOS_URLS = [
  "https://youtu.be/RPRi6Xgoigw",
  "https://youtu.be/KvigEM-Ezvg",
  "https://youtu.be/dkmsz1MnrBc"
];

/* EmailJS placeholders: replace to enable direct sending */
const EMAILJS_USER = "YOUR_EMAILJS_USERID";
const EMAILJS_SERVICE = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE = "YOUR_TEMPLATE_ID";

/* =========================
   Helpers
   ========================= */
function $(selector) {
  return document.querySelector(selector);
}
function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}
function safeParseUrl(raw) {
  if (!raw) return null;
  try {
    return raw.startsWith("http") ? new URL(raw) : new URL("https://" + raw);
  } catch (err) {
    return null;
  }
}
function extractYouTubeId(raw) {
  const u = safeParseUrl(raw);
  if (!u) return "";
  const host = u.hostname.toLowerCase();
  try {
    if (host.includes("youtu.be")) {
      return u.pathname.slice(1).split("?")[0];
    }
    if (host.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/shorts/")[1].split("?")[0];
      }
      if (u.searchParams.get("v")) {
        return u.searchParams.get("v").split("&")[0];
      }
      const segs = u.pathname.split("/").filter(Boolean);
      if (segs.length) return segs[segs.length - 1].split("?")[0];
    }
  } catch (e) {
    return "";
  }
  return "";
}
function toEmbedUrl(raw) {
  const id = extractYouTubeId(raw);
  return id ? "https://www.youtube.com/embed/" + id : "";
}
function thumbnailUrl(raw) {
  const id = extractYouTubeId(raw);
  return id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : "";
}
function debounce(fn, t) {
  let to = null;
  return function debounced() {
    const args = arguments;
    clearTimeout(to);
    to = setTimeout(function () {
      fn.apply(null, args);
    }, t);
  };
}

/* =========================
   App initialization
   ========================= */
(function initApp() {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      // --- Page navigation (SPA style) ---
      const pages = $all(".page");
      const navButtons = $all(".nav-btn");
      const dataTargetButtons = $all("[data-target]");

      function showSection(id) {
        pages.forEach(function (p) {
          p.classList.remove("page--active");
        });
        const el = document.getElementById(id);
        if (el) {
          el.classList.add("page--active");
        }
        try {
          history.replaceState(null, "", "#" + id);
        } catch (e) {
          // ignore
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      navButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var t = btn.dataset.target;
          if (t) showSection(t);
        });
      });

      dataTargetButtons.forEach(function (b) {
        b.addEventListener("click", function () {
          var t = b.dataset.target;
          if (t) showSection(t);
        });
      });

      // deep link handling
      var startHash = location.hash ? location.hash.replace("#", "") : "";
      if (startHash) {
        setTimeout(function () {
          showSection(startHash);
        }, 50);
      } else {
        showSection("home");
      }

      // --- Theme toggle & persistence ---
      var themeToggle = $("#theme-toggle");
      var savedTheme = localStorage.getItem("fs_theme");
      if (savedTheme === "light") document.body.classList.add("light");
      function updateThemeBtn() {
        if (!themeToggle) return;
        themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀";
      }
      updateThemeBtn();
      if (themeToggle) {
        themeToggle.addEventListener("click", function () {
          document.body.classList.toggle("light");
          localStorage.setItem("fs_theme", document.body.classList.contains("light") ? "light" : "dark");
          updateThemeBtn();
        });
      }

      // --- Facts rotator with slide --- 
      var FACTS = [
        "Honey never spoils — archaeologists found edible honey in ancient tombs.",
        "Octopuses have three hearts and blue blood.",
        "Bananas are botanically berries; strawberries are not.",
        "A day on Venus is longer than its year.",
        "The Eiffel Tower can be about 15 cm taller on hot days.",
        "Sharks existed before trees appeared on Earth."
      ];
      var factIndex = 0;
      var factEl = $("#fact-current");
      if (factEl) factEl.textContent = FACTS[0];

      var nextFactBtn = $("#next-fact");
      var prevFactBtn = $("#prev-fact");

      function animateFact(text, dir) {
        if (!factEl) return;
        factEl.style.transition = "transform 300ms ease, opacity 220ms ease";
        factEl.style.transform = "translateX(" + 10 * dir + "px)";
        factEl.style.opacity = "0";
        setTimeout(function () {
          factEl.textContent = text;
          factEl.style.transform = "translateX(" + -10 * dir + "px)";
          factEl.style.opacity = "1";
          setTimeout(function () {
            factEl.style.transform = "translateX(0)";
          }, 260);
        }, 260);
      }

      if (nextFactBtn) {
        nextFactBtn.addEventListener("click", function () {
          factIndex = (factIndex + 1) % FACTS.length;
          animateFact(FACTS[factIndex], 1);
        });
      }
      if (prevFactBtn) {
        prevFactBtn.addEventListener("click", function () {
          factIndex = (factIndex - 1 + FACTS.length) % FACTS.length;
          animateFact(FACTS[factIndex], -1);
        });
      }

      // --- Video grid: thumbnails -> lazy iframe ---
      var videoGrid = $("#video-grid");
      var filterSelect = $("#video-filter");
      var searchInput = $("#video-search");

      var ALL_VIDEOS = [];
      SHORTS_URLS.forEach(function (u) {
        ALL_VIDEOS.push({ type: "shorts", url: u });
      });
      VIDEOS_URLS.forEach(function (u) {
        ALL_VIDEOS.push({ type: "videos", url: u });
      });

      function createCard(item) {
        var vidId = extractYouTubeId(item.url) || "";
        var thumb = thumbnailUrl(item.url);
        var card = document.createElement("div");
        card.className = "video-card";
        card.dataset.type = item.type;
        card.dataset.id = vidId;

        if (thumb) {
          var img = document.createElement("img");
          img.className = "video-thumb";
          img.alt = "video thumbnail";
          img.loading = "lazy";
          img.src = thumb;

          var overlay = document.createElement("div");
          overlay.className = "play-overlay";
          var playBtn = document.createElement("button");
          playBtn.className = "play-btn";
          playBtn.type = "button";
          playBtn.textContent = "▶ Play";

          overlay.appendChild(playBtn);
          card.appendChild(img);
          card.appendChild(overlay);

          playBtn.addEventListener("click", function () {
            loadIframe(card, item.url);
          });
          img.addEventListener("click", function () {
            loadIframe(card, item.url);
          });
        } else {
          var embed = toEmbedUrl(item.url);
          if (embed) {
            var iframeFallback = document.createElement("iframe");
            iframeFallback.src = embed;
            iframeFallback.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
            iframeFallback.setAttribute("allowfullscreen", "");
            iframeFallback.style.width = "100%";
            iframeFallback.style.height = "100%";
            card.appendChild(iframeFallback);
          } else {
            var txt = document.createElement("div");
            txt.className = "muted";
            txt.textContent = "Invalid video URL";
            card.appendChild(txt);
          }
        }
        return card;
      }

      function loadIframe(card, url) {
        if (!card) return;
        var embed = toEmbedUrl(url);
        if (!embed) {
          try { window.open(url, "_blank", "noopener"); } catch (e) { location.href = url; }
          return;
        }
        var iframe = document.createElement("iframe");
        iframe.src = embed + "?autoplay=1";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        card.innerHTML = "";
        card.appendChild(iframe);
      }

      function buildGrid(list) {
        if (!videoGrid) return;
        videoGrid.innerHTML = "";
        if (!Array.isArray(list) || list.length === 0) {
          var empty = document.createElement("div");
          empty.className = "muted";
          empty.textContent = "No videos found.";
          videoGrid.appendChild(empty);
          return;
        }
        var frag = document.createDocumentFragment();
        list.forEach(function (item) {
          frag.appendChild(createCard(item));
        });
        videoGrid.appendChild(frag);
      }

      function applyFilterSearch() {
        var f = filterSelect ? filterSelect.value : "all";
        var q = searchInput ? (searchInput.value || "").trim().toLowerCase() : "";
        var filtered = ALL_VIDEOS.filter(function (v) {
          if (f === "shorts" && v.type !== "shorts") return false;
          if (f === "videos" && v.type !== "videos") return false;
          if (q) {
            var id = extractYouTubeId(v.url) || "";
            return v.url.toLowerCase().includes(q) || id.toLowerCase().includes(q);
          }
          return true;
        });
        buildGrid(filtered);
      }

      if (filterSelect) filterSelect.addEventListener("change", applyFilterSearch);
      if (searchInput) searchInput.addEventListener("input", debounce(applyFilterSearch, 220));

      buildGrid(ALL_VIDEOS);

      // Expose small API
      window.FactSentry = {
        addShort: function (url) {
          if (!url) return;
          ALL_VIDEOS.unshift({ type: "shorts", url: url });
          buildGrid(ALL_VIDEOS);
        },
        addVideo: function (url) {
          if (!url) return;
          ALL_VIDEOS.push({ type: "videos", url: url });
          buildGrid(ALL_VIDEOS);
        },
        rebuild: function () { buildGrid(ALL_VIDEOS); },
        list: function () { return ALL_VIDEOS.slice(); }
      };

      // --- Contact form (EmailJS guarded) ---
      var contactForm = $("#contact-form");
      var statusEl = $("#form-status");
      var mailFallback = $("#mail-fallback");

      if (contactForm) {
        var canInitEmailJS = typeof EMAILJS_USER !== "undefined" && EMAILJS_USER && !EMAILJS_USER.includes("YOUR_") && typeof emailjs !== "undefined";
        if (canInitEmailJS) {
          try { emailjs.init(EMAILJS_USER); } catch (e) { /* ignore */ }
        }

        contactForm.addEventListener("submit", function (evt) {
          evt.preventDefault();
          if (statusEl) statusEl.textContent = "Sending...";
          var useEmailJS =
            typeof EMAILJS_USER !== "undefined" && EMAILJS_USER && !EMAILJS_USER.includes("YOUR_") &&
            typeof EMAILJS_SERVICE !== "undefined" && EMAILJS_SERVICE && !EMAILJS_SERVICE.includes("YOUR_") &&
            typeof EMAILJS_TEMPLATE !== "undefined" && EMAILJS_TEMPLATE && !EMAILJS_TEMPLATE.includes("YOUR_") &&
            typeof emailjs !== "undefined" && typeof emailjs.sendForm === "function";

          if (useEmailJS) {
            emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, this)
              .then(function () {
                if (statusEl) statusEl.textContent = "Message sent — thank you!";
                contactForm.reset();
              })
              .catch(function (err) {
                if (statusEl) statusEl.textContent = "Send failed — check EmailJS settings.";
                console.error("EmailJS error:", err);
              });
          } else {
            var name = (this.querySelector('[name="from_name"]') || {}).value || "";
            var mail = (this.querySelector('[name="reply_to"]') || {}).value || "";
            var msg = (this.querySelector('[name="message"]') || {}).value || "";
            var subject = encodeURIComponent("Contact from Fact Sentry: " + name);
            var body = encodeURIComponent("Name: " + name + "\nEmail: " + mail + "\n\n" + msg);
            window.location.href = "mailto:factsentryad@gmail.com?subject=" + subject + "&body=" + body;
            if (statusEl) statusEl.textContent = "Opened email app (fallback).";
          }
        });
      }

      if (mailFallback) {
        mailFallback.addEventListener("click", function () {
          window.location.href = "mailto:factsentryad@gmail.com";
        });
      }

      // Year
      var yearEl = $("#year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // Keyboard shortcuts (1..4)
      window.addEventListener("keydown", function (ev) {
        if (document.activeElement && /input|textarea/i.test(document.activeElement.tagName)) return;
        if (ev.key === "1") showSection("home");
        if (ev.key === "2") showSection("videos");
        if (ev.key === "3") showSection("about");
        if (ev.key === "4") showSection("contact");
      });

    } catch (err) {
      // Defensive: any unexpected error will be logged but won't crash the app
      console.error("App initialization error:", err);
    }
  });
})();
