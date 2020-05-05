import { gql } from 'apollo-server';
import _ from 'lodash';
import { forumDB, userDB } from '../../database';



export const typeDefs = [
    gql`
        type Message {
            id: Int!
            author: User!
            text: String!
            forum: Forum!
            created_at: String!
            updated_at: String
        }`
];

export const resolvers = [
    {
        Message: {
            author: (parent, args) => {
                return _.find(userDB(), { id: parent.author });
            },
            forum: (parent) => {
                return _.find(forumDB(), { id: parent.forum })
            }

        }

    }

];