import './App.css';

import { useEffect, useState } from 'react'
import { Note, NoteList, Chord, Scale } from 'kamasi'
import { Piano } from 'diatonic-piano'

import FlexControls from './FlexControls.js'
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
  const [width, setWidth] = useState(window.innerWidth)
  const narrowMode = width <= 680

  useEffect(() =>
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  )

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
  function handlePianoHover(note) {
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
  />

  const scalesPanel = <PatternList
    patterns={narrowMode ? scales : filteredScales}
    pressMatch={pressMatch['scales']}
    highlightMatch={highlightMatch['scales']}
    onClick={(name, pressed) => handlePatternChange(Scale, name, pressed)}
    onMouseEnter={(name) => handlePatternHover(Scale, name)}
    onMouseLeave={clearHighlight}
  />

  const chordsPanel = <PatternList
    patterns={narrowMode ? chords : filteredChords}
    pressMatch={pressMatch['chords']}
    highlightMatch={highlightMatch['chords']}
    onClick={(name, pressed) => handlePatternChange(Chord, name, pressed)}
    onMouseEnter={(name) => handlePatternHover(Chord, name)}
    onMouseLeave={clearHighlight}
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
      <div class="piano">
        <Piano octaves={narrowMode ? 2 : 3}
               pressed={pressed}
               highlighted={highlighted}
               onClick={handlePianoChange}
               onMouseEnter={handlePianoHover}
               onMouseLeave={clearHighlight} />
      </div>
      {narrowMode ? narrowControlPanel : fullControlPanel}
    </div>    
  );
}
