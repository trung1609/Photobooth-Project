// Visual Frame Effects Engine for Photo Strips
// Renders decorative overlays (Bubbles, Fluttering Butterflies, Flying Birds, 3D Hearts, Sakura Petals, Stardust...)
// directly onto Canvas 2D at Ultra HD 300 DPI resolution.

import { LayoutType } from '../types/photobooth';

export type FrameEffectType =
  | 'none'
  | 'bubbles'
  | 'butterflies'
  | 'birds'
  | 'hearts'
  | 'sakura'
  | 'stardust'
  | 'snow'
  | 'rainbow'
  | 'vintage_leaks'
  | 'clovers';

export interface FrameEffectDefinition {
  id: FrameEffectType;
  label: string;
  emoji: string;
  desc: string;
  badge?: string;
}

export const FRAME_EFFECTS: FrameEffectDefinition[] = [
  {
    id: 'none',
    label: 'Không Hiệu Ứng',
    emoji: '🚫',
    desc: 'Giữ nguyên khung gốc mộc mạc',
  },
  {
    id: 'bubbles',
    label: 'Bong Bóng Mơ Màng',
    emoji: '🫧',
    desc: 'Chùm bong bóng ngũ sắc bồng bềnh viền quanh ảnh',
    badge: 'HOT',
  },
  {
    id: 'butterflies',
    label: 'Đàn Bướm Bay Lượn',
    emoji: '🦋',
    desc: 'Đàn bướm 3D pastel rực rỡ dập dìu quanh khung',
    badge: 'CUTE',
  },
  {
    id: 'birds',
    label: 'Chim Bay & Tia Sáng',
    emoji: '🕊️',
    desc: 'Đàn chim trắng lượn bay qua bầu trời kèm vệt sao',
    badge: 'NEW',
  },
  {
    id: 'hearts',
    label: 'Mưa Trái Tim 3D',
    emoji: '💖',
    desc: 'Những trái tim 3D bóng bẩy bay lơ lửng quanh viền',
  },
  {
    id: 'sakura',
    label: 'Hoa Anh Đào Rơi',
    emoji: '🌸',
    desc: 'Cánh hoa anh đào hồng rơi lãng mạn phong cách Hàn',
  },
  {
    id: 'stardust',
    label: 'Bụi Sao Ngân Hà Y2K',
    emoji: '⭐',
    desc: 'Ánh sao 4 cánh chrome bạc & bụi kim tuyến lấp lánh',
  },
  {
    id: 'snow',
    label: 'Tuyết Rơi Mùa Đông',
    emoji: '❄️',
    desc: 'Bông tuyết pha lê lung linh rơi nhẹ quanh dải ảnh',
  },
  {
    id: 'rainbow',
    label: 'Cầu Vồng & Mây Trắng',
    emoji: '🌈',
    desc: 'Dải cầu vồng pastel uốn lượn và mây trắng xốp cute',
  },
  {
    id: 'vintage_leaks',
    label: 'Vệt Sáng Cổ Điển',
    emoji: '🎞️',
    desc: 'Vệt nắng hoàng hôn ấm áp và hạt film vintage',
  },
  {
    id: 'clovers',
    label: 'Cỏ 4 Lá May Mắn',
    emoji: '🍀',
    desc: 'Dây thường xuân và cỏ 4 lá may mắn viền quanh khung',
  },
];

/**
 * Draws the selected visual effect onto the canvas context.
 */
export function drawFrameEffect(
  ctx: CanvasRenderingContext2D,
  effectId: FrameEffectType,
  w: number,
  h: number,
  _layout: LayoutType = '1x4_strip'
) {
  if (effectId === 'none') return;

  ctx.save();
  ctx.filter = 'none';
  const scale = w / 600;

  switch (effectId) {
    case 'bubbles': {
      // Big, lush, iridescent 3D Soap Bubbles & Heart-shaped bubbles (Matching Korean Photobooth Reference)
      const bubbles: { x: number; y: number; r: number; c: 'blue' | 'pink' | 'amber'; isHeart?: boolean }[] = [
        // Top edge cluster
        { x: 0.12, y: 0.03, r: 72, c: 'blue' },
        { x: 0.28, y: 0.05, r: 42, c: 'pink' },
        { x: 0.48, y: 0.02, r: 54, c: 'amber', isHeart: true },
        { x: 0.74, y: 0.04, r: 48, c: 'blue' },
        { x: 0.88, y: 0.05, r: 84, c: 'pink' },

        // Left margin floating bubbles
        { x: 0.05, y: 0.18, r: 62, c: 'pink', isHeart: true },
        { x: 0.08, y: 0.28, r: 38, c: 'blue' },
        { x: 0.04, y: 0.42, r: 78, c: 'blue' },
        { x: 0.07, y: 0.54, r: 45, c: 'amber' },
        { x: 0.05, y: 0.68, r: 68, c: 'pink', isHeart: true },
        { x: 0.09, y: 0.80, r: 36, c: 'blue' },
        { x: 0.06, y: 0.90, r: 58, c: 'amber' },

        // Right margin floating bubbles
        { x: 0.95, y: 0.16, r: 55, c: 'blue' },
        { x: 0.92, y: 0.29, r: 76, c: 'pink', isHeart: true },
        { x: 0.96, y: 0.44, r: 44, c: 'amber' },
        { x: 0.93, y: 0.58, r: 82, c: 'blue' },
        { x: 0.95, y: 0.72, r: 50, c: 'pink', isHeart: true },
        { x: 0.91, y: 0.82, r: 66, c: 'blue' },
        { x: 0.94, y: 0.92, r: 48, c: 'pink' },

        // Bottom corners & center cluster
        { x: 0.16, y: 0.96, r: 88, c: 'pink' },
        { x: 0.35, y: 0.97, r: 46, c: 'blue' },
        { x: 0.52, y: 0.96, r: 65, c: 'amber', isHeart: true },
        { x: 0.72, y: 0.97, r: 40, c: 'pink' },
        { x: 0.86, y: 0.96, r: 82, c: 'blue' },

        // Micro glistening bubble accents
        { x: 0.18, y: 0.11, r: 22, c: 'pink' },
        { x: 0.82, y: 0.13, r: 24, c: 'blue' },
        { x: 0.11, y: 0.35, r: 20, c: 'amber' },
        { x: 0.88, y: 0.38, r: 22, c: 'pink' },
        { x: 0.12, y: 0.74, r: 18, c: 'blue' },
        { x: 0.87, y: 0.66, r: 25, c: 'amber' },
      ];

      bubbles.forEach((b) => {
        const bx = b.x * w;
        const by = b.y * h;
        const br = b.r * scale;

        ctx.save();

        if (b.isHeart) {
          // Cute Translucent 3D Iridescent Heart Bubble
          ctx.translate(bx, by);
          ctx.beginPath();
          const hr = br * 0.9;
          ctx.moveTo(0, hr * 0.35);
          ctx.bezierCurveTo(-hr * 0.55, -hr * 0.35, -hr * 1.1, hr * 0.25, 0, hr * 1.05);
          ctx.bezierCurveTo(hr * 1.1, hr * 0.25, hr * 0.55, -hr * 0.35, 0, hr * 0.35);

          const grad = ctx.createLinearGradient(-hr, -hr, hr, hr);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          grad.addColorStop(0.3, 'rgba(244, 114, 182, 0.5)');
          grad.addColorStop(0.7, 'rgba(192, 132, 252, 0.4)');
          grad.addColorStop(1, 'rgba(56, 189, 248, 0.65)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = 'rgba(244, 114, 182, 0.85)';
          ctx.lineWidth = Math.max(1.5, 2.5 * scale);
          ctx.stroke();

          // Glossy highlight
          ctx.beginPath();
          ctx.ellipse(-hr * 0.35, -hr * 0.1, hr * 0.25, hr * 0.1, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        } else {
          // Large 3D Iridescent Spherical Soap Bubble
          const grad = ctx.createRadialGradient(bx - br * 0.32, by - br * 0.32, br * 0.08, bx, by, br);
          if (b.c === 'pink') {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
            grad.addColorStop(0.25, 'rgba(251, 207, 232, 0.6)');
            grad.addColorStop(0.65, 'rgba(216, 180, 254, 0.45)');
            grad.addColorStop(1, 'rgba(244, 114, 182, 0.85)');
          } else if (b.c === 'blue') {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            grad.addColorStop(0.25, 'rgba(186, 230, 253, 0.65)');
            grad.addColorStop(0.65, 'rgba(251, 207, 232, 0.45)');
            grad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');
          } else {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            grad.addColorStop(0.25, 'rgba(254, 240, 138, 0.65)');
            grad.addColorStop(0.65, 'rgba(244, 114, 182, 0.45)');
            grad.addColorStop(1, 'rgba(251, 146, 60, 0.85)');
          }

          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle =
            b.c === 'pink'
              ? 'rgba(244, 114, 182, 0.85)'
              : b.c === 'blue'
              ? 'rgba(56, 189, 248, 0.85)'
              : 'rgba(251, 146, 60, 0.85)';
          ctx.lineWidth = Math.max(1.5, 2.2 * scale);
          ctx.stroke();

          // Dual-layer Curved Specular Highlights (Bubble Reflection Arc)
          ctx.beginPath();
          ctx.ellipse(bx - br * 0.32, by - br * 0.32, br * 0.28, br * 0.14, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(bx + br * 0.35, by + br * 0.35, br * 0.16, br * 0.08, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();
        }

        ctx.restore();
      });
      break;
    }

    case 'butterflies': {
      // Big, Fluttering 3D Pastel Butterflies with Fairy Sparkles
      const butterflies = [
        { x: 0.1, y: 0.05, rot: -0.22, size: 68 },
        { x: 0.88, y: 0.07, rot: 0.25, size: 75 },
        { x: 0.06, y: 0.24, rot: 0.18, size: 58 },
        { x: 0.93, y: 0.32, rot: -0.3, size: 64 },
        { x: 0.05, y: 0.48, rot: -0.15, size: 72 },
        { x: 0.94, y: 0.58, rot: 0.22, size: 60 },
        { x: 0.07, y: 0.72, rot: 0.2, size: 66 },
        { x: 0.92, y: 0.78, rot: -0.25, size: 74 },
        { x: 0.18, y: 0.93, rot: -0.12, size: 78 },
        { x: 0.82, y: 0.94, rot: 0.18, size: 70 },
        { x: 0.5, y: 0.02, rot: 0.08, size: 52 },
        { x: 0.48, y: 0.97, rot: -0.05, size: 55 },
      ];

      butterflies.forEach((bf) => {
        const bx = bf.x * w;
        const by = bf.y * h;
        const bSize = bf.size * scale;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(bf.rot);

        // 3D Soft drop-shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
        ctx.shadowBlur = 12 * scale;
        ctx.shadowOffsetX = 3 * scale;
        ctx.shadowOffsetY = 6 * scale;

        // Draw Big 3D Butterfly
        ctx.font = `${Math.round(bSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🦋', 0, 0);

        // Fairy Dust Star Trails
        ctx.shadowColor = 'transparent';
        ctx.font = `${Math.round(bSize * 0.42)}px sans-serif`;
        ctx.fillText('✨', bSize * 0.55, -bSize * 0.35);
        ctx.font = `${Math.round(bSize * 0.28)}px sans-serif`;
        ctx.fillText('⭐', -bSize * 0.45, bSize * 0.4);

        ctx.restore();
      });
      break;
    }

    case 'birds': {
      // Graceful White Doves in Flight & Radiant Celestial Sunbeams
      const doves = [
        { x: 0.12, y: 0.05, size: 75, rot: -0.15 },
        { x: 0.85, y: 0.08, size: 82, rot: 0.2 },
        { x: 0.06, y: 0.32, size: 68, rot: 0.12 },
        { x: 0.93, y: 0.45, size: 74, rot: -0.18 },
        { x: 0.08, y: 0.65, size: 70, rot: 0.15 },
        { x: 0.92, y: 0.76, size: 78, rot: -0.22 },
        { x: 0.2, y: 0.94, size: 80, rot: -0.1 },
        { x: 0.82, y: 0.95, size: 76, rot: 0.18 },
        { x: 0.5, y: 0.02, size: 60, rot: 0.05 },
      ];

      doves.forEach((d) => {
        const dx = d.x * w;
        const dy = d.y * h;
        const dSize = d.size * scale;

        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(d.rot);

        ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowBlur = 18 * scale;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.font = `${Math.round(dSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🕊️', 0, 0);

        // Golden Beam Sparkles
        ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
        ctx.shadowBlur = 10 * scale;
        ctx.font = `${Math.round(dSize * 0.42)}px sans-serif`;
        ctx.fillText('✨', dSize * 0.5, -dSize * 0.3);

        ctx.restore();
      });
      break;
    }

    case 'hearts': {
      // Big, Glossy 3D Floating Puffy Hearts with Specular Sheen
      const hearts = [
        { x: 0.1, y: 0.04, size: 70, rot: -0.2 },
        { x: 0.88, y: 0.05, size: 78, rot: 0.22 },
        { x: 0.06, y: 0.22, size: 55, rot: 0.15 },
        { x: 0.94, y: 0.35, size: 65, rot: -0.25 },
        { x: 0.05, y: 0.50, size: 74, rot: -0.18 },
        { x: 0.93, y: 0.62, size: 58, rot: 0.2 },
        { x: 0.08, y: 0.78, rot: 0.12, size: 68 },
        { x: 0.91, y: 0.84, rot: -0.2, size: 72 },
        { x: 0.16, y: 0.95, size: 82, rot: -0.1 },
        { x: 0.85, y: 0.96, size: 76, rot: 0.18 },
        { x: 0.5, y: 0.02, size: 52, rot: 0.05 },
        { x: 0.48, y: 0.97, size: 56, rot: -0.05 },
        { x: 0.12, y: 0.38, size: 38, rot: 0.25 },
        { x: 0.87, y: 0.20, size: 42, rot: -0.15 },
        { x: 0.89, y: 0.70, size: 36, rot: 0.1 },
      ];

      hearts.forEach((hObj) => {
        const hx = hObj.x * w;
        const hy = hObj.y * h;
        const hSize = hObj.size * scale;

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(hObj.rot);

        ctx.shadowColor = 'rgba(244, 114, 182, 0.55)';
        ctx.shadowBlur = 14 * scale;
        ctx.shadowOffsetY = 5 * scale;

        ctx.font = `${Math.round(hSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💖', 0, 0);

        ctx.restore();
      });
      break;
    }

    case 'sakura': {
      // Falling Cherry Blossom Petals & Flowers Swirling Across Margins
      const petals = [
        { x: 0.1, y: 0.05, rot: 0.3, size: 60, icon: '🌸' },
        { x: 0.88, y: 0.06, rot: -0.4, size: 65, icon: '🌸' },
        { x: 0.05, y: 0.20, rot: 0.2, size: 48, icon: '💮' },
        { x: 0.94, y: 0.30, rot: -0.3, size: 55, icon: '🌸' },
        { x: 0.06, y: 0.45, rot: 0.5, size: 62, icon: '🌸' },
        { x: 0.93, y: 0.55, rot: -0.2, size: 50, icon: '💮' },
        { x: 0.07, y: 0.70, rot: -0.35, size: 58, icon: '🌸' },
        { x: 0.92, y: 0.80, rot: 0.4, size: 66, icon: '🌸' },
        { x: 0.15, y: 0.94, rot: 0.25, size: 70, icon: '🌸' },
        { x: 0.85, y: 0.95, rot: -0.3, size: 68, icon: '🌸' },
        { x: 0.48, y: 0.03, rot: 0.1, size: 45, icon: '💮' },
        { x: 0.52, y: 0.96, rot: -0.15, size: 52, icon: '🌸' },
        { x: 0.12, y: 0.35, rot: 0.6, size: 36, icon: '💮' },
        { x: 0.87, y: 0.42, rot: -0.5, size: 38, icon: '💮' },
      ];

      petals.forEach((pt) => {
        const px = pt.x * w;
        const py = pt.y * h;
        const pSize = pt.size * scale;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pt.rot);

        ctx.shadowColor = 'rgba(251, 113, 133, 0.45)';
        ctx.shadowBlur = 10 * scale;
        ctx.shadowOffsetY = 4 * scale;

        ctx.font = `${Math.round(pSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pt.icon, 0, 0);

        ctx.restore();
      });
      break;
    }

    case 'stardust': {
      // Big 4-Point Chrome Y2K Stars & Diamond Twinkles
      const stars = [
        { x: 0.1, y: 0.04, size: 72, rot: 0.1 },
        { x: 0.88, y: 0.06, size: 80, rot: -0.15 },
        { x: 0.05, y: 0.22, size: 55, rot: 0.25 },
        { x: 0.94, y: 0.34, size: 68, rot: -0.2 },
        { x: 0.06, y: 0.50, size: 76, rot: 0.12 },
        { x: 0.93, y: 0.64, size: 62, rot: -0.25 },
        { x: 0.08, y: 0.78, size: 70, rot: 0.18 },
        { x: 0.91, y: 0.85, size: 74, rot: -0.12 },
        { x: 0.18, y: 0.95, size: 85, rot: 0.08 },
        { x: 0.84, y: 0.95, size: 78, rot: -0.18 },
        { x: 0.5, y: 0.02, size: 58, rot: 0 },
        { x: 0.48, y: 0.97, size: 62, rot: 0.2 },
      ];

      stars.forEach((st) => {
        const sx = st.x * w;
        const sy = st.y * h;
        const sSize = st.size * scale;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(st.rot);

        ctx.shadowColor = 'rgba(251, 191, 36, 0.85)';
        ctx.shadowBlur = 18 * scale;

        ctx.font = `${Math.round(sSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', 0, 0);

        ctx.font = `${Math.round(sSize * 0.45)}px sans-serif`;
        ctx.fillText('✨', sSize * 0.5, -sSize * 0.35);

        ctx.restore();
      });
      break;
    }

    case 'snow': {
      // Big Crystal Snowflakes & Glowing Winter Ice Crystals
      const snowflakes = [
        { x: 0.1, y: 0.05, size: 72, rot: 0.15 },
        { x: 0.88, y: 0.06, size: 78, rot: -0.2 },
        { x: 0.05, y: 0.22, size: 56, rot: 0.25 },
        { x: 0.94, y: 0.34, size: 65, rot: -0.18 },
        { x: 0.06, y: 0.48, size: 74, rot: 0.1 },
        { x: 0.93, y: 0.62, size: 60, rot: -0.22 },
        { x: 0.07, y: 0.76, size: 68, rot: 0.18 },
        { x: 0.92, y: 0.84, size: 76, rot: -0.15 },
        { x: 0.16, y: 0.94, size: 82, rot: 0.12 },
        { x: 0.85, y: 0.95, size: 75, rot: -0.2 },
        { x: 0.5, y: 0.02, size: 54, rot: 0.05 },
        { x: 0.48, y: 0.97, size: 58, rot: -0.1 },
      ];

      snowflakes.forEach((sn) => {
        const snx = sn.x * w;
        const sny = sn.y * h;
        const snSize = sn.size * scale;

        ctx.save();
        ctx.translate(snx, sny);
        ctx.rotate(sn.rot);

        ctx.shadowColor = 'rgba(186, 230, 253, 0.95)';
        ctx.shadowBlur = 16 * scale;

        ctx.font = `${Math.round(snSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❄️', 0, 0);

        ctx.restore();
      });
      break;
    }

    case 'rainbow': {
      // Pastel Rainbow Arches & Fluffy Clouds
      ctx.save();
      ctx.font = `${Math.round(42 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌈', 0.12 * w, 0.06 * h);
      ctx.fillText('☁️', 0.88 * w, 0.06 * h);
      ctx.fillText('☁️', 0.08 * w, 0.92 * h);
      ctx.fillText('🌈', 0.88 * w, 0.92 * h);
      ctx.restore();
      break;
    }

    case 'vintage_leaks': {
      // Warm Golden Light Leaks across corners
      ctx.save();
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.75);
      grad.addColorStop(0, 'rgba(251, 146, 60, 0.28)');
      grad.addColorStop(0.5, 'rgba(254, 240, 138, 0.14)');
      grad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Bottom right subtle leak
      const grad2 = ctx.createRadialGradient(w, h, 0, w, h, w * 0.65);
      grad2.addColorStop(0, 'rgba(244, 63, 94, 0.22)');
      grad2.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      break;
    }

    case 'clovers': {
      // Lucky 4-Leaf Clovers around borders
      const clovers = [
        { x: 0.1, y: 0.05, emo: '🍀', size: 32 },
        { x: 0.88, y: 0.06, emo: '🍀', size: 34 },
        { x: 0.06, y: 0.35, emo: '🌿', size: 26 },
        { x: 0.94, y: 0.52, emo: '🍀', size: 28 },
        { x: 0.07, y: 0.75, emo: '🌼', size: 26 },
        { x: 0.9, y: 0.92, emo: '🍀', size: 32 },
      ];

      clovers.forEach((c) => {
        ctx.save();
        ctx.font = `${Math.round(c.size * scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(c.emo, c.x * w, c.y * h);
        ctx.restore();
      });
      break;
    }
  }

  ctx.restore();
}

