import './App.css';

import { useEffect, useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import { Piano } from 'diatonic-piano'

import FlexControls from './FlexControls.js'
import HelpModal from './HelpModal.js'
import KeyboardModal from './KeyboardModal.js'
import PatternList from './PatternList.js'
import RootNote from './RootNote.js'
import Search from  './Search.js'
import TabControls from './TabControls.js'

/**
 * The app consists of three different components:
 * - `Piano` is an SVG piano allowing the user to press or hover keys
 * - `RootKey` is a list of buttons allowing the lowest pitch to be set
 * - `PatternList` is a list of note patterns the user can select
 * 
 * The components are connected, ensuring that their state is consistent.
 * If you click or hover one component, the others will update in real time.
 */
export default function App() {

  // A key can be pressed or highlighted. The two sets are kept
  // as separate state objects, as they change independently.
  const [pressed, setPressed] = useState(new NoteList())
  const [highlighted, setHighlighted] = useState(new NoteList())

  const currentRoot = pressed.root()
  const currentHighlighRoot = highlighted.root()

  // Find scales and chords matching current state of the piano.
  // For pressed we want the superset with all possible extensions,
  // for highlight we only need to know if therer is an exact match.
  const pressMatch = pressed.supersets()
  const highlightMatch = highlighted.search()

  const [search, setSearch] = useState('')

  const [modal, setModal] = useState('')

  const [width, setWidth] = useState(window.innerWidth)
  const narrowMode = width <= 680

  useEffect(() =>
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  )

  /**
   * Keyboard shortcuts
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  function handleKeyDown(e) {
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 27: setModal('');
               break;
      case 37: clearHighlight()
               setPressed(state => state.transpose('-m2').simplify())
               break
      case 39: clearHighlight()
               setPressed(state => state.transpose('m2').simplify())
               break
      case 32: clearPressed()
               clearHighlight()
               e.preventDefault()
               break
    }
  }

  /**
   * Called when the user activates a modal popup.
   * 
   * @param {string} name Name of modal popup to show
   * @param {string} focusElement ID of element to focus on (close button)
   */
  function showModal(name, focusElement) {
    setModal(name)
    document.getElementById(focusElement).focus()
  }

  /**
   * Called when the user clicks a piano key, either to press or
   * unpress the key.
   * 
   * @param {string} note The note of the key that was clicked
   */
  function handlePianoChange(note) {
    setPressed(state => state.toggle(note, true).sort())
  }

  /**
   * Called when the user hovers a piano key.
   * 
   * @param {string} note The note of the key that is hovered
   */
  function handlePianoFocus(note) {
    setHighlighted(pressed.add(note).sort())
  }

  /**
   * Called when the user clicks a button in the root note component.
   * 
   * If keys are already pressed, we transpose them to get a new selection
   * with the desired key as root (lowest pitch). Otherwise, we simply
   * press the desired note.
   *
   * @param {Note} newRoot The new root note
   */
  function handleRootChange(newRoot) {
    if (currentRoot === undefined) {
      setPressed(new NoteList([newRoot]))
    } else {
      setPressed(state => new NoteList(newRoot, state.intervals))
    }
  }

  /**
   * Called when the user hovers a button the root note component.
   * 
   * If keys are already pressed, we transpose them to get a new selection
   * with the desired key as root (lowest pitch). Otherwise, we simply
   * highlight the desired note.
   *
   * @param {Note} newRoot The new root note
   */
  function handleRootHover(newRoot) {
    if (currentRoot === undefined) {
      setHighlighted(new NoteList([newRoot]))
    } else {
      setHighlighted(new NoteList(newRoot, pressed.intervals))
    }
  }

  /**
   * Called when the user clicks a pattern button.
   * Sets all keys in pattern as pressed.
   *
   * @param {class} cls NoteList class name of pattern
   * @param {string} name Name of pattern
   */
  function handlePatternChange(cls, name, pressed) {
    if (!pressed) {
      setPressed(new cls(currentRoot || new Note('C', '', 4), name))
    } else {
      clearPressed()
    }
  }

  /**
   * Called when the user hovers a pattern button.
   * Sets all keys in pattern as highlighted.
   *
   * @param {class} cls NoteList class name of pattern
   * @param {string} name Name of pattern
   */
  function handlePatternHover(cls, name) {
    setHighlighted(new cls(currentRoot || new Note('C', '', 4), name))
  }

  /**
   * Remove all pressed notes from the piano.
   */
  function clearPressed() {
    setPressed(new NoteList())
    setSearch('')
  }

  /**
   * Remove all highlights from the piano.
   */
  function clearHighlight() {
    setHighlighted(new NoteList())
  }

  /**
   * Prepare data for selection lists. We filter in full mode to reduce the
   * amount of information visible. In narrow mode, we don't filter, as this
   * would require too much clicking back and forth.
   */
  const scales = Object.keys(Scale.scales)
  const filteredScales = scales.filter(
    scale => pressMatch['scales'][scale] >= 0
  ).filter(
    scale => search.length === 0 || scale.includes(search)
  ).slice(0, 12)

  const chords = Object.keys(Chord.chords)
  const filteredChords = chords.filter(
    chord => pressMatch['chords'][chord] >= 0
  ).filter(
    chord => search.length === 0 || chord.includes(search)
  ).slice(0, 12)

  /**
   * Control panel components
   */
  const rootNotePanel = <RootNote
    pressed={currentRoot}
    highlighted={currentHighlighRoot}
    octaves={narrowMode ? [4, 5] : [3, 4, 5]}
    onClick={(...note) => handleRootChange(new Note(...note))}
    onMouseEnter={(...note) => handleRootHover(new Note(...note))}
    onMouseLeave={clearHighlight}
    onFocus={(...note) => handleRootHover(new Note(...note))}
    onBlur={clearHighlight}
  />

  const scalesPanel = <PatternList
    patterns={narrowMode ? scales : filteredScales}
    pressMatch={pressMatch['scales']}
    highlightMatch={highlightMatch['scales']}
    onClick={(name, pressed) => handlePatternChange(Scale, name, pressed)}
    onMouseEnter={(name) => handlePatternHover(Scale, name)}
    onMouseLeave={clearHighlight}
    onFocus={(name) => handlePatternHover(Scale, name)}
    onBlur={clearHighlight}
  />

  const chordsPanel = <PatternList
    patterns={narrowMode ? chords : filteredChords}
    pressMatch={pressMatch['chords']}
    highlightMatch={highlightMatch['chords']}
    onClick={(name, pressed) => handlePatternChange(Chord, name, pressed)}
    onMouseEnter={(name) => handlePatternHover(Chord, name)}
    onMouseLeave={clearHighlight}
    onFocus={(name) => handlePatternHover(Chord, name)}
    onBlur={clearHighlight}
  />

  const searchPanel = <Search
    text={search}
    onChange={e => setSearch(e.target.value)}
  />
  
  /**
   * Define control panels in mobile (narrow) and desktop mode
   */
  const fullControlPanel = <FlexControls
    rootPanel={rootNotePanel}
    scalesPanel={scalesPanel}
    chordsPanel={chordsPanel}
    searchPanel={searchPanel}
  />

  const narrowControlPanel = <TabControls tabs={[
    {id: 'rootTab', text: 'Root Note', panel: rootNotePanel},
    {id: 'scaleTab', text: 'Scales', panel: scalesPanel},
    {id: 'chordTab', text: 'Chords', panel: chordsPanel},
  ]} />

  return (
    <div id="app">
      <KeyboardModal onClose={() => setModal('')}
                     display={modal === 'keyboard'} />
      <HelpModal onClose={() => setModal('')}
                 display={modal === 'help'} />
      <nav>
        <div id="navInstruments">
          
        </div>
        <div id="navButtons">
          <button title="Reset"
                  onClick={() => clearPressed()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 18 18">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
            Reset
          </button>
          <button title="Keyboard shortcuts"
                  onClick={() => showModal('keyboard', 'keyboardClose')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm13 .25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM2.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 8.75v-.5A.25.25 0 0 0 2.75 8h-.5zM4 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 5 8.75v-.5A.25.25 0 0 0 4.75 8h-.5a.25.25 0 0 0-.25.25zM6.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 7 8.75v-.5A.25.25 0 0 0 6.75 8h-.5zM8 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 9 8.75v-.5A.25.25 0 0 0 8.75 8h-.5a.25.25 0 0 0-.25.25zM13.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm-3-2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-1.5zm.75 2.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM11.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zM9 6.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5A.25.25 0 0 0 9.75 6h-.5a.25.25 0 0 0-.25.25zM7.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 8 6.75v-.5A.25.25 0 0 0 7.75 6h-.5zM5 6.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 6 6.75v-.5A.25.25 0 0 0 5.75 6h-.5a.25.25 0 0 0-.25.25zM2.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 4 6.75v-.5A.25.25 0 0 0 3.75 6h-1.5zM2 10.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM4.25 10a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-5.5z"/>
          </svg>
          Keys
          </button>
          <button title="Help"
                  onClick={() => showModal('help', 'helpClose')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 18 18">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
            </svg>
            Help
          </button>
        </div>
      </nav>
      <div className="piano">
        <Piano octaves={narrowMode ? 2 : 3}
               pressed={pressed}
               highlighted={highlighted}
               keyboardShortcuts={true}
               focusable={true}
               onClick={handlePianoChange}
               onMouseEnter={handlePianoFocus}
               onMouseLeave={clearHighlight}
               onFocus={handlePianoFocus}
               onBlur={clearHighlight}
        />
      </div>
      {narrowMode ? narrowControlPanel : fullControlPanel}
    </div>    
  );
}
