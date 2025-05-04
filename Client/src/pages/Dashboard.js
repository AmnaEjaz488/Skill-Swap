import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Include the token in the Authorization header
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div>
      <h1>Welcome, {me.name}</h1>
      <p>Email: {me.email}</p>
      <p>Bio: {me.bio || 'No bio available'}</p>
    </div>
  );
};

export default Dashboard;