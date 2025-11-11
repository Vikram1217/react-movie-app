import { useState, useRef, useEffect } from 'react';
import React from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

export const HomePage = () => {
  // 1. Create a state for the movie search query here
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null); // Create the ref for searchBar here

  // Use useEffect to focus the input after the component mounts
  useEffect(() => {
    // The ref might not be attached immediately, so its good to check
    if(searchInputRef.current){
      searchInputRef.current.focus();
    }
  }, []); // Empty array means this runs only once on mount

  return (
    <>
      { /* 2. Pass the state and the setter function down as props and also the searchInputRef */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} inputRef={searchInputRef} />
      {/* 3. Pass the state down to the list */}
      <MovieList searchQuery={searchQuery} />
    </>
  )
};

export default HomePage;
