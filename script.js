document.getElementById("year").textContent = new Date().getFullYear();

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glitchEls = document.querySelectorAll(".glitch");
if (glitchEls.length && !reduce) {
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

const glitchTargets = document.querySelectorAll(".skills li[data-skill], .about-glitch");
if (!reduce) {
  const asciiChars = "#$%&*+-./:;<=>?@[]^_{}~";
  glitchTargets.forEach(target => {
    const label = target.dataset.skill ?? target.textContent.trim().replace(/\s+/g, " ");
    let timeout;
    const restore = () => {
      clearTimeout(timeout);
      target.textContent = label;
    };
    const scramble = () => {
      clearTimeout(timeout);
      let frame = 0;
      const step = () => {
        if (frame === 5) {
          target.textContent = label;
          return;
        }
        target.textContent = Array.from(label, char =>
          char === " " ? " " : asciiChars[Math.floor(Math.random() * asciiChars.length)]
        ).join("");
        frame++;
        timeout = setTimeout(step, 45);
      };
      step();
    };
    target.addEventListener("mouseenter", scramble);
    target.addEventListener("focus", scramble);
    target.addEventListener("mouseleave", restore);
    target.addEventListener("blur", restore);
  });
}

const phrases = ["web apps.", "tools & automation.", "things that work."];
const el = document.getElementById("typed");

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
