document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const results = document.getElementById("searchResults");
  const counter = document.getElementById("searchCounter");
  if (!form) return;

  const params = new URLSearchParams(location.search);
  if (params.get("q")) document.getElementById("qInput").value = params.get("q");

  function runSearch() {
    const q = (document.getElementById("qInput").value || "").toLowerCase().trim();
    const type = document.getElementById("typeSelect").value;
    const system = document.getElementById("sysSelect").value;
    const format = document.getElementById("fmtSelect").value;
    const city = (document.getElementById("cityInput").value || "").toLowerCase().trim();

    const pool = [];
    if (type === "" || type === "master") masters.forEach(m => pool.push({ kind: "master", obj: m, text: m.name + " " + m.bio + " " + m.systems.join(" ") + " " + m.city }));
    if (type === "" || type === "player") players.forEach(p => pool.push({ kind: "player", obj: p, text: p.name + " " + p.bio + " " + p.systems.join(" ") + " " + p.city }));
    if (type === "" || type === "master-request") masterRequests.forEach(r => pool.push({ kind: "mr", obj: r, text: r.campaign + " " + r.system + " " + r.place + " " + r.time }));
    if (type === "" || type === "player-request") playerRequests.forEach(r => pool.push({ kind: "pr", obj: r, text: r.system + " " + r.city + " " + r.time + " " + r.description }));

    const filtered = pool.filter(item => {
      if (q && !item.text.toLowerCase().includes(q)) return false;
      if (system) {
        const s = item.kind === "master" || item.kind === "player" ? item.obj.systems.includes(system) : item.obj.system === system;
        if (!s) return false;
      }
      if (format) {
        const f = (item.kind === "master" || item.kind === "player") ? item.obj.format === format : item.obj.format === format;
        if (!f) return false;
      }
      if (city) {
        const c = (item.kind === "master" || item.kind === "player" || item.kind === "pr") ? item.obj.city.toLowerCase().includes(city) : false;
        if (!c) return false;
      }
      return true;
    });

    const cards = filtered.map(item => {
      if (item.kind === "master") return cardMaster(item.obj);
      if (item.kind === "player") return cardPlayer(item.obj);
      if (item.kind === "mr") return cardMasterRequest(item.obj);
      return cardPlayerRequest(item.obj);
    }).join("");

    results.innerHTML = cards || '<div class="col-12"><div class="alert alert-warning" role="alert">По запросу ничего не найдено.</div></div>';
    counter.textContent = "Результатов: " + filtered.length;
  }

  form.addEventListener("submit", e => { e.preventDefault(); runSearch(); });
  runSearch();
});