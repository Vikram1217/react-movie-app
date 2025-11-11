import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css'

const SignUpPage = () => {  
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

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the for from doing a full page refresh
    setError(''); // Clear previous errors

    // Firebase requires passwords to be at least 6 characters
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`User created successfully! ${userCredential.user}`);
      navigate('/');
    }catch(err){
      setError(err);
      console.log('Something went wrong signing up', err);
    }
  }

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSignUp} className={styles.authForm}>
        <h2>Create an Account</h2>

        <input type='email' placeholder='Enter your Email...' value={email} onChange={handleEmail} required />

        <input type='password' placeholder='Enter your Password...' value={password} onChange={handlePassword} required />
        <button type="submit">Sign Up</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
};

export default SignUpPage;
