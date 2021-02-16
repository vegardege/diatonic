import './PatternList.css'
import Button from './Button.js'

/**
 * A list of buttons containing a pattern (scale or chord).
 */
export default function PatternList(props) {

  const buttons = props.patterns.map(option => {
    const isPressed = props.pressed.includes(option),
          isHightlighted = props.highlighted.includes(option)

    const [, mainText, subText] = option.split(/^([^\s]+)\s?(.*)$/)

    return <li key={option}>
      <Button text={mainText}
              subText={subText}
              isSelected={isPressed}
              isHighlighted={isHightlighted}
              onClick={() => props.onClick(option, isPressed)}
              onMouseEnter={() => props.onMouseEnter(option)}
              onMouseLeave={props.onMouseLeave}
              onFocus={() => props.onFocus(option)}
              onBlur={props.onBlur}
       />
      </li>
  })

  return <ul className='options'>{buttons}</ul>
}
