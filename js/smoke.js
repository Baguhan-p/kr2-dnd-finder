document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;
  const isHome = document.body.dataset.page === "home" || path.endsWith("/") || path.endsWith("index.html") || path === "";
  if (!isHome) return;

  const canvas = document.createElement("canvas");
  canvas.id = "smoke-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
    h = canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize);

  function makeSprite(stops, size) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g2 = c.getContext("2d");
    const grad = g2.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(s => grad.addColorStop(s[0], s[1]));
    g2.fillStyle = grad;
    g2.fillRect(0, 0, size, size);
    return c;
  }

  const puffSprite = makeSprite([
    [0, "rgba(196,168,224,0.55)"],
    [0.35, "rgba(140,110,180,0.26)"],
    [0.7, "rgba(90,70,130,0.10)"],
    [1, "rgba(60,40,100,0)"]
  ], 256);
  const puffGold = makeSprite([
    [0, "rgba(224,184,76,0.40)"],
    [0.4, "rgba(180,140,60,0.16)"],
    [1, "rgba(120,90,40,0)"]
  ], 256);
  const emberSprite = makeSprite([
    [0, "rgba(255,224,150,1)"],
    [0.3, "rgba(240,180,80,0.6)"],
    [1, "rgba(200,140,40,0)"]
  ], 64);

  const puffs = [];
  const embers = [];

  function resetPuff(p, initial) {
    p.x = Math.random() * w;
    p.y = initial ? Math.random() * h : h + (80 + Math.random() * 120) * dpr;
    p.r = (80 + Math.random() * 170) * dpr;
    p.vy = (0.35 + Math.random() * 0.65) * dpr;
    p.sway = Math.random() * Math.PI * 2;
    p.swaySpeed = 0.0004 + Math.random() * 0.0007;
    p.swayAmp = (24 + Math.random() * 70) * dpr;
    p.maxAlpha = 0.10 + Math.random() * 0.12;
    p.grow = 0.00002 + Math.random() * 0.00003;
    p.rot = Math.random() * Math.PI * 2;
    p.vr = (Math.random() - 0.5) * 0.0004;
    p.gold = Math.random() < 0.22;
    return p;
  }
  function resetEmber(e, initial) {
    e.x = Math.random() * w;
    e.y = initial ? Math.random() * h : h + 20 * dpr;
    e.r = (1.2 + Math.random() * 2.6) * dpr;
    e.vy = (0.9 + Math.random() * 1.6) * dpr;
    e.sway = Math.random() * Math.PI * 2;
    e.swaySpeed = 0.001 + Math.random() * 0.002;
    e.swayAmp = (10 + Math.random() * 30) * dpr;
    e.tw = Math.random() * Math.PI * 2;
    e.twSpeed = 0.002 + Math.random() * 0.004;
    return e;
  }
  for (let i = 0; i < 40; i++) puffs.push(resetPuff({}, true));
  for (let i = 0; i < 26; i++) embers.push(resetEmber({}, true));

  let raf = 0;
  let last = performance.now();
 let running = window.MotionFX ? MotionFX.isOn() : true;

  function frame(now) {
    if (!running) return;
    const dt = Math.min(48, now - last);
    last = now;
    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = "screen";
    for (const p of puffs) {
      p.y -= p.vy * dt * 0.06;
      p.sway += p.swaySpeed * dt;
      p.rot += p.vr * dt;
      if (p.r < 320 * dpr) p.r += p.r * p.grow * dt;
      const t = 1 - p.y / h;
      const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      ctx.globalAlpha = p.maxAlpha * fade;
      const x = p.x + Math.sin(p.sway) * p.swayAmp;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.drawImage(p.gold ? puffGold : puffSprite, -p.r, -p.r, p.r * 2, p.r * 2);
      ctx.restore();
      if (p.y < -p.r * 1.2) resetPuff(p, false);
    }

    ctx.globalCompositeOperation = "lighter";
    for (const e of embers) {
      e.y -= e.vy * dt * 0.06;
      e.sway += e.swaySpeed * dt;
      e.tw += e.twSpeed * dt;
      const t = 1 - e.y / h;
      const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      ctx.globalAlpha = (0.25 + 0.55 * Math.abs(Math.sin(e.tw))) * fade;
      const x = e.x + Math.sin(e.sway) * e.swayAmp;
      const s = e.r * 6;
      ctx.drawImage(emberSprite, x - s / 2, e.y - s / 2, s, s);
      if (e.y < -20 * dpr) resetEmber(e, false);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }

  if (running) raf = requestAnimationFrame(frame);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else if (!window.MotionFX || MotionFX.isOn()) play();
  });

  document.addEventListener("motionchange", (e) => {
    if (e.detail.on) { if (!document.hidden) play(); }
    else pause();
  });
});