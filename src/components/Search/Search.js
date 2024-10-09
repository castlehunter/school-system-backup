import styles from "./Search.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../ui/Icons/icons";

function Search({ searchItems, colorType }) {
  const [searchBarIcon, setSearchBarIcon] = useState(icons.SearchIcon);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchBarIcon(query ? icons.CloseIcon : icons.SearchIcon);

    const filteredResults = searchItems.filter((item) =>
      item.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.replace(/\s+/g, ""))
    );

    setSearchResults(filteredResults);
  }

  return (
    <div className={styles.searchContainer}>
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
      {searchQuery && searchResults.length > 0 && (
        <div className={styles.dropdown}>
          {searchResults.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={styles.dropdownItem}
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
