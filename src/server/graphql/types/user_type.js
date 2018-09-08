import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import GraphQLDate from 'graphql-date'

export default new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        displayName: { type: GraphQLString },
        regDate: { type: GraphQLDate },
        lastAccessDate: { type: GraphQLDate },
    }
})