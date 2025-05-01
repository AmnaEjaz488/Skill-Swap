import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Import useMutation
import { SIGNUP } from '../graphql/mutations'; // Import the SIGNUP mutation
import '../styles/login.css'; // Updated import path

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Use the SIGNUP mutation
  const [signup, { loading }] = useMutation(SIGNUP, {
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signup({
        variables: { name, email, password },
      });

      if (data && data.signup) {
        const { token } = data.signup;

        // Save the token to localStorage
        localStorage.setItem('token', token);

        console.log('Signup successful:', data.signup.user);
        setError('');
        setSuccess(true);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Signup successful! You can now log in.</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;