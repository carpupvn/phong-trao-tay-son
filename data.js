const DATA = {
  events: [
    { year: "1771", title: "Khởi nghĩa bùng nổ", desc: "Mùa xuân 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dựng cờ khởi nghĩa tại Tây Sơn thượng đạo (An Khê, Gia Lai).", coords: [13.95, 108.65] },
    { year: "1773", title: "Chiếm phủ thành Quy Nhơn", desc: "Tháng 9/1773, nghĩa quân chiếm phủ thành Quy Nhơn, tạo bước ngoặt quan trọng.", coords: [13.78, 109.22] },
    { year: "1774", title: "Mở rộng địa bàn", desc: "Giữa năm 1774, nghĩa quân kiểm soát vùng đất từ Quảng Nam đến Bình Thuận.", coords: [15.5, 108.5] },
    { year: "1777", title: "Lật đổ chúa Nguyễn", desc: "Năm 1777, nghĩa quân lật đổ chính quyền chúa Nguyễn ở Đàng Trong.", coords: [13.78, 109.22] },
    { year: "1778", title: "Nguyễn Nhạc lên ngôi", desc: "Năm 1778, Nguyễn Nhạc lên ngôi hoàng đế, đóng đô tại thành Đồ Bàn (Quy Nhơn, Bình Định).", coords: [13.85, 109.0] },
    { year: "1785", title: "Chiến thắng Rạch Gầm – Xoài Mút", desc: "Tháng 1/1785, Nguyễn Huệ chỉ huy quân Tây Sơn đánh tan 5 vạn quân Xiêm tại Rạch Gầm – Xoài Mút.", coords: [10.35, 106.35] },
    { year: "1786–1788", title: "Tiến ra Bắc, diệt Trịnh", desc: "Năm 1786, quân Tây Sơn tiến ra Bắc, lật đổ chúa Trịnh. Năm 1788, chính quyền nhà Lê sụp đổ hoàn toàn.", coords: [21.03, 105.85] },
    { year: "1788–1789", title: "Đại phá quân Thanh", desc: "Tháng 12/1788, Nguyễn Huệ lên ngôi Hoàng đế (niên hiệu Quang Trung). Năm 1789, chiến thắng Ngọc Hồi – Đống Đa, đánh tan 29 vạn quân Thanh.", coords: [20.95, 105.85] }
  ],

  locations: [
    { name: "Tây Sơn thượng đạo (An Khê, Gia Lai)", coords: [13.95, 108.65], type: "start", desc: "Nơi khởi nghĩa bùng nổ mùa xuân 1771." },
    { name: "Phủ thành Quy Nhơn (Bình Định)", coords: [13.78, 109.22], type: "capital", desc: "Căn cứ quan trọng – nghĩa quân chiếm tháng 9/1773." },
    { name: "Thành Đồ Bàn", coords: [13.85, 109.0], type: "capital", desc: "Kinh đô vương triều Tây Sơn (từ 1778)." },
    { name: "Rạch Gầm – Xoài Mút (Tiền Giang)", coords: [10.35, 106.35], type: "battle", desc: "Trận thủy chiến đánh tan 5 vạn quân Xiêm (1/1785)." },
    { name: "Phú Xuân (Huế)", coords: [16.47, 107.58], type: "capital", desc: "Kinh đô Đàng Trong – bị quân Tây Sơn hạ năm 1786." },
    { name: "Thăng Long (Hà Nội)", coords: [21.03, 105.85], type: "capital", desc: "Kinh đô Đàng Ngoài – quân Tây Sơn tiến vào năm 1786." },
    { name: "Ngọc Hồi – Đống Đa", coords: [20.95, 105.85], type: "battle", desc: "Chiến thắng lịch sử đánh tan 29 vạn quân Thanh (1/1789)." }
  ],

  marchRoute: [
    [13.95, 108.65],  // An Khê
    [13.78, 109.22],  // Quy Nhơn
    [10.35, 106.35],  // Rạch Gầm – Xoài Mút
    [13.78, 109.22],  // trở lại Quy Nhơn
    [16.47, 107.58],  // Phú Xuân
    [21.03, 105.85],  // Thăng Long
    [20.95, 105.85]   // Ngọc Hồi – Đống Đa
  ],

  phases: [
    { num: 1, title: "Dựng cờ, mở rộng địa bàn (1771–1774)", items: [ "Mùa xuân 1771: khởi nghĩa bùng nổ tại An Khê (Gia Lai)", "9/1773: chiếm phủ thành Quy Nhơn", "Giữa 1774: kiểm soát từ Quảng Nam đến Bình Thuận" ] },
    { num: 2, title: "Lật đổ chúa Nguyễn, đánh Xiêm (1775–1785)", items: [ "1777: lật đổ chính quyền chúa Nguyễn ở Đàng Trong", "1778: Nguyễn Nhạc lên ngôi, đóng đô tại Đồ Bàn", "1/1785: đánh tan 5 vạn quân Xiêm tại Rạch Gầm – Xoài Mút" ] },
    { num: 3, title: "Tiến ra Bắc, thống nhất đất nước (1786–1788)", items: [ "1786: hạ Phú Xuân, tiến ra Thăng Long, lật đổ chúa Trịnh", "1788: chính quyền nhà Lê sụp đổ hoàn toàn" ] },
    { num: 4, title: "Đại phá quân Thanh (1788–1789)", items: [ "12/1788: Nguyễn Huệ lên ngôi Hoàng đế (niên hiệu Quang Trung)", "1/1789: chiến thắng Ngọc Hồi – Đống Đa, đánh tan 29 vạn quân Thanh" ] }
  ]
};