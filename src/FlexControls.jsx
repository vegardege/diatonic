import './FlexControls.css'

/**
 * Not a reusable component at all, but hides the implementation of the
 * flex controls from the main App.js file.
 */
export default function FlexControls(props) {

  return <section id="controls">
    {props.rootPanel}
    <section className="patternColumn">
      <h2>Scales</h2>
      {props.scalesPanel}
    </section>
    <section className="patternColumn">
      <h2>Chords</h2>
      {props.chordsPanel}
    </section>
    {props.searchPanel}
  </section>
}
