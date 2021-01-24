import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(new NoteList([new Note('C', '', 4)]))
  const root = notes.notes[0]

  function rootChange(note, prev=undefined) {
    if (prev !== undefined) {
      setNotes(state => state.transpose(prev.intervalTo(note)))
    } else {
      setNotes(new NoteList([note.toPitch(4)]))
    }
  }
  
  function scaleChange(name) {
    setNotes(Scale.fromString(name))
  }

  function chordChange(name) {
    setNotes(Chord.fromString(name))
  }

  return (
    <div>
      <Piano notes={notes}></Piano>
      <br /><br />
      <RootNote selected={root.toPitchClass()} onChange={rootChange}></RootNote>
      <br /><br />
      <OptionList name="Scales" root={root} options={Scale.scales} onChange={scaleChange}></OptionList>
      <br /><br />
      <OptionList name="Chords" root={root} options={Chord.chords} onChange={chordChange}></OptionList>
    </div>
  );
}
