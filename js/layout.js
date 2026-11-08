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
    '" href="' + n.href + '">' + n.label + "</a></li>"
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
        '<form class="d-flex ms-lg-3" role="search" action="search.html" method="get">' +
          '<input class="form-control me-2" type="search" name="q" placeholder="Поиск по сайту" aria-label="Поиск">' +
          '<button class="btn btn-outline-light" type="submit">Найти</button>' +
        '</form>' +
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
  document.body.insertAdjacentHTML("beforeend", renderModal() + renderToastContainer());
}

document.addEventListener("DOMContentLoaded", mountLayout);