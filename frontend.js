// frontend.js

// --- MODAL ---
export function initModal() {
  const modal = document.getElementById("aboutModal");
  const btn = document.getElementById("aboutBtn");
  const span = modal.querySelector(".close");

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }
}

// --- AVTOMATSKO LETO ---
export function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// --- GOOGLE SHEETS ---
export async function saveEmail(email, birthDate, kin, sign) {
  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbz-7drGNoV3L-8lV2itgAUVITcM_oYKhhCd_2r7t7jXsv8qRchP6aGcZWGPvN0NFO3X/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, birthdate: birthDate, kin, sign })
      }
    );
    const data = await res.json();
    console.log("Shranjeno v Google Sheets:", data);
  } catch (err) {
    console.error("Napaka pri shranjevanju:", err);
  }
}

// --- GLAVNA FUNKCIJA ZA TZOLKIN ---
export async function calculateSoulFrequency() {
  const fullName = document.getElementById("fullName")?.value.trim();
  const birthDate = document.getElementById("birthDate")?.value;
  const email = document.getElementById("email")?.value.trim();
  const gdprChecked = document.getElementById("gdprConsent")?.checked;
  const resultDiv = document.getElementById("result");

  if (!fullName || !birthDate || !email || !gdprChecked) {
    alert("Prosimo, izpolni vsa polja in potrdi soglasje.");
    return;
  }

  const kin = calculateTzolkinKin(birthDate); // predpostavlja, da je ta funkcija globalna
  const tone = ((kin - 1) % 13) + 1;
  const sign = ((kin - 1) % 20) + 1;

  const toneText = tzolkinNumbers[tone - 1];
  const toneImg = tzolkinNumberImages[tone - 1];
  const signText = tzolkinSigns[sign - 1];
  const signImg = tzolkinSignImages[sign - 1];
  const signDesc = tzolkinSignDescriptions[sign - 1] || "";

  await saveEmail(email, birthDate, kin, signText);

  resultDiv.innerHTML = `
    <p class="kin-number">Današnji časovni podpis –</p>
    <p class="kin-number"><strong>Kin ${kin}</strong></p>
    <img src="${toneImg}" alt="Število ${tone}" class="number-img">
    <p class="frequency">${toneText}</p>
    <img src="${signImg}" alt="${signText}" class="sign-img">
    <h3>${signText}</h3>
    <p>${signDesc}</p>
  `;
  resultDiv.classList.add("show");
}

// --- SERVICE WORKER (PWA) ---
export function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.error("Service Worker registration failed:", err));
  }
}

// --- PREMIUM BUTTON ---
export function initPremiumButton() {
  const premiumBtn = document.getElementById("premiumBtn");
  const premiumResultDiv = document.getElementById("premiumResult");
  if (!premiumBtn || !premiumResultDiv) return;

  let deferredPrompt;

  // Install prompt button
  const installBtn = document.createElement("button");
  installBtn.id = "installBtn";
  document.body.appendChild(installBtn);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  installBtn.addEventListener("click", async () => {
    installBtn.classList.remove("show");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      deferredPrompt = null;
    }
  });

  premiumBtn.addEventListener("click", async () => {
    premiumResultDiv.textContent = "Ustvarjam tvojo Premium razlago... 🌟";

    try {
      const response = await fetch("/api/premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Ustvari obsežno premium Tzolkin razlago za današnji dan, vključujoč rituale in vodstvo."
        })
      });

      const data = await response.json();
      premiumResultDiv.innerHTML = data.text;

      if (deferredPrompt) {
        installBtn.classList.add("show");
        installBtn.textContent = "✨ Namesti app za najboljšo izkušnjo";
      }
    } catch (error) {
      console.error(error);
      premiumResultDiv.textContent = "Oprostite, nekaj je šlo narobe. Poskusi ponovno.";
    }
  });
}

// --- INITIALIZACIJA ---
export function initFrontend() {
  initModal();
  initFooterYear();
  initServiceWorker();
  initPremiumButton();

  const soulBtn = document.getElementById("calculateBtn");
  if (soulBtn) soulBtn.addEventListener("click", calculateSoulFrequency);
}
