import { Piano } from "@diatonic/piano";
import { chord, scale } from "kamasi";
import Modal from "../Modal/Modal";
import styles from "../Modal/Modal.module.css";

interface HelpModalProps {
  display: boolean;
  onClose: () => void;
}

export default function HelpModal(props: HelpModalProps) {
  return (
    <Modal title="Help" display={props.display} onClose={props.onClose}>
      <h2 className={styles.subheading}>Lookup</h2>
      <Piano octaves={3} pressed={scale("B3 pentatonic minor")} />
      <p className={styles.paragraph}>
        The <strong className={styles.strong}>tonic</strong> is the leftmost key
        pressed, and the start of an ascending musical pattern. The default
        tonic is C4. Change tonic to transpose the pressed keys.
      </p>
      <p className={styles.paragraph}>
        A <strong className={styles.strong}>scale</strong> is a sequence of
        notes, normally spanning a single octave, which is played in sequence.
        Click a scale button to see it highlighted for the selected tonic.
      </p>
      <p className={styles.paragraph}>
        A <strong className={styles.strong}>chord</strong> is a set of notes,
        which is normally played harmonically (at the same time). Click a chord
        button to see it highlighted for the selected tonic.
      </p>
      <h2 className={styles.subheading}>Reverse Lookup</h2>
      <Piano octaves={3} pressed={chord("C4 major")} />
      <p className={styles.paragraph}>
        As you press keys on the piano, the selectable scales and chords will be
        filtered according to the tonic and proceeding intervals. Once you have
        a perfect match, the button will be selected.
      </p>
    </Modal>
  );
}
