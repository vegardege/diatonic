import { useEffect, useState } from "react";
import { audioEngine } from "../utils/audioEngine";

/**
 * Custom hook to access audioEngine with reactive mute state.
 *
 * This hook subscribes to mute state changes and triggers re-renders
 * when the state changes, allowing React components to stay in sync
 * with the audioEngine.
 */
export function useAudioEngine() {
  const [muted, setMuted] = useState(audioEngine.isMuted());

  useEffect(() => {
    return audioEngine.onMuteChange(setMuted);
  }, []);

  return {
    muted,
    setMuted: (value: boolean) => audioEngine.setMuted(value),
    playNote: (note: string, duration?: number) =>
      audioEngine.playNote(note, duration),
    playChord: (notes: string[], duration?: number) =>
      audioEngine.playChord(notes, duration),
    playScale: (notes: string[], interval?: number) =>
      audioEngine.playScale(notes, interval),
  };
}
