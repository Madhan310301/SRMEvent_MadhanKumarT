/**
 * MorphOrb Pure Canvas Animation Engine
 * Optimized for low-end mobile devices, high frame stability,
 * and zero per-frame memory allocations using Float32Array.
 */

export type OrbState = 'idle' | 'thinking' | 'result' | 'error';

export interface OrbEngineOptions {
  canvas: HTMLCanvasElement;
  initialState?: OrbState;
  onStateChange?: (state: OrbState) => void;
  accentColor?: string; // e.g. '#286B58'
}

export class MorphOrbEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private state: OrbState = 'idle';
  private width = 0;
  private height = 0;
  private dpr = 1;
  private isDestroyed = false;
  private isVisible = true;
  private prefersReducedMotion = false;

  // Particle buffers (typed arrays to avoid garbage collection)
  private particleCount = 180;
  private posBuffer!: Float32Array;      // [x, y, z] per particle
  private targetBuffer!: Float32Array;   // [x, y, z] target per particle
  private baseRadius = 45;
  private rotationAngle = 0;
  private pulsePhase = 0;
  private accentColor = '#286B58';

  constructor(options: OrbEngineOptions) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.state = options.initialState || 'idle';
    if (options.accentColor) this.accentColor = options.accentColor;

    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Hardware tiering: scale particles by hardware capability
    const concurrency = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
    if (concurrency <= 2) {
      this.particleCount = 80;
    } else if (concurrency <= 4) {
      this.particleCount = 140;
    } else {
      this.particleCount = 200;
    }

    this.initBuffers();
    this.setupResize();
    this.setupVisibilityListeners();

    if (!this.prefersReducedMotion) {
      this.start();
    } else {
      this.drawStaticFrame();
    }
  }

  private initBuffers() {
    this.posBuffer = new Float32Array(this.particleCount * 3);
    this.targetBuffer = new Float32Array(this.particleCount * 3);

    // Initialize Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < this.particleCount; i++) {
      const y = 1 - (i / (this.particleCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const idx = i * 3;
      this.posBuffer[idx] = x * this.baseRadius;
      this.posBuffer[idx + 1] = y * this.baseRadius;
      this.posBuffer[idx + 2] = z * this.baseRadius;

      this.targetBuffer[idx] = this.posBuffer[idx];
      this.targetBuffer[idx + 1] = this.posBuffer[idx + 1];
      this.targetBuffer[idx + 2] = this.posBuffer[idx + 2];
    }
  }

  private setupResize() {
    this.resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  private handleResize = () => {
    this.resize();
  };

  public resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    if (this.prefersReducedMotion) {
      this.drawStaticFrame();
    }
  }

  private setupVisibilityListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else if (!this.prefersReducedMotion && !this.isDestroyed) {
      this.start();
    }
  };

  public setState(newState: OrbState) {
    this.state = newState;
    if (this.prefersReducedMotion) {
      this.drawStaticFrame();
    }
  }

  public getState(): OrbState {
    return this.state;
  }

  public setVisible(visible: boolean) {
    this.isVisible = visible;
    if (!visible) {
      this.stop();
    } else if (!this.prefersReducedMotion && !this.isDestroyed) {
      this.start();
    }
  }

  public start() {
    if (this.animFrameId !== null || this.isDestroyed || this.prefersReducedMotion) return;
    const loop = (timestamp: number) => {
      this.render(timestamp);
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public stop() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    this.stop();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  private render(timestamp: number) {
    if (!this.ctx || this.width === 0 || this.height === 0) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Rotation speed based on state
    let rotSpeed = 0.008;
    let pulseSpeed = 0.03;
    let color = this.accentColor;

    if (this.state === 'thinking') {
      rotSpeed = 0.024;
      pulseSpeed = 0.08;
      color = '#3B82F6'; // Thinking blue
    } else if (this.state === 'result') {
      rotSpeed = 0.006;
      pulseSpeed = 0.02;
      color = '#10B981'; // Success emerald
    } else if (this.state === 'error') {
      rotSpeed = 0.004;
      pulseSpeed = 0.01;
      color = '#EF4444'; // Error rose
    }

    this.rotationAngle += rotSpeed;
    this.pulsePhase += pulseSpeed;

    const cosRot = Math.cos(this.rotationAngle);
    const sinRot = Math.sin(this.rotationAngle);
    const currentScale = 1 + Math.sin(this.pulsePhase) * (this.state === 'thinking' ? 0.08 : 0.03);

    // Batch draw dots with depth sorting
    this.ctx.fillStyle = color;

    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      const x = this.posBuffer[idx] * currentScale;
      const y = this.posBuffer[idx + 1] * currentScale;
      const z = this.posBuffer[idx + 2] * currentScale;

      // 3D rotation around Y-axis
      const rotatedX = x * cosRot - z * sinRot;
      const rotatedZ = x * sinRot + z * cosRot;

      // Simple perspective projection
      const fov = 160;
      const depth = fov / (fov + rotatedZ);
      const screenX = centerX + rotatedX * depth;
      const screenY = centerY + y * depth;

      // Alpha and radius based on depth (z-buffer illusion)
      const alpha = Math.max(0.18, Math.min(1.0, (rotatedZ + this.baseRadius) / (this.baseRadius * 2)));
      const dotRadius = Math.max(1.0, 2.2 * depth);

      this.ctx.globalAlpha = alpha;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1.0;
  }

  public drawStaticFrame() {
    if (!this.ctx || this.width === 0 || this.height === 0) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.ctx.fillStyle = this.accentColor;
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      const screenX = centerX + this.posBuffer[idx];
      const screenY = centerY + this.posBuffer[idx + 1];
      const alpha = Math.max(0.3, Math.min(1.0, (this.posBuffer[idx + 2] + this.baseRadius) / (this.baseRadius * 2)));

      this.ctx.globalAlpha = alpha;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, 1.8, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;
  }
}
