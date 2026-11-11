document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accountForm");
  if (!form) return;
  const esc = s => String(s).replace(/</g, "&lt;");
  const sysBox = document.getElementById("acc-systems");
  sysBox.innerHTML = SYSTEMS.map((s, i) => '<div class="form-check"><input class="form-check-input" type="checkbox" value="' + s.trim() + '" id="acc-sys-' + i + '"><label class="form-check-label" for="acc-sys-' + i + '">' + s.trim() + '</label></div>').join("");

  let avatarData = "";
  const p = getMyProfile();
  if (p) {
    document.getElementById("acc-name").value = p.name || "";
    document.getElementById("acc-role").value = p.role || "player";
    document.getElementById("acc-exp").value = p.experience || 0;
    document.getElementById("acc-format").value = p.format || "Онлайн";
    document.getElementById("acc-city").value = p.city || "";
    document.getElementById("acc-bio").value = p.bio || "";
    avatarData = p.avatar || "";
    sysBox.querySelectorAll("input").forEach(c => c.checked = (p.systems || []).includes(c.value));
  }

  document.getElementById("acc-avatar").addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 300 * 1024) { showToast("Файл больше 300 КБ, выберите меньше", "warning"); e.target.value = ""; return; }
    const reader = new FileReader();
    reader.onload = () => { avatarData = reader.result; renderPreview(); };
    reader.readAsDataURL(f);
  });

  function collect() {
    return {
      name: document.getElementById("acc-name").value.trim() || "Безымянный герой",
      role: document.getElementById("acc-role").value,
      experience: parseInt(document.getElementById("acc-exp").value, 10) || 0,
      systems: Array.from(sysBox.querySelectorAll("input:checked")).map(c => c.value),
      format: document.getElementById("acc-format").value,
      city: document.getElementById("acc-city").value.trim(),
      bio: document.getElementById("acc-bio").value.trim(),
      avatar: avatarData
    };
  }

  function renderPreview() {
    const me = collect();
    document.getElementById("accountPreview").innerHTML =
      '<div class="card shadow-sm"><div class="card-body d-flex gap-3 align-items-center">' +
      avatarHtml(me, 96) +
      '<div><h3 class="h5 mb-1">' + esc(me.name) + ' <span class="badge bg-' + (me.role === "master" ? "primary" : "info text-dark") + '">' + (me.role === "master" ? "Мастер" : "Игрок") + '</span></h3>' +
      '<p class="small text-muted mb-1">📅 ' + me.experience + ' лет · 🎲 ' + (esc(me.systems.join(", ")) || "—") + '</p>' +
      '<p class="small mb-0">📍 ' + (esc(me.city) || "—") + ' · ' + me.format + '</p></div></div>' +
      (me.bio ? '<div class="card-footer small">' + esc(me.bio) + '</div>' : '') + '</div>';
  }

  form.addEventListener("input", renderPreview);
  form.addEventListener("change", renderPreview);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;
    saveMyProfile(collect());
    showToast("Профиль сохранён", "success");
  });

  renderPreview();

  const mine = masterRequests.filter(r => r.mine).map(r => '<a class="list-group-item list-group-item-action" href="request.html?type=master&id=' + r.id + '">' + esc(r.campaign) + ' · ' + r.system + '</a>')
    .concat(playerRequests.filter(r => r.mine).map(r => '<a class="list-group-item list-group-item-action" href="request.html?type=player&id=' + r.id + '">Ищу мастера · ' + r.system + ' · ' + esc(r.city) + '</a>'));
  document.getElementById("myRequests").innerHTML = mine.join("") || '<li class="list-group-item text-muted">Вы ещё не публиковали заявок.</li>';
});