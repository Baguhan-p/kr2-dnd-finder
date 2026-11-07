document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const id = parseInt(params.get("id"), 10);
  const box = document.getElementById("profileDetail");
  if (!box) return;

  const person = type === "master" ? masters.find(m=>m.id===id) : players.find(p=>p.id===id);
  if (!person) { box.innerHTML = '<div class="alert alert-danger" role="alert">Профиль не найден.</div>'; return; }

  const activeReqs = type === "master"
    ? masterRequests.filter(r => r.masterId === id)
    : playerRequests.filter(r => r.playerId === id);

  const reviews = (person.reviews||[]).map(rv =>
    '<div class="card mb-2"><div class="card-body py-2">' +
      '<div class="d-flex justify-content-between"><strong>' + rv.author + '</strong><span class="rating-stars">' + "★".repeat(rv.stars) + "☆".repeat(5-rv.stars) + '</span></div>' +
      '<p class="mb-0 small">' + rv.text + '</p></div></div>'
  ).join("") || '<p class="text-muted small">Отзывов пока нет.</p>';

  const reqCards = activeReqs.map(r => type === "master"
    ? '<a class="list-group-item list-group-item-action" href="request.html?type=master&id=' + r.id + '">' + r.campaign + ' · ' + r.system + ' · свободно ' + r.slotsFree + '</a>'
    : '<a class="list-group-item list-group-item-action" href="request.html?type=player&id=' + r.id + '">Ищу мастера · ' + r.system + ' · ' + r.city + '</a>'
  ).join("") || '<li class="list-group-item text-muted">Активных заявок нет.</li>';

  box.innerHTML = '' +
  '<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Главная</a></li>' +
    '<li class="breadcrumb-item"><a href="' + (type==="master"?"masters.html":"players.html") + '">' + (type==="master"?"Мастера":"Игроки") + '</a></li>' +
    '<li class="breadcrumb-item active">' + person.name + '</li></ol></nav>' +
  '<div class="card shadow-sm mb-4"><div class="card-body">' +
    '<div class="d-flex flex-column flex-md-row align-items-md-center gap-3">' +
      '<div class="avatar-circle" style="width:96px;height:96px;font-size:2rem;background:' + colorFromName(person.name) + '">' + getInitials(person.name) + '</div>' +
      '<div class="flex-grow-1">' +
        '<h1 class="h3 mb-1">' + person.name + ' <span class="badge bg-' + (type==="master"?"primary":"info text-dark") + '">' + (type==="master"?"Мастер":"Игрок") + '</span></h1>' +
        '<p class="mb-1">' + starsHtml(person.rating) + ' · опыт ' + person.experience + ' лет</p>' +
        '<p class="text-muted mb-2">📍 ' + person.city + ' · ' + person.format + ' · 🎲 ' + person.systems.join(", ") + '</p>' +
        '<p>' + person.bio + '</p>' +
      '</div>' +
      '<button class="btn btn-primary" id="contactBtn">Связаться</button>' +
    '</div>' +
  '</div></div>' +
  '<ul class="nav nav-tabs" id="profTabs" role="tablist">' +
    '<li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tabOverview" type="button" role="tab">Обзор</button></li>' +
    '<li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabReviews" type="button" role="tab">Отзывы</button></li>' +
    '<li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabReqs" type="button" role="tab">Активные заявки</button></li>' +
  '</ul>' +
  '<div class="tab-content card shadow-sm border-top-0" style="border-top-left-radius:0;border-top-right-radius:0">' +
    '<div class="tab-pane fade show active p-4" id="tabOverview" role="tabpanel">' +
      '<h2 class="h5">Системы</h2><p>' + person.systems.map(s=>'<span class="badge bg-secondary me-1">'+s+'</span>').join("") + '</p>' +
            '<h2 class="h5 mt-3">О себе</h2><p class="mb-0 dropcap">' + person.bio + '</p>' +
    '</div>' +
    '<div class="tab-pane fade p-4" id="tabReviews" role="tabpanel"><h2 class="h5">Отзывы</h2>' + reviews + '</div>' +
    '<div class="tab-pane fade p-4" id="tabReqs" role="tabpanel"><h2 class="h5">Активные заявки</h2><ul class="list-group">' + reqCards + '</ul></div>' +
  '</div>';

  document.getElementById("contactBtn").addEventListener("click", () =>
    openContact("Связаться с " + person.name, "Напишите сообщение — мы передадим его пользователю."));
});