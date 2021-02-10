import './RootNote.css'
import Button from './Button.js'

/**
 * The root note component lets the user modify the lowest pitch of their
 * selected note sequence. This can be used to press the initial note, or
 * to transpose the currently pressed notes to a new key.
 * 
 * A note is composed of a letter (C-B), accidentals (#/b), and an octave
 * number (3-5). Together, they uniquely identify a pitch. This component
 * produces three button groups, one for each, but report the full note
 * through events, solving the problem of combining the three groups.
 * 
 * Events:
 * - onClick(letter, accidental, octave): A new root note is pressed
 * - onMouseEnter(letter, accidental, octave): A new root note is hovered
 * - onMouseLeave(): No notes are hovered
 */
export default function RootNote(props) {

  const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const accidentals = ['#', 'b']
  const octaves = props.octaves || [3, 4, 5]

  /**
   * Create a button for one of the three button groups.
   * The button is expanded to be aware of the other button groups,
   * helping it report a complete note to its parent.
   * 
   * @param {string} letter Note letter or ''
   * @param {string} accidental Accidental or ''
   * @param {string} octave Octave or ''
   */
  function createButton(letter, accidental, octave) {
    const text = letter || accidental || octave,
          inputNote = [letter, accidental, octave],
          expandedNote = expandNote(...inputNote)

    return <li key={text}>
      <Button text={text}
              isSelected={isSelected(props.pressed, ...inputNote)}
              isHighlighted={isSelected(props.highlighted, ...inputNote)}
              onClick={() => props.onClick(...expandedNote)}
              onMouseEnter={() => props.onMouseEnter(...expandedNote)}
              onMouseLeave={props.onMouseLeave}
              onFocus={() => props.onFocus(...expandedNote)}
              onBlur={props.onBlur}
       />
      </li>
  }

  /**
   * Checks if a button should be selected or highlighted.
   * 
   * @param {Note} base The root note we compare to
   * @param {string} letter Note letter or ''
   * @param {string} accidental Accidental or ''
   * @param {string} octave Octave or ''
   */
  function isSelected(base, letter, accidental, octave) {
    return base === undefined ? false
      : letter ? base.letter === letter
      : accidental ? base.accidentals === accidental
      : octave ? base.octave === octave
      : false
  }

  /**
   * A button is initially only aware of its own value. This function
   * checks the status of the other buttons to make the button aware of
   * the complete root note selected.
   * 
   * Because there is no empty accidental button, we must allow the user
   * to toggle the accidental by pressing the button a second time.
   * 
   * The precedence is current button value, pressed value, or default (C4).
   */
  function expandNote(letter, accidental, octave) {

    letter = letter || props.pressed?.letter || letters[0]
    if (accidental === props.pressed?.accidentals) {
      accidental = '' // Toggle
    } else {
      accidental = accidental || props.pressed?.accidentals || ''
    }
    octave = octave || props.pressed?.octave || 4

    return [letter, accidental, octave]
  }

  const letterButtons = letters.map(letter => createButton(letter, '', ''))
  const accidentalButtons = accidentals.map(acc => createButton('', acc, ''))
  const octaveButtons = octaves.map(octave => createButton('', '', octave))

  return (
    <div id="rootNote">
      <ul className="buttonGroup">
        {letterButtons}
      </ul>
      <ul className="buttonGroup">
        {accidentalButtons}
      </ul>
      <ul className="buttonGroup">
        {octaveButtons}
      </ul>
    </div>
  )
}
