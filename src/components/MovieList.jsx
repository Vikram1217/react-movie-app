import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import styles from './MovieList.module.css';
import useApi from "../hooks/useApi"; // 1. Import our custom hook


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const MovieList = ({searchQuery}) => {

  // 2. Define the URL builder function
  const getMoviesUrl = useCallback(() => {
    const popularUrl  =`${BASE_URL}/movie/popular?api_key=${API_KEY}&languange=en-US&page=1`;
    const searchUrl  =`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&languange=en-US&page=1`;
    const url = searchQuery ? searchUrl : popularUrl;
    return url;
  }, [searchQuery]);

  // 3. Call the hook to get all the state and logic
  const { data: movies, isLoading, error} = useApi(getMoviesUrl);


  if (isLoading) {
    return <div className={styles.feedback}>Loading movies...</div>;
  }

  if (error) {
    return <div className={styles.feedback}>Error: {error}</div>;
  }
  
  if (!movies || movies.length === 0) {
    return <div className={styles.feedback}>No movies found. Try a different search!</div>
  }

  return (
    <div>
      <div className={styles.movieGrid}>
        { movies.map((movie) => {
          return <MovieCard key={movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path} year={movie.release_date} />
        })}
      </div>
    </div>
  );
}

export default MovieList;