// CUSTOM CURSOR
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

(function loop() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  cur2.style.left = fx + 'px';
  cur2.style.top = fy + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, .ecard, .panel').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

// NOISE CANVAS
const canvas = document.getElementById('noise');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

function drawNoise() {
  const id = ctx.createImageData(canvas.width, canvas.height);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = d[i+1] = d[i+2] = v;
    d[i+3] = 255;
  }
  ctx.putImageData(id, 0, 0);
  setTimeout(() => requestAnimationFrame(drawNoise), 80);
}
drawNoise();

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', window.scrollY > 50);
}, { passive: true });

// SCROLL REVEAL
const revEls = document.querySelectorAll('.rev');
const ro = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children].filter(x => x.classList.contains('rev'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('vis'), idx * 90);
      ro.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revEls.forEach(el => ro.observe(el));

// SKILL BAR ANIMATION
const fills = document.querySelectorAll('.skfill');
const so = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.dataset.pct;
      setTimeout(() => { entry.target.style.width = pct; }, 250);
      so.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(f => so.observe(f));

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) current = s.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? '#eef4f3' : '';
  });
}, { passive: true });
