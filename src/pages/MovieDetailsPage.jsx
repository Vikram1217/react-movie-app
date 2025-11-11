import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const params = useParams();
  const movieId = params.movieId; // Or destructure directly: const { movieId } = useParams();
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    
    setIsLoading(false);
    setError(null);

    const fetchMovieDetails = async() => {
      const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      
      try{
        setIsLoading(true);
        const response = await fetch(url);

        if(!response.ok){
          throw new Error(`Something went wrong. Could not fetch details: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch(error){
        console.log('Failed: ', error.message);
        setError(error);
      }finally{
        setIsLoading(false)
      }
    }

    fetchMovieDetails();

  }, [movieId]);

  const handleAddToWatchlist = async () => {
    if(!currentUser){
      alert("Please log in to add movies to your watchlist.");
      return;
    }

    // Create the document reference
    // The path is 'watchlists' -> 'user_id' -> 'movies' -> 'movie_id'
    const movieRef = doc(db, 'watchlists', currentUser.uid, 'movies', String(movie.id));

    //Define the data to be saved
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      addedAt: new Date() // Add a timestamp
    }

    // Write the data to firestore
    try{
      await setDoc(movieRef, movieData);
      alert(`${movie.title} has been added to your watchlist!`)
      navigate('/watchlist');
    }catch (err) {
      console.error("Error adding movie to watchlist: ", error);
      alert("Failed to add movie. Please try again.");
    }

  }

  // Conditional rendering
  if (isLoading) return <div className={styles.feedback}>Loading...</div>;
  if (error) return <div className={styles.feedback}>Error: {error.message}</div>;
  if (!movie) return null; // Or some other placeholder if movie is null

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className={styles.detailsContainer}>
      <img src={posterUrl} alt={`Poster for ${movie.title}`} className={styles.poster} />
      <div className={styles.detailsText}>
        <h1>{movie.title}</h1>
        <p className={styles.tagline}>{movie.tagline}</p>
        {currentUser && (
          <button 
            onClick={handleAddToWatchlist} 
            className={styles.watchlistButton}
          >
            Add to Watchlist
          </button>
        )}
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
         <button 
            onClick={() => navigate('/')} 
            className={styles.watchlistButton}
          >
            Back
          </button>        
      </div>
    </div>
  )
}

export default MovieDetailsPage;