// Inicializar íconos de Lucide
if (window.lucide) {
  lucide.createIcons();
}

// Variable para el control del iframe oculto
var submitted = false;
var submitTimeout;

// Deshabilitar botón durante el envío
function disableSubmitBtn() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Guardando...`;
    if (window.lucide) lucide.createIcons();
  }
}

// Mostrar mensaje de éxito al cargar el iframe
function showFormSuccess() {
  clearTimeout(submitTimeout);
  document.getElementById('rsvpForm').classList.add('hidden');
  document.getElementById('formSuccess').classList.remove('hidden');
  triggerGoldConfetti();
}

function showFormError() {
  submitted = false;
  clearTimeout(submitTimeout);
  const submitBtn = document.getElementById('submitBtn');
  const formError = document.getElementById('formError');

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Reintentar';
    if (window.lucide) lucide.createIcons();
  }

  if (formError) {
    formError.classList.remove('hidden');
  }
}

function handleRSVPSubmit() {
  submitted = true;
  disableSubmitBtn();
  clearTimeout(submitTimeout);
  submitTimeout = setTimeout(showFormError, 12000);
}

// Función de interacción al hacer clic en la columna vertebral
function spineInteraction() {
  triggerGoldConfetti();
}

// Confetti temático en tonos dorado y turquesa personalizados (#5dc1b9 y #8ae0db)
function triggerGoldConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#5dc1b9', '#8ae0db', '#d4b773', '#f7e7c4', '#ffffff']
    });
  }
}

// Copiar dirección al portapapeles
function copyAddress(text, message) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 bg-champagne-400 text-deepTurquoise-950 font-semibold text-xs px-4 py-2 rounded-full shadow-2xl z-50 transition-opacity duration-300';
  toast.innerText = message || 'Copiado al portapapeles';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Cuenta Regresiva ajustada al 20 de Noviembre a las 11:00 hs
const eventDate = new Date('2026-11-20T11:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = eventDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minEl = document.getElementById('minutes');
    const secEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
    if (minEl) minEl.innerText = minutes.toString().padStart(2, '0');
    if (secEl) secEl.innerText = seconds.toString().padStart(2, '0');
  } else {
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.innerHTML = '<span class="col-span-4 text-champagne-300 font-serif text-lg">¡Llegó el gran día! 🎉</span>';
    }
  }
}

// Iniciar actualización del contador
setInterval(updateCountdown, 1000);
updateCountdown();