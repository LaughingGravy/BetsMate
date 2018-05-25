// import {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLSchema
// } from 'graphql';
const graphql = require('graphql');
const {
    GraphQLObjectType
} = graphql

//const UserType  = require('./user_type');

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: require('./user_type').default,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.user;
            }
        }
    }
});

//export default RootQueryType;