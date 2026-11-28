import { MUSIC_FILE_URL } from 'virtual:wedding-music';
import { WEDDING_MUSIC } from '../data/weddingData';

// Hybrid audio engine:
// 1. Automatically plays whatever MP3/audio file is placed in /public/music/ (e.g. I Finally Found Someone - Facundo Pisoli Instrumental).
// 2. Falls back to an expressive chorus-first piano instrumental arrangement of "I Finally Found Someone" if /public/music/ has no MP3 file yet.

interface MelodyStep {
  note: number;
  bass?: number;
  durationSec: number;
  delayMs: number;
}

class WeddingAudioEngine {
  private audioEl: HTMLAudioElement | null = null;
  private readonly musicSrc: string = MUSIC_FILE_URL;
  private useFallbackSynth = !MUSIC_FILE_URL;
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private stepTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private stepIndex = 0;
  private appliedStartOffset = false;
  private playPromise: Promise<boolean> | null = null;
  private pausedByVisibility = false;
  private resumeGestureHandler: (() => void) | null = null;
  private listeners = new Set<(playing: boolean) => void>();

  constructor() {
    this.setupVisibilityHandlers();
  }

  private clearResumeGestureHandler() {
    if (this.resumeGestureHandler && typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.resumeGestureHandler);
      window.removeEventListener('keydown', this.resumeGestureHandler);
      this.resumeGestureHandler = null;
    }
  }

  private setupVisibilityHandlers() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleLeaveTab = () => {
      this.clearResumeGestureHandler();
      if (this.isPlaying || this.playPromise) {
        this.pausedByVisibility = true;
        this.pauseInternal(true);
      }
    };

    const handleEnterTab = () => {
      if (document.hidden || !this.pausedByVisibility) return;
      this.pausedByVisibility = false;
      void this.play().then((ok) => {
        if (!ok && !this.isPlaying && !document.hidden) {
          // Browser blocked auto-resume without a gesture; resume on next tap/key
          this.pausedByVisibility = true;
          if (!this.resumeGestureHandler) {
            this.resumeGestureHandler = () => {
              this.clearResumeGestureHandler();
              if (!document.hidden && this.pausedByVisibility) {
                this.pausedByVisibility = false;
                void this.play();
              }
            };
            window.addEventListener('pointerdown', this.resumeGestureHandler, { passive: true });
            window.addEventListener('keydown', this.resumeGestureHandler, { passive: true });
          }
        }
      });
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleLeaveTab();
      } else {
        handleEnterTab();
      }
    });

    window.addEventListener('pagehide', handleLeaveTab);
    window.addEventListener('pageshow', handleEnterTab);
  }

  // Chorus-first romantic felt-piano arrangement inspired by "I Finally Found Someone" (in C Major)
  private readonly arrangement: MelodyStep[] = [
    // "I finally found someone..."
    { note: 392.0, bass: 130.81, durationSec: 0.9, delayMs: 420 }, // G4 + C3
    { note: 523.25, durationSec: 0.7, delayMs: 360 }, // C5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 659.25, bass: 196.0, durationSec: 1.0, delayMs: 460 }, // E5 + G3
    { note: 659.25, durationSec: 0.7, delayMs: 360 }, // E5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 523.25, bass: 164.81, durationSec: 1.4, delayMs: 680 }, // C5 + E3

    // "...that knocks me off my feet"
    { note: 523.25, bass: 174.61, durationSec: 0.7, delayMs: 380 }, // C5 + F3
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 659.25, durationSec: 0.9, delayMs: 440 }, // E5
    { note: 783.99, bass: 196.0, durationSec: 1.1, delayMs: 520 }, // G5 + G3
    { note: 659.25, durationSec: 0.7, delayMs: 360 }, // E5
    { note: 587.33, durationSec: 1.5, delayMs: 740 }, // D5

    // "I finally found the one..."
    { note: 392.0, bass: 220.0, durationSec: 0.8, delayMs: 400 }, // G4 + A3
    { note: 523.25, durationSec: 0.7, delayMs: 360 }, // C5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 659.25, bass: 164.81, durationSec: 1.0, delayMs: 460 }, // E5 + E3
    { note: 659.25, durationSec: 0.7, delayMs: 360 }, // E5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 523.25, durationSec: 1.2, delayMs: 620 }, // C5

    // "...that makes me feel complete"
    { note: 440.0, bass: 174.61, durationSec: 0.8, delayMs: 400 }, // A4 + F3
    { note: 523.25, durationSec: 0.7, delayMs: 360 }, // C5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 659.25, bass: 196.0, durationSec: 0.9, delayMs: 440 }, // E5 + G3
    { note: 587.33, durationSec: 0.8, delayMs: 400 }, // D5
    { note: 523.25, bass: 130.81, durationSec: 1.9, delayMs: 920 }, // C5 + C3

    // "We started over coffee, we started out as friends..."
    { note: 523.25, bass: 130.81, durationSec: 0.8, delayMs: 400 }, // C5
    { note: 659.25, durationSec: 0.7, delayMs: 360 }, // E5
    { note: 783.99, durationSec: 0.9, delayMs: 460 }, // G5
    { note: 783.99, bass: 196.0, durationSec: 0.8, delayMs: 400 }, // G5
    { note: 698.46, durationSec: 0.7, delayMs: 360 }, // F5
    { note: 659.25, durationSec: 0.7, delayMs: 360 }, // E5
    { note: 587.33, bass: 146.83, durationSec: 1.3, delayMs: 640 }, // D5 + D3

    { note: 493.88, bass: 196.0, durationSec: 0.7, delayMs: 380 }, // B4 + G3
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 698.46, durationSec: 0.9, delayMs: 440 }, // F5
    { note: 659.25, durationSec: 0.8, delayMs: 380 }, // E5
    { note: 587.33, durationSec: 0.8, delayMs: 380 }, // D5
    { note: 523.25, bass: 220.0, durationSec: 1.5, delayMs: 760 }, // C5 + A3

    // "...it's funny how from simple things, the best things begin"
    { note: 440.0, bass: 174.61, durationSec: 0.8, delayMs: 380 }, // A4 + F3
    { note: 523.25, durationSec: 0.7, delayMs: 360 }, // C5
    { note: 659.25, durationSec: 0.9, delayMs: 440 }, // E5
    { note: 587.33, durationSec: 0.7, delayMs: 360 }, // D5
    { note: 523.25, durationSec: 0.7, delayMs: 360 }, // C5
    { note: 440.0, bass: 146.83, durationSec: 1.0, delayMs: 500 }, // A4 + D3

    { note: 440.0, bass: 196.0, durationSec: 0.8, delayMs: 400 }, // A4 + G3
    { note: 493.88, durationSec: 0.7, delayMs: 380 }, // B4
    { note: 523.25, durationSec: 0.9, delayMs: 440 }, // C5
    { note: 587.33, durationSec: 0.9, delayMs: 480 }, // D5
    { note: 523.25, bass: 130.81, durationSec: 2.2, delayMs: 1100 }, // C5 + C3
  ];

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  private applyStartOffset(audio: HTMLAudioElement) {
    if (
      !this.appliedStartOffset &&
      WEDDING_MUSIC.startAtSeconds > 0 &&
      Number.isFinite(audio.duration) &&
      audio.duration > WEDDING_MUSIC.startAtSeconds + 10
    ) {
      try {
        audio.currentTime = WEDDING_MUSIC.startAtSeconds;
        if (Math.abs(audio.currentTime - WEDDING_MUSIC.startAtSeconds) < 2) {
          this.appliedStartOffset = true;
        }
      } catch {
        // Ignore if media is not seekable yet; will retry on canplay/playing
      }
    }
  }

  private ensureAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined' || !this.musicSrc || this.useFallbackSynth) {
      return null;
    }

    if (!this.audioEl) {
      const audio = new Audio(this.musicSrc);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = WEDDING_MUSIC.volume;

      const onSeekReady = () => this.applyStartOffset(audio);
      audio.addEventListener('loadedmetadata', onSeekReady);
      audio.addEventListener('canplay', onSeekReady);
      audio.addEventListener('playing', onSeekReady);

      audio.addEventListener('error', () => {
        this.useFallbackSynth = true;
        if (this.isPlaying) {
          this.startSynth();
        }
      });
      this.audioEl = audio;
    }

    return this.audioEl;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.16;
      this.masterGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private playTone(freq: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.08, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration + 0.05);
    oscHarmonic.stop(now + duration + 0.05);
  }

  private tick() {
    if (!this.isPlaying || !this.useFallbackSynth) return;
    const step = this.arrangement[this.stepIndex % this.arrangement.length];
    this.playTone(step.note, step.durationSec, 0.34);

    if (step.bass) {
      this.playTone(step.bass, Math.max(1.8, step.durationSec + 0.8), 0.24);
    }

    this.stepIndex += 1;
    this.stepTimer = window.setTimeout(() => this.tick(), step.delayMs);
  }

  private async startSynth(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    if (ctx.state !== 'running') {
      return false;
    }
    this.isPlaying = true;
    this.notify();
    if (this.stepTimer === null) {
      this.tick();
    }
    return true;
  }

  public async play(): Promise<boolean> {
    if (typeof document !== 'undefined' && document.hidden) {
      return false;
    }
    this.pausedByVisibility = false;
    this.clearResumeGestureHandler();
    if (this.isPlaying) return true;
    if (this.playPromise) return this.playPromise;

    this.playPromise = (async () => {
      const audio = this.ensureAudioElement();
      if (audio && !this.useFallbackSynth) {
        try {
          this.applyStartOffset(audio);
          await audio.play();
          if (typeof document !== 'undefined' && document.hidden) {
            audio.pause();
            this.pausedByVisibility = true;
            return false;
          }
          this.applyStartOffset(audio);
          this.isPlaying = true;
          this.notify();
          return true;
        } catch (err) {
          const errName = err instanceof DOMException ? err.name : '';
          if (errName === 'NotAllowedError' || errName === 'AbortError') {
            return false;
          }
          this.useFallbackSynth = true;
        }
      }

      if (typeof document !== 'undefined' && document.hidden) {
        this.pausedByVisibility = true;
        return false;
      }
      return this.startSynth();
    })();

    try {
      return await this.playPromise;
    } finally {
      this.playPromise = null;
    }
  }

  private pauseInternal(preserveVisibilityFlag: boolean): void {
    if (!preserveVisibilityFlag) {
      this.pausedByVisibility = false;
      this.clearResumeGestureHandler();
    }
    this.isPlaying = false;
    this.playPromise = null;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.stepTimer !== null) {
      window.clearTimeout(this.stepTimer);
      this.stepTimer = null;
    }
    this.notify();
  }

  public pause(): void {
    this.pauseInternal(false);
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioEngine();
