document.getElementById("year").textContent = new Date().getFullYear();

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
