import React from 'react';
import styles from './MovieCard.module.css'
import { Link } from 'react-router-dom'; // 1. Import Link

// We need the movie's ID to create the link, so let's pass it as a prop
export const MovieCard = ({id, title, year, posterPath, showRemoveButton, onRemove}) => {
  //we will add a real placeholder later
  const img_url = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500x750.png?text=No+Image'; 

  const handleRemoveClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove(id);
  }

  return (
    // 2. Wrap the entire card in a Link component
    <Link to={`/movie/${id}`} className={styles.link}>
      <div className={styles.movieCard}>
        <img src={img_url} alt={`Poster for ${title}`}/>
        <h3>{title}</h3>
        <p>{year}</p>
        {showRemoveButton && <button onClick={handleRemoveClick} className={styles.removeButton}>Delete</button>}
      </div>
    </Link>
  );
};

export default MovieCard;