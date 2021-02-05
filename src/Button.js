import './Button.css'

export default function Button(props) {

  const selectedStyle = {
    background: "#ABBF73",
  }
  
  const highlightedStyle = {
    background: "#CCD8AB",
  }

  const text = props.subText === undefined ? props.text :
    <div className="text">
      {props.text}<br />
      <span className="name">
        {props.subText}
      </span>
    </div>

  return (
    <button
      className={props.className}
      style={props.isSelected ? selectedStyle : props.isHighlighted ? highlightedStyle : {}}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
        {text}
    </button>
  )
}
