document.getElementById("year").textContent = new Date().getFullYear();

const glitchEls = document.querySelectorAll(".glitch");
if (glitchEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const chars = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  const word = "COMING_SOON";
  const rand = () => chars[Math.floor(Math.random() * chars.length)];
  glitchEls.forEach(g => {
    const len = +g.dataset.len;
    let flashUntil = 0;
    (function step() {
      const now = performance.now();
      if (now > flashUntil && Math.random() < 0.03) flashUntil = now + 300 + Math.random() * 300;
      if (now < flashUntil) {
        g.textContent = word.padEnd(len, " ").slice(0, Math.max(len, word.length));
      } else {
        g.textContent = Array.from({ length: len }, rand).join("");
      }
      setTimeout(step, 50 + Math.random() * 50);
    })();
  });
}

const phrases = ["web apps.", "tools & automation.", "things that work."];
const el = document.getElementById("typed");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce) {
  el.textContent = phrases[0];
} else {
  let p = 0, i = 0, deleting = false;
  (function tick() {
    const word = phrases[p];
    el.textContent = word.slice(0, i);
    if (!deleting && i === word.length) { deleting = true; return setTimeout(tick, 1500); }
    if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 80);
  })();
}
