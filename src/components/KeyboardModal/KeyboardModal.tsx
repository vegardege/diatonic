import type { MouseEvent } from "react";
import styles from "./Modal.module.css";

interface KeyboardModalProps {
  display: boolean;
  onClose: () => void;
}

export default function KeyboardModal(props: KeyboardModalProps) {
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`${styles.modal} ${props.display ? "" : styles.hidden}`}
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
    >
      <section onClick={stopPropagation}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={props.onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
          >
            <title>Close</title>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.3 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        </button>
        <h1 className={styles.heading}>Keyboard Shortcuts</h1>
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
              <td className={styles.tableCell}>
                Press/unpress key in octave 3
              </td>
            </tr>
            <tr>
              <td align="center" className={styles.tableCell}>
                <span className={styles.shortcut}>A</span> –{" "}
                <span className={styles.shortcut}>J</span>
              </td>
              <td className={styles.tableCell}>
                Press/unpress key in octave 4
              </td>
            </tr>
            <tr>
              <td align="center" className={styles.tableCell}>
                <span className={styles.shortcut}>Z</span> –{" "}
                <span className={styles.shortcut}>M</span>
              </td>
              <td className={styles.tableCell}>
                Press/unpress key in octave 5
              </td>
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
                Increase pressed note (
                <span className={styles.shortcut}>Q</span> –{" "}
                <span className={styles.shortcut}>M</span>) by a semitone
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
          </tbody>
        </table>
      </section>
    </div>
  );
}
