import './App.css';
import { useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(new NoteList([new Note('C')]))

  function rootChange(note, prev=undefined) {
    if (prev !== undefined) {
      setNotes(state => state.transpose(prev.intervalTo(note)))
    } else {
      setNotes(new NoteList([note]))
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
      <Piano notes={notes.notes}></Piano>
      <br /><br />
      <RootNote selected={notes.notes[0]} onChange={rootChange}></RootNote>
      <br /><br />
      <OptionList name="Scales" root={notes.notes[0]} onChange={scaleChange}></OptionList>
      <br /><br />
      <OptionList name="Chords" root={notes.notes[0]} onChange={chordChange}></OptionList>
    </div>
  );
}
