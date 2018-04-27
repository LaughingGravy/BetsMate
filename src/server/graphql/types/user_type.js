import {
    graphql,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql'

import RoleType from './role_type' 

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: {type: RoleType}
    }
});

module.exports = UserType;