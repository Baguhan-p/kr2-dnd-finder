function cardMaster(m) {
  return '<div class="col-12 col-md-6 col-lg-4">' +
    '<div class="card h-100 shadow-sm card-master">' +
      '<div class="card-body d-flex flex-column">' +
        '<div class="d-flex align-items-center gap-3 mb-3">' +
          '<div class="avatar-circle" style="background:' + colorFromName(m.name) + '">' + getInitials(m.name) + '</div>' +
          '<div><h2 class="card-title h5 mb-0">' + m.name + '</h2>' +
          '<span class="badge bg-primary">Мастер</span></div>' +
        '</div>' +
        '<p class="card-text text-muted small flex-grow-1">' + m.bio + '</p>' +
        '<ul class="list-inline small mb-2">' +
          '<li class="list-inline-item">📅 Опыт: ' + m.experience + ' лет</li>' +
          '<li class="list-inline-item">🎲 ' + m.systems.join(", ") + '</li>' +
        '</ul>' +
        '<p class="mb-1 small">📍 ' + m.city + ' · ' + m.format + '</p>' +
        '<p class="mb-3">' + starsHtml(m.rating) + '</p>' +
        '<a class="btn btn-primary mt-auto" href="profile.html?type=master&id=' + m.id + '">Профиль</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function cardPlayer(p) {
  return '<div class="col-12 col-md-6 col-lg-4">' +
    '<div class="card h-100 shadow-sm card-player">' +
      '<div class="card-body d-flex flex-column">' +
        '<div class="d-flex align-items-center gap-3 mb-3">' +
          '<div class="avatar-circle" style="background:' + colorFromName(p.name) + '">' + getInitials(p.name) + '</div>' +
          '<div><h2 class="card-title h5 mb-0">' + p.name + '</h2>' +
          '<span class="badge bg-info text-dark">Игрок</span></div>' +
        '</div>' +
        '<p class="card-text text-muted small flex-grow-1">' + p.bio + '</p>' +
        '<ul class="list-inline small mb-2">' +
          '<li class="list-inline-item">📅 Опыт: ' + p.experience + ' лет</li>' +
          '<li class="list-inline-item">🎲 ' + p.systems.join(", ") + '</li>' +
        '</ul>' +
        '<p class="mb-3 small">📍 ' + p.city + ' · ' + p.format + '</p>' +
        '<a class="btn btn-outline-primary mt-auto" href="profile.html?type=player&id=' + p.id + '">Профиль</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function cardMasterRequest(r) {
  const m = masters.find(x => x.id === r.masterId) || { name: "—" };
  const full = r.slotsFree === 0;
  return '<div class="col-12 col-md-6 col-lg-4">' +
    '<div class="card h-100 shadow-sm">' +
      '<div class="card-body d-flex flex-column">' +
        '<div class="d-flex justify-content-between align-items-start mb-2">' +
          '<h2 class="card-title h5">' + r.campaign + '</h2>' +
          '<span class="badge ' + (full ? "bg-danger" : "bg-success") + '">' + (full ? "Мест нет" : "Свободно: " + r.slotsFree) + '</span>' +
        '</div>' +
        '<p class="card-text text-muted small mb-2">🎯 Мастер: <a href="profile.html?type=master&id=' + r.masterId + '">' + m.name + '</a></p>' +
        '<ul class="list-unstyled small mb-3 flex-grow-1">' +
          '<li>🎲 ' + r.system + '</li><li>🖥️ ' + r.format + '</li>' +
          '<li>📍 ' + r.place + '</li><li>🕒 ' + r.time + '</li>' +
        '</ul>' +
        '<a class="btn btn-primary mt-auto" href="request.html?type=master&id=' + r.id + '">Открыть заявку</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function cardPlayerRequest(r) {
  const p = players.find(x => x.id === r.playerId) || { name: "—" };
  return '<div class="col-12 col-md-6 col-lg-4">' +
    '<div class="card h-100 shadow-sm">' +
      '<div class="card-body d-flex flex-column">' +
        '<h2 class="card-title h5 mb-2">Ищу мастера</h2>' +
        '<p class="card-text text-muted small mb-2">🎮 Игрок: <a href="profile.html?type=player&id=' + r.playerId + '">' + p.name + '</a></p>' +
        '<ul class="list-unstyled small mb-3 flex-grow-1">' +
          '<li>🎲 ' + r.system + '</li><li>🖥️ ' + r.format + '</li>' +
          '<li>📍 ' + r.city + '</li><li>🕒 ' + r.time + '</li>' +
        '</ul>' +
        '<p class="small text-muted">' + r.description + '</p>' +
        '<a class="btn btn-outline-primary mt-auto" href="request.html?type=player&id=' + r.id + '">Открыть заявку</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

const CATALOG_CONFIG = {
  masters: { data: () => masters, card: cardMaster, sortOpts: [["rating","По рейтингу"],["experience","По опыту"],["name","По имени"]] },
  players: { data: () => players, card: cardPlayer, sortOpts: [["rating","По рейтингу"],["experience","По опыту"],["name","По имени"]] },
  "master-requests": { data: () => masterRequests, card: cardMasterRequest, sortOpts: [["slotsFree","По свободным местам"],["time","По времени"]] },
  "player-requests": { data: () => playerRequests, card: cardPlayerRequest, sortOpts: [["time","По времени"],["system","По системе"]] }
};

const PER_PAGE = 6;
let catState = { page: 1, sort: "", filters: {} };

function buildFilterForm(type) {
  if (type === "masters" || type === "players") {
    const sysChecks = SYSTEMS.map(s =>
      '<div class="form-check"><input class="form-check-input" type="checkbox" name="system" value="' + s.trim() + '" id="fs' + s.replace(/\W/g,"") + '"><label class="form-check-label" for="fs' + s.replace(/\W/g,"") + '">' + s.trim() + '</label></div>'
    ).join("");
    return '<h3 class="h6">Системы</h3>' + sysChecks +
      '<div class="mt-3"><label class="form-label" for="fFormat">Формат</label><select id="fFormat" class="form-select"><option value="">Любой</option>' + FORMATS.map(f => '<option>' + f + '</option>').join("") + '</select></div>' +
      '<div class="mt-3"><label class="form-label" for="fCity">Город</label><input id="fCity" class="form-control" placeholder="Например, Москва"></div>' +
      '<div class="mt-3"><label class="form-label" for="fExp">Опыт от (лет)</label><input id="fExp" type="number" min="0" class="form-control" value="0"></div>';
  }
  if (type === "master-requests") {
    return '<div><label class="form-label" for="fSystem">Система</label><select id="fSystem" class="form-select"><option value="">Любая</option>' + SYSTEMS.map(s => '<option>' + s.trim() + '</option>').join("") + '</select></div>' +
      '<div class="mt-3"><label class="form-label" for="fFormat">Формат</label><select id="fFormat" class="form-select"><option value="">Любой</option>' + FORMATS.map(f => '<option>' + f + '</option>').join("") + '</select></div>' +
      '<div class="mt-3"><label class="form-label" for="fFree">Свободных мест от</label><input id="fFree" type="number" min="0" class="form-control" value="0"></div>';
  }
  return '<div><label class="form-label" for="fSystem">Система</label><select id="fSystem" class="form-select"><option value="">Любая</option>' + SYSTEMS.map(s => '<option>' + s.trim() + '</option>').join("") + '</select></div>' +
    '<div class="mt-3"><label class="form-label" for="fFormat">Формат</label><select id="fFormat" class="form-select"><option value="">Любой</option>' + FORMATS.map(f => '<option>' + f + '</option>').join("") + '</select></div>' +
    '<div class="mt-3"><label class="form-label" for="fCity">Город</label><input id="fCity" class="form-control" placeholder="Город"></div>';
}

function readFilters(type) {
  const f = {};
  if (type === "masters" || type === "players") {
    f.systems = Array.from(document.querySelectorAll('input[name="system"]:checked')).map(c => c.value);
    f.format = document.getElementById("fFormat")?.value || "";
    f.city = (document.getElementById("fCity")?.value || "").toLowerCase().trim();
    f.exp = parseInt(document.getElementById("fExp")?.value || "0", 10);
  } else if (type === "master-requests") {
    f.system = document.getElementById("fSystem")?.value || "";
    f.format = document.getElementById("fFormat")?.value || "";
    f.free = parseInt(document.getElementById("fFree")?.value || "0", 10);
  } else {
    f.system = document.getElementById("fSystem")?.value || "";
    f.format = document.getElementById("fFormat")?.value || "";
    f.city = (document.getElementById("fCity")?.value || "").toLowerCase().trim();
  }
  return f;
}

function applyFilters(list, type, f) {
  return list.filter(item => {
    if (type === "masters" || type === "players") {
      if (f.systems.length && !f.systems.some(s => item.systems.includes(s))) return false;
      if (f.format && item.format !== f.format) return false;
      if (f.city && !item.city.toLowerCase().includes(f.city)) return false;
      if (f.exp && item.experience < f.exp) return false;
    } else if (type === "master-requests") {
      if (f.system && item.system !== f.system) return false;
      if (f.format && item.format !== f.format) return false;
      if (f.free && item.slotsFree < f.free) return false;
    } else {
      if (f.system && item.system !== f.system) return false;
      if (f.format && item.format !== f.format) return false;
      if (f.city && !item.city.toLowerCase().includes(f.city)) return false;
    }
    return true;
  });
}

function sortList(list, type, sort) {
  const arr = [...list];
  if (type === "masters" || type === "players") {
    if (sort === "rating") arr.sort((a,b)=>b.rating-a.rating);
    else if (sort === "experience") arr.sort((a,b)=>b.experience-a.experience);
    else if (sort === "name") arr.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
  } else if (type === "master-requests") {
    if (sort === "slotsFree") arr.sort((a,b)=>b.slotsFree-a.slotsFree);
    else if (sort === "time") arr.sort((a,b)=>a.time.localeCompare(b.time,"ru"));
  } else {
    if (sort === "time") arr.sort((a,b)=>a.time.localeCompare(b.time,"ru"));
    else if (sort === "system") arr.sort((a,b)=>a.system.localeCompare(b.system,"ru"));
  }
  return arr;
}

function renderPagination(total) {
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (pages <= 1) return "";
  let html = '<nav aria-label="Пагинация"><ul class="pagination justify-content-center mt-4">';
  html += '<li class="page-item' + (catState.page===1?" disabled":"") + '"><a class="page-link" href="#" data-pg="' + (catState.page-1) + '">‹</a></li>';
  for (let i=1;i<=pages;i++) html += '<li class="page-item' + (i===catState.page?" active":"") + '"><a class="page-link" href="#" data-pg="' + i + '">' + i + '</a></li>';
  html += '<li class="page-item' + (catState.page===pages?" disabled":"") + '"><a class="page-link" href="#" data-pg="' + (catState.page+1) + '">›</a></li>';
  html += '</ul></nav>';
  return html;
}

function renderCatalog(type) {
  const cfg = CATALOG_CONFIG[type];
  const grid = document.getElementById("catalogGrid");
  const pag = document.getElementById("catalogPag");
  const counter = document.getElementById("catalogCounter");
  if (!grid) return;

  let list = applyFilters(cfg.data(), type, catState.filters);
  list = sortList(list, type, catState.sort);
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (catState.page > pages) catState.page = pages;
  const slice = list.slice((catState.page-1)*PER_PAGE, catState.page*PER_PAGE);

  grid.innerHTML = slice.length ? slice.map(cfg.card).join("") :
    '<div class="col-12"><div class="alert alert-warning" role="alert">Ничего не найдено. Измените фильтры.</div></div>';
  if (counter) counter.textContent = "Найдено: " + total;
  if (pag) pag.innerHTML = renderPagination(total);
}

function initCatalog(type) {
  const cfg = CATALOG_CONFIG[type];
  const filterBox = document.getElementById("filterBox");
  const sortSel = document.getElementById("sortSelect");
  if (filterBox) filterBox.innerHTML = buildFilterForm(type);
  if (sortSel) sortSel.innerHTML = cfg.sortOpts.map(o => '<option value="' + o[0] + '">' + o[1] + '</option>').join("");

  catState = { page: 1, sort: cfg.sortOpts[0][0], filters: readFilters(type) };
  renderCatalog(type);

  const form = document.getElementById("filterForm");
  if (form) form.addEventListener("submit", e => { e.preventDefault(); catState.filters = readFilters(type); catState.page = 1; renderCatalog(type); });
  if (form) form.addEventListener("change", () => { catState.filters = readFilters(type); catState.page = 1; renderCatalog(type); });
  if (form) form.addEventListener("input", () => { catState.filters = readFilters(type); catState.page = 1; renderCatalog(type); });
  if (sortSel) sortSel.addEventListener("change", () => { catState.sort = sortSel.value; catState.page = 1; renderCatalog(type); });

  const resetBtn = document.getElementById("resetFilters");
  if (resetBtn) resetBtn.addEventListener("click", () => { if (form) form.reset(); catState.filters = readFilters(type); catState.page = 1; renderCatalog(type); });

  const pag = document.getElementById("catalogPag");
  if (pag) pag.addEventListener("click", e => {
    const a = e.target.closest("a[data-pg]");
    if (!a) return;
    e.preventDefault();
    catState.page = parseInt(a.dataset.pg, 10);
    renderCatalog(type);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const type = document.body.dataset.catalog;
  if (type) initCatalog(type);
});