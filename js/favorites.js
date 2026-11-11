function renderFavorites() {
  const box = document.getElementById("favMasters");
  if (!box) return;
  const list = getFavorites();
  const ms = list.filter(k => k.startsWith("master:")).map(k => masters.find(m => m.id === parseInt(k.split(":")[1], 10))).filter(Boolean);
  const ps = list.filter(k => k.startsWith("player:")).map(k => players.find(p => p.id === parseInt(k.split(":")[1], 10))).filter(Boolean);
  box.innerHTML = ms.map(cardMaster).join("") || '<div class="col-12"><p class="text-muted">Мастеров в избранном нет.</p></div>';
  document.getElementById("favPlayers").innerHTML = ps.map(cardPlayer).join("") || '<div class="col-12"><p class="text-muted">Игроков в избранном нет.</p></div>';
  document.getElementById("favEmpty").classList.toggle("d-none", ms.length + ps.length > 0);
  updateFavUI();
}

document.addEventListener("DOMContentLoaded", renderFavorites);