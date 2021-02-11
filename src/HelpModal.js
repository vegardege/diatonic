import './Modal.css'
import { Piano } from 'diatonic-piano'
import { chord, scale } from 'kamasi'


export default function HelpModal(props) {
  return <div className={`modal ${props.display ? '' : 'hidden'}`}
              role="dialog"
              aria-modal="true"
              onClick={props.onClose}>
    <section onClick={e => e.stopPropagation()}>
      <button id="helpClose"
              class="close"
              aria-label="Close"
              onClick={props.onClose}>X</button>
      <h1>Help</h1>
      <h2>Lookup</h2>
      <Piano octaves="3" pressed={scale('B3 pentatonic minor')} />
      <p>The <strong>tonic</strong> is the leftmost key pressed, and the start of an ascending musical pattern.
      The default tonic is C4. Change tonic to transpose the pressed keys.</p>
      <p>A <strong>scale</strong> is a sequence of notes, normally spanning a single octave, which is played
      in sequence. Click a scale button to see it highlighted for the selected tonic.</p>
      <p>A <strong>chord</strong> is a set of notes, which is normally played harmonically (at the same time).
      Click a chord button to see it highlighted for the selected tonic.</p>
      <h2>Reverse Lookup</h2>
      <Piano octaves="3" pressed={['C4', 'E4', 'G4']} />
      <p>As you press keys on the piano, the selectable scales and chords will be filtered according to the
        tonic and proceeding intervals. Once you have a perfect match, the button will be selected.
      </p>
    </section>
  </div>
}