import './PatternList.css'
import Button from './Button.js'

/**
 * A list of buttons containing a pattern (scale or chord).
 */
export default function PatternList(props) {

  const buttons = Object.keys(props.patterns).map(option => {
    const match = Math.round(100 * props.pressMatch[option])
    const hMatch = Math.round(100 * props.highlightMatch[option])
    const text = `${option} (${match}%)`

    return <Button key={option}
                   text={text}
                   isSelected={match === 100}
                   isHighlighted={hMatch === 100}
                   onClick={() => props.onClick(option)}
                   onMouseEnter={() => props.onMouseEnter(option)}
                   onMouseLeave={props.onMouseLeave} />
  })

  return (
    <div class="notelists">
      <h2>{props.name}</h2>
      <div>{buttons}</div>
    </div>
  )
}
