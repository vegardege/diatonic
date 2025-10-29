import Modal from "../Modal/Modal";
import styles from "../Modal/Modal.module.css";

interface KeyboardModalProps {
  display: boolean;
  onClose: () => void;
}

export default function KeyboardModal(props: KeyboardModalProps) {
  return (
    <Modal
      title="Keyboard Shortcuts"
      display={props.display}
      onClose={props.onClose}
    >
      <table>
        <tbody>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Esc</span>
            </td>
            <td className={styles.tableCell}>Close modal popup</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Q</span> –{" "}
              <span className={styles.shortcut}>U</span>
            </td>
            <td className={styles.tableCell}>Press/unpress key in octave 3</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>A</span> –{" "}
              <span className={styles.shortcut}>J</span>
            </td>
            <td className={styles.tableCell}>Press/unpress key in octave 4</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Z</span> –{" "}
              <span className={styles.shortcut}>M</span>
            </td>
            <td className={styles.tableCell}>Press/unpress key in octave 5</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                >
                  <title>Shift key</title>
                  <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" />
                </svg>{" "}
                Shift
              </span>
            </td>
            <td align="center" className={styles.tableCell}>
              Increase pressed note (<span className={styles.shortcut}>Q</span>{" "}
              – <span className={styles.shortcut}>M</span>) by a semitone
            </td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                >
                  <title>Left arrow key</title>
                  <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </span>{" "}
              <span className={styles.shortcut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                >
                  <title>Right arrow key</title>
                  <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </td>
            <td className={styles.tableCell}>
              Transpose pressed keys up/down one semitone
            </td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Tab</span>
            </td>
            <td className={styles.tableCell}>
              Navigate between focusable elements
            </td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Enter</span>
            </td>
            <td className={styles.tableCell}>Click focused element</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>Space</span>
            </td>
            <td className={styles.tableCell}>Reset piano</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>1</span>
            </td>
            <td className={styles.tableCell}>Mute/unmute audio</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>2</span>
            </td>
            <td className={styles.tableCell}>Play pressed notes in arpeggio</td>
          </tr>
          <tr>
            <td align="center" className={styles.tableCell}>
              <span className={styles.shortcut}>3</span>
            </td>
            <td className={styles.tableCell}>Play pressed notes in harmony</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}
