import Button from './Button.js'

export default function RootNote(props) {

  const buttons = props.notes.notes.map(note =>
    <Button text={note.toPitchClass().toString()}
      model={note} onClick={props.onChange}
      selected={props.selected.toPitchClass().toString() === note.toPitchClass().toString()} />
  )

  return (
    <div>
      <div>Root</div>
      <div>{buttons}</div>
    </div>
  )
}
