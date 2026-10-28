// Real-time TikTok-style Face Tracking Engine for Photobooth AR Filters
// Runs lightweight PicoJS cascade detection directly on webcam frames in 3-5ms.

import { runFaceDetector } from './faceDetectorLib';

export interface FacePosition {
  x: number; // 0..1 normalized horizontal center
  y: number; // 0..1 normalized vertical center
  scale: number; // relative size multiplier
  hasFace: boolean;
}

export class RealtimeFaceTracker {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private targetW = 240;
  private targetH = 180;
  private smoothedX = 0.5;
  private smoothedY = 0.42;
  private smoothedScale = 1.0;
  private isRunning = false;
  private animId: number | null = null;
  private onPositionUpdate: ((pos: FacePosition) => void) | null = null;
  private lastDetectTime = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.targetW;
    this.canvas.height = this.targetH;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }

  public start(
    videoElement: HTMLVideoElement,
    isMirror: boolean,
    onUpdate: (pos: FacePosition) => void
  ) {
    this.onPositionUpdate = onUpdate;
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;

      const now = performance.now();
      // Throttle detection to ~25-30 FPS for buttery smoothness and negligible CPU usage
      if (now - this.lastDetectTime >= 35) {
        this.lastDetectTime = now;
        this.detectFrame(videoElement, isMirror);
      }

      this.animId = requestAnimationFrame(loop);
    };

    loop();
  }

  public stop() {
    this.isRunning = false;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private detectFrame(video: HTMLVideoElement, isMirror: boolean) {
    if (!video || video.readyState < 2 || !this.ctx) return;

    try {
      // 1. Draw scaled down frame
      this.ctx.drawImage(video, 0, 0, this.targetW, this.targetH);
      const imgData = this.ctx.getImageData(0, 0, this.targetW, this.targetH);

      // 2. Run high-speed cascade detection
      const detections = runFaceDetector(imgData.data, this.targetW, this.targetH, {
        shiftfactor: 0.12,
        minsize: 35,
        maxsize: 160,
        scalefactor: 1.15,
      });

      if (detections && detections.length > 0) {
        // Pick best scored detection: [row, col, size, score]
        let best = detections[0];
        for (let i = 1; i < detections.length; i++) {
          if (detections[i][3] > best[3]) {
            best = detections[i];
          }
        }

        const rawRow = best[0]; // Y
        const rawCol = best[1]; // X
        const rawSize = best[2]; // Size

        // Calculate normalized coordinates
        let rawNormX = rawCol / this.targetW;
        const rawNormY = rawRow / this.targetH;
        const rawNormScale = Math.max(0.65, Math.min(1.6, rawSize / (this.targetW * 0.38)));

        // If mirrored, the user's face is flipped horizontally on screen
        if (isMirror) {
          rawNormX = 1 - rawNormX;
        }

        // Exponential Moving Average smoothing (EMA) for TikTok-style fluid tracking
        const alpha = 0.32;
        this.smoothedX = this.smoothedX * (1 - alpha) + rawNormX * alpha;
        this.smoothedY = this.smoothedY * (1 - alpha) + rawNormY * alpha;
        this.smoothedScale = this.smoothedScale * (1 - alpha) + rawNormScale * alpha;

        if (this.onPositionUpdate) {
          this.onPositionUpdate({
            x: this.smoothedX,
            y: this.smoothedY,
            scale: this.smoothedScale,
            hasFace: true,
          });
        }
      }
    } catch {
      // Ignore transient canvas read errors during camera startup
    }
  }
}

