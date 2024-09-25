import styles from "./Search.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Search({ searchItems, colorType }) {
  const SearchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={styles.searchBarIcon}
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );
  const CloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className={styles.searchBarIcon}
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );

  const [searchBarIcon, setSearchBarIcon] = useState(SearchIcon);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchBarIcon(query ? CloseIcon : SearchIcon);

    const filteredResults = searchItems.filter((item) =>
      item.label
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
            setSearchBarIcon(SearchIcon);
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
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
