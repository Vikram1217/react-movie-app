// src/App.jsx
import React, {useState} from 'react';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import { Routes, Route } from 'react-router-dom';
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import styles from './App.module.css'
import { LoginPage } from './pages/LoginPage.jsx';
import WatchListPage from './pages/WatchListPage.jsx';

const App = () => {
 
  return (
    <AuthProvider>
      <div className="styles.app">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* We will add the other route here */}
            <Route path='/movie/:movieId' element={<MovieDetailsPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/watchlist' element={<WatchListPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;