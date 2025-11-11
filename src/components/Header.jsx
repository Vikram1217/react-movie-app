// src/components/Header.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import our custom hook
const Header = () => {

  // 2. Get the currentUser from the context
  const {currentUser} = useAuth();
  const navigate = useNavigate(); // get the navigate function

  const handleSignOut = async () => {
    try{
      await signOut(auth);
      navigate('/');  // Redirect to homepage after signout
    } catch (err){
      console.log('Failed to signout', err)
    }    
  };

  return (
    <header className={styles.header}>
      {/* 3. Make the main title a link to the homepage */}
      <Link to='/' className={styles.titleLink}>
        <h1>My Movie App</h1>
      </Link>      
      {/* 4. Conditionally render the navigation links */}
      <nav className={styles.nav}>
        {currentUser ? (
          <>
            <Link to='/watchlist'>Watch List</Link>
            <span>Welcome, {currentUser.email}</span>
            <button onClick={handleSignOut} className={styles.button}>Sign Out</button>            
          </>
        ) : (
          <>
            <Link to='/login'>Log In</Link>
            <Link to='signup'>Sign Up</Link>
          </>
        ) }
      </nav>
    </header>
  );
};

export default Header;