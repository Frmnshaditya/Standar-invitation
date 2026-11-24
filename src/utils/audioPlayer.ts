import { MUSIC_FILE_URL } from 'virtual:wedding-music';
import { WEDDING_MUSIC } from '../data/weddingData';

// Hybrid audio engine:
// 1. Automatically plays whatever MP3/audio file is placed in /public/music/.
// 2. Seamlessly falls back to gentle synthesized Web Audio piano if /public/music/ has no audio file yet.

class WeddingAudioEngine {
  private audioEl: HTMLAudioElement | null = null;
  private readonly musicSrc: string = MUSIC_FILE_URL;
  private useFallbackSynth = !MUSIC_FILE_URL;
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private stepTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private stepIndex = 0;
  private listeners = new Set<(playing: boolean) => void>();

  // Soft romantic progression in F Major / D minor (warm felt-piano frequencies)
  private readonly melodyNotes: number[] = [
    349.23, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0,
    293.66, 349.23, 440.0, 523.25, 440.0, 392.0, 349.23, 329.63,
    233.08, 349.23, 440.0, 587.33, 523.25, 440.0, 392.0, 349.23,
    261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 349.23, 329.63,
  ];

  private readonly bassNotes: number[] = [
    174.61, 174.61, 146.83, 146.83, 116.54, 116.54, 130.81, 130.81,
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

  private ensureAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined' || !this.musicSrc || this.useFallbackSynth) {
      return null;
    }

    if (!this.audioEl) {
      const audio = new Audio(this.musicSrc);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = WEDDING_MUSIC.volume;
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
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
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
    const melodyFreq = this.melodyNotes[this.stepIndex % this.melodyNotes.length];
    this.playTone(melodyFreq, 1.4, 0.35);

    if (this.stepIndex % 4 === 0) {
      const bassIndex = Math.floor(this.stepIndex / 4) % this.bassNotes.length;
      this.playTone(this.bassNotes[bassIndex], 2.4, 0.25);
    }

    this.stepIndex += 1;
    this.stepTimer = window.setTimeout(() => this.tick(), 680);
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
    if (this.isPlaying) return true;

    const audio = this.ensureAudioElement();
    if (audio && !this.useFallbackSynth) {
      try {
        await audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch (err) {
        const errName = err instanceof DOMException ? err.name : '';
        if (errName === 'NotAllowedError') {
          return false;
        }
        this.useFallbackSynth = true;
      }
    }

    return this.startSynth();
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.stepTimer !== null) {
      window.clearTimeout(this.stepTimer);
      this.stepTimer = null;
    }
    this.notify();
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioEngine();
