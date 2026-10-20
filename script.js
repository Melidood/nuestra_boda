/* Configuración personalizable */
const WEDDING_CONFIG = {
  bride: "Ana",
  groom: "Julio",
  date: "2026-12-19",
  venue: "PARROQUIA DE SANTIAGO APÓSTOL",
  city: "TARANDACUAO, GTO.",
  photo: "foto-pareja-placeholder.png",
  timezone: "America/Mexico_City",
  weddingDayMessage: "¡HOY ES EL GRAN DÍA!",
  whatsappNumber: "524411225238", 
  whatsappMessage: "¡Hola! Me gustaría confirmar mi asistencia a la boda de Ana y Julio."
};

// Carga de textos
document.getElementById("bride-name").textContent = WEDDING_CONFIG.bride;
document.getElementById("groom-name").textContent = WEDDING_CONFIG.groom;
document.getElementById("venue-name").textContent = WEDDING_CONFIG.venue;
document.getElementById("venue-city").textContent = WEDDING_CONFIG.city;
document.getElementById("couple-photo").src = WEDDING_CONFIG.photo;
document.getElementById("wedding-day").textContent = WEDDING_CONFIG.weddingDayMessage;

// Enlace de WhatsApp para confirmación
const rsvpBtn = document.getElementById("rsvp-button");
rsvpBtn.href = `https://wa.me/${WEDDING_CONFIG.whatsappNumber}?text=${encodeURIComponent(WEDDING_CONFIG.whatsappMessage)}`;

// Lógica de Zona Horaria
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

// Cuenta regresiva con actualización en segundos
function updateCountdown() {
  const remaining = target - Date.now();
  if (remaining <= 0) {
    $("countdown").hidden = true;
    $("countdown-intro").hidden = true;
    $("wedding-day").hidden = false;
    return;
  }
  
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  $("days").textContent = days.toLocaleString("es-MX");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

// Control de Música de Fondo
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicIcon.textContent = "🔊";
  } else {
    music.pause();
    musicIcon.textContent = "🎵";
  }
});
