import './PatternList.css'
import Button from './Button.js'

/**
 * A list of buttons containing a pattern (scale or chord).
 */
export default function PatternList(props) {

  const buttons = Object.keys(props.patterns).map(option => {
    const match = props.pressMatch[option],
          hightlightMatch = props.highlightMatch[option],
          isSelected = match >= 1,
          isHightlighted = hightlightMatch >= 1

    if (props.pressMatch[option] === undefined) return null;

    return <Button key={option}
                   text={option}
                   isSelected={isSelected}
                   isHighlighted={isHightlighted}
                   showProgress={true}
                   progress={props.pressMatch[option]}
                   onClick={() => props.onClick(option, isSelected)}
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
