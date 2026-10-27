# 📸 Photobooth Web Application (Phong cách PhotoXinhh / Life4Cuts)

Hệ thống chụp và xuất ảnh Photobooth trực tuyến chất lượng cao, chuẩn phong cách Hàn Quốc và Y2K.

---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend**:
  * React 19 + TypeScript + Vite
  * Tailwind CSS v4 (Cấu hình `@tailwindcss/vite`)
  * Lucide Icons, Zustand (State Management)
  * HTML5 Canvas Engine (Xử lý ảnh, filter màu, xuất 300 DPI)
  * Web Audio API (Hiệu ứng âm thanh đếm ngược và chụp ảnh)
* **Backend**:
  * Java 21 / 22 + Spring Boot 3.3.x
  * Spring Data JPA + Hibernate
  * PostgreSQL 16 (Hỗ trợ cấu hình Docker Compose)
  * Google ZXing (Sinh mã QR code tải ảnh trực tiếp)
* **Quy chuẩn Agent**:
  * **Harness²** (Google Research): Factual Grounding, không bịa đặt, vòng lặp Propose - Probe - Compose.
  * **Superpowers**: Kỷ luật lập kế hoạch, chống eager coding, TDD và gỡ lỗi có hệ thống.
  * **Design System**: Korean Photobooth Aesthetics (Pastel pink, Dark camera studio, High-Res 300 DPI).

---

## 🚀 Hướng Dẫn Khởi Chạy Nhanh

### 1. Khởi động PostgreSQL
```bash
docker-compose up -d
```

### 2. Khởi động Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend API chạy tại: `http://localhost:8080` (Health check: `/api/v1/health`).

### 3. Khởi động Frontend (React)
```bash
cd frontend
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173`.

---

## 📂 Cấu Trúc Dự Án Chuẩn

```
Photobooth/
├── .agents/                          # Cấu hình Agentic AI
│   ├── rules/
│   │   ├── harness2-core.md          # Quy chuẩn Harness 2.0 (Zero-hallucination)
│   │   ├── superpowers-workflow.md   # Quy chuẩn Superpowers (Anti-eager, TDD)
│   │   └── design-system.md          # Quy chuẩn thẩm mỹ Photobooth
│   └── skills/
│       ├── superpowers-planning/     # Skill chia nhỏ bài toán
│       ├── superpowers-tdd/          # Skill Red-Green-Refactor
│       └── photobooth-canvas-engine/ # Kỹ thuật Canvas 300 DPI
├── backend/                          # Spring Boot API
│   ├── src/main/java/com/photobooth/api/
│   │   ├── config/WebConfig.java     # CORS & Static Resource
│   │   └── controller/HealthController.java
│   └── src/main/resources/application.yml
├── frontend/                         # React Vite App
│   ├── src/
│   │   ├── components/               # Navbar, CameraStudio, CustomizerStudio, ResultModal
│   │   ├── store/useBoothStore.ts    # Quản lý phiên chụp (Zustand)
│   │   ├── types/photobooth.ts       # Bố cục, bộ lọc, khung ảnh
│   │   └── App.tsx
│   └── vite.config.ts
├── docker-compose.yml                # PostgreSQL Service
└── GEMINI.md                         # Hiến pháp hoạt động tối cao của Agent
```
