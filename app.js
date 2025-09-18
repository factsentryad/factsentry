/* app.js - Final advanced version
   - Replace EmailJS placeholders (USER_ID, SERVICE_ID, TEMPLATE_ID) to make contact form send emails.
   - If you skip EmailJS setup, the form will fallback to opening user's email app.
*/

// ---------- Data (videos & shorts) ----------
const SHORTS = [
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

const FULL_VIDEOS = [
  "https://youtu.be/RPRi6Xgoigw",
  "https://youtu.be/KvigEM-Ezvg",
  "https://youtu.be/dkmsz1MnrBc"
];

// ---------- Utility: convert link to embed URL ----------
function toEmbed(url){
  try{
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    let id = '';
    if(host.includes('youtu.be')) id = u.pathname.slice(1);
    else if(host.includes('youtube.com')){
      if(u.pathname.startsWith('/shorts/')) id = u.pathname.split('/shorts/')[1];
      else if(u.searchParams.has('v')) id = u.searchParams.get('v');
      else { const segs = u.pathname.split('/'); id = segs.pop() || segs.pop(); }
    } else return url;
    id = id.split('?')[0].split('&')[0];
    return https://www.youtube.com/embed/${id};
  } catch(e){ return url; }
}

// ---------- DOM helpers ----------
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ---------- Navigation ----------
$$('.nav-link').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const t = link.dataset.target;
    showPage(t);
    history.replaceState(null,'',#${t});
  });
});

function showPage(id){
  $$('.page').forEach(p=>p.classList.remove('page--active'));
  const el = $(#${id});
  if(el) el.classList.add('page--active');
  // small focus
  el && el.scrollIntoView({behavior:'smooth'});
}

// initialize page from hash or default
const initial = location.hash ? location.hash.replace('#','') : 'home';
showPage(initial);

// ---------- Typewriter (Home) ----------
(function typewriter(){
  const el = $('#type-text');
  if(!el) return;
  const text = 'Fact Sentry';
  let i=0, deleting=false;
  const TYPING = 80, DELETING=40, PAUSE=900;
  function step(){
    if(!deleting){ i++; el.textContent = text.slice(0,i); if(i===text.length) setTimeout(()=>deleting=true,PAUSE); else setTimeout(step,TYPING); }
    else { i--; el.textContent = text.slice(0,i); if(i===0){ deleting=false; setTimeout(step,300);} else setTimeout(step,DELETING); }
  }
  setTimeout(step,400);
})();

// ---------- Facts rotate (home) ----------
const FACTS = [
  "A day on Venus lasts longer than its year.",
  "Honey never spoils — edible honey found in ancient tombs.",
  "Octopuses have three hearts and blue blood.",
  "There are more trees on Earth than visible stars in the Milky Way.",
  "Bananas are berries; strawberries are not."
];
let factIndex=0;
function showFact(i){
  const el = $('#fact-text');
  if(!el) return;
  el.style.opacity=0;
  setTimeout(()=>{ el.textContent = FACTS[i]; el.style.opacity=1; },200);
}
$('#next-fact').addEventListener('click', ()=>{ factIndex = (factIndex+1)%FACTS.length; showFact(factIndex); });
showFact(0);

// ---------- Explore CTA -->
$('#explore-videos').addEventListener('click', ()=> showPage('videos'));

// ---------- Video rendering with filter ----------
const grid = $('#video-grid');
function renderGrid(filter='all'){
  grid.innerHTML = '';
  const list = [];
  if(filter==='all' || filter==='shorts') SHORTS.forEach(u => list.push({type:'short', src: toEmbed(u)}));
  if(filter==='all' || filter==='full') FULL_VIDEOS.forEach(u => list.push({type:'full', src: toEmbed(u)}));
  list.forEach(item=>{
    const wrap = document.createElement('div');
    wrap.className = 'card';
    const iframe = document.createElement('iframe');
    iframe.src = item.src;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.setAttribute('allowfullscreen','');
    wrap.appendChild(iframe);
    grid.appendChild(wrap);
  });
}
$('#filter-select').addEventListener('change', e=> renderGrid(e.target.value));
renderGrid('all'); // default

// ---------- Scroll reveal (simple) ----------
const reveal = (el) => {
  el.classList.add('fade-in');
};
$$('.card, .feature, .hero h1, .lead, .fact-card').forEach((el,i)=>{
  setTimeout(()=> reveal(el), 120*i);
});

// ---------- Theme toggle (persist) ----------
const themeBtn = $('#theme-toggle');
function setTheme(isDark){
  if(isDark){ document.body.classList.add('dark'); localStorage.setItem('fs-theme','dark'); }
  else { document.body.classList.remove('dark'); localStorage.removeItem('fs-theme'); }
  themeBtn.textContent = isDark ? '☀' : '🌙';
}
const saved = localStorage.getItem('fs-theme');
setTheme(saved === 'dark');
themeBtn.addEventListener('click', ()=> setTheme(!document.body.classList.contains('dark')));

// ---------- Year update ----------
$('#year').textContent = new Date().getFullYear();

// ---------- Contact form (EmailJS) ----------
/*
  Steps to make this work (2 minutes):
  1. Go to https://www.emailjs.com/ and sign up (free).
  2. Add an email service (Gmail/others) in EmailJS dashboard (they guide).
  3. Create an email template (variables: from_name, reply_to, message).
  4. Note down:
     - USER ID  (from EmailJS - like user_xxx)
     - SERVICE ID (e.g. service_xxx)
     - TEMPLATE ID (e.g. template_xxx)
  5. Replace the placeholders below: EMAILJS_USER, EMAILJS_SERVICE, EMAILJS_TEMPLATE.
*/

const EMAILJS_USER = 'YOUR_EMAILJS_USERID';       // <- replace
const EMAILJS_SERVICE = 'YOUR_SERVICE_ID';       // <- replace
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';     // <- replace

// initialize EmailJS if user id set
if (EMAILJS_USER && EMAILJS_USER.indexOf('YOUR_') === -1) {
  emailjs.init(EMAILJS_USER);
}

const contactForm = $('#contact-form');
const statusEl = $('#form-status');
const fallbackBtn = $('#mail-fallback');

contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  statusEl.textContent = 'Sending...';
  // if EmailJS configured -> send
  if (EMAILJS_USER && EMAILJS_USER.indexOf('YOUR_') === -1 &&
      EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_SERVICE.indexOf('YOUR_') === -1 && EMAILJS_TEMPLATE.indexOf('YOUR_') === -1) {
    emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, this)
      .then(function(){ statusEl.textContent = 'Message sent — thank you!'; contactForm.reset(); }, function(err){ statusEl.textContent = 'Send failed. Try fallback or check EmailJS settings.'; console.error(err); });
  } else {
    // fallback: open email client with mailto (pre-fill)
    const name = this.querySelector('input[name="from_name"]').value || '';
    const email = this.querySelector('input[name="reply_to"]').value || '';
    const msg = this.querySelector('textarea[name="message"]').value || '';
    const subject = encodeURIComponent(Contact from Fact Sentry: ${name});
    const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\n\n${msg});
    window.location.href = mailto:factsentryad@gmail.com?subject=${subject}&body=${body};
    statusEl.textContent = 'Opened email app (fallback).';
  }
});

// also provide direct open-email fallback button
fallbackBtn.addEventListener('click', ()=>{
  const subject = encodeURIComponent('Query for Fact Sentry');
  window.location.href = mailto:factsentryad@gmail.com?subject=${subject};
});

// ---------- small defensive checks ----------
window.addEventListener('error', (ev)=> console.error('JS error', ev.message));
