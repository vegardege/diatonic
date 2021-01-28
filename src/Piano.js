export default function Piano(props) {

  const diatonic = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const chromatic = [true, true, false, true, true, true, false]

  // We need at least seven diatonic keys, and always start with one of them.
  // The fourth octave is automatically centered.
  const keyCount = Math.min(77, Math.max(7, 7 * props.octaves || 1))
  const firstOctave = 4 - Math.floor((props.octaves - 1) / 2)

  // Keep a fixed ratio for display purposes
  const size = {
    piano: {
      width: props.width || 670,
      height: 4 * (props.width || 670) / keyCount,
    },
  }
  size.diatonicKey = {
      width: size.piano.width / keyCount,
      height: size.piano.height - 1,
      rx: 5,
  }
  size.chromaticKey = {
      width: size.diatonicKey.width * 0.50,
      height: size.diatonicKey.height * 0.55,
      offset: size.diatonicKey.width * 0.75,
      rx: 5,
  }

  function keyColor(note, defaultColor) {
    const pressed = props.pressed.includes(note)
    const highlighted = props.highlighted.includes(note)

    if (pressed) {
      return '#E84855'
    } else if (highlighted) {
      return '#F2929A'
    }
    return defaultColor
  }

  const diatonicKeys = [...Array(keyCount).keys()].map(ix => {
      const octave = firstOctave + Math.floor(ix / 7)
      const diatonicNote = diatonic[mod(ix, 7)]
      const selected = props.pressed.includes(diatonicNote + octave)

      // TODO Make separate componen
      return <rect x={ix * size.diatonicKey.width}
                   y={0}
                   width={size.diatonicKey.width}
                   height={size.diatonicKey.height}
                   fill={keyColor(diatonicNote + octave, '#ffffff')}
                   stroke='black'
                   strokeWidth='1'
                   rx={size.diatonicKey.rx}
                   onClick={() => props.onClick(diatonicNote + octave, !selected)}
                   onMouseEnter={() => props.onMouseEnter(diatonicNote + octave)}
                   onMouseLeave={props.onMouseLeave} />
    })

  const chromaticKeys = [...Array(keyCount).keys()].map(ix => {
    const octave = firstOctave + Math.floor(ix / 7)
    const diatonicNote = diatonic[mod(ix, 7)]
    const hasChromatic = chromatic[mod(ix, 7)]
    const selected = props.pressed.includes(diatonicNote + '#' + octave)

    if (!hasChromatic) {
      return undefined
    }

    // TODO Make separate component
    return <rect x={ix * size.diatonicKey.width + size.chromaticKey.offset}
                 y={0}
                 width={size.chromaticKey.width}
                 height={size.chromaticKey.height}
                 fill={keyColor(diatonicNote + '#' + octave, '#000000')}
                 stroke='black'
                 strokeWidth='1'
                 rx={size.chromaticKey.rx}
                 onClick={() => props.onClick(diatonicNote + '#' + octave, !selected)}
                 onMouseEnter={() => props.onMouseEnter(diatonicNote + '#' + octave)}
                 onMouseLeave={() => props.onMouseLeave()} />
  })

  return (
    <svg width={size.piano.width} height={size.piano.height}>
      <g>
        {diatonicKeys}
        {chromaticKeys}
      </g>
      <rect x="0" y="0" width={size.piano.width} height="5" fill="#000" />
    </svg>
  )
}

function mod(divisor, dividend, offset=0) {
  return divisor - dividend * Math.floor((divisor - offset) / dividend)
}
