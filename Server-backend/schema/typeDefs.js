import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    bio: String
    skillsOffered: [SkillOffered]
    skillsNeeded: [SkillNeeded]
  }

  type SkillOffered {
    _id: ID!
    skillName: String!
    experience: Int
    skillLevel: String
    hoursAvailable: Int
    daysAvailable: [String]
    bookings: [Booking]
    userId: User
  }

  type SkillNeeded {
    _id: ID!
    skillName: String!
    skillDescription: String!
    daysAvailable: [String]
    bookings: [Booking]
    userId: User
  }

  type Booking {
    _id: ID!
    userId: User
    skillId: ID
    date: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    skillsOffered: [SkillOffered]
    skillsNeeded: [SkillNeeded]
    bookings: [Booking]
  }

  type Mutation {
    signup(name: String!, username: String!, phone: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addSkillOffered(
      skillName: String!
      experience: Int!
      skillLevel: String!
      hoursAvailable: Int!
      daysAvailable: [String]
    ): SkillOffered

    addSkillNeeded(
      skillName: String!
      skillDescription: String!
      daysAvailable: [String]
    ): SkillNeeded

    deleteSkillOffered(skillId: ID!): SkillOffered
    deleteSkillNeeded(skillId: ID!): SkillNeeded

    requestSession(skillId: ID!, date: String!): Booking
  }
`;

export default typeDefs;