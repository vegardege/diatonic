import type { ReactNode } from "react";
import styles from "./FlexControls.module.css";

interface FlexControlsProps {
  rootPanel: ReactNode;
  scalesPanel: ReactNode;
  chordsPanel: ReactNode;
  searchPanel: ReactNode;
}

/**
 * Not a reusable component at all, but hides the implementation of the
 * flex controls from the main App.tsx file.
 */
export default function FlexControls(props: FlexControlsProps) {
  return (
    <section className={styles.controls}>
      {props.rootPanel}
      <section className={styles.patternColumn}>
        <h2 className={styles.heading}>Scales</h2>
        {props.scalesPanel}
      </section>
      <section className={styles.patternColumn}>
        <h2 className={styles.heading}>Chords</h2>
        {props.chordsPanel}
      </section>
      {props.searchPanel}
    </section>
  );
}
