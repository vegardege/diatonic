import './FlexControls.css'

/**
 * Not a reusable component at all, but hides the implementation of the
 * flex controls from the main App.js file.
 */
export default function FlexControls(props) {

  return <div id="controls">
    {props.rootPanel}
    <div className="patternColumn">
      <h2>Scales</h2>
      {props.scalesPanel}
    </div>
    <div className="patternColumn">
      <h2>Chords</h2>
      {props.chordsPanel}
    </div>
    {props.searchPanel}
  </div>
}
