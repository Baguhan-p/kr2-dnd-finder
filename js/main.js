document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      const m = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
      if (m) m.hide();
      contactForm.reset();
      showToast("Сообщение отправлено! Мы свяжемся с адресатом.", "success");
    });
  }
});

const REVEAL_SELECTOR = ".card, .adv-tile, .review-card, .faq-item, .accordion-item, .request-banner, main h1, main h2:not(.card-title):not(.accordion-header)";

const revealObserver = ("IntersectionObserver" in window)
  ? new IntersectionObserver((entries) => {
      let batch = 0;
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.style.transitionDelay = (batch++ % 6) * 70 + "ms";
          el.classList.add("is-visible");
        } else {
          el.style.transitionDelay = "0ms";
          el.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" })
  : null;

function registerReveal(root) {
  if (!revealObserver || !root.querySelectorAll) return;
  const els = [];
  if (root.matches && root.matches(REVEAL_SELECTOR)) els.push(root);
  els.push(...root.querySelectorAll(REVEAL_SELECTOR));
  els.forEach((el) => {
    if (el.closest(".modal, .toast")) return;
    if (el.dataset.revealBound) return;
    el.dataset.revealBound = "1";
    el.classList.add(el.matches("h1, h2") ? "reveal-title" : "reveal");
    revealObserver.observe(el);
  });
}

function unregisterReveal(root) {
  if (!revealObserver || !root.querySelectorAll) return;
  const els = [];
  if (root.matches && root.matches(REVEAL_SELECTOR)) els.push(root);
  els.push(...root.querySelectorAll(REVEAL_SELECTOR));
  els.forEach((el) => revealObserver.unobserve(el));
}

document.addEventListener("DOMContentLoaded", () => {
  registerReveal(document.body);
  const mo = new MutationObserver((muts) => {
    muts.forEach((m) => {
      m.addedNodes.forEach((n) => { if (n.nodeType === 1) registerReveal(n); });
      m.removedNodes.forEach((n) => { if (n.nodeType === 1) unregisterReveal(n); });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
});

function updateFavUI() {
  if (typeof getFavorites !== "function") return;
  const count = document.getElementById("fav-count");
  const list = getFavorites();
  if (count) {
    count.textContent = list.length;
    count.style.display = list.length ? "" : "none";
  }
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    const on = isFavorite(btn.dataset.fav);
    btn.classList.toggle("active", on);
    btn.textContent = on ? "♥" : "♡";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".fav-btn");
  if (!btn || typeof toggleFavorite !== "function") return;
  const added = toggleFavorite(btn.dataset.fav);
  updateFavUI();
  showToast(added ? "Добавлено в избранное" : "Убрано из избранного", added ? "success" : "secondary");
  if (typeof renderFavorites === "function") renderFavorites();
});

document.addEventListener("DOMContentLoaded", updateFavUI);

let diceState = { die: 20, history: [] };

function rollDice() {
  const die = diceState.die;
  const count = Math.min(10, Math.max(1, parseInt(document.getElementById("dice-count").value, 10) || 1));
  const mod = parseInt(document.getElementById("dice-mod").value, 10) || 0;
  const resEl = document.getElementById("dice-result");
  const detEl = document.getElementById("dice-detail");
  const btn = document.getElementById("dice-roll-btn");
  btn.disabled = true;
  resEl.classList.remove("crit", "fail");
  resEl.classList.add("rolling");
  let ticks = 0;
  const timer = setInterval(() => {
    resEl.textContent = 1 + Math.floor(Math.random() * die);
    if (++ticks >= 12) {
      clearInterval(timer);
      const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * die));
      const sum = rolls.reduce((a, b) => a + b, 0) + mod;
      resEl.classList.remove("rolling");
      resEl.textContent = sum;
      if (die === 20 && count === 1 && rolls[0] === 20) {
        resEl.classList.add("crit");
        detEl.textContent = "НАТ 20! Критический успех!";
      } else if (die === 20 && count === 1 && rolls[0] === 1) {
        resEl.classList.add("fail");
        detEl.textContent = "Нат 1… Критический провал.";
      } else {
        detEl.textContent = count + "d" + die + (mod ? (mod > 0 ? " + " + mod : " − " + Math.abs(mod)) : "") + " → [" + rolls.join(", ") + "]";
      }
      diceState.history.unshift({ text: count + "d" + die + (mod >= 0 ? "+" + mod : mod) + " = " + sum, rolls: rolls.join(", ") });
      diceState.history = diceState.history.slice(0, 8);
      document.getElementById("dice-history").innerHTML = diceState.history.map((h) =>
        '<li class="list-group-item d-flex justify-content-between"><span>' + h.text + '</span><span class="text-muted">[' + h.rolls + ']</span></li>'
      ).join("");
      btn.disabled = false;
    }
  }, 50);
}

function initDice() {
  const modal = document.getElementById("diceModal");
  if (!modal) return;
  modal.querySelectorAll(".dice-pick").forEach((b) => b.addEventListener("click", () => {
    modal.querySelectorAll(".dice-pick").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    diceState.die = parseInt(b.dataset.die, 10);
  }));
  document.getElementById("dice-roll-btn").addEventListener("click", rollDice);
}

document.addEventListener("DOMContentLoaded", initDice);

function syncRequestFields() {
  const type = document.getElementById("rq-type").value;
  const m = document.getElementById("rq-master-fields");
  const p = document.getElementById("rq-player-fields");
  m.classList.toggle("d-none", type !== "master");
  p.classList.toggle("d-none", type !== "player");
  m.querySelectorAll("input, textarea").forEach((el) => el.disabled = type !== "master");
  p.querySelectorAll("input, textarea").forEach((el) => el.disabled = type !== "player");
}

function initRequestModal() {
  const form = document.getElementById("requestForm");
  if (!form) return;
  const typeSel = document.getElementById("rq-type");
  typeSel.addEventListener("change", syncRequestFields);
  document.querySelectorAll("[data-open-request]").forEach((btn) => btn.addEventListener("click", () => {
    typeSel.value = btn.dataset.openRequest;
    syncRequestFields();
    const prof = typeof getMyProfile === "function" ? getMyProfile() : null;
    if (prof && prof.name) document.getElementById("rq-name").value = prof.name;
  }));
  syncRequestFields();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;
    const type = typeSel.value;
    const base = {
      id: Date.now(),
      authorName: document.getElementById("rq-name").value.trim(),
      system: document.getElementById("rq-system").value,
      format: document.getElementById("rq-format").value,
      time: document.getElementById("rq-time").value.trim(),
      comments: [],
      mine: true
    };
    if (type === "master") {
      const slots = parseInt(document.getElementById("rq-slots").value, 10);
      const req = Object.assign(base, {
        campaign: document.getElementById("rq-campaign").value.trim(),
        masterId: null,
        place: document.getElementById("rq-place").value.trim(),
        slotsTotal: slots,
        slotsFree: slots,
        requirements: document.getElementById("rq-req").value.trim() || "Без особых требований.",
        participants: []
      });
      masterRequests.unshift(req);
      localStorage.setItem("customMasterRequests", JSON.stringify([req].concat(JSON.parse(localStorage.getItem("customMasterRequests") || "[]"))));
    } else {
      const req = Object.assign(base, {
        playerId: null,
        city: document.getElementById("rq-city").value.trim(),
        description: document.getElementById("rq-desc").value.trim()
      });
      playerRequests.unshift(req);
      localStorage.setItem("customPlayerRequests", JSON.stringify([req].concat(JSON.parse(localStorage.getItem("customPlayerRequests") || "[]"))));
    }
    bootstrap.Modal.getInstance(document.getElementById("requestModal")).hide();
    form.reset();
    form.classList.remove("was-validated");
    syncRequestFields();
    showToast("Заявка опубликована!", "success");
    if (typeof applyCatalogType === "function") applyCatalogType(type === "master" ? "master-requests" : "player-requests");
  });
}

document.addEventListener("DOMContentLoaded", initRequestModal);

document.addEventListener("motionchange", (e) => {
  if (!e.detail.on || !revealObserver) return;
  const els = document.querySelectorAll(".reveal, .reveal-title");
  els.forEach((el) => el.classList.remove("is-visible"));
  requestAnimationFrame(() => {
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible");
    });
  });
});