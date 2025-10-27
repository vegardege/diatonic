import type { ChangeEvent, KeyboardEvent } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search(props: SearchProps) {
  const stopPropagation = (e: KeyboardEvent<HTMLInputElement>) =>
    e.stopPropagation();

  return (
    <div className={styles.search}>
      <label htmlFor="searchField">
        <h2 className={styles.heading}>Search</h2>
      </label>
      <input
        id="searchField"
        name="searchField"
        type="text"
        placeholder="Search for scale or chord"
        value={props.text}
        onChange={props.onChange}
        onKeyPress={stopPropagation}
        onKeyDown={stopPropagation}
        onKeyUp={stopPropagation}
      />
    </div>
  );
}
