// ============================================
// ĐIỀU HƯỚNG SLIDE & HIỆU ỨNG
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
  slides[currentSlide].classList.remove('active');
  currentSlide = n;
  
  // Kích hoạt hiệu ứng morph (scale up)
  setTimeout(() => {
    slides[currentSlide].classList.add('active');
  }, 50);
  
  slides[currentSlide].scrollTop = 0;
  updateNav();
  
  // Bản đồ cần invalidateSize khi hiển thị lại
  if (currentSlide === 3 && map) {
    setTimeout(() => map.invalidateSize(), 200);
  }
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

document.addEventListener('keydown', (e) => {
  // Nếu đang mở modal thì không chuyển slide
  if(document.getElementById('groupModal').classList.contains('active')) return;

  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); }
  if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
});

// ============================================
// XỬ LÝ MODAL THÔNG TIN NHÓM
// ============================================
const modal = document.getElementById('groupModal');
document.getElementById('openGroupBtn').addEventListener('click', () => modal.classList.add('active'));
document.getElementById('closeGroupBtn').addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

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
// LOGIC BẢN ĐỒ TƯƠNG TÁC TỪNG BƯỚC
// ============================================
let currentStep = 0;
let mapLayers = []; // Lưu trữ marker/polyline hiện tại để xóa khi chuyển bước

function initMap() {
  map = L.map('map', { scrollWheelZoom: false, zoomControl: false }).setView([16, 106], 5);
  
  // Bản đồ nền sáng
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 16
  }).addTo(map);
  
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Nút chuyển bước
  document.getElementById('nextStepBtn').addEventListener('click', () => {
    if (currentStep < DATA.mapSteps.length - 1) {
      currentStep++;
      renderMapStep();
    }
  });

  renderMapStep(); // Chạy bước 1
}

function renderMapStep() {
  const stepData = DATA.mapSteps[currentStep];
  
  // 1. Cập nhật Text
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

  // 2. Camera bay tới vị trí mới (FlyTo)
  map.flyTo(stepData.center, stepData.zoom, { duration: 1.5 });

  // 3. Xóa các layer cũ (marker, đường đi)
  mapLayers.forEach(layer => map.removeLayer(layer));
  mapLayers = [];

  // 4. Thêm Marker mới
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

  // 5. Thêm đường hành quân (có hiệu ứng)
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