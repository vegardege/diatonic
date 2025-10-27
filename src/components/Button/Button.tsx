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

  const classNames = [
    props.className,
    styles.choice,
    props.isSelected && styles.selected,
    props.isHighlighted && styles.highlighted,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classNames}
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
