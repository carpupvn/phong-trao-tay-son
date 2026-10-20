const DATA = {
  events: [
    { year: "1771", title: "Khởi nghĩa bùng nổ", desc: "Mùa xuân 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dựng cờ khởi nghĩa tại Tây Sơn thượng đạo (An Khê, Gia Lai)." },
    { year: "1773", title: "Chiếm phủ thành Quy Nhơn", desc: "Tháng 9/1773, nghĩa quân chiếm phủ thành Quy Nhơn, tạo bước ngoặt quan trọng." },
    { year: "1774", title: "Mở rộng địa bàn", desc: "Giữa năm 1774, nghĩa quân kiểm soát vùng đất từ Quảng Nam đến Bình Thuận." },
    { year: "1777", title: "Lật đổ chúa Nguyễn", desc: "Năm 1777, nghĩa quân lật đổ chính quyền chúa Nguyễn ở Đàng Trong." },
    { year: "1778", title: "Nguyễn Nhạc lên ngôi", desc: "Năm 1778, Nguyễn Nhạc lên ngôi hoàng đế, đóng đô tại thành Đồ Bàn." },
    { year: "1785", title: "Chiến thắng Rạch Gầm – Xoài Mút", desc: "Tháng 1/1785, Nguyễn Huệ đánh tan 5 vạn quân Xiêm." },
    { year: "1786–1788", title: "Tiến ra Bắc, diệt Trịnh", desc: "Lật đổ chúa Trịnh, chính quyền Lê sụp đổ hoàn toàn." },
    { year: "1789", title: "Đại phá quân Thanh", desc: "Chiến thắng Ngọc Hồi – Đống Đa, đánh tan 29 vạn quân Thanh." }
  ],

  // Dữ liệu Map chia theo 4 bước (Giai đoạn)
  mapSteps: [
    {
      title: "1. Dựng cờ, mở rộng địa bàn (1771-1774)",
      desc: "Mùa xuân 1771, khởi nghĩa nổ ra tại An Khê. Nghĩa quân nhanh chóng chiếm Quy Nhơn (1773) và làm chủ Nam Trung Bộ (1774).",
      center: [13.5, 108.8], // Tọa độ tâm
      zoom: 8,
      markers: [
        { coords: [13.95, 108.65], type: "start", name: "An Khê (Gia Lai)" },
        { coords: [13.78, 109.22], type: "capital", name: "Phủ Quy Nhơn" }
      ],
      routes: [
        [ [13.95, 108.65], [13.78, 109.22] ] // Đường từ An Khê xuống Quy Nhơn
      ]
    },
    {
      title: "2. Diệt chúa Nguyễn, đánh quân Xiêm (1775-1785)",
      desc: "Lật đổ chúa Nguyễn (1777). Đánh tan 5 vạn quân Xiêm xâm lược tại trận Rạch Gầm - Xoài Mút (1785).",
      center: [12.0, 107.5],
      zoom: 6,
      markers: [
        { coords: [13.95, 108.65], type: "start", name: "An Khê" },
        { coords: [13.78, 109.22], type: "capital", name: "Quy Nhơn" },
        { coords: [10.35, 106.35], type: "battle", name: "Rạch Gầm - Xoài Mút" }
      ],
      routes: [
        [ [13.95, 108.65], [13.78, 109.22] ],
        [ [13.78, 109.22], [10.35, 106.35] ] // Tiến vào Nam đánh Xiêm
      ]
    },
    {
      title: "3. Tiến ra Bắc, diệt Trịnh (1786-1788)",
      desc: "Nguyễn Huệ tiến quân ra Bắc, hạ thành Phú Xuân và giải phóng Thăng Long, lật đổ chúa Trịnh.",
      center: [18.5, 106.5],
      zoom: 5,
      markers: [
        { coords: [13.78, 109.22], type: "capital", name: "Quy Nhơn" },
        { coords: [16.47, 107.58], type: "capital", name: "Phú Xuân (Huế)" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" }
      ],
      routes: [
        [ [10.35, 106.35], [13.78, 109.22] ], // Quay lại căn cứ
        [ [13.78, 109.22], [16.47, 107.58], [21.03, 105.85] ] // Tiến ra Bắc
      ]
    },
    {
      title: "4. Đại phá quân Thanh (1789)",
      desc: "Vua Quang Trung thần tốc tiến quân, đánh tan 29 vạn quân Thanh trong trận Ngọc Hồi - Đống Đa lịch sử.",
      center: [20.5, 106.0],
      zoom: 8,
      markers: [
        { coords: [16.47, 107.58], type: "capital", name: "Phú Xuân" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" },
        { coords: [20.95, 105.85], type: "battle", name: "Ngọc Hồi - Đống Đa" }
      ],
      routes: [
        [ [16.47, 107.58], [20.95, 105.85] ] // Thần tốc ra Bắc
      ]
    }
  ]
};