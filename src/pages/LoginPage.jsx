import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleLogIn = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User Successfully logged in');
      navigate('/');
    } catch (err) {
      console.log('Could not log in: ', err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleLogIn} className={styles.authForm}>
        <h2>Login to Account</h2>

        <input type='email' placeholder='Enter your Email...' value={email} onChange={handleEmail} required />

        <input type='password' placeholder='Enter your Password...' value={password} onChange={handlePassword} required />

        <button type="submit">Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}
