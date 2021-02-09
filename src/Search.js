import './Search.css'

export default function Search(props) {
  return (
    <div id="search">
      <label htmlFor="searchField"><h2>Search</h2></label>
      <input id="searchField"
             name="searchField"
             type="text"
             placeholder="Search for scale or chord"
             value={props.text}
             onChange={props.onChange}
      />
    </div>
  )
}
