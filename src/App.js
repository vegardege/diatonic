import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(new NoteList([new Note('C', '', 4)]))

  const rootNotes = NoteList.fromString('C4 C#4 D4 D#4 E4 F4 G4 G#4 A4 A#4 B4')
  const currentRoot = notes.notes[0]

  const match = notes.supersets()

  function pianoChange(note, wasPressed) {
    if (wasPressed) {
      setNotes(state => new NoteList(state.notes.filter(n => !n.isEnharmonic(note))).sort())
    } else {
      setNotes(state => new NoteList(state.notes.concat([Note.fromString(note)])).sort())
    }
  }

  function rootChange(note) {
    if (currentRoot !== undefined) {
      setNotes(state => state.transpose(currentRoot.intervalTo(note)))
    } else {
      setNotes(new NoteList([note.toPitch(4)]))
    }
  }

  function scaleChange(name) {
    setNotes(new Scale(currentRoot || new Note('C', '', 4), name))
  }

  function chordChange(name) {
    setNotes(new Chord(currentRoot || new Note('C', '', 4), name))
  }

  return (
    <div>
      <Piano notes={notes} onClick={pianoChange}></Piano>
      <br /><br />
      <RootNote notes={rootNotes} selected={currentRoot} onChange={rootChange}></RootNote>
      <br /><br />
      <OptionList name="scale" root={currentRoot} options={Scale.scales} onChange={scaleChange} match={match}></OptionList>
      <br /><br />
      <OptionList name="chord" root={currentRoot} options={Chord.chords} onChange={chordChange} match={match}></OptionList>
    </div>
  );
}
