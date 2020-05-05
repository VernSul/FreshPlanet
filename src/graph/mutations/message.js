import { gql } from 'apollo-server';
import _ from 'lodash';

import { messageWrite, forumWrite, messageDB, forumDB, userDB } from '../../database';


export const typeDefs = [
    gql`
        extend type Mutation {
            new_message(input: MessageInput!): Int
        }
        input MessageInput {
            author: Int!
            text: String!
            forum: Int!
        }
    `
];

export const resolvers = [
    {
        Mutation: {
            new_message: async (parent, args) => {
                // Check if the user is a member for the forum
                const index_forum = userDB()[args.input.author].forums.findIndex(o => o === args.input.forum);
                if(index_forum < 0){
                    throw 'The user is not a member of the forum';
                }
                
                
                const prev_state = messageDB();
                const id = prev_state.length;

                // Create new message in message table
                const created_at = new Date();
                const updated_db = [...prev_state]
                updated_db.push({...args.input, id, created_at});
                messageWrite(updated_db);

                // Add new message in forum messages list
                const prev_forum = [ ...forumDB()];
                prev_forum[args.input.forum].messages.push(id);
                forumWrite(prev_forum);


                return id;
            }
        }
    }

];