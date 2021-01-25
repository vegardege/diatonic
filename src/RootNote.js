import Button from './Button.js'

export default function RootNote(props) {

  function isSelected(note) {
    if (props.selected === undefined) {
      return false
    }
    return props.selected.toPitchClass().isEnharmonic(note.toPitchClass())
  }

  const buttons = props.notes.notes.map(note => {
    return <Button text={note.toPitchClass().toString()}
      model={note} onClick={props.onChange}
      selected={isSelected(note)} />
  })

  return (
    <div>
      <div>Root</div>
      <div>{buttons}</div>
    </div>
  )
}
