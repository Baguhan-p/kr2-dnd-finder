const SYSTEMS = ["D&D 5e", "Pathfinder", "Call of Cthulhu", " Savage Worlds ", "Shadowrun", "Cyberpunk RED"];
const FORMATS = ["Онлайн", "Офлайн"];

const masters = [
  { id: 1, name: "Алексей Дракон", experience: 9, systems: ["D&D 5e", "Pathfinder"], format: "Онлайн", city: "Москва", rating: 4.9, bio: "Веду кампании с 2015 года, специализируюсь на политических интригах и глубоком отыгрыше.", reviews: [{ author: "Игрок Марина", text: "Лучший мастер, которого я встречал!", stars: 5 }, { author: "Игрок Олег", text: "Отыгрыш NPC на высоте.", stars: 5 }] },
  { id: 2, name: "Ирина Тень", experience: 5, systems: ["Call of Cthulhu", "D&D 5e"], format: "Офлайн", city: "Санкт-Петербург", rating: 4.7, bio: "Люблю хоррор и расследования. Провожу офлайн-игры в Питере.", reviews: [{ author: "Игрок Дмитрий", text: "Атмосфера Ктулху передана идеально.", stars: 5 }] },
  { id: 3, name: "Павел Роллер", experience: 12, systems: ["D&D 5e", "Shadowrun", "Cyberpunk RED"], format: "Онлайн", city: "Казань", rating: 4.8, bio: "Ветер настолок, киберпанк и фантастика — моя стихия.", reviews: [{ author: "Игрок Анна", text: "Киберпанк зашёл как никогда.", stars: 5 }, { author: "Игрок Сергей", text: "Правила объясняет терпеливо.", stars: 4 }] },
  { id: 4, name: "Мария Звезда", experience: 3, systems: ["D&D 5e"], format: "Онлайн", city: "Новосибирск", rating: 4.5, bio: "Начинающий мастер, но с горящими глазами. Ищу дружную группу.", reviews: [{ author: "Игрок Костя", text: "Дружелюбно и весело.", stars: 5 }] },
  { id: 5, name: "Денис Мастер", experience: 7, systems: ["Pathfinder", "Savage Worlds"], format: "Офлайн", city: "Екатеринбург", rating: 4.6, bio: "Тактические бои и хардкорные приключения.", reviews: [{ author: "Игрок Лиза", text: "Бои — отдельное удовольствие.", stars: 4 }] },
  { id: 6, name: "Ольга Сказительница", experience: 10, systems: ["D&D 5e", "Call of Cthulhu"], format: "Онлайн", city: "Москва", rating: 5.0, bio: "Эпические сюжеты на десятки сессий.", reviews: [{ author: "Игрок Роман", text: "Сюжет держит месяцами.", stars: 5 }, { author: "Игрок Вика", text: "10 из 10.", stars: 5 }] }
];

const players = [
  { id: 1, name: "Иван Воин", experience: 6, systems: ["D&D 5e", "Pathfinder"], format: "Онлайн", city: "Москва", rating: 4.8, bio: "Играю танков и паладинов, люблю тактику.", reviews: [{ author: "Мастер Алексей", text: "Надёжный игрок, всегда готов.", stars: 5 }] },
  { id: 2, name: "София Плут", experience: 4, systems: ["D&D 5e"], format: "Офлайн", city: "Санкт-Петербург", rating: 4.6, bio: "Плуты и следопыты — мои классы.", reviews: [{ author: "Мастер Ирина", text: "Отыгрывает роль отлично.", stars: 5 }] },
  { id: 3, name: "Никита Маг", experience: 8, systems: ["D&D 5e", "Shadowrun"], format: "Онлайн", city: "Казань", rating: 4.9, bio: "Маги и техника, люблю сложные билды.", reviews: [{ author: "Мастер Павел", text: "Глубокое понимание правил.", stars: 5 }] },
  { id: 4, name: "Алина Жрец", experience: 2, systems: ["D&D 5e"], format: "Онлайн", city: "Новосибирск", rating: 4.4, bio: "Новичок, поддерживаю группу лечением.", reviews: [{ author: "Мастер Мария", text: "Быстро учится.", stars: 4 }] },
  { id: 5, name: "Глеб Следопыт", experience: 5, systems: ["Pathfinder", "Savage Worlds"], format: "Офлайн", city: "Екатеринбург", rating: 4.7, bio: "Выживание и разведка.", reviews: [{ author: "Мастер Денис", text: "Всегда находит путь.", stars: 5 }] },
  { id: 6, name: "Дарья Бард", experience: 7, systems: ["D&D 5e", "Call of Cthulhu"], format: "Онлайн", city: "Москва", rating: 4.8, bio: "Бард и лицо партии, тяну социалку.", reviews: [{ author: "Мастер Ольга", text: "Держит атмосферу стола.", stars: 5 }] }
];

const masterRequests = [
  { id: 1, campaign: "Забытые Королевства: Восстание", masterId: 1, system: "D&D 5e", format: "Онлайн", place: "Discord / Roll20", time: "Вт, Чт 19:00 МСК", slotsTotal: 5, slotsFree: 2, requirements: "Опыт от 1 года, готовность к отыгрышу.", participants: [1, 3, 6], comments: [{ author: "Иван Воин", text: "Хочу к вам, есть опыт!" }, { author: "Мастер Алексей", text: "Принят, ждём в четверг." }] },
  { id: 2, campaign: "Зов Ктулху: Туманы Инсмута", masterId: 2, system: "Call of Cthulhu", format: "Офлайн", place: "Клуб Ролевика, СПб", time: "Сб 14:00", slotsTotal: 4, slotsFree: 1, requirements: "Возраст 18+, устойчивость к хоррору.", participants: [2, 6], comments: [{ author: "Дарья Бард", text: "Свободно ещё место?" }] },
  { id: 3, campaign: "Neon Nights: Киберпанк 2077", masterId: 3, system: "Cyberpunk RED", format: "Онлайн", place: "Foundry VTT", time: "Пн, Ср 20:00 МСК", slotsTotal: 6, slotsFree: 3, requirements: "Знание базовых правил приветствуется.", participants: [3], comments: [] },
  { id: 4, campaign: "Драконий Трон", masterId: 6, system: "D&D 5e", format: "Онлайн", place: "Discord", time: "Сб, Вс 18:00 МСК", slotsTotal: 5, slotsFree: 0, requirements: "Только по приглашению.", participants: [1, 2, 3, 4, 5], comments: [{ author: "Алина Жрец", text: "Место освободится?" }] }
];

const playerRequests = [
  { id: 1, playerId: 4, system: "D&D 5e", format: "Онлайн", city: "Новосибирск", time: "Вечера будних дней", description: "Ищу мастера для короткой кампании, новичок.", comments: [{ author: "Мастер Мария", text: "Напишите мне, у меня как раз набор." }] },
  { id: 2, playerId: 5, system: "Pathfinder", format: "Офлайн", city: "Екатеринбург", time: "Выходные", description: "Хочу хардкорный тактический стол.", comments: [] },
  { id: 3, playerId: 2, system: "D&D 5e", format: "Офлайн", city: "Санкт-Петербург", time: "Суббота день", description: "Плут, ищу постоянную группу.", comments: [{ author: "Мастер Ирина", text: "Приглашаю на Ктулху, если интересно." }] },
  { id: 4, playerId: 6, system: "Call of Cthulhu", format: "Онлайн", city: "Москва", time: "Будни вечер", description: "Бард, люблю социалку и расследования.", comments: [] }
];

function getInitials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function colorFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  return "hsl(" + hue + ", 45%, 38%)";
}

function starsHtml(rating) {
  const full = Math.round(rating);
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= full ? "★" : "☆";
  return '<span class="rating-stars">' + s + "</span> " + rating.toFixed(1);
}