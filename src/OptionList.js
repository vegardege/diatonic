import Button from './Button.js'

export default function OptionList(props) {

  const options = Object.keys(props.options)

  // TODO This is terrible, will be replaced through a change in kamasi
  function matchResult(name) {
    console.log(name + ' ' + props.name)
    const match = props.match.find(m => m['name'] === name && m['type'] === props.name)

    return match === undefined ? 0 : match['match']
  }

  const buttons = options.map(option => {
    const match = Math.round(100*matchResult(option))
    const text = `${option} (${match}%)`
    return <Button text={text} model={option} onClick={props.onChange} />
  })

  return (
    <div>
      <div>{props.name} options</div>
      <div>{buttons}</div>
    </div>
  )
}
