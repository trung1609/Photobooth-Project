---
name: ant-design-system
description: Quy chuẩn Design System Ant Design 5.x từ repo ant-design/ant-design. Cung cấp hệ thống design tokens, nguyên lý giao diện, bảng màu, typography và tương tác người dùng chuẩn mực.
---

# Ant Design System Specification & Tokens

Nguồn gốc trực tiếp từ `https://github.com/ant-design/ant-design` (`DESIGN.md`).

## 1. Giá trị Thiết kế Cốt lõi (Core Design Values)
1. **Natural (Tự nhiên)**: Mô phỏng hành vi tự nhiên của con người, giảm thiểu nhận thức phức tạp.
2. **Certain (Rõ ràng / Chắc chắn)**: Đưa ra phản hồi chính xác, hạn chế tình trạng mơ hồ trong các luồng nghiệp vụ.
3. **Meaningful (Có ý nghĩa)**: Tập trung vào nội dung mà người dùng thực sự quan tâm, loại bỏ thông tin rác.
4. **Growing (Phát triển / Mở rộng)**: Hệ thống mở, có khả năng mở rộng quy mô linh hoạt.

## 2. Hệ Thống Design Tokens

### Bảng Màu Chuẩn (Color Tokens)
* **Primary**: `#1677FF` (Daybreak Blue)
* **Success**: `#52C41A` (Polar Green)
* **Warning**: `#FAAD14` (Sunrise Yellow)
* **Error**: `#FF4D4F` (Dust Red)
* **Info**: `#1677FF`
* **Neutrals & Surfaces**:
  * Surface: `#FFFFFF` (Light) / `#141414` (Dark)
  * Surface Container: `#FAFAFA`
  * Text Primary: `#1F1F1F` (Opacity 88%)
  * Text Secondary: `#595959` (Opacity 45%)
  * Text Disabled: `#BFBFBF` (Opacity 25%)
  * Border / Outline: `#D9D9D9`
  * Border Split: `#F0F0F0`

### Typography Hierarchy
* **Display Large**: 38px, font-weight 600, line-height 46px.
* **Headline Large**: 30px, font-weight 600, line-height 38px.
* **Headline Medium**: 24px, font-weight 600, line-height 32px.
* **Title Large**: 16px, font-weight 600, line-height 24px.
* **Body Medium (Default)**: 14px, line-height 22px.
* **Body Small**: 12px, line-height 20px.

### Elevation & Shadows
* `box-shadow-tertiary`: `0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)`
* `box-shadow`: `0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)`
* `box-shadow-secondary`: Dùng cho Popover, Modal, Dropdown overlay.

## 3. Nguyên Tắc Thiết Kế Cho Ứng Dụng Photobooth
1. **Feedback Rõ Ràng**: Mọi thao tác (bấm chụp, đổi màu khung, tải ảnh) đều phải có visual feedback (nhún active:scale-95, loading spinner, toast message thông báo).
2. **Kích Thước Vùng Bấm (Touch Targets)**:
   - Nút chụp: Tối thiểu 56px chiều cao.
   - Nút công cụ / chọn màu: Tối thiểu 40px chiều cao với bo góc `border-radius: 8px` hoặc `rounded-xl`.
3. **Contrast Ratio**: Đảm bảo tỷ lệ tương phản văn bản so với nền tối thiểu 4.5:1 (WCAG AA).
