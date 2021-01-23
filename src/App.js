import './App.css';
import { useState } from 'react'
import OptionList from './OptionList.js'
import Piano from './Piano.js'
import RootNote from './RootNote.js'

export default function App() {

  const [notes, setNotes] = useState(['C'])

  function rootChange(note, prev=undefined) {
    setNotes(state => [note])
  }

  return (
    <div>
      <Piano notes={notes}></Piano>
      <br /><br />
      <RootNote selected={notes[0]} onChange={rootChange}></RootNote>
      <br /><br />
      <OptionList name="Scales" root={notes[0]}></OptionList>
      <br /><br />
      <OptionList name="Chords" root={notes[0]}></OptionList>
    </div>
  );
}
