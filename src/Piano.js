export default function Piano(props) {

  const notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
                 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
                 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5']

  function handleClick(note, wasPressed) {
    props.onClick(note, wasPressed)
  }

  const keys = notes.map(note => {
    if (props.notes.includes(note, true)) {
      return <span onClick={() => handleClick(note, true)}><strong>{note}</strong></span>
    } else {
      return <span onClick={() => handleClick(note, false)}>{note}</span>
    }
  })

  return (
    <div>
      <div>Piano:</div>
      {keys}
    </div>
  )
}
