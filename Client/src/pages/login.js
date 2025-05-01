import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Import useMutation
import { LOGIN } from '../graphql/mutations'; // Import the LOGIN mutation
import '../styles/login.css'; // Updated import path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use the LOGIN mutation
  const [login, { loading }] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (data && data.login) {
        const { token } = data.login;

        // Save the token to localStorage
        localStorage.setItem('token', token);

        console.log('Login successful:', data.login.user);
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;