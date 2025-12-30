// frontend.js

// GLOBALNI DNEVNI PODATKI (za premium)
let currentKin = null;
let currentTone = null;
let currentSign = null;

// ==================================================
// MODAL
// ==================================================
export function initModal() {
  const modal = document.getElementById("aboutModal");
  const btn = document.getElementById("aboutBtn");
  const span = modal?.querySelector(".close");

  if (!modal || !btn || !span) return;

  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ==================================================
// FOOTER LETO
// ==================================================
export function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==================================================
// GOOGLE SHEETS
// ==================================================
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
    await res.json();
  } catch (err) {
    console.warn("Sheets ni dosegljiv:", err);
  }
}

// PODATKI
const tzolkinSigns = [ "Krokodil","Veter","Noč","Seme / Kuščar","Kača","Smrt","Jelen","Zajec","Voda","Pes","Opica","Človek","Trs","Jaguar","MenOrel","Jastreb","Zemlja","Ogledalo","Nevihta","Sonce" ];

const tzolkinSignImages = [ "https://static.wixstatic.com/media/7535eb_8b15827f3f0749f58b47edf2ec8ff34a~mv2.png", "https://static.wixstatic.com/media/7535eb_da5c22d0b20c4650ae78bd78d44bdf90~mv2.png", "https://static.wixstatic.com/media/7535eb_1431fb4ee97a418383209553a73974e5~mv2.png", "https://static.wixstatic.com/media/7535eb_63fa92348cef45778a33ea8df474f3b8~mv2.png", "https://static.wixstatic.com/media/7535eb_b144e80ceccc4304b10027e8d2f1e674~mv2.png", "https://static.wixstatic.com/media/7535eb_9eda107ea6ed46e8880d6cd3394b3eca~mv2.png", "https://static.wixstatic.com/media/7535eb_498008e2e9fb4c7ebc66e4a2cf25a1d4~mv2.png", "https://static.wixstatic.com/media/7535eb_a86c9fe89c5f4f4d8a810c284e40bf13~mv2.png", "https://static.wixstatic.com/media/7535eb_b1612f1d298245a483212ca3997b6872~mv2.png", "https://static.wixstatic.com/media/7535eb_fcf459036d31451fb913cd556bdf98b1~mv2.png", "https://static.wixstatic.com/media/7535eb_c5e4c01f59e74424806a8b82d55ea9c9~mv2.png", "https://static.wixstatic.com/media/7535eb_8b1bd5f0bebf4e9e84734d0dd7c18a55~mv2.png", "https://static.wixstatic.com/media/7535eb_5a43cbda692c4bff8790b8d4fe769ec5~mv2.png", "https://static.wixstatic.com/media/7535eb_891ac2c5109f44c8927f69170b93aa78~mv2.png", "https://static.wixstatic.com/media/7535eb_bcc1d28cea634696895554c9f25a2788~mv2.png", "https://static.wixstatic.com/media/7535eb_acd453dcd54e4ca29483cb610e3bab2e~mv2.png", "https://static.wixstatic.com/media/7535eb_d413aa3902864a09a3c2bb1ae2996b53~mv2.png", "https://static.wixstatic.com/media/7535eb_57d9eafe0dd249ddb5194e43a629e516~mv2.png", "https://static.wixstatic.com/media/7535eb_413ee006283f479dbb46cc737b796bb4~mv2.png", "https://static.wixstatic.com/media/7535eb_18fc81a965aa4e69974f11d5bb68dc60~mv2.png" ];

const tzolkinNumbers = [
"1 – Začetek in usmeritev: Danes je idealen dan za postavljanje namer. Sprejmi prvo iskro, začni projekt ali ritual.",
"2 – Povezovanje in harmonija: Dan za sodelovanje, partnerstva, poslušanje in dialog. Uskladi se z energijo okoli sebe.",
"3 – Ustvarjalnost in izražanje: Deli svojo radost, ustvarjalnost in ideje. Dan spodbuja komunikacijo in igro.",
"4 – Stabilnost in temelji: Fokus na disciplini, rutini, organizaciji. Ustvari varno in trdno podlago za nadaljevanje.",
"5 – Svoboda in spremembe: Priložnost za prilagodljivost, raziskovanje in spremembo. Sledi svojemu notranjemu toku.",
"6 – Skrb in odgovornost: Dan za skrb za druge in za sebe, refleksija, čustvena podpora.",
"7 – Notranji uvid: Meditacija, introspektiva, prepoznavanje notranjih vzorcev in resnic.",
"8 – Moč in obilje: Dan za odločnost, realizacijo, doseganje ciljev in aktivacijo osebne moči.",
"9 – Zaključi, očisti in deli znanje. Prepusti, kar je končano.",
"10 – Manifestacija in uspeh: Dan za materializacijo in konkretne rezultate, akcijo.",
"11 – Navdih in intuicija: Poslušaj intuicijo, inspiracijo, energijo prihodnosti in novih idej.",
"12 – Preobrazba:Dovoli prenovo, čiščenje, notranje spremembe in rast.",
"13 – Transcendenca in cikel: Dan za duhovno razumevanje, povezavo s celoto in širši pogled."
];

const tzolkinNumberImages = [
"https://static.wixstatic.com/media/7535eb_8128aa403fb34a39a9abf4c539e07d4e~mv2.png",
"https://static.wixstatic.com/media/7535eb_58d9713024fd44e3b574ed6e66319df3~mv2.png",
"https://static.wixstatic.com/media/7535eb_fa772de6b389412a874060866aafe0d0~mv2.png",
"https://static.wixstatic.com/media/7535eb_034123a9c80d497da70e29c529f761ab~mv2.png",
"https://static.wixstatic.com/media/7535eb_0949be53659a4112b79aeaf88fba4182~mv2.png",
"https://static.wixstatic.com/media/7535eb_31c0710a2c40451c8be0474fca598690~mv2.png",
"https://static.wixstatic.com/media/7535eb_abc754938a3c47e5a3b497a802fbbc09~mv2.png",
"https://static.wixstatic.com/media/7535eb_a195a39082484f0eafd271594204fd99~mv2.png",
"https://static.wixstatic.com/media/7535eb_62f1b1f66190462faf5af9be6f04e3f3~mv2.png",
"https://static.wixstatic.com/media/7535eb_630ea6308de14ff089b351e4f1967594~mv2.png",
"https://static.wixstatic.com/media/7535eb_b098132554904e4d8d689176145249a0~mv2.png",
"https://static.wixstatic.com/media/7535eb_6cf0d4b4439a46eb952d52e6cd02bb28~mv2.png",
"https://static.wixstatic.com/media/7535eb_a5b6f5b75b254f1ca65fbe7cafb8086e~mv2.png"
];

// TVOJI PODROBNI OPISI (nadgrajeni za 500k Varuhinjo Časa)
const tzolkinSignDescriptions = [
  "Krokodil / Imix – Začetek in potencial: Aktivira se energija ustvarjalnosti, novih začetkov in intuicije. Danes je kot odprt portal, ki te vabi, da stopiš na pot osebne moči in zavestnega ustvarjanja.",
  "Veter / Ik – Dih in komunikacija: Poudarek na izražanju, poslušanju in harmoniji. Skozi energijo vetra pride jasnost misli in lahkotnost izražanja, kot sapica, ki prebudi povezave okoli tebe.",
  "Zora / Akbal – Noč in notranji svet: Dan za introspektivo, sanje in odkrivanje skritih resnic. Čas ti prinaša vpogled v notranje globine in skrivnosti, ki čakajo, da jih odkriješ.",
  "Kuščar / Kan – Rast in seme: Pazi na semena, ki jih danes poseješ; energija rasti. Vsaka misel in dejanje danes nosi potencial za prihodnjo manifestacijo.",
  "Kača / Chicchan – Življenjska energija: Aktivira vitalnost, strast in telesno moč. Dan prinaša prebujenje telesa in duha, ki te podpira pri življenjskih izzivih in osebnem napredku.",
  "Smrt / Cimi – Prehod: Dan za spustitev, očiščenje in spremembe. Energija današnjega dne ti pomaga odvreči, kar ti ne služi več, in narediti prostor za nove začetke.",
  "Jelen / Manik – Narava in zdravljenje: Poveži se z naravo, samoskrba in fizična energija. Dan je kot zdravilna pot skozi zemljo, ki te poveže z lastnimi koreninami.",
  "Zajec / Lamat – Lepota in harmonija: Dan za estetske, ustvarjalne in igrive aktivnosti. Energija te podpira pri izražanju notranje radosti in umetniške intuicije.",
  "Voda / Muluc – Čustva in intuicija: Povezava z globino svojih čustev, sočutjem in notranjim tokom. Dan te uči, kako sprejeti tok čustev brez odpora.",
  "Pes / Oc – Zvestoba in srce: Poudarek na ljubezni, odnosi in notranji zvestobi. Energija današnjega dne krepí povezave, iskrenost in predanost.",
  "Opica / Chuen – Igra in humor: Spodbujanje radosti, igrivosti in lahkotnosti. Čas je primeren, da se spomniš, kako pomembno je smeh in igrivost v življenju.",
  "Cesta / Eb – Pot in zavest: Dan za zavedanje svojih dejanj, odločitev in poti. Energija ti omogoča jasen vpogled, kje si in kam želiš iti.",
  "Trs / Ben – Vizija in usmeritev: Aktivira notranjo modrost in višjo perspektivo. Dan te spodbuja, da se povežeš s svojo vizijo in slediš notranjemu kompasu.",
  "Jaguar / Ix – Skrivnost in moč: Čas za introspektivo, intuicijo in notranjo moč. Energija današnjega dne ti pomaga odkriti skrite sposobnosti in notranje zaklade.",
  "Orel / Men – Višina in perspektiva: Povečana sposobnost zaznavanja širše slike, vpogled v višje dimenzije in prepoznavanje ciklov življenja.",
  "Sova / Cib – Modrost in cikli: Dan za učenje iz preteklosti, razumevanje ritmov in ciklov. Energija omogoča povezavo med modrostjo in dnevnim življenjem.",
  "Zemlja / Caban – Sinhroniciteta in tok: Povezava z naravo, ritmom življenja in harmonijo. Dan ti pomaga prepoznati tok okoli sebe in uskladiti svoje korake.",
  "Ogledalo / Etznab – Resnica in odsev: Dan za jasnost, introspektivo in odkrivanje iluzij. Energija današnjega dne odseva resnico in spodbuja notranjo iskrenost.",
  "Nevihta / Cauac – Prenova in obilje: Sprememba, očiščenje in notranji prerod. Energija dneva podpira osvoboditev starih vzorcev in aktivacijo nove energije.",
  "Sonce / Ahau – Prebujenje in svetloba: Aktivira vitalnost, razsvetljenje in izražanje svetlobe. Dan je kot budilka za notranje prebujenje in kreativno moč."
];


// ==================================================
// TZOLKIN LOGIKA
// ==================================================
function calculateTzolkinKin(dateInput) {
  const [y, m, d] = dateInput.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const refDate = new Date(Date.UTC(1800, 0, 1));
  const refKin = 114;
  const msPerDay = 86400000;
  const daysSince = Math.floor((date - refDate) / msPerDay);
  return ((refKin - 1 + daysSince) % 260 + 260) % 260 + 1;
}

function calculateSoulFrequency() {
  const birthDate = document.getElementById("birthDate")?.value;
  const email = document.getElementById("email")?.value;
  const gdpr = document.getElementById("gdprConsent")?.checked;
  const resultDiv = document.getElementById("result");

  if (!birthDate || !email || !gdpr) {
    alert("Prosimo, izpolni vsa polja in potrdi soglasje.");
    return;
  }

  const kin = calculateTzolkinKin(birthDate);
  const tone = (kin - 1) % 13;
  const sign = (kin - 1) % 20;

  currentKin = kin;
  currentTone = tone;
  currentSign = sign;

  saveEmail(email, birthDate, kin, tzolkinSigns[sign]);

  resultDiv.innerHTML = `
    <p class="kin-number"><strong>KIN ${kin}</strong></p>
    <img class="number-img" src="${tzolkinNumberImages[tone]}">
    <p class="frequency">${tzolkinNumbers[tone]}</p>
    <img class="sign-img" src="${tzolkinSignImages[sign]}">
    <h3>${tzolkinSigns[sign]}</h3>
    <p>${tzolkinSignDescriptions[sign]}</p>
  `;

  // 🔥 KLJUČNO – prikaže rezultat
  resultDiv.classList.add("show");
}

// ==================================================
// SERVICE WORKER
// ==================================================
export function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(() => console.warn("SW ni registriran"));
  }
}

// ==================================================
// PREMIUM + INSTALL
// ==================================================
export function initPremiumButton() {
  const premiumBtn = document.getElementById("premiumBtn");
  const premiumResult = document.getElementById("premiumResult");

  if (!premiumBtn || !premiumResult) return;

  premiumBtn.addEventListener("click", async () => {
    premiumResult.innerHTML = "✨ Portal se odpira…";

    const fullName = document.getElementById("fullName")?.value || "Dragi obiskovalec";
    const birthDate = document.getElementById("birthDate")?.value || "01-01-2000";
    const tzolkinDay = document.getElementById("tzolkinDay")?.textContent || "1 Krokodil";

    try {
      const text = await generatePremiumText({ fullName, birthDate, tzolkinDay });
      premiumResult.innerHTML = text;
      premiumResult.classList.add("show");
    } catch (err) {
      console.error(err);
      premiumResult.innerHTML = "Napaka pri odpiranju portala. Poskusi kasneje.";
    }
  });
}

// ==================================================
// INIT
// ==================================================
export function initFrontend() {
  initModal();
  initFooterYear();
  initServiceWorker();
  initPremiumButton();

  const btn = document.getElementById("calculateBtn");
  if (btn) btn.addEventListener("click", calculateSoulFrequency);
}