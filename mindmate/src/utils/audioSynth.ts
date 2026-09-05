// Web Audio API ambient noise and chime generator (pure client-side, zero external assets required)

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentMode: 'rain' | 'stream' | 'whitenoise' | 'zen-drone' | 'peaceful-pad' | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playMeditationBell(fundamental: number = 432) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Tibetan singing bowl harmonic stack with acoustic shimmer (slight micro-detune pairs)
      const harmonics = [
        { freq: fundamental, gain: 0.28, duration: 6.5, attack: 0.04 },
        { freq: fundamental * 1.003, gain: 0.22, duration: 6.0, attack: 0.05 }, // acoustic beating pair
        { freq: fundamental * 2.76, gain: 0.12, duration: 4.8, attack: 0.03 },
        { freq: fundamental * 2.768, gain: 0.09, duration: 4.5, attack: 0.03 }, // upper shimmer pair
        { freq: fundamental * 5.40, gain: 0.04, duration: 3.2, attack: 0.02 },
        { freq: fundamental * 0.5, gain: 0.18, duration: 7.0, attack: 0.08 }   // warm sub-resonance
      ];

      // Soft lowpass filter to remove any harsh high-frequency metallic edge
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(2200, now);
      masterFilter.frequency.exponentialRampToValueAtTime(800, now + 5.0);
      masterFilter.connect(this.ctx.destination);

      harmonics.forEach(({ freq, gain, duration, attack }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        // Subtle natural pitch sag as the metal energy dissipates
        osc.frequency.exponentialRampToValueAtTime(freq * 0.999, now + duration);

        // Smooth non-clicking attack followed by long organic exponential decay
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(gain, now + attack);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

        osc.connect(gainNode);
        gainNode.connect(masterFilter);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    } catch (e) {
      console.warn('Meditation bell audio error:', e);
    }
  }

  public playChime(frequency: number = 528) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, this.ctx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  private oscNodes: OscillatorNode[] = [];
  private lfoNode: OscillatorNode | null = null;

  public startAmbient(type: 'rain' | 'stream' | 'whitenoise' | 'zen-drone' | 'peaceful-pad', volume: number = 0.15) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopAmbient();

      const now = this.ctx.currentTime;

      if (type === 'zen-drone' || type === 'peaceful-pad') {
        // Multi-oscillator peaceful meditative drone with warm harmonic series
        const frequencies = type === 'zen-drone' 
          ? [108, 162, 216, 324, 432, 648] // 432Hz harmonic Pythagorean series
          : [68.05, 136.1, 204.15, 272.2, 408.3]; // 136.1 Hz OM / Cosmic Earth resonance

        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.75), now + 1.8);

        // Warm dual-stage lowpass filter
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.Q.setValueAtTime(1.2, now);

        // Gentle LFO modulating filter cutoff to simulate natural breathing ocean swells
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.07, now); // ~14-second deep breathing cycle
        lfoGain.gain.setValueAtTime(180, now);

        lfo.connect(filter.frequency);
        lfo.start(now);
        this.lfoNode = lfo;

        this.oscNodes = frequencies.map((freq, index) => {
          if (!this.ctx) return null as any;
          const osc = this.ctx.createOscillator();
          const voiceGain = this.ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          // Micro-detuning creates warm acoustic chorusing shimmer
          const microDetune = (index % 2 === 0 ? 1 : -1) * (2.2 + index * 0.8);
          osc.detune.setValueAtTime(microDetune, now);

          const relativeWeight = freq > 400 ? 0.08 : freq > 200 ? 0.18 : 0.28;
          voiceGain.gain.setValueAtTime(relativeWeight, now);
          
          osc.connect(voiceGain);
          voiceGain.connect(filter);
          osc.start(now);
          return osc;
        }).filter(Boolean);

        filter.connect(masterGain);
        masterGain.connect(this.ctx.destination);

        this.gainNode = masterGain;
        this.isPlaying = true;
        this.currentMode = type;
        return;
      }

      // Generate soft, warm organic Brownian & Pink noise
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      let brownOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'rain') {
          // Paul Kellet's filtered pink noise for gentle raindrops on foliage
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        } else if (type === 'stream') {
          // Brownian smooth water movement
          brownOut = (brownOut + (0.03 * white)) / 1.03;
          output[i] = brownOut * 1.8;
        } else {
          // Silky soft white noise
          output[i] = white * 0.1;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to shape into velvety soothing natural water/rain
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 650 : type === 'stream' ? 850 : 1500, now);
      filter.Q.setValueAtTime(0.8, now);

      // Gentle stream water flow undulating modulation
      if (type === 'stream') {
        const streamLfo = this.ctx.createOscillator();
        const streamLfoGain = this.ctx.createGain();
        streamLfo.type = 'sine';
        streamLfo.frequency.setValueAtTime(0.12, now);
        streamLfoGain.gain.setValueAtTime(140, now);
        streamLfo.connect(filter.frequency);
        streamLfo.start(now);
        this.lfoNode = streamLfo;
      }

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 1.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);

      this.noiseNode = whiteNoise;
      this.gainNode = gain;
      this.isPlaying = true;
      this.currentMode = type;
    } catch (e) {
      console.warn('Audio ambient start error:', e);
    }
  }

  public stopAmbient() {
    try {
      if (this.lfoNode) {
        try {
          this.lfoNode.stop();
          this.lfoNode.disconnect();
        } catch (e) {}
        this.lfoNode = null;
      }
      if (this.oscNodes && this.oscNodes.length > 0) {
        this.oscNodes.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.oscNodes = [];
      }
      if (this.noiseNode) {
        (this.noiseNode as any).stop?.();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      this.isPlaying = false;
      this.currentMode = null;
    } catch (e) {
      console.warn('Audio ambient stop error:', e);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentMode(): string | null {
    return this.currentMode;
  }
}

export const soundEngine = new AmbientAudioEngine();
