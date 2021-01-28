import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(new NoteList([]))
  const [highlight, setHighlight] = useState(new NoteList([]))

  const currentRoot = notes.notes[0]
  const currentHighlighRoot = highlight.notes[0]

  // Find scales and chords matching current state of the piano.
  // For pressed we want the superset with all possible extensions,
  // for highlight we only need to know if therer is an exact match.
  const pressMatch = notes.supersets()
  const highlightMatch = highlight.search()

  function pianoChange(note, wasPressed) {
    if (wasPressed) {
      setNotes(state => state.remove(note, true).sort())
    } else {
      setNotes(state => state.add(note).sort())
    }
  }

  function pianoHover(note, active) {
    if (active) {
      setHighlight(notes.add(Note.fromString(note)).sort())
    } else {
      setHighlight(notes.remove(Note.fromString(note), true).sort())
    }
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
      setNotes(new NoteList([newRoot]))
    } else {
      setNotes(state => state.transpose(currentRoot.intervalTo(newRoot)))
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
      setHighlight(new NoteList([newRoot]))
    } else {
      setHighlight(notes.transpose(currentRoot.intervalTo(newRoot)))
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
    setNotes(new cls(currentRoot || new Note('C', '', 4), name))
  }

  /**
   * Called when the user hovers a pattern button.
   * Sets all keys in pattern as highlighted.
   *
   * @param {class} cls NoteList class name of pattern
   * @param {string} name Name of pattern
   */
  function handlePatternHover(cls, name) {
    setHighlight(new cls(currentRoot || new Note('C', '', 4), name))
  }

  return (
    <div id="app">
      <div class="piano">
        <Piano keys={7*3} width={780} notes={notes.simplify().toStringArray()} highlight={highlight.simplify().toStringArray()}
          onClick={pianoChange} onHover={pianoHover}></Piano>
      </div>
      <div id="controls">
        <RootNote selected={currentRoot}
                  highlighted={currentHighlighRoot}
                  onClick={(...note) => handleRootChange(new Note(...note))}
                  onMouseEnter={(...note) => handleRootHover(new Note(...note))}
                  onMouseLeave={() => setHighlight(new NoteList([]))} />

        <OptionList name="Scales"
                    options={Scale.scales}
                    pressMatch={pressMatch['scales']}
                    highlightMatch={highlightMatch['scales']}
                    onClick={(name) => handlePatternChange(Scale, name)}
                    onMouseEnter={(name) => handlePatternHover(Scale, name)}
                    onMouseLeave={() => setHighlight(new NoteList([]))} />

        <OptionList name="Chords"
                    options={Chord.chords}
                    pressMatch={pressMatch['chords']}
                    highlightMatch={highlightMatch['chords']}
                    onClick={(name) => handlePatternChange(Chord, name)}
                    onMouseEnter={(name) => handlePatternHover(Chord, name)}
                    onMouseLeave={() => setHighlight(new NoteList([]))} />
      </div>
    </div>
  );
}
