import './Button.css'

export default function Button(props) {

  const selectedStyle = {
    background: 'blue',
  }
  
  return (
    <div class="button" style={props.selected ? selectedStyle : {}} onClick={() => props.onClick(props.model)}>
      {props.selected ? <b>{props.text}</b> : props.text}
    </div>
  )
}
