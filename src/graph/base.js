import { gql } from 'apollo-server';

/*
  One mock field is added to declare
  the extendable base type.
  type Query {
    forum(id: Int): Forum
  }
 */
const Query = gql`
  type Query {
    _: Boolean
  }
`;

const Mutation = gql`
  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [Query, Mutation];