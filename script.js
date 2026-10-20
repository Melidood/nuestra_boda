/* Edita estos valores para personalizar la invitación. */
const WEDDING_CONFIG = {
  bride: "Ana",
  groom: "Julio",
  monogram: "A&J",
  // Fecha local de la boda, sin hora inventada. La cuenta termina al iniciar ese día.
  date: "2026-12-19",
  venue: "PARROQUIA DE SANTIAGO APÓSTOL",
  city: "TARANDACUAO, GTO.",
  photo: "assets/foto-pareja-placeholder.png",
  timezone: "America/Mexico_City",
  weddingDayMessage: "¡HOY ES EL GRAN DÍA!"
};

document.getElementById("bride-name").textContent = WEDDING_CONFIG.bride;
document.getElementById("groom-name").textContent = WEDDING_CONFIG.groom;
document.getElementById("monogram").textContent = WEDDING_CONFIG.monogram;
document.getElementById("venue-name").textContent = WEDDING_CONFIG.venue;
document.getElementById("venue-city").textContent = WEDDING_CONFIG.city;
document.getElementById("couple-photo").src = WEDDING_CONFIG.photo;
document.getElementById("wedding-day").textContent = WEDDING_CONFIG.weddingDayMessage;

function getTargetTimestamp(dateString, timeZone) {
  // Al no haberse proporcionado hora, el objetivo es el inicio del día en la zona indicada.
  // Convierte la medianoche local a UTC usando Intl para contemplar la zona horaria.
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

function updateCountdown() {
  const remaining = target - Date.now();
  if (remaining <= 0) {
    $("countdown").hidden = true;
    $("countdown-intro").hidden = true;
    $("wedding-day").hidden = false;
    return;
  }
  const totalMinutes = Math.floor(remaining / 60000);
  $("days").textContent = Math.floor(totalMinutes / 1440).toLocaleString("es-MX");
  $("hours").textContent = String(Math.floor((totalMinutes % 1440) / 60)).padStart(2, "0");
  $("minutes").textContent = String(totalMinutes % 60).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);
