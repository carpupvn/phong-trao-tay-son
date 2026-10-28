const DATA = {
  events: [
    { year: "1771", title: "Khởi nghĩa bùng nổ", desc: "Ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dựng cờ tại Tây Sơn thượng đạo." },
    { year: "1773", title: "Chiếm Quy Nhơn", desc: "Hạ phủ thành Quy Nhơn, tạo bước ngoặt." },
    { year: "1774", title: "Mở rộng địa bàn", desc: "Kiểm soát từ Quảng Nam đến Bình Thuận." },
    { year: "1777", title: "Lật đổ chúa Nguyễn", desc: "Xóa bỏ chính quyền chúa Nguyễn ở Đàng Trong." },
    { year: "1778", title: "Nguyễn Nhạc lên ngôi", desc: "Đóng đô tại thành Đồ Bàn (Bình Định)." },
    { year: "1785", title: "Rạch Gầm - Xoài Mút", desc: "Đánh tan 5 vạn quân Xiêm xâm lược." },
    { year: "1786-1788", title: "Tiến ra Bắc", desc: "Lật đổ chúa Trịnh, chấm dứt triều Lê." },
    { year: "1789", title: "Ngọc Hồi - Đống Đa", desc: "Đại phá 29 vạn quân Thanh." }
  ],

  mapSteps: [
    {
      title: "Bước 1: Dựng cờ khởi nghĩa (1771)",
      desc: "Mùa xuân năm 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ dựng cờ khởi nghĩa tại vùng rừng núi Tây Sơn thượng đạo (An Khê, Gia Lai ngày nay).\n\n• Chủ trương của nghĩa quân: 'Lấy của nhà giàu chia cho người nghèo', được nhân dân khắp nơi hưởng ứng nhiệt liệt.\n• Đây là bước khởi đầu đặt nền móng cho toàn bộ phong trào.",
      center: [13.95, 108.65],
      zoom: 9,
      markers: [
        { coords: [13.95, 108.65], type: "start", name: "Tây Sơn thượng đạo" }
      ],
      routes: []
    },
    {
      title: "Bước 2: Mở rộng địa bàn, chiếm Quy Nhơn (1773-1774)",
      desc: "Từ căn cứ Tây Sơn, nghĩa quân nhanh chóng tỏa xuống đồng bằng.\n\n• Tháng 9/1773: Nghĩa quân hạ phủ thành Quy Nhơn, tạo bước ngoặt quan trọng.\n• Năm 1774: Kiểm soát một vùng đất rộng lớn từ Quảng Nam đến Bình Thuận, uy hiếp mạnh chính quyền chúa Nguyễn ở Đàng Trong.",
      center: [13.8, 108.9],
      zoom: 8,
      markers: [
        { coords: [13.95, 108.65], type: "start", name: "Tây Sơn thượng đạo" },
        { coords: [13.78, 109.22], type: "capital", name: "Phủ thành Quy Nhơn" }
      ],
      routes: [ [ [13.95, 108.65], [13.78, 109.22] ] ]
    },
    {
      title: "Bước 3: Lật đổ chúa Nguyễn (1777-1778)",
      desc: "Năm 1777, nghĩa quân Tây Sơn tiến vào Gia Định, lật đổ chính quyền chúa Nguyễn ở Đàng Trong.\n\n• Nguyễn Ánh sống sót, phải chạy sang Xiêm cầu viện.\n• Năm 1778, Nguyễn Nhạc lên ngôi hoàng đế, đóng đô tại thành Đồ Bàn (Bình Định), xây dựng chính quyền mới.",
      center: [12.5, 107.5],
      zoom: 7,
      markers: [
        { coords: [13.78, 109.22], type: "capital", name: "Quy Nhơn" },
        { coords: [10.75, 106.75], type: "battle", name: "Gia Định" },
        { coords: [13.85, 109.0], type: "capital", name: "Thành Đồ Bàn" }
      ],
      routes: [ [ [13.78, 109.22], [10.75, 106.75] ] ]
    },
    {
      title: "Bước 4: Đánh tan quân Xiêm (1785)",
      desc: "Lợi dụng Nguyễn Ánh cầu viện, cuối năm 1784, vua Xiêm sai Chiêu Tăng, Chiêu Sương đem 5 vạn quân theo đường thủy tiến vào Gia Định.\n\n• Tháng 1/1785: Nguyễn Huệ chọn khúc sông Tiền từ Rạch Gầm đến Xoài Mút làm trận địa mai phục.\n• Chiến thuật: Nghi binh, nhử địch vào sâu, thủy quân Tây Sơn chặn đánh từ nhiều hướng.\n• Kết quả: Đánh tan tác 5 vạn quân Xiêm, bảo vệ vững chắc bờ cõi phía Nam.",
      center: [11.0, 106.5],
      zoom: 8,
      markers: [
        { coords: [10.75, 106.75], type: "capital", name: "Gia Định" },
        { coords: [10.35, 106.35], type: "battle", name: "Rạch Gầm - Xoài Mút" }
      ],
      routes: [ [ [10.75, 106.75], [10.35, 106.35] ] ]
    },
    {
      title: "Bước 5: Tiến ra Bắc, diệt Trịnh (1786-1788)",
      desc: "Sau khi ổn định phía Nam, Nguyễn Huệ tiến quân ra Bắc với danh nghĩa 'phù Lê, diệt Trịnh'.\n\n• Tháng 6/1786: Quân Tây Sơn thần tốc vượt đèo Hải Vân, hạ thành Phú Xuân (Huế).\n• Sau đó tiến thẳng ra Thăng Long, lật đổ chúa Trịnh. Chính quyền nhà Lê cũng nhanh chóng sụp đổ.\n• Về cơ bản, quân Tây Sơn đã xóa bỏ ranh giới chia cắt Đàng Trong - Đàng Ngoài kéo dài hơn 200 năm.",
      center: [17.5, 106.5],
      zoom: 6,
      markers: [
        { coords: [13.78, 109.22], type: "start", name: "Quy Nhơn" },
        { coords: [16.47, 107.58], type: "battle", name: "Phú Xuân" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" }
      ],
      routes: [ [ [13.78, 109.22], [16.47, 107.58], [21.03, 105.85] ] ]
    },
    {
      title: "Bước 6: Đại phá quân Thanh (1789)",
      desc: "Cuối 1788, Lê Chiêu Thống cầu cứu nhà Thanh. Vua Thanh cử Tôn Sĩ Nghị đem 29 vạn quân xâm lược.\n\n• Tháng 12/1788: Nguyễn Huệ lên ngôi Hoàng đế (niên hiệu Quang Trung) tại Phú Xuân.\n• Cuộc hành quân thần tốc: Chỉ trong 5 ngày đêm (từ 25 đến 30 Tết), quân Tây Sơn đã quét sạch các cứ điểm phòng thủ của địch.\n• Mùng 5 Tết Kỷ Dậu (1789): Trận quyết chiến tại Ngọc Hồi - Đống Đa, đánh tan 29 vạn quân Thanh, giành lại độc lập cho dân tộc.",
      center: [19.5, 106.0],
      zoom: 7,
      markers: [
        { coords: [16.47, 107.58], type: "capital", name: "Phú Xuân" },
        { coords: [20.25, 105.97], type: "battle", name: "Tam Điệp - Biện Sơn" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" },
        { coords: [20.95, 105.85], type: "battle", name: "Ngọc Hồi - Đống Đa" }
      ],
      routes: [ [ [16.47, 107.58], [20.25, 105.97], [20.95, 105.85] ] ]
    }
  ]
};