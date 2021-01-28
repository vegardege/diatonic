import './OptionList.css'
import Button from './Button.js'

export default function OptionList(props) {

  const buttons = Object.keys(props.options).map(option => {
    const match = Math.round(100 * props.match[option])
    const text = `${option} (${match}%)`

    return <Button key={text} text={text} isSelected={match === 100}
      model={option} onClick={props.onChange} class={props.class}
      onMouseEnter={() => props.onHover(option, true)}
      onMouseLeave={() => props.onHover(option, false)} />
  })

  return (
    <div class="notelists">
      <h2>{props.name}</h2>
      <div>{buttons}</div>
    </div>
  )
}
