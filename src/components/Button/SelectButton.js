import React, { useState } from "react";
import icons from "../../ui/Icons/icons";
import styles from "./Button.module.css";
import Button from "./Button";

function SelectButton({ options, onSelect, label }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.dropdownContainer}>
      <Button
        className={styles.sortButton}
        onClickBtn={handleButtonClick}
        size="large"
      >
        {label}&nbsp;&nbsp;
        {icons.ArrowDownIcon(styles.arrowDown)}
      </Button>

      {isDropdownOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsDropdownOpen(false)}
          ></div>
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => onSelect(option.replace(/\s/g, ""))}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SelectButton;
