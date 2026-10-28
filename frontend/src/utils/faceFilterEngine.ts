// Face Filter AR Engine for Photobooth
// Provides live camera AR overlays and canvas snapshot compositing for cute Korean photobooth face props

export type FaceFilterType =
  | 'none'
  | 'bunny'
  | 'cat'
  | 'bear'
  | 'princess'
  | 'heart_glasses'
  | 'butterfly'
  | 'party'
  | 'idol_blush'
  | 'puppy'
  | 'devil';

export interface FaceFilterInfo {
  id: FaceFilterType;
  label: string;
  emoji: string;
  desc: string;
}

export const FACE_FILTERS: FaceFilterInfo[] = [
  { id: 'none', label: 'Tắt filter', emoji: '🚫', desc: 'Không áp dụng filter mặt' },
  { id: 'bunny', label: 'Tai Thỏ & Má Hồng', emoji: '🐰', desc: 'Tai thỏ nhung trắng hồng, mũi thỏ & má hồng tim' },
  { id: 'cat', label: 'Mèo Con & Râu', emoji: '🐱', desc: 'Tai mèo xinh xắn, râu mèo & má hồng đào' },
  { id: 'bear', label: 'Gấu Teddy Bông', emoji: '🧸', desc: 'Tai gấu tròn xoe, má ửng hồng ấm áp' },
  { id: 'princess', label: 'Vương Miện Công Chúa', emoji: '👑', desc: 'Vương miện vàng đính ngọc & ánh sao lấp lánh' },
  { id: 'heart_glasses', label: 'Kính Trái Tim Y2K', emoji: '🕶️', desc: 'Kính râm mắt trái tim hồng neon sành điệu' },
  { id: 'butterfly', label: 'Bướm Tiên & Má Hồng', emoji: '🦋', desc: 'Cánh bướm dập dìu trên tóc & má đào lấp lánh' },
  { id: 'party', label: 'Mũ Sinh Nhật Party', emoji: '🥳', desc: 'Nón sinh nhật chóp nhọn, pháo hoa bông & sao' },
  { id: 'idol_blush', label: 'Idol K-Pop Blush', emoji: '💖', desc: 'Má hồng K-Pop, ánh sao lấp lánh & nốt ruồi duyên' },
  { id: 'puppy', label: 'Cún Con Dễ Thương', emoji: '🐶', desc: 'Đôi tai cún cụp tinh nghịch & mũi cún đen xinh' },
  { id: 'devil', label: 'Kuromi Devil Horns', emoji: '😈', desc: 'Sừng ác quỷ tím Kuromi & cánh dơi mini' },
];

/**
 * Draws the active face AR filter directly onto a Canvas 2D context.
 * Used during takeSnapshot() and background Video Recap rendering.
 */
export function drawFaceFilterToCanvas(
  ctx: CanvasRenderingContext2D,
  filterId: FaceFilterType,
  width: number,
  height: number,
  pos: { x: number; y: number; scale: number } = { x: 0.5, y: 0.38, scale: 1.0 }
) {
  if (filterId === 'none') return;

  ctx.save();
  ctx.filter = 'none';

  const cx = width * pos.x;
  const cy = height * pos.y;
  const baseSize = Math.min(width, height) * 0.42 * (pos.scale || 1.0);

  switch (filterId) {
    case 'bunny': {
      // 1. Two Cute Bunny Ears on Top
      const earW = baseSize * 0.28;
      const earH = baseSize * 0.95;

      // Left Ear
      ctx.save();
      ctx.translate(cx - baseSize * 0.32, cy - baseSize * 0.45);
      ctx.rotate(-0.15);
      // Outer white ear
      ctx.beginPath();
      ctx.ellipse(0, -earH * 0.5, earW * 0.5, earH * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#fbcfe8';
      ctx.lineWidth = Math.max(2, baseSize * 0.015);
      ctx.stroke();
      // Inner pink ear
      ctx.beginPath();
      ctx.ellipse(0, -earH * 0.48, earW * 0.28, earH * 0.38, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f472b6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(cx + baseSize * 0.32, cy - baseSize * 0.45);
      ctx.rotate(0.18);
      // Outer white ear
      ctx.beginPath();
      ctx.ellipse(0, -earH * 0.5, earW * 0.5, earH * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#fbcfe8';
      ctx.lineWidth = Math.max(2, baseSize * 0.015);
      ctx.stroke();
      // Inner pink ear
      ctx.beginPath();
      ctx.ellipse(0, -earH * 0.48, earW * 0.28, earH * 0.38, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f472b6';
      ctx.fill();
      ctx.restore();

      // 2. Rosy Cheek Blush
      const blushR = baseSize * 0.22;
      [-1, 1].forEach((dir) => {
        const bx = cx + dir * baseSize * 0.44;
        const by = cy + baseSize * 0.22;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, blushR);
        grad.addColorStop(0, 'rgba(251, 113, 133, 0.65)');
        grad.addColorStop(0.5, 'rgba(244, 63, 94, 0.35)');
        grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, blushR, 0, Math.PI * 2);
        ctx.fill();

        // White cute heart on cheek
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = `bold ${Math.round(baseSize * 0.12)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♡', bx, by);
      });

      // 3. Tiny Bunny Nose
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseSize * 0.12, baseSize * 0.06, baseSize * 0.045, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fb7185';
      ctx.fill();
      break;
    }

    case 'cat': {
      // 1. Two Triangular Cat Ears
      const earSize = baseSize * 0.45;
      [-1, 1].forEach((dir) => {
        const ex = cx + dir * baseSize * 0.35;
        const ey = cy - baseSize * 0.45;

        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(dir * 0.2);

        // Outer Ear
        ctx.beginPath();
        ctx.moveTo(-earSize * 0.45, earSize * 0.2);
        ctx.lineTo(0, -earSize * 0.75);
        ctx.lineTo(earSize * 0.45, earSize * 0.2);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = Math.max(2, baseSize * 0.02);
        ctx.stroke();

        // Inner Ear
        ctx.beginPath();
        ctx.moveTo(-earSize * 0.28, earSize * 0.12);
        ctx.lineTo(0, -earSize * 0.52);
        ctx.lineTo(earSize * 0.28, earSize * 0.12);
        ctx.closePath();
        ctx.fillStyle = '#fda4af';
        ctx.fill();

        ctx.restore();
      });

      // 2. Cat Whiskers (3 on each cheek)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = Math.max(2, baseSize * 0.012);
      ctx.lineCap = 'round';
      [-1, 1].forEach((dir) => {
        const sx = cx + dir * baseSize * 0.25;
        const sy = cy + baseSize * 0.18;
        const len = baseSize * 0.38;

        [-0.15, 0, 0.15].forEach((angle) => {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + dir * Math.cos(angle) * len, sy + Math.sin(angle) * len);
          ctx.stroke();
        });

        // Peach Blush
        const bx = cx + dir * baseSize * 0.42;
        const by = cy + baseSize * 0.22;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, baseSize * 0.18);
        grad.addColorStop(0, 'rgba(251, 113, 133, 0.55)');
        grad.addColorStop(1, 'rgba(251, 113, 133, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, baseSize * 0.18, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Cute Cat Nose
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseSize * 0.14, baseSize * 0.05, baseSize * 0.038, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      break;
    }

    case 'bear': {
      // 1. Round Teddy Bear Ears
      const earR = baseSize * 0.24;
      [-1, 1].forEach((dir) => {
        const ex = cx + dir * baseSize * 0.42;
        const ey = cy - baseSize * 0.48;

        // Outer ear
        ctx.beginPath();
        ctx.arc(ex, ey, earR, 0, Math.PI * 2);
        ctx.fillStyle = '#b45309';
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = Math.max(2, baseSize * 0.018);
        ctx.stroke();

        // Inner ear
        ctx.beginPath();
        ctx.arc(ex, ey, earR * 0.58, 0, Math.PI * 2);
        ctx.fillStyle = '#fde68a';
        ctx.fill();
      });

      // 2. Warm Peach Blush
      [-1, 1].forEach((dir) => {
        const bx = cx + dir * baseSize * 0.42;
        const by = cy + baseSize * 0.2;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, baseSize * 0.2);
        grad.addColorStop(0, 'rgba(251, 146, 60, 0.55)');
        grad.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, baseSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Bear Nose & Snout
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseSize * 0.15, baseSize * 0.12, baseSize * 0.08, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fef3c7';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseSize * 0.13, baseSize * 0.045, baseSize * 0.03, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      break;
    }

    case 'princess': {
      // 1. Sparkling Princess Tiara
      const crownW = baseSize * 0.75;
      const crownH = baseSize * 0.45;
      const ty = cy - baseSize * 0.65;

      ctx.save();
      ctx.translate(cx, ty);

      // Gold Tiara Base
      ctx.beginPath();
      ctx.moveTo(-crownW * 0.5, 0);
      ctx.lineTo(-crownW * 0.35, -crownH * 0.55);
      ctx.lineTo(-crownW * 0.18, -crownH * 0.25);
      ctx.lineTo(0, -crownH * 0.95);
      ctx.lineTo(crownW * 0.18, -crownH * 0.25);
      ctx.lineTo(crownW * 0.35, -crownH * 0.55);
      ctx.lineTo(crownW * 0.5, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.95)';
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = Math.max(2, baseSize * 0.016);
      ctx.stroke();

      // Gems & Jewels
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, -crownH * 0.5, baseSize * 0.045, 0, Math.PI * 2);
      ctx.fill();

      [-crownW * 0.35, crownW * 0.35].forEach((gx) => {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(gx, -crownH * 0.25, baseSize * 0.035, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 2. Soft Highlighter Blush
      [-1, 1].forEach((dir) => {
        const bx = cx + dir * baseSize * 0.42;
        const by = cy + baseSize * 0.2;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, baseSize * 0.2);
        grad.addColorStop(0, 'rgba(244, 114, 182, 0.55)');
        grad.addColorStop(1, 'rgba(244, 114, 182, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, baseSize * 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.font = `${Math.round(baseSize * 0.1)}px sans-serif`;
        ctx.fillText('✨', bx, by);
      });
      break;
    }

    case 'heart_glasses': {
      // 1. Neon Pink Y2K Heart Sunglasses
      const lensR = baseSize * 0.22;
      [-1, 1].forEach((dir) => {
        const lx = cx + dir * baseSize * 0.25;
        const ly = cy + baseSize * 0.02;

        ctx.save();
        ctx.translate(lx, ly);
        ctx.scale(lensR / 30, lensR / 30);

        // Heart Shape
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.bezierCurveTo(-25, -20, -45, 10, 0, 45);
        ctx.bezierCurveTo(45, 10, 25, -20, 0, 10);
        ctx.closePath();

        ctx.fillStyle = 'rgba(244, 63, 94, 0.85)';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // White Glare Reflection
        ctx.beginPath();
        ctx.ellipse(-10, 5, 8, 3, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        ctx.restore();
      });

      // Center Bridge
      ctx.beginPath();
      ctx.moveTo(cx - baseSize * 0.08, cy + baseSize * 0.04);
      ctx.quadraticCurveTo(cx, cy + baseSize * 0.01, cx + baseSize * 0.08, cy + baseSize * 0.04);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(2, baseSize * 0.016);
      ctx.stroke();
      break;
    }

    case 'butterfly': {
      // 1. Two Monarch / Pastel Butterflies on Temples
      [-1, 1].forEach((dir) => {
        const bx = cx + dir * baseSize * 0.46;
        const by = cy - baseSize * 0.32;

        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(dir * (baseSize / 150), baseSize / 150);
        ctx.rotate(dir * 0.2);

        // Upper Wing
        ctx.beginPath();
        ctx.ellipse(22, -18, 26, 16, Math.PI / 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 132, 252, 0.9)';
        ctx.fill();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Lower Wing
        ctx.beginPath();
        ctx.ellipse(16, 12, 18, 11, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.85)';
        ctx.fill();
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 4, 16, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#475569';
        ctx.fill();

        ctx.restore();

        // Peach & Sparkle Blush
        const chx = cx + dir * baseSize * 0.42;
        const chy = cy + baseSize * 0.2;
        const grad = ctx.createRadialGradient(chx, chy, 0, chx, chy, baseSize * 0.18);
        grad.addColorStop(0, 'rgba(244, 114, 182, 0.55)');
        grad.addColorStop(1, 'rgba(244, 114, 182, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(chx, chy, baseSize * 0.18, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'party': {
      // 1. Party Cone Hat
      const hatW = baseSize * 0.45;
      const hatH = baseSize * 0.75;
      const hy = cy - baseSize * 0.55;

      ctx.save();
      ctx.translate(cx, hy);
      ctx.rotate(0.12);

      // Hat Triangle
      ctx.beginPath();
      ctx.moveTo(-hatW * 0.5, 0);
      ctx.lineTo(0, -hatH);
      ctx.lineTo(hatW * 0.5, 0);
      ctx.closePath();
      ctx.fillStyle = '#ec4899';
      ctx.fill();

      // Yellow Stripes
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = Math.max(3, baseSize * 0.025);
      [-0.25, -0.5, -0.75].forEach((prog) => {
        const y = hatH * prog;
        const w = hatW * 0.5 * (1 + prog);
        ctx.beginPath();
        ctx.moveTo(-w, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      });

      // Fluffy Pom-pom at Tip
      ctx.beginPath();
      ctx.arc(0, -hatH, baseSize * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.fill();

      ctx.restore();

      // Confetti Sparkles
      ctx.font = `${Math.round(baseSize * 0.12)}px sans-serif`;
      ctx.fillText('🎉', cx - baseSize * 0.45, cy - baseSize * 0.35);
      ctx.fillText('⭐', cx + baseSize * 0.45, cy - baseSize * 0.35);
      break;
    }

    case 'idol_blush': {
      // K-Pop Idol Blush & Sparkles
      [-1, 1].forEach((dir) => {
        const bx = cx + dir * baseSize * 0.42;
        const by = cy + baseSize * 0.18;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, baseSize * 0.22);
        grad.addColorStop(0, 'rgba(251, 113, 133, 0.7)');
        grad.addColorStop(0.6, 'rgba(244, 63, 94, 0.35)');
        grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, baseSize * 0.22, 0, Math.PI * 2);
        ctx.fill();

        // 4-point Sparkle Star
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = `bold ${Math.round(baseSize * 0.1)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✦', bx, by - baseSize * 0.04);
        ctx.fillText('♡', bx + dir * baseSize * 0.06, by + baseSize * 0.05);
      });
      break;
    }

    case 'puppy': {
      // 1. Floppy Puppy Ears
      [-1, 1].forEach((dir) => {
        const ex = cx + dir * baseSize * 0.44;
        const ey = cy - baseSize * 0.35;

        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(dir * 0.18);

        // Floppy ear
        ctx.beginPath();
        ctx.ellipse(0, baseSize * 0.3, baseSize * 0.16, baseSize * 0.36, dir * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#b45309';
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = Math.max(2, baseSize * 0.016);
        ctx.stroke();

        ctx.restore();
      });

      // 2. Black Button Puppy Nose
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseSize * 0.14, baseSize * 0.07, baseSize * 0.05, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.ellipse(cx - baseSize * 0.02, cy + baseSize * 0.12, baseSize * 0.02, baseSize * 0.012, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Pink Tongue
      ctx.beginPath();
      ctx.arc(cx, cy + baseSize * 0.22, baseSize * 0.045, 0, Math.PI);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      break;
    }

    case 'devil': {
      // Kuromi Purple Devil Horns & Mini Bat Wings
      const hornW = baseSize * 0.22;
      const hornH = baseSize * 0.45;
      [-1, 1].forEach((dir) => {
        const hx = cx + dir * baseSize * 0.32;
        const hy = cy - baseSize * 0.45;

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(dir * 0.25);

        ctx.beginPath();
        ctx.moveTo(-hornW * 0.5, 0);
        ctx.quadraticCurveTo(0, -hornH * 0.6, dir * hornW * 0.6, -hornH);
        ctx.quadraticCurveTo(hornW * 0.2, -hornH * 0.4, hornW * 0.5, 0);
        ctx.closePath();

        ctx.fillStyle = '#581c87';
        ctx.fill();
        ctx.strokeStyle = '#9333ea';
        ctx.lineWidth = Math.max(2, baseSize * 0.015);
        ctx.stroke();

        ctx.restore();

        // Dark Purple Blush
        const bx = cx + dir * baseSize * 0.42;
        const by = cy + baseSize * 0.2;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, baseSize * 0.18);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0.55)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, baseSize * 0.18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#d8b4fe';
        ctx.font = `${Math.round(baseSize * 0.1)}px sans-serif`;
        ctx.fillText('🖤', bx, by);
      });
      break;
    }
  }

  ctx.restore();
}

