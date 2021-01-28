import './Button.css'

export default function Button(props) {

  const selectedStyle = {
    background: "#ABBF73",
  }
  
  const highlightedStyle = {
    background: "#CCD8AB",
  }

  return (
    <button
      style={props.isSelected ? selectedStyle : props.isHighlighted ? highlightedStyle : {}}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
        {props.text}
    </button>
  )
}
