/**
 * Configuración global de la Invitación
 * Modifica estos valores para personalizar los datos de la boda.
 */
const WEDDING_CONFIG = {
  brideName: "Ana",
  groomName: "Julio",
  initials: "A & J",
  targetDateISO: "2026-12-19T00:00:00",
  timeZone: "America/Mexico_City",
  displayDateText: "19 | DICIEMBRE | 26",
  venueName: "PARROQUIA DE SANTIAGO APÓSTOL",
  venueCity: "TARANDACUAO, GTO.",
  finishedMessage: "¡HOY ES EL GRAN DÍA!"
};

document.addEventListener("DOMContentLoaded", () => {
  initializeInvitationData();
  startCountdown();
});

function initializeInvitationData() {
  document.getElementById("couple-names-text").textContent = 
    `${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName}`;
  document.getElementById("emblem-initials").textContent = WEDDING_CONFIG.initials;
  document.getElementById("display-date").textContent = WEDDING_CONFIG.displayDateText;
  document.getElementById("venue-name").textContent = WEDDING_CONFIG.venueName;
  document.getElementById("venue-city").textContent = WEDDING_CONFIG.venueCity;
}

function startCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const bannerEl = document.getElementById("countdown-banner");
  const finishedMsgEl = document.getElementById("countdown-finished-message");

  function update() {
    const now = new Date();
    
    // Obtener la fecha/hora actual en la zona horaria objetivo
    const nowInTZString = now.toLocaleString("en-US", { timeZone: WEDDING_CONFIG.timeZone });
    const nowInTZ = new Date(nowInTZString);

    // Fecha objetivo
    const targetDate = new Date(WEDDING_CONFIG.targetDateISO);

    const diffMs = targetDate - nowInTZ;

    if (diffMs <= 0) {
      bannerEl.style.display = "none";
      finishedMsgEl.style.display = "block";
      finishedMsgEl.textContent = WEDDING_CONFIG.finishedMessage;
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}
