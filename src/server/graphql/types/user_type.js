import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} from 'graphql'

import GraphQLDate from 'graphql-date'

export default new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        passwordHash: { type: GraphQLString },
        role: { type: GraphQLString },
        displayName: { type: GraphQLString },
        registerDate: { type: GraphQLDate },
        lastAccessDate: { type: GraphQLDate },
        verified: { type: GraphQLBoolean},
        emailVerificationHash: { type: GraphQLString },
        emailVerificationExpiry: { type: GraphQLDate },
        passwordResetHash: { type: GraphQLString },
        tempTwoFactorSecret: { type: GraphQLObjectType },
        twoFactorSecret: { type: GraphQLObjectType }
    }
})
