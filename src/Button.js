import './Button.css'

export default function Button(props) {

  const selectedStyle = {
    background: "#ABBF73",
  }
  
  const highlightedStyle = {
    background: "#CCD8AB",
  }

  return (
    <button class={"button " + props.class}
      style={props.isSelected ? selectedStyle : props.isHighlighted ? highlightedStyle : {}}
      onClick={() => props.onClick(props.model)}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
      {props.selected ? <b>{props.text}</b> : props.text}
    </button>
  )
}
