import { useState } from "react";

const useCheckbox = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectAll = (allIds) => {
    if (isAllSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleCheckboxes = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== id));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    }
    setIsAllSelected(false); // Reset 'Select All' if any checkbox is individually toggled
  };

  return {
    selectedCheckboxes,
    isAllSelected,
    handleSelectAll,
    handleCheckboxes,
  };
};

export default useCheckbox;