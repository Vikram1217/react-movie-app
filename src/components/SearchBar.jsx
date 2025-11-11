import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({searchQuery, setSearchQuery, inputRef}) => {
 
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.searchContainer}>
      <input
        ref={inputRef}
        value={searchQuery}
        onChange={handleSearchQuery}
        type="text"
        placeholder='Search for a movie...'
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;