import './Modal.css'

export default function HelpModal(props) {
  return <div className={`modal ${props.display ? '' : 'hidden'}`}
              role="dialog"
              aria-modal="true"
              onClick={props.onClose}>
    <section onClick={e => e.stopPropagation()}>
      <button id="helpClose"
              class="close"
              aria-label="Close"
              onClick={props.onClose}>X</button>
      <h1>Help</h1>
    </section>
  </div>
}