import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SKILLS_OFFERED } from '../graphql/queries';
import '../styles/skillOffered.css';

const SkillOffered = () => {
  const { loading, error, data } = useQuery(GET_SKILLS_OFFERED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="skill-offered-page">
      <h1>Skill Offered</h1>
      <ul>
        {data.skillsOffered.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.skillName}</strong> - {skill.skillLevel} ({skill.experience} years)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillOffered;