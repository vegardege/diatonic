import Button from './Button.js'

export default function OptionList(props) {

  const buttons = Object.keys(props.options).map(option => {
    const match = Math.round(100 * props.match[option])
    const text = `${option} (${match}%)`

    return <Button key={text} text={text} selected={match === 100}
      model={option} onClick={props.onChange}
      onMouseEnter={() => props.onHover(option, true)}
      onMouseLeave={() => props.onHover(option, false)} />
  })

  return (
    <div>
      <div>{props.name} options</div>
      <div>{buttons}</div>
    </div>
  )
}
