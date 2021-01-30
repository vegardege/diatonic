import './Search.css'

export default function Search(props) {
  return (
    <div id="search">
      <h2>Search</h2>
      <input type="text"
             placeholder="Search for scale or chord"
             value={props.text}
             onChange={props.onChange} />
    </div>
  )
}