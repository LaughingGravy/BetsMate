// import {
//     graphql,
//     GraphQLID,
//     GraphQLObjectType,
//     GraphQLString,
// } from 'graphql'

const graphql = require('graphql');
const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
} = graphql

export default new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: { type: GraphQLString }
    }
});

//export default UserType;