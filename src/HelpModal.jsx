import './Modal.css'
import { Piano } from '@diatonic/piano'
import { chord, scale } from 'kamasi'


export default function HelpModal(props) {
  return <div className={`modal ${props.display ? '' : 'hidden'}`}
              role="dialog"
              aria-modal="true"
              onClick={props.onClose}>
    <section onClick={e => e.stopPropagation()}>
      <button id="helpClose"
              className="close"
              aria-label="Close"
              onClick={props.onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
        </svg>
      </button>
      <h1>Help</h1>
      <h2>Lookup</h2>
      <Piano octaves={3} pressed={scale('B3 pentatonic minor')} />
      <p>The <strong>tonic</strong> is the leftmost key pressed, and the start of an ascending musical pattern.
      The default tonic is C4. Change tonic to transpose the pressed keys.</p>
      <p>A <strong>scale</strong> is a sequence of notes, normally spanning a single octave, which is played
      in sequence. Click a scale button to see it highlighted for the selected tonic.</p>
      <p>A <strong>chord</strong> is a set of notes, which is normally played harmonically (at the same time).
      Click a chord button to see it highlighted for the selected tonic.</p>
      <h2>Reverse Lookup</h2>
      <Piano octaves={3} pressed={chord('C4 major')} />
      <p>As you press keys on the piano, the selectable scales and chords will be filtered according to the
        tonic and proceeding intervals. Once you have a perfect match, the button will be selected.
      </p>
    </section>
  </div>
}