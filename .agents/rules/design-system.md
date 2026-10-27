# PHOTOBOOTH DESIGN SYSTEM STANDARDS (AESTHETICS & TOKENS)

## 1. Bản sắc Thẩm mỹ (Aesthetic Identity)
Thiết kế lấy cảm hứng từ các booth chụp ảnh Hàn Quốc đương đại (Life4Cuts, Photoism, Haru Film) và PhotoXinhh (`photo.freehihi.com`):
- **Tone màu chủ đạo**: Pastel Rose (`#f472b6`), Vibrant Pink (`#ec4899`), Warm Cream (`#fdf2f8`), Soft Violet (`#8b5cf6`).
- **Dark Studio Mode**: Khi ở màn hình Camera / Chụp ảnh, sử dụng theme tối sang trọng (`#0f172a`, `#1e293b`) giúp người dùng tập trung vào khung hình camera, tạo cảm giác như đang ở trong buồng chụp thật.
- **Glassmorphism & Micro-interactions**: Backdrop blur (`backdrop-blur-md`), viền mờ tinh tế (`border-pink-200/50`), hiệu ứng click nhún nhẹ (`active:scale-95`), flash trắng khi bấm chụp.

## 2. Typography
- Font chữ: `Plus Jakarta Sans`, `Inter` hoặc hệ font sans-serif hình học hiện đại.
- Hierarchy:
  - Display: 2rem - 2.5rem (32px - 40px), font-extrabold.
  - Section Headings: 1.25rem - 1.5rem (20px - 24px), font-bold.
  - Body: 0.875rem - 1rem (14px - 16px), line-height 1.5.
  - Captions/Timestamps: 0.75rem (12px), tracking-wider, uppercase.

## 3. Quy chuẩn Kích thước Khung ảnh & In ấn (Print Specs)
- **Tỷ lệ & Kích thước chuẩn khi xuất ảnh (Canvas High-Res 300 DPI)**:
  - **Dải dọc 1x4 (Strip)**: Tỷ lệ 1:3 (khi in là 2x6 inch ~ 600 x 1800 px ở 300 DPI, hoặc in cặp 2 strip song song 1200 x 1800 px trên khổ 4x6 inch / 10x15 cm).
  - **Lưới 2x2 (Grid)**: Tỷ lệ 2:3 hoặc 3:4 (chuẩn 1200 x 1800 px).
  - **Polaroid**: Tỷ lệ ảnh 1:1, viền dưới rộng để viết chữ / dán sticker.
- **Print Friendly**: CSS `@media print` ẩn toàn bộ header, nút bấm, thanh điều khiển, chỉ giữ lại canvas ảnh ở kích thước thực tế để in ra ngay.

## 4. Trải nghiệm Tương tác (UX Guidelines)
- Nút bấm to, rõ ràng, tối thiểu 48px chiều cao, thuận tiện cho thao tác chạm (Touchscreen / Mobile / Tablet).
- Trạng thái rõ ràng: Loading spinner, countdown number to đùng ở giữa màn hình (đếm 3.. 2.. 1.. Flash!), âm thanh shutter.
