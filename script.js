const RUMS = {
  donq: {
    name: "Don Q",
    meta: "Puerto Rico • Light, clean, cocktail-friendly",
    notes: "Crisp, mild vanilla, subtle citrus—very approachable.",
    pitch: "A clean, easy rum that works great in lighter cocktails—perfect for guests who want something smooth."
  },
  plantation: {
    name: "Plantation (Planteray)",
    meta: "Caribbean blend • Round, sweet-leaning, crowd-pleaser",
    notes: "Vanilla, baking spice, gentle oak, soft sweetness.",
    pitch: "A smooth, slightly sweeter rum—great for guests who like bourbon notes or easy sipping."
  },
  smithcross: {
    name: "Smith & Cross",
    meta: "Jamaica • Pot still • Funky + bold",
    notes: "Ripe banana, pineapple, molasses, spice—big flavor.",
    pitch: "A bold Jamaican rum with tropical funk—awesome for adventurous guests or stronger cocktails."
  }
};

// ------- Modal -------
const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeBtn");

const titleEl = document.getElementById("modalTitle");
const metaEl  = document.getElementById("modalMeta");
const notesEl = document.getElementById("modalNotes");
const pitchEl = document.getElementById("modalPitch");

function openModal(key){
  const rum = RUMS[key];
  if (!rum) return;

  titleEl.textContent = rum.name;
  metaEl.textContent  = rum.meta;
  notesEl.textContent = rum.notes;
  pitchEl.textContent = rum.pitch;

  backdrop.hidden = false;
  modal.hidden = false;
}

function closeModal(){
  modal.hidden = true;
  backdrop.hidden = true;
}

document.querySelectorAll(".hotspot").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // don’t trigger coordinate click tool
    openModal(btn.dataset.rum);
  });
});

backdrop.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

// ------- Click-to-get-coordinates tool -------
const canvas = document.getElementById("canvas");
const canvasImg = document.getElementById("canvasImg");
const coordPanel = document.getElementById("coordPanel");

function pct(n){ return (n * 100).toFixed(2); }

canvas.addEventListener("click", (e) => {
  // Use the image’s on-screen rectangle for accurate % mapping
  const rect = canvasImg.getBoundingClientRect();

  // Click position relative to the image
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Ignore clicks outside the image area
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

  const leftPercent = pct(x / rect.width);
  const topPercent  = pct(y / rect.height);

  const cssSnippet =
`.hs-new {
  top: ${topPercent}%;
  left: ${leftPercent}%;
  width: 6%;
  height: 18%;
}`;

  coordPanel.innerHTML = `
    <div><strong>Clicked:</strong> left ${leftPercent}%, top ${topPercent}%</div>
    <code>${cssSnippet}</code>
    <div style="opacity:0.85;margin-top:6px;">
      Tip: adjust width/height to cover the bottle.
    </div>
  `;

  // Also copy to clipboard (if allowed)
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(cssSnippet).catch(() => {});
  }
});
