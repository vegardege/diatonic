import './PatternList.css'
import Button from './Button.js'

/**
 * A list of buttons containing a pattern (scale or chord).
 */
export default function PatternList(props) {

  const buttons = props.patterns.map(option => {
    const isPressed = props.pressMatch[option] >= 1,
          isHightlighted = props.highlightMatch[option] >= 1

    const [, mainText, subText] = option.split(/^([^\s]+)\s?(.*)$/)

    return <Button key={option}
                   text={mainText}
                   subText={subText}
                   isSelected={isPressed}
                   isHighlighted={isHightlighted}
                   showProgress={true}
                   progress={props.pressMatch[option]}
                   onClick={() => props.onClick(option, isPressed)}
                   onMouseEnter={() => props.onMouseEnter(option)}
                   onMouseLeave={props.onMouseLeave} />
  })

  return (
    <div class='patternlist'>
      <h2>{props.name}</h2>
      <div className='options'>{buttons}</div>
    </div>
  )
}
