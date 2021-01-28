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

  const match = notes.supersets()

  function pianoChange(note, wasPressed) {
    if (wasPressed) {
      setNotes(state => state.remove(note, true).sort())
    } else {
      setNotes(state => state.add(note).sort())
    }
  }

  function pianoHover(note, active) {
    if (active) {
      setHighlight(state => state.add(Note.fromString(note)))
    } else {
      setHighlight(state => state.remove(Note.fromString(note), true))
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

  function scaleChange(name) {
    setNotes(new Scale(currentRoot || new Note('C', '', 4), name))
  }

  function scaleHover(name, active) {
    if (active) {
      setHighlight(new Scale(currentRoot || new Note('C', '', 4), name))
    } else {
      setHighlight(new NoteList([]))
    }
  }

  function chordChange(name) {
    setNotes(new Chord(currentRoot || new Note('C', '', 4), name))
  }

  function chordHover(name, active) {
    if (active) {
      setHighlight(new Chord(currentRoot || new Note('C', '', 4), name))
    } else {
      setHighlight(new NoteList([]))
    }
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
        <OptionList name="Scales" class="scale" root={currentRoot} options={Scale.scales} match={match['scales']}
            onChange={scaleChange} onHover={scaleHover}></OptionList>
        <OptionList name="Chords" class="chord" root={currentRoot} options={Chord.chords} match={match['chords']}
            onChange={chordChange} onHover={chordHover}></OptionList>
      </div>
    </div>
  );
}
