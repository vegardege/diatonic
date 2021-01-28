import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(new NoteList([]))
  const [highlight, setHighlight] = useState(new NoteList([]))

  const rootNotes = NoteList.fromString('C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4 B4')
  const currentRoot = notes.notes[0]

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

  function rootChange(note) {
    if (currentRoot !== undefined) {
      setNotes(state => state.transpose(currentRoot.intervalTo(note)))
    } else {
      setNotes(new NoteList([note.toPitch(4)]))
    }
  }

  function rootHover(note, active) {
    if (active) {
      if (currentRoot !== undefined) {
        setHighlight(notes.transpose(currentRoot.intervalTo(note)))
      } else {
        setHighlight(new NoteList([note.toPitch(4)]))
      }
    } else {
      setHighlight(new NoteList([]))
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
    <div id="page">
      <div class="piano">
        <Piano keys={7*3} width={780} notes={notes.simplify().toStringArray()} highlight={highlight.simplify().toStringArray()}
          onClick={pianoChange} onHover={pianoHover}></Piano>
      </div>
      <div id="controls">
        <div>
          <RootNote notes={rootNotes} selected={currentRoot}
            onChange={rootChange} onHover={rootHover}></RootNote>
        </div>
        <div class="notelists">
          <OptionList name="Scales" class="scale" root={currentRoot} options={Scale.scales} match={match['scales']}
            onChange={scaleChange} onHover={scaleHover}></OptionList>
        </div>
        <div class="notelists">
          <OptionList name="Chords" class="chord" root={currentRoot} options={Chord.chords} match={match['chords']}
            onChange={chordChange} onHover={chordHover}></OptionList>
        </div>
      </div>
    </div>
  );
}
