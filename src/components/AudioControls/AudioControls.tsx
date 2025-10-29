import styles from "../../App.module.css";

interface AudioControlsProps {
  muted: boolean;
  onToggleMute: () => void;
  onPlayArpeggio: () => void;
  onPlayHarmony: () => void;
}

// SVG Icons
const SVG_PROPS = {
  xmlns: "http://www.w3.org/2000/svg",
  shapeRendering: "geometricPrecision",
  textRendering: "geometricPrecision",
  imageRendering: "optimizeQuality",
  fillRule: "evenodd",
  clipRule: "evenodd",
} as const;

const MutedIcon = () => (
  <svg {...SVG_PROPS} viewBox="0 0 493 511.769">
    <title>Muted</title>
    <path
      fillRule="nonzero"
      d="M65.905 115.589h131.411L306.008 6.074c8.056-8.055 21.091-8.12 29.141-.065 4.099 3.969 6.11 9.257 6.11 14.609h.065v67.441L47.837 385.579a28.41 28.41 0 00-6.45 10.175 66.152 66.152 0 01-22.005-14.57C7.423 369.284 0 352.794 0 334.666V181.489c0-18.128 7.423-34.618 19.323-46.513 12.386-12.391 29.043-19.387 46.582-19.387zM450.34 59.237c9.716-9.775 25.525-9.819 35.3-.103 9.774 9.715 9.818 25.524.102 35.299L341.324 240.311v233.01c0 11.392-9.251 20.707-20.713 20.707-5.79 0-11.013-2.39-14.792-6.234l-107.433-87.287h-15.657L79.865 504.409c-9.716 9.775-25.524 9.818-35.299.103-9.775-9.716-9.818-25.525-.103-35.3L327.121 183.7l14.203-14.398v.054L450.34 59.237z"
    />
  </svg>
);

const UnmutedIcon = () => (
  <svg {...SVG_PROPS} viewBox="0 0 498 511.558">
    <title>Unmuted</title>
    <path
      fillRule="nonzero"
      d="M68.244 119.69h136.073l112.55-113.4c8.341-8.342 21.839-8.409 30.175-.067 4.243 4.109 6.326 9.584 6.326 15.127h.067v468.767c0 11.796-9.579 21.441-21.447 21.441-5.996 0-11.404-2.474-15.317-6.454l-111.245-90.386H68.244c-18.772 0-35.852-7.686-48.174-20.008C7.686 382.387 0 365.313 0 346.541V187.929c0-18.772 7.686-35.847 20.008-48.163 12.826-12.831 30.075-20.076 48.236-20.076zm382.143 70.909c-3.499-10.463 2.145-21.794 12.608-25.293 10.463-3.499 21.794 2.144 25.293 12.607 6.886 20.445 10.206 52.183 9.652 82.363-.538 29.576-4.86 58.637-13.223 75.802-4.838 9.943-16.835 14.08-26.777 9.243-9.943-4.837-14.08-16.834-9.243-26.777 5.811-11.93 8.862-34.71 9.304-58.895.482-26.099-2.133-52.787-7.614-69.05z"
    />
  </svg>
);

const PlayIcon = () => (
  <svg {...SVG_PROPS} viewBox="0 0 512 511.998">
    <title>Play</title>
    <path d="M256 0c140.799 0 256 115.2 256 255.999 0 140.8-115.201 255.999-256 255.999S0 396.799 0 255.999C0 115.2 115.201 0 256 0zm87.715 270.517c14.453-9.33 14.405-19.72 0-27.986l-115.896-80.696c-11.772-7.388-24.058-3.05-23.732 12.328l.463 162.344c1.013 16.671 10.525 21.243 24.562 13.534l114.603-79.524z" />
  </svg>
);

/**
 * Audio playback controls for the piano application.
 *
 * Provides buttons for:
 * - Muting/unmuting audio
 * - Playing pressed notes as an arpeggio (sequentially)
 * - Playing pressed notes as a harmony (all at once)
 */
export default function AudioControls({
  muted,
  onToggleMute,
  onPlayArpeggio,
  onPlayHarmony,
}: AudioControlsProps) {
  return (
    <div className={styles.navButtons}>
      <button
        className={styles.navButton}
        type="button"
        title={muted ? "Unmute" : "Mute"}
        onClick={onToggleMute}
      >
        {muted ? <MutedIcon /> : <UnmutedIcon />}
        {muted ? "Unmute" : "Mute"}
      </button>
      {!muted && (
        <>
          <button
            className={styles.navButton}
            type="button"
            title="Play all pressed notes sequentially"
            onClick={onPlayArpeggio}
          >
            <PlayIcon />
            Arpeggio
          </button>
          <button
            className={styles.navButton}
            type="button"
            title="Play all pressed notes together"
            onClick={onPlayHarmony}
          >
            <PlayIcon />
            Harmony
          </button>
        </>
      )}
    </div>
  );
}
