import "./Modal.css";
import type { MouseEvent } from 'react'

interface KeyboardModalProps {
  display: boolean
  onClose: () => void
}

export default function KeyboardModal(props: KeyboardModalProps) {
  const stopPropagation = (e: MouseEvent) => e.stopPropagation()

  return (
    <div
      className={`modal ${props.display ? "" : "hidden"}`}
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
    >
      <section onClick={stopPropagation}>
        <button
          id="keyboardClose"
          className="close"
          aria-label="Close"
          onClick={props.onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
          </svg>
        </button>
        <h1>Keyboard Shortcuts</h1>
        <table>
          <tbody>
            <tr>
              <td align="center">
                <span className="shortcut">Esc</span>
              </td>
              <td>Close modal popup</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">Q</span> –{" "}
                <span className="shortcut">U</span>
              </td>
              <td>Press/unpress key in octave 3</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">A</span> –{" "}
                <span className="shortcut">J</span>
              </td>
              <td>Press/unpress key in octave 4</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">Z</span> –{" "}
                <span className="shortcut">M</span>
              </td>
              <td>Press/unpress key in octave 5</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" />
                  </svg>{" "}
                  Shift
                </span>
              </td>
              <td align="center">
                Increase pressed note (<span className="shortcut">Q</span>{" "}–{" "}
                <span className="shortcut">M</span>) by a semitone
              </td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                  </svg>
                </span>{" "}
                <span className="shortcut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </span>
              </td>
              <td>Transpose pressed keys up/down one semitone</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">Tab</span>
              </td>
              <td>Navigate between focusable elements</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">Enter</span>
              </td>
              <td>Click focused element</td>
            </tr>
            <tr>
              <td align="center">
                <span className="shortcut">Space</span>
              </td>
              <td>Reset piano</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
