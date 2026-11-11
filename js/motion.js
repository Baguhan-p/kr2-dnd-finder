(function () {
  const KEY = "dndMotion";
  let on = true;
  try { on = localStorage.getItem(KEY) !== "off"; } catch (e) {}
  document.documentElement.dataset.motion = on ? "on" : "off";

  function syncButton() {
    const btn = document.getElementById("anim-toggle");
    if (!btn) return;
    btn.textContent = on ? "✨" : "💤";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Выключить анимации" : "Включить анимации");
    btn.title = on ? "Анимации включены — нажмите, чтобы выключить" : "Анимации выключены — нажмите, чтобы включить";
    btn.classList.toggle("is-off", !on);
  }

  const api = {
    isOn() { return on; },
    set(next) {
      on = !!next;
      try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) {}
      document.documentElement.dataset.motion = on ? "on" : "off";
      syncButton();
      document.dispatchEvent(new CustomEvent("motionchange", { detail: { on: on } }));
    },
    toggle() { api.set(!on); }
  };
  window.MotionFX = api;

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element) || !t.closest("#anim-toggle")) return;
    api.toggle();
    if (typeof showToast === "function") {
      showToast(on ? "Анимации включены" : "Анимации выключены", on ? "success" : "secondary");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    syncButton();
    if (document.getElementById("anim-toggle")) return;
    const mo = new MutationObserver(() => {
      if (document.getElementById("anim-toggle")) { syncButton(); mo.disconnect(); }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();