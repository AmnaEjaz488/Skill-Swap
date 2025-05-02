import { gql } from '@apollo/client';

// Mutation to sign up a new user
export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

// Mutation to log in an existing user
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

// Mutation to add a skill offered
export const ADD_SKILL_OFFERED = gql`
  mutation AddSkillOffered(
    $skillName: String!
    $experience: Int!
    $skillLevel: String!
    $hoursAvailable: Int!
    $daysAvailable: [String]
  ) {
    addSkillOffered(
      skillName: $skillName
      experience: $experience
      skillLevel: $skillLevel
      hoursAvailable: $hoursAvailable
      daysAvailable: $daysAvailable
    ) {
      _id
      skillName
      experience
      skillLevel
      hoursAvailable
      daysAvailable
    }
  }
`;

// Mutation to add a skill needed
export const ADD_SKILL_NEEDED = gql`
  mutation AddSkillNeeded(
    $skillName: String!
    $skillDescription: String!
    $daysAvailable: [String]
  ) {
    addSkillNeeded(
      skillName: $skillName
      skillDescription: $skillDescription
      daysAvailable: $daysAvailable
    ) {
      _id
      skillName
      skillDescription
      daysAvailable
    }
  }
`;

// Mutation to delete a skill offered
export const DELETE_SKILL_OFFERED = gql`
  mutation DeleteSkillOffered($skillId: ID!) {
    deleteSkillOffered(skillId: $skillId) {
      _id
      skillName
    }
  }
`;

// Mutation to delete a skill needed
export const DELETE_SKILL_NEEDED = gql`
  mutation DeleteSkillNeeded($skillId: ID!) {
    deleteSkillNeeded(skillId: $skillId) {
      _id
      skillName
    }
  }
`;

// Mutation to request a session
export const REQUEST_SESSION = gql`
  mutation RequestSession($skillId: ID!, $date: String!) {
    requestSession(skillId: $skillId, date: $date) {
      _id
      userId {
        _id
        name
      }
      skillId
      date
    }
  }
`;