import Button from './Button.js'

export default function OptionList(props) {


  function handleClick(s) {
    props.onChange(s, props.name)
  }

  const options = Object.keys(props.options)

  const buttons = options.map(option => {
    const text = `${props.root.toString()} ${option}`
    return <Button text={text}  onClick={handleClick} />
  })

  return (
    <div>
      <div>{props.name} options</div>
      <div>{buttons}</div>
    </div>
  )
}
