import { useEffect, useRef, useState } from "react";
import type { SelectOption, SelectProps } from "../model/types";
import styles from "./index.module.css";
import React from "react";

export function Select({
  value,
  onChange,
  options,
  multiple,
  placeholder,
  isLoading = false,
  isDisabled = false,
  isSearchable = false,
  className = "",
  renderOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));

  function clearOptions(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (isDisabled) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    multiple ? onChange([]) : onChange(undefined);
    setIsOpen(false);
  }

  function selectOption(option: SelectOption, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (isDisabled || option.disabled) return;

    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o.value !== option.value));
      } else {
        onChange([...(value || []), option]);
      }
      setSearchValue("");
      if (isSearchable && searchRef.current) {
        searchRef.current.focus();
      }
    } else {
      if (option.value !== value?.value) onChange(option);
      setIsOpen(false);
    }
  }

  function isOptionSelected(option: SelectOption) {
    if (multiple) {
      return value?.includes(option);
    }
    return option.value === value?.value;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (isDisabled) return;

    switch (e.code) {
      case "Enter":
        e.preventDefault();
        if (isOpen) {
          const option = filteredOptions[highlightedIndex];
          if (option) selectOption(option);
        } else {
          setIsOpen(true);
        }
        break;
      case "Space":
        if (!isSearchable || !isOpen) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          e.preventDefault();
          const newIndex =
            e.code === "ArrowDown"
              ? (highlightedIndex + 1) % filteredOptions.length
              : (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
          setHighlightedIndex(newIndex);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
      setSearchValue("");
      if (isSearchable && searchRef.current) {
        searchRef.current.focus();
      }
    }
  }, [isOpen, isSearchable]);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Reset search on options change
  useEffect(() => {
    setSearchValue("");
    setHighlightedIndex(0);
  }, [options]);

  return (
    <div
      ref={containerRef}
      onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
      onKeyDown={handleKeyDown}
      className={`${styles.container} ${isDisabled ? styles.disabled : ""} ${className}`}
      tabIndex={isDisabled ? -1 : 0}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-disabled={isDisabled}
      role="combobox"
    >
      <span className={styles.value}>
        {multiple ? (
          value?.length > 0 ? (
            value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
                disabled={isDisabled}
                type="button"
                aria-label={`Remove ${v.label}`}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          ) : placeholder ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : null
        ) : value?.label ? (
          value.label
        ) : placeholder ? (
          <span className={styles.placeholder}>{placeholder}</span>
        ) : null}
      </span>

      {(multiple ? value?.length > 0 : value) && !isDisabled && (
        <>
          <button
            onClick={clearOptions}
            className={`${styles["clear-btn"]} ${isDisabled ? styles.disabled : ""}`}
            aria-label="Clear selection"
            disabled={isDisabled}
            type="button"
          >
            &times;
          </button>
          <div className={styles.divider}></div>
        </>
      )}

      {isLoading ? (
        <div className={styles["loading-spinner"]} aria-label="Loading options" />
      ) : (
        <button className={`${styles.caret} ${isOpen ? styles.open : ""}`} aria-hidden="true" tabIndex={-1} type="button"></button>
      )}

      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`} role="listbox" aria-multiselectable={multiple}>
        {isOpen && isSearchable && (
          <li className={styles.search} onClick={(e) => e.stopPropagation()}>
            <input
              ref={searchRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles["search-input"]}
              placeholder="Search..."
              autoFocus
            />
          </li>
        )}

        {filteredOptions.length === 0 ? (
          <li className={styles["no-options"]}>No options found</li>
        ) : (
          filteredOptions.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option, e);
              }}
              onMouseEnter={() => {
                setHighlightedIndex(index);
              }}
              key={option.value}
              className={`${styles.option} 
                ${isOptionSelected(option) ? styles.selected : ""} 
                ${index === highlightedIndex ? styles.highlighted : ""}
                ${option.disabled ? styles.disabled : ""}`}
              aria-selected={isOptionSelected(option)}
              role="option"
              aria-disabled={option.disabled}
            >
              {renderOption ? renderOption(option, isOptionSelected(option)) : option.label}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
