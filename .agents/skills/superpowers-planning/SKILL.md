---
name: superpowers-planning
description: Quy trình lập kế hoạch theo phong cách Superpowers, chia nhỏ bài toán thành các task cụ thể trước khi thực hiện.
---

# Superpowers: Planning & Task Decomposition

## Mục đích
Đảm bảo mọi tính năng được chia nhỏ rõ ràng, có thứ tự thực hiện khoa học, tránh code lan man và đảm bảo kiểm thử được.

## Quy trình lập kế hoạch
1. **Xác định mục tiêu (Goal)**: Tính năng này giải quyết vấn đề gì cho người dùng photobooth?
2. **Liệt kê file bị ảnh hưởng**: File nào cần tạo mới, file nào cần sửa?
3. **Checklist công việc tuần tự**:
   - Bước 1: Data model / API Contract / Interface type.
   - Bước 2: Business logic / Service layer hoặc Hook.
   - Bước 3: UI Component & User interaction.
   - Bước 4: Verification test (Unit test / Linter / Manual browser check).
4. **Quy tắc**: Mỗi task không kéo dài quá một chu kỳ ngắn. Kiểm tra kết quả ngay sau mỗi bước.
