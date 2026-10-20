# Phong trào Tây Sơn – Bộ trình chiếu HTML/CSS/JS

## Cách chạy
1. Tạo thư mục `phong-trao-tay-son/`
2. Bỏ 4 file `index.html`, `style.css`, `data.js`, `app.js` vào
3. Mở `index.html` bằng Chrome / Edge / Firefox → chạy ngay

## Điều khiển
- `→` hoặc `Space`: slide tiếp theo
- `←`: slide trước
- `Home` / `End`: về đầu / cuối
- Click vào dãy chấm tròn dưới màn hình để nhảy slide
- Bấm vào marker trên bản đồ để xem mô tả
- Lăn chuột trên bản đồ: phóng to thu nhỏ (khi đang ở slide bản đồ)

## Cách chỉnh sửa nội dung
**Toàn bộ nội dung nằm trong `data.js`.** Mở file bằng Notepad / VS Code / Sublime, sửa phần chữ trong dấu `""`.

Ví dụ muốn đổi mô tả sự kiện 1771:
```js
{ year: "1771", title: "Khởi nghĩa bùng nổ",
  desc: "Mô tả mới của bạn...", coords: [13.95, 108.65] }