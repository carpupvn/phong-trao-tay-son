// ============================================
// ĐIỀU HƯỚNG SLIDE
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
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function updateNav() {
  document.querySelectorAll('.dot-btn').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
  document.getElementById('prevBtn').disabled = currentSlide === 0;
  document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
}

function goToSlide(n) {
  if (n < 0 || n >= slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  slides[currentSlide].scrollTop = 0;
  updateNav();
  // Fix Leaflet bị co giãn khi slide ẩn/hiện
  if (currentSlide === 3 && map) {
    setTimeout(() => map.invalidateSize(), 120);
  }
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); }
  if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
  if (e.key === 'Home') goToSlide(0);
  if (e.key === 'End') goToSlide(slides.length - 1);
});

// ============================================
// RENDER TIMELINE
// ============================================
function renderTimeline() {
  const container = document.getElementById('timeline');
  container.innerHTML = DATA.events.map((ev, i) => `
    <div class="tl-item" data-index="${i}">
      <div class="tl-year">${ev.year}</div>
      <div class="tl-content">
        <h3>${ev.title}</h3>
        <p>${ev.desc}</p>
      </div>
    </div>
  `).join('');
}

// ============================================
// RENDER 4 GIAI ĐOẠN
// ============================================
function renderPhases() {
  const container = document.getElementById('phases');
  container.innerHTML = DATA.phases.map(p => `
    <div class="phase-card">
      <div class="phase-num">${p.num}</div>
      <h3>${p.title}</h3>
      <ul>${p.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ============================================
// KHỞI TẠO BẢN ĐỒ LEAFLET
// ============================================
function initMap() {
  map = L.map('map', { scrollWheelZoom: false }).setView([15.5, 107.5], 6);

  // SỬ DỤNG ESRI DARK GRAY (Miễn phí, không cần API key, siêu ổn định)
  // BẢN ĐỒ ĐỊA HÌNH
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 16
  }).addTo(map);

  // Icon tùy chỉnh theo loại địa điểm
  const makeIcon = (type) => L.divIcon({
    className: 'custom-marker ' + type,
    html: '<div></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const icons = {
    start: makeIcon('start'),
    battle: makeIcon('battle'),
    capital: makeIcon('capital')
  };

  // Đánh số thứ tự cho marker
  DATA.locations.forEach((loc, idx) => {
    L.marker(loc.coords, { icon: icons[loc.type] })
      .addTo(map)
      .bindPopup(`<b>${idx + 1}. ${loc.name}</b><br>${loc.desc}`);
  });

  // VẼ ĐƯỜNG HÀNH QUÂN VỚI HIỆU ỨNG CHUYỂN ĐỘNG (leaflet-ant-path)
  L.polyline.antPath(DATA.marchRoute, {
    "color": "#c41e3a",       // Màu đỏ chủ đạo
    "delay": 400,             // Tốc độ chuyển động của hiệu ứng
    "dashArray": [10, 20],    // Tạo các nét đứt
    "weight": 3.5,            // Độ dày của đường
    "pulseColor": "#FFFFFF",  // Màu của điểm sáng chạy dọc đường
    "paused": false,
    "reverse": false
  }).addTo(map);

  // Căn bản đồ vừa tất cả các điểm
  const bounds = L.latLngBounds(DATA.locations.map(l => l.coords));
  map.fitBounds(bounds, { padding: [40, 40] });
}

// ============================================
// KHỞI CHẠY
// ============================================
window.addEventListener('load', () => {
  renderTimeline();
  renderPhases();
  initMap();
  updateNav();
});