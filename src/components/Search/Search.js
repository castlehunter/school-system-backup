import styles from "./Search.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../ui/Icons/icons";

function Search({ searchMenuItems, colorType, onSearch, menuSearch }) {
  const [searchBarIcon, setSearchBarIcon] = useState(icons.SearchIcon);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchBarIcon(query ? icons.CloseIcon : icons.SearchIcon);

    if (searchMenuItems) {
      const filteredResults = searchMenuItems.filter((item) =>
        item.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.replace(/\s+/g, ""))
      );

      setSearchResults(filteredResults);
    }

    if (onSearch) {
      console.log("onSearch", query);
      onSearch(query);
    }
  }

  return (
    <div className={styles.searchContainer}>
      {" "}
      {console.log("setSearchQuery", searchQuery)}
      <div className={styles.searchbar}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className={`${styles.searchInput} ${styles[colorType]}`}
        />
        <div
          className={styles.searchBarIconWrapper}
          onClick={() => {
            setSearchQuery("");
            setSearchBarIcon(icons.SearchIcon);
          }}
        >
          {searchBarIcon && <>{searchBarIcon}</>}
        </div>
      </div>
      {/* If searchQuery, show search results in a dropdown list */}
      {searchQuery && menuSearch && searchResults.length > 0 && (
        <div className={styles.dropdown}>
          {searchResults.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={styles.dropdownItem}
              // When clicking on one of the items, clear the search bar
              onClick={() => setSearchQuery("")}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
