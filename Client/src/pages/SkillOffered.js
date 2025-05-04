import React from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/skillOffered.css';
import {GET_SKILLS_OFFERED} from '../graphql/queries.js'
// Define the GraphQL query

const SkillOffered = () => {
  const { loading, error, data } = useQuery(GET_SKILLS_OFFERED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">An error occurred: {error.message}</p>;

  return (
    <div className="skill-offered-page">
      <h1>Skills Offered</h1>
      <ul>
        {data.skillsOffered.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.skillName}</strong>
            <p>Experience: {skill.experience} years</p>
            <p>Skill Level: {skill.skillLevel}</p>
            <p>Hours Available: {skill.hoursAvailable}</p>
            <p>Days Available: {skill.daysAvailable.join(', ')}</p>
            <p>Offered by: {skill.userId?.username} ({skill.userId?.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillOffered;