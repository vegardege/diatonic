import './Button.css'

export default function Button(props) {

  const selectedStyle = {
    background: 'cyan',
  }
  
  return (
    <div class="button" style={props.selected ? selectedStyle : {}}
      onClick={() => props.onClick(props.model)}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
      {props.selected ? <b>{props.text}</b> : props.text}
    </div>
  )
}
