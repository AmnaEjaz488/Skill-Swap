const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    bio: String
    skillsOffered: [Skill]
    skillsWanted: [Skill]
    token: String
  }

  type Skill {
    _id: ID!
    title: String!
    category: String!
    description: String
    availability: String
    createdBy: User
  }

  type Booking {
    _id: ID!
    userId: User
    skillId: Skill
    date: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    skills(category: String): [Skill]
    bookings: [Booking]
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addSkill(title: String!, category: String!, description: String, availability: String): Skill
    editSkill(skillId: ID!, title: String, category: String, description: String, availability: String): Skill
    deleteSkill(skillId: ID!): Skill

    requestSession(skillId: ID!, date: String!): Booking
  }
`;

module.exports = typeDefs;
