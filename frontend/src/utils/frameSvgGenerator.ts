import { FrameTemplate } from '../data/framesData';
import { LayoutType } from '../types/photobooth';

export function generateFrameOverlaySvg(tpl: FrameTemplate, layout: LayoutType = '1x4_strip'): string {
  // If template already has custom static image, use it directly
  if (tpl.previewImage && !tpl.previewImage.startsWith('data:image/svg')) {
    return tpl.previewImage;
  }

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const bgColor = tpl.bgColor || '#ffffff';
  const textColor = tpl.textColor || '#1e293b';
  const accentColor = tpl.accentColor || '#f472b6';
  const headerText = escapeXml(tpl.headerEmoji || tpl.name || 'PhotoXinhh');
  const footerText = escapeXml(tpl.footerEmoji || 'PhotoXinhh • 2026');

  if (layout === '1x4_strip') {
    const width = 600;
    const height = 1800;
    const padX = 36;
    const padTop = 130;
    const gap = 24;
    const slotW = width - padX * 2;
    const slotH = 360;

    const slots = [0, 1, 2, 3].map((i) => ({
      x: padX,
      y: padTop + i * (slotH + gap),
      w: slotW,
      h: slotH,
    }));

    const maskRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="black" />`)
      .join('\n');

    const borderRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3" />`)
      .join('\n');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-mask">
      <rect width="${width}" height="${height}" fill="white" />
      ${maskRects}
    </mask>
  </defs>

  <!-- Frame Background with transparent cutouts for camera/photos -->
  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-mask)" />

  <!-- Photo Slot Borders -->
  ${borderRects}

  <!-- Header Header Bar / Stickers -->
  <rect x="0" y="0" width="${width}" height="110" fill="none" />
  <text x="${width / 2}" y="78" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="28" fill="${textColor}" letter-spacing="1">
    ${headerText}
  </text>

  <!-- Footer Branding / Caption -->
  <text x="${width / 2}" y="${height - 50}" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="22" fill="${textColor}" letter-spacing="0.5">
    ${footerText}
  </text>
</svg>`.trim();

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  if (layout === '2x2_grid') {
    const width = 1200;
    const height = 1200;
    const pad = 48;
    const headerH = 110;
    const footerH = 100;
    const gap = 32;
    const slotW = (width - pad * 2 - gap) / 2;
    const slotH = (height - pad * 2 - headerH - footerH - gap) / 2;

    const slots = [
      { x: pad, y: pad + headerH },
      { x: pad + slotW + gap, y: pad + headerH },
      { x: pad, y: pad + headerH + slotH + gap },
      { x: pad + slotW + gap, y: pad + headerH + slotH + gap },
    ];

    const maskRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${slotW}" height="${slotH}" rx="14" fill="black" />`)
      .join('\n');

    const borderRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${slotW}" height="${slotH}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3.5" />`)
      .join('\n');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-mask-2x2">
      <rect width="${width}" height="${height}" fill="white" />
      ${maskRects}
    </mask>
  </defs>

  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-mask-2x2)" />
  ${borderRects}

  <text x="${width / 2}" y="${pad + 65}" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="34" fill="${textColor}">
    ${headerText}
  </text>

  <text x="${width / 2}" y="${height - pad - 20}" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="24" fill="${textColor}">
    ${footerText}
  </text>
</svg>`.trim();

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  // Polaroid layout fallback
  const width = 700;
  const height = 900;
  const pad = 40;
  const slotW = width - pad * 2;
  const slotH = slotW;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-polaroid">
      <rect width="${width}" height="${height}" fill="white" />
      <rect x="${pad}" y="${pad}" width="${slotW}" height="${slotH}" rx="10" fill="black" />
    </mask>
  </defs>

  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-polaroid)" />
  <rect x="${pad}" y="${pad}" width="${slotW}" height="${slotH}" rx="10" fill="none" stroke="${accentColor}" stroke-width="3" />

  <text x="${width / 2}" y="${height - 70}" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="28" fill="${textColor}">
    ${footerText}
  </text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
