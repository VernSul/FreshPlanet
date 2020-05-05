import { gql } from 'apollo-server';
import _ from 'lodash';
import { forumDB, messageDB, userDB } from '../../database';




export const typeDefs = [
    gql`
        extend type Query {
            forum(id: Int): [Forum]
        }
        type Forum {
            id: Int!
            name: String!
            created_at: String!
            admin: User
            messages:[Message]!
            members: [User]!
        }
    `
];

export const resolvers = [
    {
        Query: {
            forum: (parent, args) => {
                if (Object.keys(args).length) return _.filter(forumDB(), args);
                const all_forums = forumDB();
                all_forums.shift();
                return all_forums;
            }
        },
        Forum: {
            admin: (parent, args) => {
                return _.find(userDB(), { id: parent.admin });
            },

            messages: (parent, args) => {
                const messages_forum = _.filter(messageDB(), { forum: parent.id });
                messages_forum.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                return messages_forum;
            },
            members: (parent, args) => {
                // Loop through user table to find the members
                const members_resp = [];
                let users_arr = userDB();
                users_arr.shift()
                users_arr.forEach(x => {
                    if (x.forums.findIndex(o => o === parent.id) > -1) {
                        members_resp.push(x);
                    }
                });
                return members_resp;

            }

        }
    }
]