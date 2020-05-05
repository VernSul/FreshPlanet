import flatten from 'lodash/flatten';

import * as forum from './forum';
import * as message from './message';
import * as user from './user';

const definitions = [
    forum,
    message,
    user

];

export const typeDefs = flatten(definitions.map(type => type.typeDefs));
export const resolvers = flatten(definitions.map(type => type.resolvers));