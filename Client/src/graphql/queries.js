import { gql } from '@apollo/client';

// Query to fetch the current user
export const GET_ME = gql`
  query Me {
    me {
      _id
      name
      email
      bio
      skillsOffered {
        _id
        skillName
        experience
        skillLevel
      }
      skillsNeeded {
        _id
        skillName
        skillDescription
      }
    }
  }
`;

// Query to fetch all skills offered
export const GET_SKILLS_OFFERED = gql`
  query GetSkillsOffered {
    skillsOffered {
      _id
      skillName
      experience
      skillLevel
      hoursAvailable
      daysAvailable
      userId {
        _id
        name
        email
      }
    }
  }
`;

// Query to fetch all skills needed
export const GET_SKILLS_NEEDED = gql`
  query GetSkillsNeeded {
    skillsNeeded {
      _id
      skillName
      skillDescription
      daysAvailable
      userId {
        _id
        name
        email
      }
    }
  }
`;

// Query to fetch bookings
export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
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