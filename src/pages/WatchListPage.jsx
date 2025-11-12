import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MovieCard from '../components/MovieCard';
import styles from './WatchListPage.module.css'; // We'll create this


const WatchListPage = () => {

  const {currentUser} = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    //do not run if there is no user
    if(!currentUser){
      return;
    }

    const fetchWatchList = async () => {
      
      setIsLoading(true);
      setError('');
      try{
        // Set a reference to the user's 'movies' collection
        const watchlistCollectionRef = collection(db, 'watchlists', currentUser.uid, 'movies');

        // Execute the query to get the documents
        const querySnapShot = await getDocs(watchlistCollectionRef);

        // Map over the results and extract the data
        const movies = querySnapShot.docs.map((doc) => ({
          ...doc.data(), // Spread the document data (id, title, etc.)
          id: doc.id, // the document ID is the movie ID
        }));

        setWatchlist(movies);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Could not fetch your watchlist. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchList();
    //Firestore fetching logic here
    console.log('Fetching watchlist for user: ', currentUser.uid);

  },[currentUser]);

  const handleRemoveMovie  = useCallback( async (movieId) => {
    if (!currentUser) return;

    // Create a reference to the document with the movie ID
    const movieDocRef = doc(db, 'watchlists', currentUser.uid, 'movies', String(movieId))
    try {
      await deleteDoc(movieDocRef);
      console.log('Document Delete Successful');
      //update the local state to reflect the deletion instantly
      setWatchlist((prev) => prev.filter(movie => movie.id !== movieId));
    } catch (err) {
      console.log('Deletion failed: ', err);
    }
  }, [currentUser]);

  
  if(isLoading){
    return (
      <div>Loading your watchlist...</div>
    )
  }
  if(error){
    return (
      <div>Error: {error}</div>
    )
  }

  if(!currentUser){
    return (
      <div>You must be logged in to view watchlist</div>
    )
  }

  return (
  <div className={styles.watchlistContainer}>
      <h2>My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className={styles.moviesGrid}>
          {watchlist.map(movie => (
            <MovieCard 
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date}
              posterPath={movie.poster_path}
              showRemoveButton={true}
              onRemove={handleRemoveMovie}
            />
          ))}
        </div>
      ) : (
         <p className={styles.feedback}>Your watchlist is empty. Add some movies!</p>
      )}
    </div>
  );
};

export default WatchListPage;