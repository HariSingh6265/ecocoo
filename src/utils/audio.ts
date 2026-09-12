/**
 * Ambient Audio Generator & Sound Controller
 * 
 * Uses Web Audio API to create a gentle, nostalgic, warm acoustic ambient chime soundscape
 * without requiring external heavy MP3 assets (with support for optional MP3 if placed in /public/audio.mp3).
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.playAmbientPattern();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playAmbientPattern() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const playTone = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm sine/triangle blend
      osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
      
      const randomNote = this.notes[Math.floor(Math.random() * this.notes.length)];
      osc.frequency.setValueAtTime(randomNote, this.ctx.currentTime);

      // Warm lowpass filter for dreamy acoustic sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const duration = 2.8 + Math.random() * 2.2;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.09, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);

      // Schedule next note with humanized gentle timing
      const nextDelay = 1800 + Math.random() * 2200;
      this.timerId = setTimeout(playTone, nextDelay);
    };

    playTone();
  }
}

export const ambientSound = typeof window !== 'undefined' ? new AmbientSoundEngine() : null;
