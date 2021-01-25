import './Button.css'

export default function Button(props) {
  
  return (
    <div class="button" onClick={() => props.onClick(props.model)}>
      {props.selected ? <b>{props.text}</b> : props.text}
    </div>
  )
}
