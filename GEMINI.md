# AGENT WORKSPACE INSTRUCTION & HARNESS 2.0 CONFIGURATION

Chào mừng đến với dự án **Photobooth Web Application** (Phong cách PhotoXinhh / Life4Cuts).
File này là Hiến pháp hoạt động tối cao cho Antigravity AI Agent trong toàn bộ workspace này.

---

## 1. NGUYÊN TẮC BẮT BUỘC HARNESS² (RECURSIVE AGENT HARNESSING)
Tuân thủ nghiêm ngặt mô hình Harness² của Google Research:
1. **Factual Grounding - Không bịa đặt thêm (Zero-Hallucination Policy)**:
   - KHÔNG tự suy diễn hoặc giả định API, file path, biến môi trường, hoặc cấu hình thư viện nếu chưa probe thực tế.
   - Khi cần dùng một thư viện, endpoint, hoặc cấu trúc dữ liệu, PHẢI kiểm tra mã nguồn thực tế hoặc probe bằng tool (`view_file`, `grep_search`, `run_command`).
2. **Vòng lặp Propose - Probe - Compose (PPC Loop)**:
   - **Propose**: Đưa ra giả thuyết/giải pháp rõ ràng, tối thiểu và tập trung.
   - **Probe**: Kiểm chứng trực tiếp qua compiler, linter, test runner, hoặc curl/HTTP trước khi xác nhận hoàn thành.
   - **Compose**: Chỉ tích hợp code vào codebase khi đã qua bước Probe thành công.
3. **Môi trường là Chân lý (Runtime Truth)**:
   - Mọi trạng thái hệ thống phải được phản ánh từ terminal/linter thực tế, không dựa vào phán đoán chủ quan.

---

## 2. NGUYÊN TẮC SUPERPOWERS (AGILE AI ENGINEERING)
Áp dụng kỷ luật kỹ thuật từ bộ kỹ năng `obra/superpowers`:
1. **Anti-Eager Coding**: Tuyệt đối không nhảy bổ vào viết code khi chưa hiểu rõ yêu cầu và chưa có test/kế hoạch cụ thể.
2. **Kỷ luật Plan-Driven**: Mọi tính năng lớn đều phải có checklist công việc tuần tự, rõ ràng, chia nhỏ task không quá 30 phút thực thi.
3. **Kỷ luật TDD (Test-Driven Development)**:
   - Viết test trước hoặc đồng thời với implementation logic nghiệp vụ phức tạp.
   - Luôn kiểm tra red (lỗi ban đầu) $\rightarrow$ green (sửa cho pass) $\rightarrow$ refactor (tối ưu mã sạch).
4. **Systematic Debugging**: Khi gặp bug, không sửa hú họa. Phải tìm nguyên nhân gốc (root-cause), đặt giả thuyết, probe để kiểm chứng rồi mới fix.

---

## 3. TIÊU CHUẨN DESIGN SYSTEM & THẨM MỸ (RICH AESTHETICS)
1. **Chuẩn mực UI/UX Photobooth**:
   - Sử dụng phong cách thẩm mỹ cao cấp lấy cảm hứng từ các booth chụp ảnh Hàn Quốc hiện đại (Life4Cuts, Photoism, Haru Film) và PhotoXinhh.
   - Bảng màu: HSL-tailored (Pastel pink `#ff80a1`, `#fdf2f8`, `#f472b6`, dark camera slate `#0f172a`).
   - Typography: Font hiện đại, sạch sẽ (Inter, Plus Jakarta Sans, Be Vietnam Pro).
   - Micro-interactions: Smooth hover, transitions, shutter camera flash, audio feedback.
2. **Touch-friendly & Responsive**:
   - Hỗ trợ tốt cả Desktop, Tablet và Mobile.
   - Kích thước touch target tối thiểu 44x44px cho các nút bấm chụp / chỉnh sửa.

---

## 4. QUY TẮC CÔNG NGHỆ BẮT BUỘC
* **Backend**: Java 21+ / Spring Boot 3.x, Spring Data JPA, PostgreSQL, Maven.
  - Tuân thủ Controller $\rightarrow$ Service $\rightarrow$ Repository $\rightarrow$ Entity / DTO pattern.
  - Xử lý Exception tập trung qua `@RestControllerAdvice`.
* **Frontend**: React + Vite + TypeScript + Tailwind CSS.
  - Quản lý state tập trung bằng Zustand.
  - Xử lý Canvas và Export ảnh chất lượng cao 300 DPI qua HTML5 Canvas / Fabric.
* **Database**: PostgreSQL với Flyway / DDL migration chuẩn, UUID primary keys cho các thực thể công khai.
