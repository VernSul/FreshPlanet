import flatten from 'lodash/flatten';

import * as base from './base';
import * as mutations from './mutations';
import * as queries from './queries';


const definitions = [base, mutations, queries];

export const typeDefs = flatten(definitions.map(type => type.typeDefs));

export const resolvers = flatten(definitions.map(type => type.resolvers));