import type { MouseEvent, ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  display: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal(props: ModalProps) {
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`${styles.modal} ${props.display ? "" : styles.hidden}`}
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
    >
      <section onClick={stopPropagation}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={props.onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
          >
            <title>Close</title>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        </button>
        <h1 className={styles.heading}>{props.title}</h1>
        {props.children}
      </section>
    </div>
  );
}
