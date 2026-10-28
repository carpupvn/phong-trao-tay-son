const DATA = {
  events: [
    { year: "1771", title: "Khởi nghĩa bùng nổ", desc: "Năm 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ dựng cờ khởi nghĩa tại Tây Sơn thượng đạo, thuộc khu vực An Khê ngày nay." },
    { year: "1773", title: "Chiếm phủ thành Quy Nhơn", desc: "Tháng 9/1773, nghĩa quân chiếm phủ thành Quy Nhơn, tạo bước ngoặt quan trọng." },
    { year: "1774", title: "Mở rộng địa bàn", desc: "Giữa năm 1774, nghĩa quân kiểm soát vùng đất từ Quảng Nam đến Bình Thuận." },
    { year: "1777", title: "Lật đổ chúa Nguyễn", desc: "Năm 1777, nghĩa quân lật đổ chính quyền chúa Nguyễn ở Đàng Trong." },
    { year: "1778", title: "Nguyễn Nhạc lên ngôi", desc: "Năm 1778, Nguyễn Nhạc lên ngôi hoàng đế, đóng đô tại thành Đồ Bàn." },
    { year: "1785", title: "Chiến thắng Rạch Gầm – Xoài Mút", desc: "Tháng 1/1785, Nguyễn Huệ đánh tan 5 vạn quân Xiêm." },
    { year: "1786–1788", title: "Tiến ra Bắc, diệt Trịnh", desc: "Lật đổ chúa Trịnh, chính quyền Lê sụp đổ hoàn toàn." },
    { year: "1789", title: "Đại phá quân Thanh", desc: "Chiến thắng Ngọc Hồi – Đống Đa, đánh tan 29 vạn quân Thanh." }
  ],

  mapSteps: [
    {
      title: "1. Dựng cờ, mở rộng địa bàn (1771-1774)",
      desc: "Năm 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ dựng cờ khởi nghĩa tại Tây Sơn thượng đạo (An Khê).\n\nNghĩa quân chủ trương 'lấy của nhà giàu chia cho người nghèo', được nhân dân khắp nơi hưởng ứng. Tháng 9/1773, nghĩa quân hạ phủ thành Quy Nhơn, tạo bước ngoặt quan trọng. Đến giữa năm 1774, nghĩa quân đã kiểm soát một vùng đất rộng lớn từ Quảng Nam đến Bình Thuận, uy hiếp mạnh mẽ chính quyền chúa Nguyễn ở Đàng Trong.",
      center: [13.5, 108.8],
      zoom: 8,
      markers: [
        { coords: [13.95, 108.65], type: "start", name: "Tây Sơn thượng đạo (An Khê)" },
        { coords: [13.78, 109.22], type: "capital", name: "Phủ Quy Nhơn" }
      ],
      routes: [ [ [13.95, 108.65], [13.78, 109.22] ] ]
    },
    {
      title: "2. Diệt chúa Nguyễn, đánh quân Xiêm (1775-1785)",
      desc: "Năm 1777, nghĩa quân Tây Sơn lật đổ chính quyền chúa Nguyễn ở Đàng Trong. Tuy nhiên, Nguyễn Ánh sống sót và sang Xiêm cầu viện.\n\nCuối năm 1784, vua Xiêm sai tướng Chiêu Tăng, Chiêu Sương đem 5 vạn quân tiến vào Gia Định. Tháng 1/1785, Nguyễn Huệ chọn khúc sông Tiền từ Rạch Gầm đến Xoài Mút làm trận địa mai phục. Bằng chiến thuật nghi binh, nhử địch vào sâu, quân Tây Sơn đã đánh tan tác 5 vạn quân Xiêm, giữ vững bờ cõi phía Nam.",
      center: [12.0, 107.5],
      zoom: 6,
      markers: [
        { coords: [13.78, 109.22], type: "capital", name: "Quy Nhơn" },
        { coords: [10.35, 106.35], type: "battle", name: "Rạch Gầm - Xoài Mút" }
      ],
      routes: [ [ [13.78, 109.22], [10.35, 106.35] ] ]
    },
    {
      title: "3. Tiến ra Bắc, diệt Trịnh (1786-1788)",
      desc: "Sau khi ổn định phía Nam, Nguyễn Huệ tiến quân ra Bắc với danh nghĩa 'phù Lê, diệt Trịnh'.\n\nTháng 6/1786, quân Tây Sơn thần tốc hạ thành Phú Xuân, rồi tiến thẳng ra Thăng Long, lật đổ chúa Trịnh. Chính quyền nhà Lê cũng nhanh chóng sụp đổ hoàn toàn vào năm 1788. Về cơ bản, quân Tây Sơn đã hoàn thành việc xóa bỏ ranh giới chia cắt Đàng Trong - Đàng Ngoài, tạo tiền đề thống nhất đất nước.",
      center: [17.5, 106.5],
      zoom: 6,
      markers: [
        { coords: [13.78, 109.22], type: "start", name: "Quy Nhơn (Căn cứ)" },
        { coords: [16.47, 107.58], type: "battle", name: "Phú Xuân (Huế)" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" }
      ],
      routes: [ [ [13.78, 109.22], [16.47, 107.58], [21.03, 105.85] ] ]
    },
    {
      title: "4. Đại phá quân Thanh (1789)",
      desc: "Cuối năm 1788, lợi dụng lúc Tây Sơn rút quân, vua Lê Chiêu Thống cầu cứu nhà Thanh. Vua Thanh cử Tôn Sĩ Nghị đem 29 vạn quân xâm lược.\n\nTháng 12/1788, Nguyễn Huệ lên ngôi Hoàng đế (niên hiệu Quang Trung) tại Phú Xuân, rồi lập tức thần tốc tiến quân ra Bắc. Chỉ trong vòng 5 ngày đêm (từ 25 đến 30 Tết), quân Tây Sơn đã quét sạch các cứ điểm, đánh tan 29 vạn quân Thanh trong trận quyết chiến tại Ngọc Hồi - Đống Đa (mùng 5 Tết Kỷ Dậu 1789), giành lại độc lập cho dân tộc.",
      center: [20.5, 106.0],
      zoom: 8,
      markers: [
        { coords: [16.47, 107.58], type: "capital", name: "Phú Xuân" },
        { coords: [21.03, 105.85], type: "capital", name: "Thăng Long" },
        { coords: [20.95, 105.85], type: "battle", name: "Ngọc Hồi - Đống Đa" }
      ],
      routes: [ [ [16.47, 107.58], [20.95, 105.85] ] ]
    }
  ]
};