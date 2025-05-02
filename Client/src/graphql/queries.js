import { gql } from '@apollo/client';

// Query to get the logged-in user's data
export const GET_ME = gql`
  query Me {
    me {
      _id
      name
      email
      bio
      profilePicture
      location
      skillsOffered {
        _id
        skillName
        experience
        skillLevel
        hoursAvailable
        daysAvailable
        bookings {
          _id
          date
          userId {
            _id
            name
          }
        }
      }
      skillsNeeded {
        _id
        skillName
        skillDescription
        daysAvailable
        bookings {
          _id
          date
          userId {
            _id
            name
          }
        }
      }
    }
  }
`;

// Query to get all skills offered
export const GET_SKILLS_OFFERED = gql`
  query SkillsOffered {
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
      bookings {
        _id
        date
        userId {
          _id
          name
        }
      }
    }
  }
`;

// Query to get all skills needed
export const GET_SKILLS_NEEDED = gql`
  query SkillsNeeded {
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
      bookings {
        _id
        date
        userId {
          _id
          name
        }
      }
    }
  }
`;

// Query to get bookings for the logged-in user
export const GET_BOOKINGS = gql`
  query Bookings {
    bookings {
      _id
      userId {
        _id
        name
        email
      }
      skillId {
        _id
        skillName
        skillLevel
      }
      date
    }
  }
`;