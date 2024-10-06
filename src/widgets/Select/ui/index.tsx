import { useEffect, useState } from "react";
import type { SelectOption, SelectProps } from "../model/types";
import styles from "./index.module.css";

export function Select({ value, onChange, options, multiple }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(0);

  function clearOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o.value !== option.value));
      } else {
        onChange([...(value || []), option]);
      }
    } else {
      if (option.value !== value?.value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    if (multiple) {
      return value?.includes(option);
    }
    return option.value === value?.value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div onClick={() => setIsOpen((prev) => !prev)} onBlur={() => setIsOpen(false)} className={styles.container} tabIndex={0}>
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <button className={styles.caret}></button>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => {
              setHighlightedIndex(index);
            }}
            key={option.value}
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
