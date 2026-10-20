// ============================================
// ĐIỀU HƯỚNG SLIDE & HIỆU ỨNG TRƯỢT
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
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
  if (n < 0 || n >= slides.length) return;
  
  // Slide cũ trượt sang trái
  const prevSlide = slides[currentSlide];
  prevSlide.classList.remove('active');
  prevSlide.classList.add('prev');

  currentSlide = n;
  const nextSlide = slides[currentSlide];
  
  // Đảm bảo slide mới không bị kẹt ở trạng thái prev
  nextSlide.classList.remove('prev');
  
  // Ép trình duyệt nhận diện lại trạng thái (để kích hoạt transition)
  void nextSlide.offsetWidth;
  
  // Kích hoạt trượt vào
  nextSlide.classList.add('active');
  
  slides[currentSlide].scrollTop = 0;
  updateNav();
  
  if (currentSlide === 3 && map) {
    setTimeout(() => map.invalidateSize(), 200);
  }
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

document.addEventListener('keydown', (e) => {
  if(document.getElementById('groupModal').classList.contains('active') || document.getElementById('reportModal').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); }
  if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
});

// ============================================
// XỬ LÝ MODAL (NHÓM & BÁO CÁO)
// ============================================
const groupModal = document.getElementById('groupModal');
const reportModal = document.getElementById('reportModal');

document.getElementById('openGroupBtn').addEventListener('click', () => groupModal.classList.add('active'));
document.getElementById('closeGroupBtn').addEventListener('click', () => groupModal.classList.remove('active'));
groupModal.addEventListener('click', (e) => { if (e.target === groupModal) groupModal.classList.remove('active'); });

document.getElementById('openReportBtn').addEventListener('click', () => reportModal.classList.add('active'));
document.getElementById('closeReportBtn').addEventListener('click', () => reportModal.classList.remove('active'));
reportModal.addEventListener('click', (e) => { if (e.target === reportModal) reportModal.classList.remove('active'); });

// ============================================
// RENDER TIMELINE
// ============================================
function renderTimeline() {
  const container = document.getElementById('timeline');
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
  map = L.map('map', { scrollWheelZoom: false, zoomControl: false }).setView([16, 106], 5);
  
  // BẢN ĐỒ VỆ TINH (ESRI WORLD IMAGERY)
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

  renderMapStep();
}

function renderMapStep() {
  const stepData = DATA.mapSteps[currentStep];
  
  document.getElementById('stepIndicator').textContent = `Giai đoạn ${currentStep + 1} / ${DATA.mapSteps.length}`;
  document.getElementById('stepTitle').textContent = stepData.title;
  document.getElementById('stepDesc').textContent = stepData.desc;
  
  const btn = document.getElementById('nextStepBtn');
  if (currentStep === DATA.mapSteps.length - 1) {
    btn.textContent = "Đã kết thúc diễn biến";
    btn.disabled = true;
  } else {
    btn.textContent = "Tiếp tục diễn biến ➔";
    btn.disabled = false;
  }

  map.flyTo(stepData.center, stepData.zoom, { duration: 1.5 });

  mapLayers.forEach(layer => map.removeLayer(layer));
  mapLayers = [];

  const makeIcon = (type) => L.divIcon({
    className: 'custom-marker ' + type, html: '<div></div>', iconSize: [20, 20], iconAnchor: [10, 10]
  });
  const icons = { start: makeIcon('start'), battle: makeIcon('battle'), capital: makeIcon('capital') };

  stepData.markers.forEach(m => {
    const marker = L.marker(m.coords, { icon: icons[m.type] })
      .addTo(map)
      .bindPopup(`<b>${m.name}</b>`);
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
});