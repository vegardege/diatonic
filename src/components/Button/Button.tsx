import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  subText?: string;
  className?: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Button(props: ButtonProps) {
  const selectedStyle = {
    background: "#ABBF73",
  };

  const highlightedStyle = {
    background: "#CCD8AB",
  };

  const text =
    props.subText === undefined ? (
      props.text
    ) : (
      <div className={styles.text}>
        {props.text}
        <br />
        <span className={styles.name}>{props.subText}</span>
      </div>
    );

  return (
    <button
      type="button"
      className={`${props.className} ${styles.choice}`}
      style={
        props.isSelected
          ? selectedStyle
          : props.isHighlighted
            ? highlightedStyle
            : {}
      }
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {text}
    </button>
  );
}
