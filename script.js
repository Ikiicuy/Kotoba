const listContainer = document.getElementById("listContainer");
const searchInput = document.getElementById("searchInput");

// 1. Tahun Otomatis
document.getElementById("currentYear").textContent = new Date().getFullYear();

let allData = [];

// 2. Load Data
async function loadData() {
  try {
    const response = await fetch("data.json");
    allData = await response.json();
    renderData(allData, "");
  } catch (error) {
    listContainer.innerHTML = `<div class="bg-[#C00707] p-4 rounded-lg text-white text-center text-sm font-bold">Gagal memuat file JSON!</div>`;
  }
}

// 3. Render Data
function renderData(data, keyword = "") {
  listContainer.innerHTML = "";

  if (data.length === 0) {
    listContainer.innerHTML = `<p class="text-center py-10 text-white/40 text-sm italic">Materi tidak ditemukan...</p>`;
    return;
  }

  data.forEach(item => {
    let nameHTML = item.name;
    
    // Highlight menggunakan warna Oranye Cerah
    if (keyword !== "") {
      const regex = new RegExp(`(${keyword})`, "gi");
      nameHTML = item.name.replace(regex, `<span class="text-[#FF4400] font-black">$1</span>`);
    }

    const card = document.createElement("div");
    card.className = "quiz-card flex items-center justify-between p-5 rounded-xl shadow-lg";

    card.innerHTML = `
      <div class="flex-1 pr-4">
        <h3 class="text-[16px] font-bold text-[#134E8E]">
          ${nameHTML}
        </h3>
      </div>
      
      <a href="${item.link}" 
         class="btn-action px-6 py-2.5 text-[12px] font-black uppercase tracking-wider rounded-lg shadow-md active:scale-95">
        Buka
      </a>
    `;

    listContainer.appendChild(card);
  });
}

// 4. Search Realtime
searchInput.addEventListener("input", function() {
  const keyword = this.value.toLowerCase().trim();
  renderData(allData.filter(item => item.name.toLowerCase().includes(keyword)), keyword);
});

loadData();
