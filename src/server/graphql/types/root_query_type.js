import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

const UserType  = require('./user_type').default;

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.user;
            }
        }
    }
})