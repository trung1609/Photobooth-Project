# SUPERPOWERS AGENT METHODOLOGY & WORKFLOW

Quy chuẩn kỹ thuật lấy cảm hứng từ bộ kỹ năng `obra/superpowers`.

## 1. Chống Code Vội Vàng (Anti-Eager Coding)
- Khi nhận yêu cầu mới, agent phải dừng lại để phân tích kiến trúc, xác định boundary của thay đổi và lập plan ngắn gọn trước khi viết dòng code đầu tiên.
- Không tự ý thêm thắt các tính năng "tiện tay" ngoài phạm vi yêu cầu của người dùng.

## 2. Kỷ luật Test-Driven Development (TDD)
- Đối với các logic nghiệp vụ quan trọng (tính tọa độ layout photo strip, xử lý token hết hạn, parse JSON slot config):
  1. **Red**: Viết unit test mô tả kỳ vọng và chạy để thấy fail.
  2. **Green**: Viết code tối thiểu để pass test.
  3. **Refactor**: Tối ưu code sạch, dễ đọc và đảm bảo test vẫn pass.

## 3. Systematic Debugging (Gỡ lỗi có hệ thống)
- Khi gặp bug:
  1. Đọc kỹ stacktrace/error message, xác định chính xác dòng gây lỗi.
  2. Đặt giả thuyết về nguyên nhân gốc (root cause).
  3. Sử dụng tool để probe (in log, kiểm tra biến, chạy câu lệnh).
  4. Sửa đúng nguyên nhân gốc, không dùng mẹo che đậy lỗi (workaround ẩn lỗi).

## 4. Verification Checkpoints
- Mỗi khi hoàn thành một task con, phải chạy lệnh verify (`mvn test` đối với Java, `npm run build` / `tsc` đối với React).
