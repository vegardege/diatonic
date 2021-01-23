import Button from './Button.js'

export default function RootNote(props) {

  const notes = ['C', 'C#', 'D', 'D#', 'E',
    'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  function onClick(note) {
    const prev = props.selected
    props.onChange(note, prev)
  }

  const buttons = notes.map(note =>
    <Button text={note} onClick={onClick}
      selected={props.selected === note.toString()} />
  )

  return (
    <div>
      <div>Root</div>
      <div>{buttons}</div>
    </div>
  )
}
