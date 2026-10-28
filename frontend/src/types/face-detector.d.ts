declare module '*faceDetectorLib' {
  export function runFaceDetector(
    imageData: Uint8ClampedArray | number[],
    width: number,
    height: number,
    params?: {
      shiftfactor?: number;
      minsize?: number;
      maxsize?: number;
      scalefactor?: number;
    },
    threshold?: number
  ): number[][];
}
