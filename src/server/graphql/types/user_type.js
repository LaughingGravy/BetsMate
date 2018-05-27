import {
    graphql,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: { type: GraphQLString }
    }
})