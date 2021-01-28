import './Button.css'
import ProgressBar from './ProgressBar.js'

export default function Button(props) {

  const selectedStyle = {
    background: "#ABBF73",
  }
  
  const highlightedStyle = {
    background: "#CCD8AB",
  }

  const progressBar = props.showProgress ? <ProgressBar progress={props.progress} />
                                         : null

  return (
    <button
      style={props.isSelected ? selectedStyle : props.isHighlighted ? highlightedStyle : {}}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
        {props.text}
        {progressBar}
    </button>
  )
}
