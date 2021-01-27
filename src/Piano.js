export default function Piano(props) {

  const diatonic = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const chromatic = [true, true, false, true, true, true, false]

  // We need at least seven diatonic keys, and always start with one of them.
  // The fourth octave is automatically centered.
  const keyCount = Math.min(77, Math.max(7, props.keys || 7 * 3))
  const ixStart = -Math.floor((keyCount - 7) / 2)
  const centerOctave = 4

  // Keep a fixed ratio for display purposes
  const size = {
    piano: {
      width: props.width || 670,
      height: 4 * (props.width || 670) / keyCount,
    },
  }
  size.diatonicKey = {
      width: size.piano.width / keyCount,
      height: size.piano.height,
      rx: 5,
  }
  size.chromaticKey = {
      width: size.diatonicKey.width / 2,
      height: size.diatonicKey.height / 2,
      offset: size.diatonicKey.width * (3/4),
      rx: 5,
  }

  const diatonicKeys = [...Array(keyCount).keys()].map(ix => {
      const octave = centerOctave + Math.floor((ixStart + ix) / 7)
      const diatonicNote = diatonic[mod((ixStart + ix), 7)]
      const selected = props.notes.includes(diatonicNote + octave)
      const highlighted = props.highlight.includes(diatonicNote + octave)

      // TODO Make separate componen
      return <rect x={ix * size.diatonicKey.width}
                   y={0}
                   width={size.diatonicKey.width}
                   height={size.diatonicKey.height}
                   fill={selected ? '#E84855' : highlighted ? '#F9E9EC' : 'white'}
                   stroke='black'
                   strokeWidth='1.5'
                   rx={size.diatonicKey.rx}
                   onClick={() => handleClick(diatonicNote + octave, selected)} />
    })

  const chromaticKeys = [...Array(keyCount).keys()].map(ix => {
    const octave = centerOctave + Math.floor((ixStart + ix) / 7)
    const diatonicNote = diatonic[mod(ixStart + ix, 7)]
    const hasChromatic = chromatic[mod(ixStart + ix, 7)]
    const selected = props.notes.includes(diatonicNote + '#' + octave)
    const highlighted = props.highlight.includes(diatonicNote + '#' + octave)

    if (!hasChromatic) {
      return undefined
    }

    // TODO Make separate component
    return <rect x={ix * size.diatonicKey.width + size.chromaticKey.offset}
                 y={0}
                 width={size.chromaticKey.width}
                 height={size.chromaticKey.height}
                 fill={selected ? '#E84855' : highlighted ? '#F9E9EC' : 'black'}
                 stroke='black'
                 strokeWidth='1.5'
                 rx={size.chromaticKey.rx}
                 onClick={() => handleClick(diatonicNote + '#' + octave, selected)} />
  })

  function handleClick(note, wasPressed) {
    props.onClick(note, wasPressed)
  }

  return (
    <svg width={size.piano.width} height={size.piano.height}>
      {diatonicKeys}
      {chromaticKeys}
    </svg>
  )
}

function mod(divisor, dividend, offset=0) {
  return divisor - dividend * Math.floor((divisor - offset) / dividend)
}
