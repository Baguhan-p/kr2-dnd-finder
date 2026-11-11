const NAV_ITEMS = [
  { href: "index.html", label: "Главная" },
  { href: "masters.html", label: "Мастера" },
  { href: "players.html", label: "Игроки" },
  { href: "support.html", label: "Поддержка" }
];

function currentPage() {
  const p = location.pathname.split("/").pop() || "index.html";
  return p;
}

function renderHeader() {
  const cur = currentPage();
  const links = NAV_ITEMS.map(n =>
    '<li class="nav-item"><a class="nav-link' + (n.href === cur ? " active" : "") +
    '" href="' + n.href + '">' + n.label + '</a></li>'
  ).join("");
  return '' +
  '<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">' +
    '<div class="container">' +
      '<a class="navbar-brand brand-logo" href="index.html">🐉 D&amp;D Finder</a>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Меню">' +
        '<span class="navbar-toggler-icon"></span>' +
      '</button>' +
      '<div class="collapse navbar-collapse" id="mainNav">' +
        '<ul class="navbar-nav ms-auto mb-2 mb-lg-0">' + links + '</ul>' +
        '<div class="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">' +
          '<a class="btn btn-sm btn-outline-primary position-relative" href="favorites.html" aria-label="Избранное">♡<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="fav-count" style="display:none">0</span></a>' +
          '<a class="btn btn-sm btn-outline-primary" href="account.html" aria-label="Личный кабинет">👤</a>' +
          '<button class="btn btn-sm btn-outline-primary anim-toggle" id="anim-toggle" type="button" aria-pressed="true" aria-label="Выключить анимации">✨</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</nav>';
}

function renderFooter() {
  return '' +
  '<footer class="footer-dark py-4 mt-5">' +
    '<div class="container">' +
      '<div class="row g-4 align-items-start">' +
        '<div class="col-12 col-md-4 text-center text-md-start">' +
          '<h3 class="h6 brand-logo">🐉 D&amp;D Finder</h3>' +
          '<p class="small mb-0">Платформа для поиска мастеров и игроков настольных ролевых игр.</p>' +
        '</div>' +
        '<div class="col-12 col-md-4 text-center">' +
          '<h3 class="h6 text-white">Разделы</h3>' +
          '<ul class="list-unstyled small mb-0">' +
            '<li><a href="index.html">Главная</a></li>' +
            '<li><a href="masters.html">Мастера</a></li>' +
            '<li><a href="players.html">Игроки</a></li>' +
            '<li><a href="support.html">Поддержка</a></li>' +
            '<li><a href="masters.html#requests">Заявки мастеров</a></li>' +
            '<li><a href="players.html#requests">Заявки игроков</a></li>' +
            '<li><a href="favorites.html">Избранное</a></li>' +
            '<li><a href="account.html">Личный кабинет</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="col-12 col-md-4 text-center text-md-end">' +
          '<h3 class="h6 text-white">Контакты</h3>' +
          '<ul class="list-unstyled small mb-0">' +
            '<li>📍 г. Москва, ул. Учебная, д. 1</li>' +
            '<li>📞 +7 (900) 123-45-67</li>' +
            '<li>🕒 Пн–Пт 9:00–20:00, Сб–Вс 10:00–18:00</li>' +
            '<li>✉️ support@dndfinder.ru</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<hr class="border-secondary mt-4">' +
      '<div class="text-center small">' +
        '<span>&copy; 2026 D&amp;D Finder. Все права защищены.</span>' +
      '</div>' +
    '</div>' +
  '</footer>';
}

function renderModal() {
  return '' +
  '<div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog">' +
      '<div class="modal-content">' +
        '<div class="modal-header">' +
          '<h2 class="modal-title h5" id="contactModalLabel">Связаться</h2>' +
          '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<p class="text-muted small" id="contactModalText">Оставьте сообщение, и мы передадим его адресату.</p>' +
          '<form id="contactForm">' +
            '<div class="mb-3"><label for="cName" class="form-label">Ваше имя</label><input id="cName" type="text" class="form-control" required></div>' +
            '<div class="mb-3"><label for="cEmail" class="form-label">E-mail</label><input id="cEmail" type="email" class="form-control" required></div>' +
            '<div class="mb-3"><label for="cMsg" class="form-label">Сообщение</label><textarea id="cMsg" class="form-control" rows="3" required></textarea></div>' +
            '<div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="cAgree" required><label class="form-check-label" for="cAgree">Согласен на обработку данных</label></div>' +
          '</form>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>' +
          '<button type="submit" form="contactForm" class="btn btn-primary">Отправить</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div class="modal fade" id="joinModal" tabindex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content">' +
        '<div class="modal-header">' +
          '<h2 class="modal-title h5" id="joinModalLabel">Подтверждение</h2>' +
          '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>' +
        '</div>' +
        '<div class="modal-body"><p id="joinModalText">Вы уверены?</p></div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>' +
          '<button type="button" class="btn btn-success" id="joinConfirmBtn">Да, участвовать</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderToastContainer() {
  return '<div class="toast-container position-fixed bottom-0 end-0 p-3" id="toastArea"></div>';
}

function showToast(message, type) {
  const area = document.getElementById("toastArea");
  if (!area) return;
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-" + (type || "success") + " border-0";
  el.setAttribute("role", "alert");
  el.innerHTML = '<div class="d-flex"><div class="toast-body">' + message +
    '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
  area.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 4000 });
  t.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

function openContact(title, text) {
  document.getElementById("contactModalLabel").textContent = title;
  document.getElementById("contactModalText").textContent = text;
  new bootstrap.Modal(document.getElementById("contactModal")).show();
}

function mountLayout() {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = renderHeader();
  if (f) f.outerHTML = renderFooter();
  document.body.insertAdjacentHTML("beforeend", renderModal() + renderRequestModal() + renderDiceModal() + renderDiceFab() + renderToastContainer());
}

document.addEventListener("DOMContentLoaded", mountLayout);

function renderRequestModal() {
  const sysOpts = SYSTEMS.map(s => '<option>' + s.trim() + '</option>').join("");
  const fmtOpts = FORMATS.map(f => '<option>' + f + '</option>').join("");
  return '' +
  '<div class="modal fade" id="requestModal" tabindex="-1" aria-labelledby="requestModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-lg modal-dialog-centered">' +
      '<div class="modal-content">' +
        '<div class="modal-header"><h2 class="modal-title h5" id="requestModalLabel">Подать заявку</h2>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button></div>' +
        '<div class="modal-body">' +
          '<form id="requestForm" novalidate>' +
            '<div class="row g-3">' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-type">Тип заявки</label><select id="rq-type" class="form-select"><option value="master">Мастер ищет игроков</option><option value="player">Игрок ищет мастера</option></select></div>' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-name">Ваше имя *</label><input id="rq-name" class="form-control" required minlength="2"><div class="invalid-feedback">Укажите имя (минимум 2 символа).</div></div>' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-system">Система</label><select id="rq-system" class="form-select">' + sysOpts + '</select></div>' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-format">Формат</label><select id="rq-format" class="form-select">' + fmtOpts + '</select></div>' +
            '</div>' +
            '<div id="rq-master-fields" class="row g-3 mt-1">' +
              '<div class="col-12"><label class="form-label" for="rq-campaign">Название кампании *</label><input id="rq-campaign" class="form-control" required><div class="invalid-feedback">Укажите название кампании.</div></div>' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-place">Место / платформа *</label><input id="rq-place" class="form-control" required placeholder="Discord / Roll20 / клуб"><div class="invalid-feedback">Укажите место проведения.</div></div>' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-slots">Мест в группе *</label><input id="rq-slots" type="number" class="form-control" min="1" max="10" value="4" required><div class="invalid-feedback">От 1 до 10 мест.</div></div>' +
              '<div class="col-12"><label class="form-label" for="rq-req">Требования к игрокам</label><textarea id="rq-req" class="form-control" rows="2"></textarea></div>' +
            '</div>' +
            '<div id="rq-player-fields" class="row g-3 mt-1 d-none">' +
              '<div class="col-12 col-md-6"><label class="form-label" for="rq-city">Город *</label><input id="rq-city" class="form-control" required><div class="invalid-feedback">Укажите город.</div></div>' +
              '<div class="col-12"><label class="form-label" for="rq-desc">О себе и пожелания *</label><textarea id="rq-desc" class="form-control" rows="3" required></textarea><div class="invalid-feedback">Расскажите, кого ищете.</div></div>' +
            '</div>' +
            '<div class="row g-3 mt-1"><div class="col-12"><label class="form-label" for="rq-time">Удобное время *</label><input id="rq-time" class="form-control" required placeholder="Вт, Чт 19:00 МСК"><div class="invalid-feedback">Укажите время.</div></div></div>' +
          '</form>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>' +
          '<button type="submit" form="requestForm" class="btn btn-primary">Опубликовать</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderDiceModal() {
  const dice = [4, 6, 8, 10, 12, 20, 100];
  return '' +
  '<div class="modal fade" id="diceModal" tabindex="-1" aria-labelledby="diceModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content">' +
        '<div class="modal-header"><h2 class="modal-title h5" id="diceModalLabel">🎲 Бросок кубиков</h2>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button></div>' +
        '<div class="modal-body">' +
          '<div class="btn-group flex-wrap w-100 mb-3" role="group" aria-label="Выбор кубика">' +
            dice.map(d => '<button type="button" class="btn btn-outline-primary dice-pick' + (d === 20 ? ' active' : '') + '" data-die="' + d + '">d' + d + '</button>').join("") +
          '</div>' +
          '<div class="row g-2 mb-3">' +
            '<div class="col-6"><label class="form-label" for="dice-count">Количество</label><input id="dice-count" type="number" class="form-control" min="1" max="10" value="1"></div>' +
            '<div class="col-6"><label class="form-label" for="dice-mod">Модификатор</label><input id="dice-mod" type="number" class="form-control" value="0"></div>' +
          '</div>' +
          '<div class="dice-result text-center" id="dice-result" aria-live="polite">—</div>' +
          '<div class="text-center small text-muted mb-3" id="dice-detail">Выберите кубик и бросьте</div>' +
          '<button class="btn btn-primary w-100 mb-3" id="dice-roll-btn" type="button">Бросить</button>' +
          '<h3 class="h6">История бросков</h3>' +
          '<ul class="list-group small" id="dice-history"><li class="list-group-item text-muted">Пока пусто</li></ul>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderDiceFab() {
  return '<button class="dice-fab" id="dice-fab" type="button" data-bs-toggle="modal" data-bs-target="#diceModal" aria-label="Бросить кубики" title="Бросить кубики">🎲</button>';
}