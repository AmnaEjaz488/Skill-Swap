import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { error }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      localStorage.setItem('jwtToken', data.signup.token);
      window.location.href = '/dashboard'; // Redirect after signup
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formState.name}
        onChange={(e) =>
          setFormState({ ...formState, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) =>
          setFormState({ ...formState, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <button type="submit">Sign Up</button>
      {error && <p className="error">An error occurred: {error.message}</p>}
    </form>
  );
};

export default Signup;