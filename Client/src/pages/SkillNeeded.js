import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import '../styles/skillNeeded.css';
import { GET_SKILLS_NEEDED } from '../graphql/queries.js'

const SkillNeeded = () => {
  const { loading, error, data } = useQuery(GET_SKILLS_NEEDED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">An error occurred: {error.message}</p>;

  return (
    <div className="skill-needed-page">
      <h1>Skills Needed</h1>
      <ul>
        {data?.skillsNeeded?.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.skillName}</strong>: {skill.skillDescription}
            <br />
            <em>Available Days: {skill.daysAvailable?.join(', ')}</em>
            <br />
            <small>
              Requested by: {skill.userId?.username} ({skill.userId?.email})
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillNeeded;