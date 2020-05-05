import { gql } from 'apollo-server';
import fs from 'fs';
import _ from 'lodash';

import { forumDB, userDB } from '../../database';


export const typeDefs = [
    gql`
        extend type Query {
            user(id: Int): User
        }
        type User {
            id: Int!
            name: String!
            email: String
            pic_url: String!
            member_since: String
            forums: [Forum]
        }
    `
];

export const resolvers = [
    {
        Query: {
            user: async (parent, args) => {
                return _.find(userDB(), {id: args.id});
            }
        },
        User: {
            forums: (parent, args) => {
                const forums = forumDB();
                return parent.forums.map(x => forums[x]);
            }

        }
    }

];