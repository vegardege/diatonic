import './Modal.css'

export default function KeyboardModal(props) {
  return <div className={`modal ${props.display ? '' : 'hidden'}`}
              role="dialog"
              aria-modal="true"
              onClick={props.onClose}>
    <section onClick={e => e.stopPropagation()}>
    <button id="keyboardClose"
            class="close"
            aria-label="Close"
            onClick={props.onClose}>X</button>
            <h1>Keyboard Shortcuts</h1>
    </section>
  </div>
}