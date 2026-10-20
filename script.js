/* Configuración personalizable */
const WEDDING_CONFIG = {
  bride: "Ana",
  groom: "Julio",
  date: "2026-12-19",
  venue: "PARROQUIA DE SANTIAGO APÓSTOL",
  city: "TARANDACUAO, GTO.",
  timezone: "America/Mexico_City",
  weddingDayMessage: "¡HOY ES EL GRAN DÍA!"
};

// Carga de textos
document.getElementById("bride-name").textContent = WEDDING_CONFIG.bride;
document.getElementById("groom-name").textContent = WEDDING_CONFIG.groom;
document.getElementById("venue-name").textContent = WEDDING_CONFIG.venue;
document.getElementById("venue-city").textContent = WEDDING_CONFIG.city;
document.getElementById("wedding-day").textContent = WEDDING_CONFIG.weddingDayMessage;

// Lógica de cálculo en zona horaria exacta
function getTargetTimestamp(dateString, timeZone) {
  const [year, month, day] = dateString.split("-").map(Number);
  const desired = { year, month, day, hour: 0, minute: 0, second: 0 };
  let guess = Date.UTC(year, month - 1, day);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(formatter.formatToParts(new Date(guess))
      .filter(p => p.type !== "literal").map(p => [p.type, Number(p.value)]));
    const shownAsUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    const desiredAsUTC = Date.UTC(desired.year, desired.month - 1, desired.day, desired.hour, desired.minute, desired.second);
    guess += desiredAsUTC - shownAsUTC;
  }
  return guess;
}

const target = getTargetTimestamp(WEDDING_CONFIG.date, WEDDING_CONFIG.timezone);
const $ = id => document.getElementById(id);

// Cuenta regresiva con segundos
function updateCountdown() {
  const remaining = target - Date.now();
  if (remaining <= 0) {
    if ($("countdown")) $("countdown").hidden = true;
    if ($("countdown-intro")) $("countdown-intro").hidden = true;
    if ($("wedding-day")) $("wedding-day").hidden = false;
    return;
  }
  
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if ($("days")) $("days").textContent = days.toLocaleString("es-MX");
  if ($("hours")) $("hours").textContent = String(hours).padStart(2, "0");
  if ($("minutes")) $("minutes").textContent = String(minutes).padStart(2, "0");
  if ($("seconds")) $("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

// Control de Música
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");

if (musicBtn && music) {
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicIcon.textContent = "🔊";
    } else {
      music.pause();
      musicIcon.textContent = "🎵";
    }
  });
}
