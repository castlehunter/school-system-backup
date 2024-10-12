import { useState } from "react";

function useCheckbox() {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  function handleSelectAll(allCheckItems) {
    setIsAllSelected((prev) => !prev);
    setSelectedCheckboxes(isAllSelected ? [] : allCheckItems);
  }

  function handleCheckboxes(checkitem) {
    if (selectedCheckboxes.includes(checkitem)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((element) => element !== checkitem)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkitem]);
    }
  }

  return {
    isAllSelected,
    handleSelectAll,
    selectedCheckboxes,
    handleCheckboxes,
  };
}

export default useCheckbox;
