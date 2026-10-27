---
name: superpowers-tdd
description: Hướng dẫn chu trình phát triển hướng kiểm thử TDD (Red-Green-Refactor) cho Backend và Frontend.
---

# Superpowers: Test-Driven Development (TDD)

## Quy trình 3 bước bắt buộc
1. **RED (Tạo bài test trước)**:
   - Viết test thể hiện đúng hành vi mong đợi.
   - Chạy test và xác nhận test FAIL (để chứng minh test có giá trị và không bị pass ảo).
2. **GREEN (Viết code tối thiểu)**:
   - Viết lượng code vừa đủ để test chuyển sang PASS.
   - Không tối ưu hóa sớm trong bước này.
3. **REFACTOR (Tối ưu hóa)**:
   - Dọn dẹp code, xóa bỏ duplication, đặt tên biến rõ ràng.
   - Chạy lại test để đảm bảo vẫn PASS 100%.

## Áp dụng trong dự án Photobooth
- **Backend (Spring Boot)**:
  - Test service tính toán tọa độ khung, test logic hết hạn session token qua JUnit 5 + Mockito.
  - Test controller API trả về HTTP status chuẩn (200, 201, 400, 404).
- **Frontend (React)**:
  - Test pure functions (tính toán aspect ratio, format date, chuyển đổi blob to base64, canvas filter calculations).
