import type { SelectProps } from "../model/types";
import styles from "./index.module.css";

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <div className={styles.container}>
      <span className={styles.value}>value</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <button className={styles.caret}></button>
      <ul className={styles.options}>
        {options.map((option) => (
          <li key={option.value} className={styles.option}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
