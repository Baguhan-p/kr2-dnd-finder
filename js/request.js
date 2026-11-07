document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const id = parseInt(params.get("id"), 10);
  const box = document.getElementById("requestDetail");
  if (!box) return;

  const r = type === "master" ? masterRequests.find(x=>x.id===id) : playerRequests.find(x=>x.id===id);
  if (!r) { box.innerHTML = '<div class="alert alert-danger" role="alert">Заявка не найдена.</div>'; return; }

  const author = type === "master" ? masters.find(m=>m.id===r.masterId) : players.find(p=>p.id===r.playerId);
  const isFull = type === "master" && r.slotsFree === 0;

  let infoRows = "";
  if (type === "master") {
    infoRows = [
      ["Кампания", r.campaign], ["Система", r.system], ["Формат", r.format],
      ["Место", r.place], ["Время", r.time],
      ["Свободные места", r.slotsFree + " из " + r.slotsTotal],
      ["Требования", r.requirements]
    ];
  } else {
    infoRows = [
      ["Система", r.system], ["Формат", r.format], ["Город", r.city],
      ["Удобное время", r.time], ["Описание", r.description]
    ];
  }

  const participants = type === "master" ? (r.participants||[]).map(pid => {
    const p = players.find(x=>x.id===pid);
    return p ? '<li class="list-group-item participant d-flex justify-content-between align-items-center">' +
      '<span class="d-flex align-items-center gap-2"><span class="avatar-circle" style="width:32px;height:32px;font-size:.8rem;background:' + colorFromName(p.name) + '">' + getInitials(p.name) + '</span>' + p.name + '</span>' +
      '<a class="btn btn-sm btn-outline-secondary" href="profile.html?type=player&id=' + p.id + '">Профиль</a></li>' : "";
  }).join("") : "";

  const comments = (r.comments||[]).map(c =>
    '<div class="card mb-2"><div class="card-body py-2"><strong>' + c.author + '</strong><p class="mb-0 small">' + c.text + '</p></div></div>'
  ).join("") || '<p class="text-muted small">Комментариев пока нет.</p>';

  box.innerHTML = '' +
  '<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Главная</a></li>' +
    '<li class="breadcrumb-item"><a href="' + (type==="master"?"master-requests.html":"player-requests.html") + '">Заявки</a></li>' +
    '<li class="breadcrumb-item active">Заявка</li></ol></nav>' +
  '<div class="request-banner p-4 mb-4"><h1 class="h3 mb-1">' + (type==="master"?r.campaign:"Игрок ищет мастера") + '</h1>' +
    '<span class="badge bg-' + (type==="master"?"primary":"info") + '">' + (type==="master"?"Мастер ищет игроков":"Игрок ищет мастера") + '</span></div>' +
  '<div class="row g-4">' +
    '<div class="col-12 col-lg-8">' +
      '<div class="card shadow-sm mb-4"><div class="card-header bg-light"><h2 class="h5 mb-0">Подробности заявки</h2></div>' +
        '<div class="card-body"><table class="table table-striped table-bordered align-middle mb-0"><tbody>' +
          infoRows.map(row => '<tr><th scope="row" style="width:35%">' + row[0] + '</th><td>' + row[1] + '</td></tr>').join("") +
        '</tbody></table></div></div>' +
      (type==="master" ? '<div class="card shadow-sm mb-4"><div class="card-header bg-light"><h2 class="h5 mb-0">Участники (' + (r.participants||[]).length + '/' + r.slotsTotal + ')</h2></div>' +
        '<ul class="list-group list-group-flush">' + (participants || '<li class="list-group-item text-muted">Пока никто не записался.</li>') + '</ul></div>' : "") +
      '<div class="card shadow-sm"><div class="card-header bg-light"><h2 class="h5 mb-0">Комментарии и вопросы</h2></div>' +
        '<div class="card-body">' + comments +
          '<form id="commentForm" class="mt-3"><div class="mb-2"><label for="cmText" class="form-label">Ваш комментарий</label><textarea id="cmText" class="form-control" rows="2" required></textarea></div>' +
          '<button class="btn btn-outline-primary" type="submit">Отправить</button></form>' +
        '</div></div>' +
    '</div>' +
    '<div class="col-12 col-lg-4">' + 
      '<div class="card shadow-sm mb-4"><div class="card-body text-center">' +
        '<div class="mx-auto mb-2" style="width:64px">' + avatarHtml(author, 64) + '</div>' +
        '<h3 class="h6">' + author.name + '</h3><p class="small text-muted mb-2">' + (type==="master"?"Мастер":"Игрок") + ' · опыт ' + author.experience + ' лет</p>' +
        '<a class="btn btn-sm btn-outline-secondary" href="profile.html?type=' + (type==="master"?"master":"player") + '&id=' + author.id + '">Анкета</a>' +
      '</div></div>' +
      '<button class="btn ' + (isFull ? "btn-secondary disabled" : "btn-success w-100 mb-2") + '" id="actionBtn" ' + (isFull?"disabled":"") + '>' +
        (type==="master" ? (isFull ? "Мест нет" : "Зарезервировать место") : "Откликнуться") + '</button>' +
      '<button class="btn btn-outline-primary w-100" id="contactBtn">Связаться</button>' +
    '</div>' +
  '</div>';

  document.getElementById("contactBtn").addEventListener("click", () =>
    openContact("Связаться с " + author.name, "Отправьте сообщение автору заявки."));

  const actionBtn = document.getElementById("actionBtn");
  if (actionBtn && !isFull) {
    actionBtn.addEventListener("click", () => {
      document.getElementById("joinModalText").textContent = type==="master"
        ? "Зарезервировать место в кампании «" + r.campaign + "»?"
        : "Отправить отклик на заявку игрока?";
      const modal = new bootstrap.Modal(document.getElementById("joinModal"));
      modal.show();
      document.getElementById("joinConfirmBtn").onclick = () => {
        modal.hide();
        showToast(type==="master" ? "Место зарезервировано! Мастер получит уведомление." : "Отклик отправлен!", "success");
        actionBtn.disabled = true;
        actionBtn.textContent = "✓ Заявлено";
        actionBtn.classList.remove("btn-success");
        actionBtn.classList.add("btn-secondary");
      };
    });
  }

  const cmForm = document.getElementById("commentForm");
  if (cmForm) cmForm.addEventListener("submit", e => {
    e.preventDefault();
    const txt = document.getElementById("cmText").value.trim();
    if (!txt) return;
    const card = document.createElement("div");
    card.className = "card mb-2";
    card.innerHTML = '<div class="card-body py-2"><strong>Вы</strong><p class="mb-0 small">' + txt.replace(/</g,"&lt;") + '</p></div>';
    cmForm.parentElement.insertBefore(card, cmForm);
    cmForm.reset();
    showToast("Комментарий  добавлен.", "info");
  });
});