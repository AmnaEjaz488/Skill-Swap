import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { SIGNUP} from '../graphql/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    username:'',
    phone:'',

  });

  const [signup, { error }] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form State:', formState); // Log the form state
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
      <input
        type="username"
        placeholder="username"
        value={formState.username}
        onChange={(e) =>
          setFormState({ ...formState, username: e.target.value })
        }
      />
         <input

        type="phone"
        placeholder="phone"
        value={formState.phone}
        onChange={(e) =>
          setFormState({ ...formState, phone: e.target.value })
        }
          />
      <button type="submit">Sign Up</button>
      {error && <p className="error">An error occurred: {error.message}</p>}
    </form>
  );
};

export default Signup;