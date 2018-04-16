import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

import UserType from './user_type';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields() {
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
              return req.user;
            }
        }
    }
});

module.exports = RootQueryType;