// ============================================
// ĐIỀU HƯỚNG DẢI BĂNG (CAROUSEL)
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesWrapper = document.getElementById('slidesWrapper');
const dotsContainer = document.getElementById('dots');
const slideCounter = document.getElementById('slideCounter');
let map = null;

// Tạo dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function updateNav() {
  document.querySelectorAll('.dot-btn').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
  document.getElementById('prevBtn').disabled = currentSlide === 0;
  document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
}

function goToSlide(n) {
  if (n < 0 || n >= slides.length || n === currentSlide) return;
  currentSlide = n;
  slidesWrapper.style.transform = `translateX(-${currentSlide * 100}vw)`;
  updateNav();
  if (currentSlide === 3 && map) {
    setTimeout(() => map.invalidateSize(), 650); 
  }
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

document.addEventListener('keydown', (e) => {
  if(document.getElementById('groupModal').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); }
  if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
});

// ============================================
// XỬ LÝ MODAL NHÓM
// ============================================
const groupModal = document.getElementById('groupModal');
const openGroupBtn = document.getElementById('openGroupBtn');
const closeGroupBtn = document.getElementById('closeGroupBtn');

if (openGroupBtn && groupModal) {
  openGroupBtn.addEventListener('click', () => groupModal.classList.add('active'));
}
if (closeGroupBtn && groupModal) {
  closeGroupBtn.addEventListener('click', () => groupModal.classList.remove('active'));
  groupModal.addEventListener('click', (e) => { if (e.target === groupModal) groupModal.classList.remove('active'); });
}

// ============================================
// RENDER TIMELINE
// ============================================
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  
  container.innerHTML = DATA.events.map((ev, i) => `
    <div class="tl-item">
      <div class="tl-year">${ev.year}</div>
      <div class="tl-content"><h3>${ev.title}</h3><p>${ev.desc}</p></div>
    </div>
  `).join('');
}

// ============================================
// LOGIC BẢN ĐỒ TƯƠNG TÁC TỪNG BƯỚC & VỆ TINH
// ============================================
let currentStep = 0;
let mapLayers = [];

function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  map = L.map('map', { scrollWheelZoom: false, zoomControl: false }).setView([16, 106], 5);
  
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
  }).addTo(map);
  
  L.control.zoom({ position: 'topright' }).addTo(map);

  document.getElementById('nextStepBtn').addEventListener('click', () => {
    if (currentStep < DATA.mapSteps.length - 1) {
      currentStep++;
      renderMapStep();
    }
  });

  document.getElementById('prevStepBtn').addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderMapStep();
    }
  });

  renderMapStep();
}

function renderMapStep() {
  if (!map) return;
  const stepData = DATA.mapSteps[currentStep];
  
  document.getElementById('stepIndicator').textContent = `Giai đoạn ${currentStep + 1} / ${DATA.mapSteps.length}`;
  document.getElementById('stepTitle').textContent = stepData.title;
  document.getElementById('stepDesc').textContent = stepData.desc;
  
  const btnNext = document.getElementById('nextStepBtn');
  const btnPrev = document.getElementById('prevStepBtn');

  if (currentStep === DATA.mapSteps.length - 1) {
    btnNext.textContent = "Đã kết thúc diễn biến";
    btnNext.disabled = true;
  } else {
    btnNext.textContent = "Tiếp tục ➔";
    btnNext.disabled = false;
  }

  btnPrev.disabled = (currentStep === 0);

  map.flyTo(stepData.center, stepData.zoom, { duration: 1.5 });

  mapLayers.forEach(layer => map.removeLayer(layer));
  mapLayers = [];

  const makeIcon = (type) => {
    let emoji = '📍';
    if (type === 'start') emoji = '🚩';
    if (type === 'battle') emoji = '⚔️';
    if (type === 'capital') emoji = '🏛️';
    
    return L.divIcon({
      className: 'custom-emoji-marker',
      html: `<div style="font-size: 24px; text-shadow: 0 0 6px #000, 0 0 10px #c41e3a;">${emoji}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };
  
  const icons = { start: makeIcon('start'), battle: makeIcon('battle'), capital: makeIcon('capital') };

  stepData.markers.forEach(m => {
    let popupContent = `<div style="text-align:center;">
      <b style="color:#c41e3a; font-size:1.1rem;">${m.name}</b><br>
      <p style="margin: 5px 0; font-size: 0.9rem;">${m.desc || ''}</p>`;
      
    if (m.img) {
      popupContent += `<img src="${m.img}" style="width: 200px; border-radius: 5px; margin-top: 5px; border: 2px solid #d4af37;" alt="${m.name}">`;
    }
    popupContent += `</div>`;

    const marker = L.marker(m.coords, { icon: icons[m.type] })
      .addTo(map)
      .bindPopup(popupContent);
    mapLayers.push(marker);
  });

  stepData.routes.forEach(routeCoords => {
    const path = L.polyline.antPath(routeCoords, {
      "color": "#c41e3a", "delay": 400, "dashArray": [10, 20], "weight": 3.5, "pulseColor": "#FFFFFF"
    }).addTo(map);
    mapLayers.push(path);
  });
}

// ============================================
// KHỞI CHẠY
// ============================================
window.addEventListener('load', () => {
  renderTimeline();
  initMap();
  updateNav();
  slidesWrapper.style.transform = 'translateX(0)';
});