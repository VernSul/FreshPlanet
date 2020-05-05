import { gql } from 'apollo-server';
import _ from 'lodash';

import { userWrite, userDB, forumDB } from '../../database';


export const typeDefs = [
    gql`
        extend type Mutation {
            new_user(input: UserInput!): Int
            join_forum(input: JoinInput): Boolean
        }
        input UserInput {
            name: String!
            email: String!
            pic_url: String!
        }

        input JoinInput {
            user_id: Int!
            forum_id: Int
            forum_name: String
        }
    `
];

export const resolvers = [
    {
        Mutation: {
            new_user: async (parent, args) => {
                const prev_state = userDB();
                if (_.findIndex(prev_state, { email: args.input.email }) > -1) {
                    throw 'User already exists.'
                }
                const id = prev_state.length;
                const created_at = new Date();
                const updated_state = [...prev_state];
                updated_state.push({
                    ...args.input,
                    id,
                    created_at,
                    forums: []
                });
                userWrite(updated_state);
                return id;
            },
            join_forum: async (parent, args) => {
                const user_table = userDB();
                const forum_table = forumDB();
                let forum_id;
                try {

                    // Check if the user is eligible to join the forum
                    if (typeof args.input.forum_name === 'string') {
                        const forum = _.find(forum_table, { name: args.input.forum_name })
                        if(forum === undefined) {
                            throw "This forum's name does not exist";
                        }
                        forum_id = forum.id
                    }
                    if (typeof args.input.forum_id === 'number') {
                        if(args.input.forum_id > forum_table.length){
                            throw "This forum's id does not exist";
                        }
                        forum_id = args.input.forum_id;
                    }
                    if(user_table[args.input.user_id].forums.findIndex((x) => x === forum_id) > -1){
                        throw "You already joined this forum";
                    }

                    const updated_users_table = [...user_table];
                    updated_users_table[args.input.user_id].forums.push(forum_id);
                    userWrite(updated_users_table);
                    return true;
                } catch (e) {
                    throw e
                }


            }
        }
    }

];