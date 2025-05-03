import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SKILLS_NEEDED } from '../graphql/queries';
import '../styles/skillNeeded.css';

const SkillNeeded = () => {
  const { loading, error, data } = useQuery(GET_SKILLS_NEEDED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="skill-needed-page">
      <h1>Skill Needed</h1>
      <ul>
        {data.skillsNeeded.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.skillName}</strong>: {skill.skillDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillNeeded;