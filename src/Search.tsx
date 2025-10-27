import "./Search.css";
import type { ChangeEvent, KeyboardEvent } from "react";

interface SearchProps {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search(props: SearchProps) {
  const stopPropagation = (e: KeyboardEvent<HTMLInputElement>) =>
    e.stopPropagation();

  return (
    <div id="search">
      <label htmlFor="searchField">
        <h2>Search</h2>
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
