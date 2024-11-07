import React, { useState } from "react";
import icons from "../../ui/Icons/icons";
import styles from "./Button.module.css";
import Button from "./Button";

const Dropdown = ({ options, onSelect }) => {
  return (
    <div className={styles.dropdown}>
      {options.map((option, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

function SelectButton({ options, onSelect, label }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <Button className={styles.sortButton} onClickBtn={handleButtonClick}>
        {label}&nbsp;&nbsp;
        {icons.ArrowDownIcon(styles.arrowDown)}
      </Button>
      {isDropdownOpen && (
        <Dropdown
          className={styles.dropDown}
          options={options}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default SelectButton;
