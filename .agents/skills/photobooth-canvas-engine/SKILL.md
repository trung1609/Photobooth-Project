---
name: photobooth-canvas-engine
description: Kỹ thuật xử lý Canvas 2D, ghép ảnh đa khung (Photo Strip 1x4, Grid 2x2), áp dụng CSS/Canvas filter và xuất ảnh 300 DPI.
---

# Photobooth Canvas Engine Guide

## 1. Nguyên lý kết hợp ảnh vào Khung (Composite Rendering)
Một dải ảnh photobooth hoàn chỉnh gồm các layer sau:
1. **Background Layer**: Màu nền (Hex color pastel hoặc gradient) hoặc ảnh nền mẫu.
2. **Photos Layer**: Các ảnh chụp từ webcam được crop và scale chuẩn tỷ lệ (cover) vẽ vào từng tọa độ ô (`slots_config`).
3. **Overlay Frame Layer**: Ảnh viền trang trí / họa tiết PNG trong suốt đè lên trên ảnh chụp.
4. **Stickers & Doodles Layer**: Các icon, sticker, chữ vẽ tay được vẽ theo tọa độ người dùng kéo thả.
5. **Watermark / Footer Layer**: Logo photobooth, con dấu thời gian (ví dụ: `2026.10.27 • PHOTOXINHH`).

## 2. Xuất ảnh độ phân giải cao (High-Res 300 DPI Export)
- Tránh xuất canvas theo kích thước hiển thị trên màn hình điện thoại (thường chỉ 300-400px chiều rộng sẽ bị vỡ nét khi in).
- Sử dụng **OffscreenCanvas** hoặc một hidden canvas có kích thước thực:
  - Khổ 1x4 strip đơn: `600px x 1800px` (2x6 inch ở 300 DPI).
  - Khổ 1x4 strip đôi (2 dải cạnh nhau): `1200px x 1800px` (4x6 inch ở 300 DPI).
  - Khổ 2x2 grid: `1200px x 1800px` hoặc `1200px x 1600px`.
- Chuyển đổi sang file ảnh chất lượng tối đa:
  `canvas.toDataURL('image/png', 1.0)` hoặc `canvas.toBlob(blob => {...}, 'image/png')`.

## 3. Thuật toán Crop ảnh "object-fit: cover" trên Canvas
```javascript
function drawImageProp(ctx, img, x, y, w, h) {
    const imgRatio = img.width / img.height;
    const targetRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > targetRatio) {
        sHeight = img.height;
        sWidth = img.height * targetRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
    } else {
        sWidth = img.width;
        sHeight = img.width / targetRatio;
        sx = 0;
        sy = (img.height - sHeight) / 2;
    }
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}
```
