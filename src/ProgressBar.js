export default function ProgressBar(props) {

  const width = props.width || 20
  const height = props.height || 20

  const progressHeight =
    props.progress === undefined ? height :
    props.progress <= 0 ? height :
    props.progress >= 0 ? height * props.progress :
    height - 2

  const color = 
    props.progress === undefined ? '#F2929A' :
    props.progress <= 0 ? '#EEEEEE' :
    props.progress < 1 ? '#E9B372' :
    '#ABBF73'

  return (
    <svg width={width} height={height}>
      <rect x='0'
            y='0'
            width={width}
            height={height}
            fill='#eee'
            stroke='#000'
            strokeWidth='1' />
      <rect x='1'
            y={height - progressHeight + 1}
            width={width - 2}
            height={progressHeight - 2}
            fill={color} />
    </svg>
  )
}