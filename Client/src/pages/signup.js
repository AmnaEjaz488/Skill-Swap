import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';
import '../styles/login.css';

const Signup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signup({
        variables: { name, username, phone, email, password },
      });
      console.log('Signup mutation executed successfully');
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  // Use the `data` variable to handle the response
  useEffect(() => {
    if (data) {
      console.log('Signup successful:', data);
      // Example: Redirect the user or show a success message
      alert(`Welcome, ${data.signup.user.name}! Signup successful.`);
    }
  }, [data]);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="username" placeholder="Username" required />
        <input type="tel" name="phone" placeholder="Phone" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;