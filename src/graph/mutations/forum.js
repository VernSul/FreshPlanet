import { gql } from 'apollo-server';
import _ from 'lodash';

import { forumWrite, userWrite, forumDB, userDB } from '../../database';


export const typeDefs = [
    gql`
        extend type Mutation {
            new_forum(input: ForumInput!): Int
        }
        input ForumInput {
            name: String!
            admin: Int!
        }  `
];

export const resolvers = [
    {
        Mutation: {
            new_forum: async (parent, args) => {
                const prev_state = forumDB();
                const users_table = userDB();
                // Check if name and admin are valid
                if (_.findIndex(prev_state, { name: args.input.name }) > -1) {
                    throw 'Forum title already exists.';
                }
                if (_.findIndex(users_table, { id: args.input.admin }) < 0) {
                    throw 'Admin user does not exist.';
                }
                const id = prev_state.length;

                // Creates a new forum
                const updated_state = [...prev_state]
                updated_state.push({ 
                    ...args.input, 
                    id, 
                    messages: [],
                    created_at: new Date()
                    });
                forumWrite(updated_state);

                // Adds it in user's forums
                const updated_users_table = [...users_table];
                updated_users_table[args.input.admin].forums.push(id);
                userWrite(updated_users_table);

                return id;
            }
        }
    }

];