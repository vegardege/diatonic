import Button from './Button.js'

export default function RootNote(props) {

  function isSelected(note) {
    if (props.selected === undefined) {
      return false
    }
    return props.selected.toPitchClass().isEnharmonic(note.toPitchClass())
  }

  const buttons = props.notes.notes.map(note => {
    const text = note.toPitchClass().toString()
    return <Button key={text} text={text} model={note}
      onClick={props.onChange}
      onMouseEnter={() => props.onHover(note, true)}
      onMouseLeave={() => props.onHover(note, false)}
      selected={isSelected(note)} />
  })

  return (
    <div>
      <div>Root</div>
      <div>{buttons}</div>
    </div>
  )
}
