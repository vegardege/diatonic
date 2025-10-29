import { Piano } from "@diatonic/piano";
import { CHORDS, Note, NoteList, SCALES } from "kamasi";
import { useEffect, useState } from "react";

import styles from "./App.module.css";
import AppControls from "./components/AppControls/AppControls.tsx";
import AudioControls from "./components/AudioControls/AudioControls.tsx";
import FlexControls from "./components/FlexControls/FlexControls.tsx";
import HelpModal from "./components/HelpModal/HelpModal.tsx";
import KeyboardModal from "./components/KeyboardModal/KeyboardModal.tsx";
import PatternList from "./components/PatternList/PatternList.tsx";
import RootNote from "./components/RootNote/RootNote.tsx";
import Search from "./components/Search/Search.tsx";
import TabControls from "./components/TabControls/TabControls.tsx";
import { useAudioEngine } from "./hooks/useAudioEngine.ts";

// NoteListConstructor type for pattern handlers
type NoteListConstructor = (root: Note, name: string) => NoteList;

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
  const [pressed, setPressed] = useState(new NoteList());
  const [highlighted, setHighlighted] = useState(new NoteList());

  // Internally kept state for searching and visible modals
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState("");

  // Use audio engine hook for reactive mute state
  const audio = useAudioEngine();

  // Keep track of width to toggle narrow mode
  const [width, setWidth] = useState(window.innerWidth);
  const narrowMode = width <= 680;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Keyboard shortcuts
   */
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 27:
        setModal("");
        break;
      case 37: {
        // Left arrow - transpose down
        clearHighlight();
        const transposed = pressed.transpose("-m2").simplify();
        const newRoot = transposed.root();

        // Only transpose if root stays within visible piano range (C3-B5)
        if (newRoot && newRoot.octave >= 3 && newRoot.octave <= 5) {
          setPressed(transposed);
          playCurrentPattern();
        }
        break;
      }
      case 39: {
        // Right arrow - transpose up
        clearHighlight();
        const transposed = pressed.transpose("m2").simplify();
        const newRoot = transposed.root();

        // Only transpose if root stays within visible piano range (C3-B5)
        if (newRoot && newRoot.octave >= 3 && newRoot.octave <= 5) {
          setPressed(transposed);
          playCurrentPattern();
        }
        break;
      }
      case 32:
        clearPressed();
        clearHighlight();
        e.preventDefault();
        break;
      case 49:
        handleToggleMute();
        break;
      case 50:
        handlePlayArpeggio();
        break;
      case 51:
        handlePlayHarmony();
        break;
    }
  }

  /**
   * Called when the user activates a modal popup.
   *
   * @param {string} name Name of modal popup to show
   * @param {string} focusElement ID of element to focus on (close button)
   */
  function showModal(name: string, focusElement: string) {
    setModal(name);
    document.getElementById(focusElement)?.focus();
  }

  /**
   * Called when the user clicks a piano key, either to press or
   * unpress the key.
   *
   * @param {string} note The note of the key that was clicked
   */
  function handlePianoChange(note: string) {
    // Check if the note is currently pressed before toggling
    const wasPressed = pressed.notes.some((n) => n.toString() === note);

    setPressed((state) => state.toggle(note, true).sort());

    // Only play the note if we're ADDING it (not removing it)
    if (!wasPressed) {
      audio.playNote(note);
    }
  }

  /**
   * Called when the user hovers a piano key.
   *
   * @param {string} note The note of the key that is hovered
   */
  function handlePianoFocus(note: string) {
    setHighlighted(new NoteList([note]));
  }

  /**
   * Called when the user clicks a button in the root note component.
   *
   * If keys are already pressed, we transpose them to get a new selection
   * with the desired key as root (lowest pitch). Otherwise, we simply
   * press the desired note.
   *
   * Also plays the appropriate sound based on current pattern selection.
   *
   * @param {Note} newRoot The new root note
   */
  function handleRootChange(newRoot: Note) {
    if (pressed.root() === undefined) {
      setPressed(new NoteList([newRoot]));
    } else {
      setPressed((state) =>
        NoteList.fromIntervals(newRoot, state.intervals || []),
      );
    }
    playCurrentPattern();
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
  function handleRootHover(newRoot: Note) {
    if (pressed.root() === undefined) {
      setHighlighted(new NoteList([newRoot]));
    } else {
      setHighlighted(NoteList.fromIntervals(newRoot, pressed.intervals || []));
    }
  }

  /**
   * Called when the user clicks a pattern button.
   * Sets all keys in pattern as pressed.
   *
   * @param {function} func NoteList constructor function
   * @param {string} name Name of pattern
   */
  function handlePatternChange(
    func: NoteListConstructor,
    name: string,
    isPressed: boolean,
  ) {
    if (!isPressed) {
      const newPressed = func(pressed.root() || new Note("C", "", 4), name);
      setPressed(newPressed);

      // Auto-play: chords play simultaneously, scales play sequentially
      const notes = newPressed.notes.map((note) => note.toString());
      const isChord = func === NoteList.fromChord;

      isChord ? audio.playHarmony(notes) : audio.playArpeggio(notes);
    } else {
      clearPressed();
    }
  }

  /**
   * Called when the user hovers a pattern button.
   * Sets all keys in pattern as highlighted.
   *
   * @param {function} func NoteList constructor function
   * @param {string} name Name of pattern
   */
  function handlePatternHover(func: NoteListConstructor, name: string) {
    setHighlighted(func(pressed.root() || new Note("C", "", 4), name));
  }

  /**
   * Play the currently pressed keys using the appropriate playback mode.
   * Automatically detects if pressed keys match a scale or chord pattern.
   */
  function playCurrentPattern() {
    const notes = pressed.notes.map((note) => note.toString());

    if (notes.length === 0) {
      return;
    }

    // Check if current pressed keys match any scale or chord patterns
    const matchedScales = pressed.exact().scales();
    const matchedChords = pressed.exact().chords();

    if (matchedScales.length > 0) {
      // Pressed keys match a scale pattern - play sequentially
      audio.playArpeggio(notes);
    } else if (matchedChords.length > 0) {
      // Pressed keys match a chord pattern - play simultaneously
      audio.playHarmony(notes);
    } else {
      // No pattern match, just play the first note
      audio.playNote(notes[0]!);
    }
  }

  /**
   * Remove all pressed notes from the piano.
   */
  function clearPressed() {
    setPressed(new NoteList());
    setSearch("");
  }

  /**
   * Remove all highlights from the piano.
   */
  function clearHighlight() {
    setHighlighted(new NoteList());
  }

  /**
   * Toggle mute state for audio playback.
   */
  function handleToggleMute() {
    audio.setMuted(!audio.muted);
  }

  /**
   * Play all currently pressed notes as a scale (sequentially).
   */
  function handlePlayArpeggio() {
    const notes = pressed.notes.map((note) => note.toString());
    audio.playArpeggio(notes);
  }

  /**
   * Play all currently pressed notes as a chord (simultaneously).
   */
  function handlePlayHarmony() {
    const notes = pressed.notes.map((note) => note.toString());
    audio.playHarmony(notes);
  }

  /**
   * Prepare data for selection lists. We filter in full mode to reduce the
   * amount of information visible. In narrow mode, we don't filter, as this
   * would require too much clicking back and forth.
   */
  const scales = Object.keys(SCALES);
  const filteredScales = scales
    .filter((scale) => pressed.supersets().scales().includes(scale))
    .filter((scale) => search.length === 0 || scale.includes(search))
    .slice(0, 12);

  const chords = Object.keys(CHORDS);
  const filteredChords = chords
    .filter((chord) => pressed.supersets().chords().includes(chord))
    .filter((chord) => search.length === 0 || chord.includes(search))
    .slice(0, 12);

  /**
   * Control panel components
   */
  const rootNotePanel = (
    <RootNote
      pressed={pressed.root()}
      highlighted={highlighted.root()}
      octaves={narrowMode ? [4, 5] : [3, 4, 5]}
      onClick={(...note) => handleRootChange(new Note(...note))}
      onMouseEnter={(...note) => handleRootHover(new Note(...note))}
      onMouseLeave={clearHighlight}
      onFocus={(...note) => handleRootHover(new Note(...note))}
      onBlur={clearHighlight}
    />
  );

  const scalesPanel = (
    <PatternList
      patterns={narrowMode ? scales : filteredScales}
      pressed={pressed.exact().scales()}
      highlighted={highlighted.exact().scales()}
      onClick={(name, pressed) =>
        handlePatternChange(NoteList.fromScale, name, pressed)
      }
      onMouseEnter={(name) => handlePatternHover(NoteList.fromScale, name)}
      onMouseLeave={clearHighlight}
      onFocus={(name) => handlePatternHover(NoteList.fromScale, name)}
      onBlur={clearHighlight}
    />
  );

  const chordsPanel = (
    <PatternList
      patterns={narrowMode ? chords : filteredChords}
      pressed={pressed.exact().chords()}
      highlighted={highlighted.exact().chords()}
      onClick={(name, pressed) =>
        handlePatternChange(NoteList.fromChord, name, pressed)
      }
      onMouseEnter={(name) => handlePatternHover(NoteList.fromChord, name)}
      onMouseLeave={clearHighlight}
      onFocus={(name) => handlePatternHover(NoteList.fromChord, name)}
      onBlur={clearHighlight}
    />
  );

  const searchPanel = (
    <Search text={search} onChange={(e) => setSearch(e.target.value)} />
  );

  /**
   * Define control panels in mobile (narrow) and desktop mode
   */
  const fullControlPanel = (
    <FlexControls
      rootPanel={rootNotePanel}
      scalesPanel={scalesPanel}
      chordsPanel={chordsPanel}
      searchPanel={searchPanel}
    />
  );

  const narrowControlPanel = (
    <TabControls
      tabs={[
        { id: "rootTab", text: "Root Note", panel: rootNotePanel },
        { id: "scaleTab", text: "Scales", panel: scalesPanel },
        { id: "chordTab", text: "Chords", panel: chordsPanel },
      ]}
    />
  );

  return (
    <div className={styles.app}>
      <KeyboardModal
        onClose={() => setModal("")}
        display={modal === "keyboard"}
      />
      <HelpModal onClose={() => setModal("")} display={modal === "help"} />
      <nav className={styles.nav}>
        <AudioControls
          muted={audio.muted}
          onToggleMute={handleToggleMute}
          onPlayArpeggio={handlePlayArpeggio}
          onPlayHarmony={handlePlayHarmony}
        />
        <AppControls
          narrowMode={narrowMode}
          onReset={clearPressed}
          onShowKeyboardShortcuts={() => showModal("keyboard", "keyboardClose")}
          onShowHelp={() => showModal("help", "helpClose")}
        />
      </nav>
      <div className={styles.piano}>
        <Piano
          octaves={narrowMode ? 2 : 3}
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
