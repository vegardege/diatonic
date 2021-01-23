import Button from './Button.js'

export default function OptionList(props) {

  const options = ['major', 'minor', 'dim']

  const buttons = options.map(option => {
    const text = `${props.root} ${option}`
    return <Button text={text} />
  })

  return (
    <div>
      <div>{props.name} options</div>
      <div>{buttons}</div>
    </div>
  )
}