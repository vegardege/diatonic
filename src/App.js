import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import PatternList from './PatternList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

/**
 * The app consists of three different components:
 * - `Piano` is an SVG piano allowing the user to press or hover keys
 * - `RootKey` is a list of buttons allowing the lowest pitch to be set
 * - `PatternList` is a list of note patterns the user can select
 * 
 * The components are connected, ensuring that their state is consistent.
 * If you click or hover one component, the others will update in real time.
 */
export default function App() {

  // A key can be pressed or highlighted. The two sets are kept
  // as separate state objects, as they change independently.
  const [pressed, setPressed] = useState(new NoteList([]))
  const [highlighted, setHighlighted] = useState(new NoteList([]))

  const currentRoot = pressed.notes[0]
  const currentHighlighRoot = highlighted.notes[0]

  // Find scales and chords matching current state of the piano.
  // For pressed we want the superset with all possible extensions,
  // for highlight we only need to know if therer is an exact match.
  const pressMatch = pressed.supersets()
  const highlightMatch = highlighted.search()

  /**
   * Called when the user clicks a piano key, either to press or
   * unpress the key.
   * 
   * @param {string} note The note of the key that was clicked
   * @param {boolean} pressed True if pressed, false if unpressed
   */
  function handlePianoChange(note, pressed) {
    if (pressed) {
      setPressed(state => state.add(note).sort())
    } else {
      setPressed(state => state.remove(note, true).sort())
    }
  }

  /**
   * Called when the user hovers a piano key.
   * 
   * @param {string} note The note of the key that is hovered
   */
  function handlePianoHover(note) {
    setHighlighted(pressed.add(Note.fromString(note)).sort())
  }

  /**
   * Called when the user clicks a button in the root note component.
   * 
   * If keys are already pressed, we transpose them to get a new selection
   * with the desired key as root (lowest pitch). Otherwise, we simply
   * press the desired note.
   *
   * @param {Note} newRoot The new root note
   */
  function handleRootChange(newRoot) {
    if (currentRoot === undefined) {
      setPressed(new NoteList([newRoot]))
    } else {
      setPressed(state => state.transpose(currentRoot.intervalTo(newRoot)))
    }
  }

  /**
   * Called when the user hovers a button the root note component.
   * 
   * If keys are already pressed, we transpose them to get a new selection
   * with the desired key as root (lowest pitch). Otherwise, we simply
   * highlight the desired note.
   *
   * @param {Note} newRoot The new root note
   */
  function handleRootHover(newRoot) {
    if (currentRoot === undefined) {
      setHighlighted(new NoteList([newRoot]))
    } else {
      setHighlighted(pressed.transpose(currentRoot.intervalTo(newRoot)))
    }
  }

  /**
   * Called when the user clicks a pattern button.
   * Sets all keys in pattern as pressed.
   *
   * @param {class} cls NoteList class name of pattern
   * @param {string} name Name of pattern
   */
  function handlePatternChange(cls, name) {
    setPressed(new cls(currentRoot || new Note('C', '', 4), name))
  }

  /**
   * Called when the user hovers a pattern button.
   * Sets all keys in pattern as highlighted.
   *
   * @param {class} cls NoteList class name of pattern
   * @param {string} name Name of pattern
   */
  function handlePatternHover(cls, name) {
    setHighlighted(new cls(currentRoot || new Note('C', '', 4), name))
  }

  return (
    <div id="app">
      <div class="piano">
        <Piano octaves='3'
               width='780'
               pressed={pressed.simplify().toStringArray()}
               highlighted={highlighted.simplify().toStringArray()}
               onClick={handlePianoChange}
               onMouseEnter={handlePianoHover}
               onMouseLeave={() => setHighlighted(new NoteList([]))} />
      </div>
      <div id="controls">
        <RootNote pressed={currentRoot}
                  highlighted={currentHighlighRoot}
                  onClick={(...note) => handleRootChange(new Note(...note))}
                  onMouseEnter={(...note) => handleRootHover(new Note(...note))}
                  onMouseLeave={() => setHighlighted(new NoteList([]))} />

        <PatternList name="Scales"
                     patterns={Scale.scales}
                     pressMatch={pressMatch['scales']}
                     highlightMatch={highlightMatch['scales']}
                     onClick={(name) => handlePatternChange(Scale, name)}
                     onMouseEnter={(name) => handlePatternHover(Scale, name)}
                     onMouseLeave={() => setHighlighted(new NoteList([]))} />

        <PatternList name="Chords"
                     patterns={Chord.chords}
                     pressMatch={pressMatch['chords']}
                     highlightMatch={highlightMatch['chords']}
                     onClick={(name) => handlePatternChange(Chord, name)}
                     onMouseEnter={(name) => handlePatternHover(Chord, name)}
                     onMouseLeave={() => setHighlighted(new NoteList([]))} />
      </div>
    </div>
  );
}
