import * as Tone from "tone";

/**
 * Audio engine using Tone.js with Salamander Grand Piano samples.
 *
 * Features:
 * - Realistic piano sound using actual piano recordings
 * - Play individual notes, arpeggios, and harmonies
 * - Mute/unmute control
 */
class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private muted = false;
  private initialized = false;
  private currentArpeggioTimeout: number | null = null;
  private muteListeners: Set<(muted: boolean) => void> = new Set();

  /**
   * Initialize Tone.js and load piano samples.
   * Must be called after user interaction due to browser autoplay policies.
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      // Already initialized, just resume audio context if needed
      if (Tone.context.state === "suspended") {
        await Tone.start();
      }
      return;
    }

    // Start Tone.js audio context
    await Tone.start();

    // Create sampler with Salamander Grand Piano samples
    // These are public domain piano recordings self-hosted for reliability
    // We sample every 3 notes (C, D#, F#, A) across the range
    this.sampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3",
      },
      release: 1,
      baseUrl: "/samples/piano/",
    }).toDestination();

    // Wait for samples to load
    await Tone.loaded();
    this.initialized = true;
  }

  /**
   * Play a single note.
   *
   * @param noteString Note in scientific pitch notation (e.g., "C4", "A#5")
   * @param duration Duration in seconds
   */
  async playNote(noteString: string, duration = 1.5): Promise<void> {
    if (this.muted) {
      return;
    }

    // Initialize on first user interaction
    await this.initialize();

    if (!this.sampler || this.muted) return;

    try {
      this.sampler.triggerAttackRelease(noteString, duration);
    } catch (error) {
      console.error(`Failed to play note ${noteString}:`, error);
    }
  }

  /**
   * Play multiple notes simultaneously as a harmony.
   *
   * @param notes Array of note strings in scientific pitch notation
   * @param duration Duration in seconds
   */
  async playHarmony(notes: string[], duration = 2.0): Promise<void> {
    if (notes.length === 0 || this.muted) {
      return;
    }

    // Stop any currently playing sequence
    this.stopAll();

    // Initialize on first user interaction
    await this.initialize();

    if (!this.sampler || this.muted) return;

    try {
      this.sampler.triggerAttackRelease(notes, duration);
    } catch (error) {
      console.error("Failed to play harmony:", error);
    }
  }

  /**
   * Play notes sequentially.
   *
   * @param notes Array of note strings in scientific pitch notation
   * @param interval Milliseconds between each note
   */
  async playArpeggio(notes: string[], interval = 400): Promise<void> {
    if (notes.length === 0 || this.muted) {
      return;
    }

    this.stopAll();
    await this.initialize();

    if (!this.sampler || this.muted) return;

    try {
      const noteDuration = 1.5;

      for (const note of notes) {
        if (this.muted) break; // Stop if muted during playback

        this.sampler.triggerAttackRelease(note, noteDuration);
        await new Promise((resolve) => {
          this.currentArpeggioTimeout = window.setTimeout(resolve, interval);
        });
      }
    } catch (error) {
      console.error("Failed to play arpeggio:", error);
    } finally {
      this.currentArpeggioTimeout = null;
    }
  }

  /**
   * Stop all currently playing sounds and sequences.
   */
  stopAll(): void {
    // Cancel any ongoing arpeggio playback
    if (this.currentArpeggioTimeout !== null) {
      clearTimeout(this.currentArpeggioTimeout);
      this.currentArpeggioTimeout = null;
    }

    // Release all currently playing notes
    if (this.sampler) {
      this.sampler.releaseAll();
    }
  }

  /**
   * Subscribe to mute state changes.
   * Returns an unsubscribe function.
   */
  onMuteChange(listener: (muted: boolean) => void): () => void {
    this.muteListeners.add(listener);
    return () => this.muteListeners.delete(listener);
  }

  /**
   * Set mute state.
   *
   * @param muted True to mute, false to unmute
   */
  setMuted(muted: boolean): void {
    this.muted = muted;

    // Notify listeners
    for (const listener of this.muteListeners) {
      listener(muted);
    }

    // Also mute/unmute the Tone.js destination
    if (this.sampler) {
      if (muted) {
        this.sampler.volume.value = -Infinity;
      } else {
        this.sampler.volume.value = 0;
      }
    }
  }

  /**
   * Get current mute state.
   */
  isMuted(): boolean {
    return this.muted;
  }
}

// Export singleton instance
export const audioEngine = new AudioEngine();
