import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            username
            email
          }
        }
      }
    `;

    const variables = { email, password };

    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.data && result.data.login) {
        const { token } = result.data.login;

        // Save the token to localStorage
        localStorage.setItem('token', token);

        console.log('Login successful:', result.data.login.user);
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;