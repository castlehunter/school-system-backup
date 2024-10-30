import React, { useState } from "react";
import icons from "../../ui/Icons/icons";
import styles from "./Selection.module.css";
import Button from "../Button/Button";
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

const Selection = ({ options, onSelect, label }) => {
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
        {label} {icons.ArrowDownIcon}
      </Button>
      {isDropdownOpen && <Dropdown options={options} onSelect={handleSelect} />}
    </div>
  );
};

export default Selection;
