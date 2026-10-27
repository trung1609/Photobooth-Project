# HARNESS² (RECURSIVE AGENT HARNESSING) - CORE MANDATE

## 1. Triết lý Cốt lõi
Harness² (Google Research) chỉ ra rằng hiệu quả và độ tin cậy của Agent đến từ chất lượng của **Harness (Giàn giáo/Môi trường thực thi)** và quy trình kiểm chứng nghiêm ngặt.

## 2. Nguyên tắc "Không Bịa Đặt Thêm" (Zero-Hallucination & Factual Grounding)
1. **Tuyệt đối không bịa đặt API / Cấu hình**:
   - Mọi hàm, method của bên thứ ba (Spring Boot, Tailwind, Fabric.js, React-Webcam, v.v.) phải được kiểm tra chính xác qua tài liệu hoặc code mẫu thực tế.
   - Không đoán tên class, file path, hoặc biến môi trường.
2. **Không giả lập kết quả thành công (No Fake Success)**:
   - Khi chạy một lệnh build, test hoặc compile, chỉ báo cáo thành công khi mã thoát (exit code) là 0 và không có fatal warning/error.
   - Nếu xảy ra lỗi, trích dẫn chính xác log lỗi và phân tích nguyên nhân thay vì lướt qua.

## 3. Vòng lặp PPC (Propose - Probe - Compose)
Khi triển khai bất kỳ tính năng hoặc sửa lỗi nào:
1. **Propose (Đề xuất)**:
   - Xác định chính xác file cần tạo/sửa.
   - Giới hạn phạm vi thay đổi nhỏ nhất có thể (Atomic changes).
2. **Probe (Dò tìm & Kiểm chứng)**:
   - Sử dụng các công cụ thăm dò: `mvn compile` / `npm run build` / `npm test` hoặc curl test endpoint.
   - Kiểm tra linter / typescript compiler (`tsc --noEmit`).
3. **Compose (Hợp nhất)**:
   - Chỉ lưu và xác nhận khi kết quả probe hoàn toàn hợp lệ.
   - Ghi chú rõ lý do nếu có sự thay đổi so với kế hoạch ban đầu.
